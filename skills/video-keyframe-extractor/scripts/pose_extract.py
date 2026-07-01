#!/usr/bin/env python3
"""
视频帧骨架关键点提取脚本
使用 YOLOv8-Pose 对每帧图片提取 17 个 COCO 身体关键点，
输出 JSON 格式的结构化数据。
"""

import os
import json
import argparse
import numpy as np
from pathlib import Path

# YOLOv8-Pose COCO 17 关键点中英文对照
LANDMARK_NAMES = {
    0: "nose", 1: "left_eye", 2: "right_eye", 3: "left_ear",
    4: "right_ear", 5: "left_shoulder", 6: "right_shoulder",
    7: "left_elbow", 8: "right_elbow", 9: "left_wrist",
    10: "right_wrist", 11: "left_hip", 12: "right_hip",
    13: "left_knee", 14: "right_knee", 15: "left_ankle",
    16: "right_ankle"
}

LANDMARK_NAMES_CN = {
    0: "鼻子", 1: "左眼", 2: "右眼", 3: "左耳",
    4: "右耳", 5: "左肩", 6: "右肩",
    7: "左肘", 8: "右肘", 9: "左腕",
    10: "右腕", 11: "左髋", 12: "右髋",
    13: "左膝", 14: "右膝", 15: "左踝",
    16: "右踝"
}


def compute_angle(a, b, c):
    """计算三点之间的角度（b为顶点），返回角度值（度）"""
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    ba = a - b
    bc = c - b
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc) + 1e-8)
    angle = np.arccos(np.clip(cosine_angle, -1.0, 1.0))
    return np.degrees(angle)


def extract_pose_from_frame(frame_path, model):
    """对单帧图片提取姿态关键点（YOLOv8-Pose）"""
    results = model(frame_path, verbose=False)

    if len(results) == 0 or results[0].keypoints is None:
        return None

    keypoints_data = results[0].keypoints
    boxes_data = results[0].boxes

    if keypoints_data.xy is None or len(keypoints_data.xy) == 0:
        return None

    # 取置信度最高的人
    if boxes_data is not None and len(boxes_data.conf) > 1:
        best_idx = boxes_data.conf.argmax().item()
    else:
        best_idx = 0

    kpts_xy = keypoints_data.xy[best_idx].cpu().numpy()
    kpts_conf = keypoints_data.conf[best_idx].cpu().numpy() if keypoints_data.conf is not None else np.ones(17)

    img_shape = results[0].orig_shape
    h, w = img_shape

    keypoints = {}
    for idx in range(17):
        px, py = kpts_xy[idx]
        conf = float(kpts_conf[idx])
        keypoints[idx] = {
            "name": LANDMARK_NAMES.get(idx, f"point_{idx}"),
            "name_cn": LANDMARK_NAMES_CN.get(idx, f"点_{idx}"),
            "x": round(float(px) / w, 4) if w > 0 else 0,
            "y": round(float(py) / h, 4) if h > 0 else 0,
            "confidence": round(conf, 4),
            "pixel_x": int(px),
            "pixel_y": int(py)
        }

    def get_point(idx):
        px, py = kpts_xy[idx]
        return [float(px) / w, float(py) / h]

    angles = {}
    angle_defs = {
        "left_elbow": (5, 7, 9),
        "right_elbow": (6, 8, 10),
        "left_shoulder": (7, 5, 11),
        "right_shoulder": (8, 6, 12),
        "left_hip": (5, 11, 13),
        "right_hip": (6, 12, 14),
        "left_knee": (11, 13, 15),
        "right_knee": (12, 14, 16),
        "left_armpit": (11, 5, 7),
        "right_armpit": (12, 6, 8),
    }

    for name, (a_idx, b_idx, c_idx) in angle_defs.items():
        try:
            if kpts_conf[a_idx] > 0.3 and kpts_conf[b_idx] > 0.3 and kpts_conf[c_idx] > 0.3:
                angle_val = compute_angle(get_point(a_idx), get_point(b_idx), get_point(c_idx))
                angles[name] = round(angle_val, 1)
            else:
                angles[name] = None
        except:
            angles[name] = None

    left_shoulder_x = float(kpts_xy[5][0])
    right_shoulder_x = float(kpts_xy[6][0])
    shoulder_width = abs(left_shoulder_x - right_shoulder_x)

    facing = "侧面" if shoulder_width < w * 0.08 else "正面"

    left_arm_pos = "高举" if kpts_xy[9][1] < kpts_xy[5][1] - h*0.05 else "平举" if abs(kpts_xy[9][1] - kpts_xy[5][1]) < h*0.05 else "下垂"
    right_arm_pos = "高举" if kpts_xy[10][1] < kpts_xy[6][1] - h*0.05 else "平举" if abs(kpts_xy[10][1] - kpts_xy[6][1]) < h*0.05 else "下垂"

    left_leg_state = "弯曲" if angles.get("left_knee") and angles["left_knee"] < 150 else "伸直"
    right_leg_state = "弯曲" if angles.get("right_knee") and angles["right_knee"] < 150 else "伸直"

    person_conf = float(boxes_data[best_idx].conf) if boxes_data is not None else 0.0

    return {
        "keypoints": keypoints,
        "angles": angles,
        "body_facing": facing,
        "left_arm_position": left_arm_pos,
        "right_arm_position": right_arm_pos,
        "left_leg_state": left_leg_state,
        "right_leg_state": right_leg_state,
        "person_confidence": round(person_conf, 4),
    }


