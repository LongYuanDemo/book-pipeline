#!/usr/bin/env python3
"""
动作拆解文档生成脚本
基于 YOLOv8-Pose 提取的关键点数据，自动进行动作分段、
关键帧筛选、动作描述生成，输出结构化 Markdown 图文教程文档。
支持 AI 描述增强，去重提取最具代表性的教学帧。
"""

import os
import json
import argparse
import numpy as np
from pathlib import Path
from collections import Counter


def load_pose_data(pose_json_path):
    with open(pose_json_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def load_ai_descriptions(desc_json_path):
    """加载 AI 生成的帧描述数据。"""
    with open(desc_json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data.get("descriptions", {})


def compute_pose_variance(frame, segment_avg_angles):
    """计算单帧姿态与段平均姿态的差异度，用于挑选最具代表性的帧。"""
    angles = frame.get("angles", {})
    diffs = []
    for k, avg_val in segment_avg_angles.items():
        v = angles.get(k)
        if v is not None and avg_val is not None:
            diffs.append(abs(v - avg_val))
    return np.mean(diffs) if diffs else 0


def compute_frame_score(frame, segment_avg_angles):
    """
    为帧计算综合得分，用于挑选代表性关键帧。
    得分越高表示该帧越具代表性（姿态明确、检测置信度高）。
    """
    if not frame.get("detected"):
        return -1

    confidence = frame.get("person_confidence", 0.5)
    variance = compute_pose_variance(frame, segment_avg_angles)

    # 偏好：高置信度 + 与平均姿态有适度差异（太接近平均可能太平淡，差异太大可能是过渡帧）
    # 这里简单用置信度 * (1 + 适度差异)
    score = confidence * (1 + min(variance / 30.0, 1.0))
    return score


def segment_actions(frames, window=3, angle_threshold=20):
    """
    基于关节角度变化进行动作分段。
    当连续帧中关键角度变化超过阈值时，认为进入新的动作段。
    """
    if not frames:
        return []

    segments = []
    current_segment = [frames[0]]

    for i in range(1, len(frames)):
        if not frames[i]["detected"] or not frames[i-1]["detected"]:
            current_segment.append(frames[i])
            continue

        prev = frames[i-1]
        curr = frames[i]

        angle_changes = []
        for angle_name in ["left_elbow", "right_elbow", "left_knee", "right_knee",
                           "left_shoulder", "right_shoulder", "left_hip", "right_hip"]:
            prev_val = prev["angles"].get(angle_name)
            curr_val = curr["angles"].get(angle_name)
            if prev_val is not None and curr_val is not None:
                angle_changes.append(abs(curr_val - prev_val))

        avg_change = np.mean(angle_changes) if angle_changes else 0
        max_change = max(angle_changes) if angle_changes else 0

        if max_change > angle_threshold and len(current_segment) >= window:
            segments.append(current_segment)
            current_segment = [frames[i]]
        else:
            current_segment.append(frames[i])

    if current_segment:
        segments.append(current_segment)

    return segments


def select_representative_frames(segment):
    """
    从动作段中挑选 1-2 张最具代表性的教学帧，避免重复。

    策略：
    - 短片段（< 3 帧或 < 1.5秒）：取 1 帧（综合得分最高或中间帧）
    - 长片段：取 2 帧（起始代表帧 + 结束代表帧），展示动作变化
    """
    detected = [f for f in segment if f.get("detected")]
    if not detected:
        return [segment[0]] if segment else []

    # 计算段内平均角度
    avg_angles = {}
    for angle_name in ["left_elbow", "right_elbow", "left_knee", "right_knee",
                       "left_shoulder", "right_shoulder", "left_hip", "right_hip"]:
        vals = [f["angles"].get(angle_name) for f in detected if f["angles"].get(angle_name) is not None]
        avg_angles[angle_name] = np.mean(vals) if vals else None

    duration = detected[-1]["timestamp_sec"] - detected[0]["timestamp_sec"] if len(detected) > 1 else 0

    if len(detected) <= 3 or duration < 1.5:
        # 单帧：取分数最高的
        best = max(detected, key=lambda f: compute_frame_score(f, avg_angles))
        return [best]
    else:
        # 双帧：取起始区域和结束区域中各取分数最高的一帧
        mid_idx = len(detected) // 2
        first_half = detected[:max(mid_idx, 1)]
        second_half = detected[mid_idx:]

        start_best = max(first_half, key=lambda f: compute_frame_score(f, avg_angles))
        end_best = max(second_half, key=lambda f: compute_frame_score(f, avg_angles))

        # 如果两帧非常相似（时间差 < 0.5s），只保留一帧
        if abs(start_best["timestamp_sec"] - end_best["timestamp_sec"]) < 0.5:
            return [start_best if compute_frame_score(start_best, avg_angles) >= compute_frame_score(end_best, avg_angles) else end_best]
        return [start_best, end_best]


def describe_pose(frame, ai_descriptions=None):
    """根据骨架数据生成自然语言动作描述，优先使用 AI 描述。"""
    if not frame.get("detected"):
        return "（未检测到人体）"

    # 优先使用 AI 描述
    if ai_descriptions:
        frame_num = str(frame.get("frame_number", ""))
        ai_desc = ai_descriptions.get(frame_num)
        if ai_desc and ai_desc != "（描述生成失败）":
            return ai_desc

    # 规则兜底
    parts = []
    parts.append(f"身体朝向{frame['body_facing']}")

    left_arm = frame.get("left_arm_position", "未知")
    right_arm = frame.get("right_arm_position", "未知")
    if left_arm == right_arm:
        if left_arm == "高举":
            parts.append("双臂高举")
        elif left_arm == "平举":
            parts.append("双臂平举")
        else:
            parts.append("双臂自然下垂")
    else:
        parts.append(f"左臂{left_arm}、右臂{right_arm}")

    left_leg = frame.get("left_leg_state", "未知")
    right_leg = frame.get("right_leg_state", "未知")
    if left_leg == right_leg:
        if left_leg == "弯曲":
            parts.append("双腿弯曲")
        else:
            parts.append("双腿伸直")
    else:
        parts.append(f"左腿{left_leg}、右腿{right_leg}")

    angles = frame.get("angles", {})
    if angles.get("left_elbow") and angles["left_elbow"] < 90:
        parts.append("左臂明显弯曲")
    if angles.get("right_elbow") and angles["right_elbow"] < 90:
        parts.append("右臂明显弯曲")
    if angles.get("left_knee") and angles["left_knee"] < 120:
        parts.append("左腿深蹲")
    if angles.get("right_knee") and angles["right_knee"] < 120:
        parts.append("右腿深蹲")

    return "，".join(parts)


def generate_action_name(segment_frames):
    """根据动作段的关键帧姿态变化，生成动作名称。"""
    key = select_representative_frames(segment_frames)
    if not key:
        return "未知动作"

    start = key[0]
    end = key[-1] if len(key) > 1 else key[0]

    changes = []
    if start.get("left_arm_position") != end.get("left_arm_position"):
        changes.append(f"左臂从{start['left_arm_position']}变为{end['left_arm_position']}")
    if start.get("right_arm_position") != end.get("right_arm_position"):
        changes.append(f"右臂从{start['right_arm_position']}变为{end['right_arm_position']}")
    if start.get("left_leg_state") != end.get("left_leg_state"):
        changes.append(f"左腿从{start['left_leg_state']}变为{end['left_leg_state']}")
    if start.get("right_leg_state") != end.get("right_leg_state"):
        changes.append(f"右腿从{start['right_leg_state']}变为{end['right_leg_state']}")

    if not changes:
        # 如果姿态没有变化，描述为保持某个姿势
        pose = describe_pose(start)
        return f"保持：{pose[:30]}"

    return "；".join(changes)


def generate_tutorial_markdown(data, segments, ai_descriptions=None, frames_dir=None):
    """生成图文教程风格的 Markdown 文档。"""
    lines = []

    video_source = data.get('video_source', '未知视频')
    lines.append(f"# {video_source} — 动作图文教程")
    lines.append("")
    lines.append("> 本文档由 AI 自动分析视频骨架关键点生成，按动作步骤拆解，便于教学与自学。")
    lines.append("")
    lines.append("---")
    lines.append("")

    # 元信息
    lines.append("## 教程概览")
    lines.append("")
    lines.append(f"- **视频来源**: {video_source}")
    lines.append(f"- **检测模型**: {data.get('model', '-')}")
    lines.append(f"- **关键点格式**: {data.get('keypoint_format', 'COCO-17')}")
    lines.append(f"- **总帧数**: {data.get('total_frames', 0)}")
    lines.append(f"- **检测成功帧**: {data.get('detected_frames', 0)} ({data.get('detection_rate', 0)}%)")
    lines.append(f"- **教学步骤数**: {len(segments)}")
    lines.append("")

    # 动作总览表
    lines.append("### 步骤总览")
    lines.append("")
    lines.append("| 步骤 | 时间段 | 动作名称 | 关键姿态 |")
    lines.append("|------|--------|----------|----------|")

    for idx, seg in enumerate(segments, 1):
        key_frames = select_representative_frames(seg)
        start_time = seg[0]["timestamp_sec"]
        end_time = seg[-1]["timestamp_sec"]
        action_name = generate_action_name(seg)[:40]
        key_pose = describe_pose(key_frames[0], ai_descriptions)[:30] if key_frames else "-"
        lines.append(f"| 第 {idx} 步 | {start_time:.0f}s-{end_time:.0f}s | {action_name} | {key_pose} |")

    lines.append("")
    lines.append("---")
    lines.append("")

    # 逐步骤详细拆解
    lines.append("## 分步详细教学")
    lines.append("")

    for idx, seg in enumerate(segments, 1):
        key_frames = select_representative_frames(seg)
        start_time = seg[0]["timestamp_sec"]
        end_time = seg[-1]["timestamp_sec"]
        duration = round(end_time - start_time, 1)

        lines.append(f"### 步骤 {idx}：{generate_action_name(seg)[:30]}")
        lines.append("")
        lines.append(f"**时间**: {start_time:.0f}s — {end_time:.0f}s（约 {duration} 秒）")
        lines.append("")

        # 动作描述
        if key_frames:
            main_desc = describe_pose(key_frames[0], ai_descriptions)
            lines.append(f"**动作说明**: {main_desc}")
            lines.append("")

        # 关键帧图片与说明
        for f_idx, frame in enumerate(key_frames, 1):
            if not frame.get("detected"):
                continue

            time_sec = frame["timestamp_sec"]
            frame_file = frame.get("frame_file", "")
            img_path = f"{frames_dir}/{frame_file}" if frames_dir and frame_file else frame_file

            desc = describe_pose(frame, ai_descriptions)

            lines.append(f"#### 关键画面 {f_idx}")
            lines.append("")
            if img_path:
                lines.append(f"![步骤{idx}-画面{f_idx}]({img_path})")
                lines.append("")
            lines.append(f"- **时间**: {time_sec:.1f}s")
            lines.append(f"- **姿态描述**: {desc}")

            angles = frame.get("angles", {})
            if angles:
                angle_items = []
                for k, v in angles.items():
                    if v is not None:
                        cn = {
                            "left_elbow": "左肘", "right_elbow": "右肘",
                            "left_shoulder": "左肩", "right_shoulder": "右肩",
                            "left_hip": "左髋", "right_hip": "右髋",
                            "left_knee": "左膝", "right_knee": "右膝",
                            "left_armpit": "左腋下", "right_armpit": "右腋下"
                        }.get(k, k)
                        angle_items.append(f"{cn} {v}°")
                if angle_items:
                    lines.append(f"- **关节角度**: {'　'.join(angle_items)}")
            lines.append("")

        # 如果该段有明确的姿态变化，加一段练习提示
        if len(key_frames) > 1:
            lines.append("> **练习提示**: 注意从画面 1 到画面 2 的姿态转换，保持身体平衡，动作流畅过渡。")
            lines.append("")

        lines.append("---")
        lines.append("")

    # 附录
    lines.append("## 附录：COCO-17 关键点索引")
    lines.append("")
    lines.append("| 编号 | 英文名 | 中文名 |")
    lines.append("|------|--------|--------|")

    # 由于不能直接导入 pose_extract（路径问题），直接硬编码
    landmark_cn = {
        0: "鼻子", 1: "左眼", 2: "右眼", 3: "左耳",
        4: "右耳", 5: "左肩", 6: "右肩",
        7: "左肘", 8: "右肘", 9: "左腕",
        10: "右腕", 11: "左髋", 12: "右髋",
        13: "左膝", 14: "右膝", 15: "左踝",
        16: "右踝"
    }
    landmark_en = {
        0: "nose", 1: "left_eye", 2: "right_eye", 3: "left_ear",
        4: "right_ear", 5: "left_shoulder", 6: "right_shoulder",
        7: "left_elbow", 8: "right_elbow", 9: "left_wrist",
        10: "right_wrist", 11: "left_hip", 12: "right_hip",
        13: "left_knee", 14: "right_knee", 15: "left_ankle",
        16: "right_ankle"
    }
    for i in range(17):
        lines.append(f"| {i} | {landmark_en.get(i, '-')} | {landmark_cn.get(i, '-')} |")

    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("*文档由 AI 自动生成，基于 YOLOv8-Pose 骨架关键点数据*")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="动作拆解文档生成工具（图文教程版）")
    parser.add_argument("-i", "--input", required=True, help="输入 pose_keypoints.json 路径")
    parser.add_argument("-o", "--output", required=True, help="输出 Markdown 文件路径")
    parser.add_argument("--frames-dir", default=None, help="帧图片目录路径（用于 Markdown 图片引用）")
    parser.add_argument("--ai-descriptions", default=None, help="AI 描述 JSON 路径（由 ai_describer.py 生成）")
    parser.add_argument("--window", type=int, default=3, help="动作分段最小窗口 (默认: 3)")
    parser.add_argument("--threshold", type=float, default=20, help="角度变化阈值 (默认: 20)")
    args = parser.parse_args()

    print("加载姿态数据...")
    data = load_pose_data(args.input)
    frames = data["frames"]
    print(f"  共 {len(frames)} 帧，检测率 {data['detection_rate']}%")

    # 加载 AI 描述
    ai_descriptions = None
    if args.ai_descriptions:
        desc_path = Path(args.ai_descriptions)
        if desc_path.exists():
            ai_descriptions = load_ai_descriptions(desc_path)
            print(f"  已加载 AI 描述: {len(ai_descriptions)} 条")
        else:
            print(f"  警告: AI 描述文件不存在: {desc_path}")

    print("动作分段...")
    segments = segment_actions(frames, window=args.window, angle_threshold=args.threshold)
    print(f"  分为 {len(segments)} 个动作段")

    seg_durations = [round(s[-1]["timestamp_sec"] - s[0]["timestamp_sec"], 1) for s in segments if len(s) > 0]
    if seg_durations:
        print(f"  段时长: 最短 {min(seg_durations)}s, 最长 {max(seg_durations)}s, 平均 {round(np.mean(seg_durations), 1)}s")

    # 统计代表帧
    total_repr = sum(len(select_representative_frames(s)) for s in segments)
    print(f"  精选教学帧: {total_repr} 张（去重后）")

    print("生成图文教程 Markdown 文档...")
    md_content = generate_tutorial_markdown(data, segments, ai_descriptions=ai_descriptions, frames_dir=args.frames_dir)

    with open(args.output, 'w', encoding='utf-8') as f:
        f.write(md_content)
    print(f"图文教程已保存: {args.output}")

    print(f"\n动作分段摘要:")
    for idx, seg in enumerate(segments, 1):
        start_t = seg[0]["timestamp_sec"]
        end_t = seg[-1]["timestamp_sec"]
        repr_count = len(select_representative_frames(seg))
        action = generate_action_name(seg)
        print(f"  步骤{idx:02d} ({start_t:.0f}s-{end_t:.0f}s, {repr_count}张代表帧): {action[:50]}")


if __name__ == "__main__":
    main()
