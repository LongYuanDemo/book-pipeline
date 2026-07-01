#!/usr/bin/env python3
"""
视频关键帧提取与动作拆解流水线
一键完成：视频分帧 -> 姿态提取 -> AI描述生成(可选) -> 图文教程生成
"""

import os
import sys
import argparse
import subprocess
from pathlib import Path


def run_step(name, cmd_list, cwd=None):
    print(f"\n{'='*50}")
    print(f"  {name}")
    print(f"{'='*50}")
    result = subprocess.run(cmd_list, cwd=cwd)
    if result.returncode != 0:
        print(f"错误: {name} 执行失败")
        sys.exit(result.returncode)
    return result


def main():
    parser = argparse.ArgumentParser(description="视频关键帧提取与动作拆解流水线")
    parser.add_argument("-i", "--input", required=True, help="输入视频文件路径")
    parser.add_argument("-o", "--output", required=True, help="输出工作目录")
    parser.add_argument("--fps", type=float, default=1.0, help="每秒提取帧数 (默认: 1)")
    parser.add_argument("--model", default="yolov8n-pose.pt", help="YOLOv8-Pose 模型路径")
    parser.add_argument("--threshold", type=float, default=20, help="动作分段角度阈值 (默认: 20)")
    parser.add_argument("--window", type=int, default=3, help="动作分段最小窗口 (默认: 3)")
    parser.add_argument("--dedup", action="store_true", help="启用帧间去重（避免提取重复帧）")
    parser.add_argument("--dedup-threshold", type=float, default=5.0, help="去重阈值 (默认: 5.0)")
    parser.add_argument("--use-ai", action="store_true", help="启用 AI 生成动作描述（需要 API Key）")
    parser.add_argument("--ai-provider", default="openai", choices=["openai", "anthropic"],
                        help="AI 模型提供商 (默认: openai)")
    parser.add_argument("--ai-model", default=None, help="AI 模型名称 (如 gpt-4o, claude-3-5-sonnet)")
    args = parser.parse_args()

    video_path = Path(args.input)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    frames_dir = output_dir / "frames"
    pose_json = output_dir / "pose_keypoints.json"
    desc_json = output_dir / "descriptions.json"
    md_output = output_dir / "breakdown.md"

    script_dir = Path(__file__).parent

    # Step 1: 视频分帧
    step1_cmd = [
        sys.executable, str(script_dir / "extract_frames.py"),
        "-i", str(video_path), "-o", str(frames_dir),
        "--fps", str(args.fps), "--prefix", "frame"
    ]
    if args.dedup:
        step1_cmd.extend(["--dedup", "--dedup-threshold", str(args.dedup_threshold)])

    run_step("Step 1: 视频分帧", step1_cmd)

    # Step 2: 姿态提取
    run_step(
        "Step 2: 姿态关键点提取 (YOLOv8-Pose)",
        [sys.executable, str(script_dir / "pose_extract.py"),
         "-i", str(frames_dir), "-o", str(output_dir),
         "--model", args.model,
         "--video-source", video_path.name]
    )

    # Step 3 (可选): AI 描述生成
    if args.use_ai:
        run_step(
            "Step 3: AI 动作描述生成",
            [sys.executable, str(script_dir / "ai_describer.py"),
             "-i", str(pose_json), "-o", str(desc_json),
             "--provider", args.ai_provider]
            + (["--model", args.ai_model] if args.ai_model else [])
        )

    # Step 4: 生成图文教程
    breakdown_cmd = [
        sys.executable, str(script_dir / "generate_breakdown.py"),
        "-i", str(pose_json), "-o", str(md_output),
        "--threshold", str(args.threshold),
        "--window", str(args.window),
        "--frames-dir", "frames"
    ]
    if args.use_ai:
        breakdown_cmd.extend(["--ai-descriptions", str(desc_json)])

    run_step("Step 4: 生成图文教程文档", breakdown_cmd)

    print(f"\n{'='*50}")
    print("  流水线执行完成")
    print(f"{'='*50}")
    print(f"  输出目录: {output_dir}")
    print(f"  帧图片:   {frames_dir}")
    print(f"  关键点:   {pose_json}")
    if args.use_ai:
        print(f"  AI 描述:  {desc_json}")
    print(f"  图文教程: {md_output}")


if __name__ == "__main__":
    main()