def main():
    parser = argparse.ArgumentParser(description="视频帧骨架关键点提取工具 (YOLOv8-Pose)")
    parser.add_argument("-i", "--frames-dir", required=True, help="输入帧图片目录")
    parser.add_argument("-o", "--output-dir", required=True, help="输出目录")
    parser.add_argument("--model", default="yolov8n-pose.pt", help="YOLOv8-Pose 模型路径 (默认: yolov8n-pose.pt)")
    parser.add_argument("--video-source", default="input.mp4", help="原始视频文件名 (用于元数据)")
    args = parser.parse_args()

    frames_dir = Path(args.frames_dir)
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    output_json = output_dir / "pose_keypoints.json"
    output_summary = output_dir / "pose_summary.json"

    print(f"加载 YOLOv8-Pose 模型: {args.model}")
    from ultralytics import YOLO
    model = YOLO(args.model)
    print("模型加载完成")

    frame_files = sorted([f for f in frames_dir.iterdir() if f.suffix.lower() in ('.jpg', '.jpeg', '.png')])
    print(f"找到 {len(frame_files)} 帧图片")

    all_frames_data = []
    detected_count = 0
    failed_frames = []

    for i, frame_file in enumerate(frame_files):
        frame_number = int(''.join(filter(str.isdigit, frame_file.stem)) or i + 1)
        result = extract_pose_from_frame(str(frame_file), model)

        if result is not None:
            detected_count += 1
            frame_data = {
                "frame_number": frame_number,
                "frame_file": frame_file.name,
                "timestamp_sec": round(frame_number - 1, 1),
                "detected": True,
                **result
            }
        else:
            failed_frames.append(frame_file.name)
            frame_data = {
                "frame_number": frame_number,
                "frame_file": frame_file.name,
                "timestamp_sec": round(frame_number - 1, 1),
                "detected": False
            }

        all_frames_data.append(frame_data)

        if (i + 1) % 10 == 0 or i == len(frame_files) - 1:
            print(f"  进度: {i+1}/{len(frame_files)} 帧 (检测成功: {detected_count})")

    output_data = {
        "video_source": args.video_source,
        "model": args.model,
        "keypoint_format": "COCO-17",
        "total_frames": len(frame_files),
        "detected_frames": detected_count,
        "detection_rate": round(detected_count / len(frame_files) * 100, 1),
        "frames": all_frames_data
    }

    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)
    print(f"\n完整关键点数据已保存: {output_json}")

    summary_frames = []
    for fd in all_frames_data:
        if not fd["detected"]:
            summary_frames.append({"frame": fd["frame_number"], "time_s": fd["timestamp_sec"], "detected": False})
            continue
        summary_frames.append({
            "frame": fd["frame_number"],
            "time_s": fd["timestamp_sec"],
            "detected": True,
            "facing": fd["body_facing"],
            "left_arm": fd["left_arm_position"],
            "right_arm": fd["right_arm_position"],
            "left_leg": fd["left_leg_state"],
            "right_leg": fd["right_leg_state"],
            "angles": fd["angles"]
        })

    summary_data = {
        "video_source": args.video_source,
        "model": args.model,
        "total_frames": len(frame_files),
        "detected_frames": detected_count,
        "detection_rate": f"{round(detected_count / len(frame_files) * 100, 1)}%",
        "frames": summary_frames
    }

    with open(output_summary, 'w', encoding='utf-8') as f:
        json.dump(summary_data, f, ensure_ascii=False, indent=2)
    print(f"摘要数据已保存: {output_summary}")

    if failed_frames:
        print(f"\n以下帧未检测到人体: {failed_frames}")
    print(f"\n检测统计: {detected_count}/{len(frame_files)} 帧成功 ({round(detected_count/len(frame_files)*100, 1)}%)")


if __name__ == "__main__":
    main()
