#!/usr/bin/env python3
"""
视频分帧提取脚本
从视频文件中按指定帧率提取帧图片，支持智能去重（基于帧间像素差异）。
"""

import os
import argparse
import cv2
import numpy as np
from pathlib import Path


def compute_frame_diff(frame_a, frame_b, resize_to=(320, 180)):
    """
    计算两帧之间的像素差异（MSE）。
    先 resize 降低计算量，再转为灰度图比较。
    返回值越大表示差异越大。
    """
    a = cv2.resize(frame_a, resize_to)
    b = cv2.resize(frame_b, resize_to)
    a_gray = cv2.cvtColor(a, cv2.COLOR_BGR2GRAY).astype(np.float32)
    b_gray = cv2.cvtColor(b, cv2.COLOR_BGR2GRAY).astype(np.float32)
    mse = np.mean((a_gray - b_gray) ** 2)
    return mse


def extract_frames(video_path, output_dir, fps=1, prefix="frame",
                   dedup=False, dedup_threshold=5.0):
    """
    从视频中提取帧图片。

    Args:
        video_path: 输入视频文件路径
        output_dir: 输出帧图片目录
        fps: 每秒提取帧数（默认1帧/秒）
        prefix: 帧文件名前缀
        dedup: 是否启用帧间去重
        dedup_threshold: 去重阈值（MSE < 阈值视为重复，默认5.0）
    """
    video_path = Path(video_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise RuntimeError(f"无法打开视频文件: {video_path}")

    video_fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = total_frames / video_fps if video_fps > 0 else 0

    frame_interval = int(video_fps / fps)
    if frame_interval < 1:
        frame_interval = 1

    extracted = 0
    skipped = 0
    frame_idx = 0
    saved_idx = 1
    last_saved_frame = None

    print(f"视频信息: {video_path.name}")
    print(f"  总帧数: {total_frames}, 帧率: {video_fps:.2f}fps, 时长: {duration:.1f}s")
    print(f"  提取间隔: 每 {frame_interval} 帧取 1 帧 (目标 {fps}fps)")
    print(f"  去重模式: {'开启 (阈值 %.1f)' % dedup_threshold if dedup else '关闭'}")
    print(f"  输出目录: {output_dir}")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_idx % frame_interval == 0:
            should_save = True
            if dedup and last_saved_frame is not None:
                diff = compute_frame_diff(last_saved_frame, frame)
                if diff < dedup_threshold:
                    should_save = False
                    skipped += 1

            if should_save:
                filename = f"{prefix}_{saved_idx:04d}.jpg"
                filepath = output_dir / filename
                cv2.imwrite(str(filepath), frame)
                last_saved_frame = frame
                extracted += 1
                saved_idx += 1

                if extracted % 50 == 0:
                    print(f"  已提取 {extracted} 帧...")
            elif skipped % 50 == 0 and skipped > 0:
                print(f"  已跳过 {skipped} 张重复帧...")

        frame_idx += 1

    cap.release()
    print(f"\n提取完成: 共 {extracted} 帧图片 -> {output_dir}")
    if dedup:
        print(f"  去重跳过: {skipped} 张重复帧")
    return extracted


def main():
    parser = argparse.ArgumentParser(description="视频分帧提取工具（支持智能去重）")
    parser.add_argument("-i", "--input", required=True, help="输入视频文件路径")
    parser.add_argument("-o", "--output", required=True, help="输出帧图片目录")
    parser.add_argument("--fps", type=float, default=1.0, help="每秒提取帧数 (默认: 1)")
    parser.add_argument("--prefix", default="frame", help="帧文件名前缀 (默认: frame)")
    parser.add_argument("--dedup", action="store_true", help="启用帧间去重")
    parser.add_argument("--dedup-threshold", type=float, default=5.0,
                        help="去重阈值，MSE 低于此值视为重复 (默认: 5.0)")
    args = parser.parse_args()

    extract_frames(args.input, args.output, fps=args.fps, prefix=args.prefix,
                   dedup=args.dedup, dedup_threshold=args.dedup_threshold)


if __name__ == "__main__":
    main()
