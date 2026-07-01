#!/usr/bin/env python3
"""
AI 动作描述生成器
基于骨架关键点数据，调用大模型 API 生成自然语言动作描述。
支持 OpenAI、Anthropic 等主流模型。
"""

import os
import json
import argparse
from pathlib import Path


def build_prompt(frame_data):
    """将骨架数据构建成适合大模型理解的 Prompt。"""
    angles = frame_data.get("angles", {})
    angle_lines = []
    for k, v in angles.items():
        if v is not None:
            cn_name = {
                "left_elbow": "左肘", "right_elbow": "右肘",
                "left_shoulder": "左肩", "right_shoulder": "右肩",
                "left_hip": "左髋", "right_hip": "右髋",
                "left_knee": "左膝", "right_knee": "右膝",
                "left_armpit": "左腋下", "right_armpit": "右腋下"
            }.get(k, k)
            angle_lines.append(f"  {cn_name}: {v}°")

    prompt = f"""你是一位专业的舞蹈/体育动作分析师。请根据以下人体骨架关键点数据，用1-2句话精准描述当前的动作姿态。要求：使用专业术语，语言简洁，适合教学使用。

身体状态：
- 身体朝向: {frame_data.get('body_facing', '未知')}
- 左臂位置: {frame_data.get('left_arm_position', '未知')}
- 右臂位置: {frame_data.get('right_arm_position', '未知')}
- 左腿状态: {frame_data.get('left_leg_state', '未知')}
- 右腿状态: {frame_data.get('right_leg_state', '未知')}

关节角度：
{chr(10).join(angle_lines) if angle_lines else '  （无有效角度数据）'}

请直接输出描述文本，不要加任何前缀或解释。"""
    return prompt


def call_openai(prompt, model="gpt-4o-mini"):
    """调用 OpenAI API 生成描述。"""
    import openai
    client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    resp = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "你是一位专业的舞蹈/体育动作分析师，擅长用简洁专业的语言描述人体动作姿态。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
        max_tokens=120
    )
    return resp.choices[0].message.content.strip()


def call_anthropic(prompt, model="claude-3-5-sonnet-20241022"):
    """调用 Anthropic API 生成描述。"""
    import anthropic
    client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
    resp = client.messages.create(
        model=model,
        max_tokens=120,
        temperature=0.3,
        system="你是一位专业的舞蹈/体育动作分析师，擅长用简洁专业的语言描述人体动作姿态。",
        messages=[{"role": "user", "content": prompt}]
    )
    return resp.content[0].text.strip()


def generate_description(frame_data, provider="openai", model=None):
    """为单帧数据生成 AI 描述。"""
    prompt = build_prompt(frame_data)

    if provider == "openai":
        m = model or "gpt-4o-mini"
        return call_openai(prompt, m)
    elif provider == "anthropic":
        m = model or "claude-3-5-sonnet-20241022"
        return call_anthropic(prompt, m)
    else:
        raise ValueError(f"不支持的 provider: {provider}")


def batch_generate(pose_json_path, output_path, provider="openai", model=None):
    """批量为 pose_keypoints.json 中的检测成功帧生成描述。"""
    with open(pose_json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    frames = data.get("frames", [])
    descriptions = {}

    detected_frames = [f for f in frames if f.get("detected")]
    print(f"共 {len(detected_frames)} 帧需要生成描述 (provider={provider})")

    for i, frame in enumerate(detected_frames):
        frame_num = frame["frame_number"]
        try:
            desc = generate_description(frame, provider=provider, model=model)
            descriptions[str(frame_num)] = desc
            print(f"  [{i+1}/{len(detected_frames)}] frame_{frame_num:04d}: {desc[:40]}...")
        except Exception as e:
            print(f"  [{i+1}/{len(detected_frames)}] frame_{frame_num:04d}: 错误 - {e}")
            descriptions[str(frame_num)] = "（描述生成失败）"

    output = {
        "provider": provider,
        "model": model,
        "video_source": data.get("video_source"),
        "descriptions": descriptions
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n描述数据已保存: {output_path}")
    return descriptions


def main():
    parser = argparse.ArgumentParser(description="AI 动作描述生成器")
    parser.add_argument("-i", "--input", required=True, help="输入 pose_keypoints.json 路径")
    parser.add_argument("-o", "--output", required=True, help="输出 descriptions.json 路径")
    parser.add_argument("--provider", default="openai", choices=["openai", "anthropic"],
                        help="模型提供商 (默认: openai)")
    parser.add_argument("--model", default=None, help="模型名称 (如 gpt-4o, claude-3-5-sonnet)")
    args = parser.parse_args()

    batch_generate(args.input, args.output, provider=args.provider, model=args.model)


if __name__ == "__main__":
    main()
