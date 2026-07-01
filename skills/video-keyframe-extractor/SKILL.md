---
name: video-keyframe-extractor
description: Extract human pose keypoints from video frames using YOLOv8-Pose, segment actions based on joint angle changes, generate structured Markdown tutorial documents with deduplication and optional AI-enhanced descriptions. Use when the user needs to (1) extract keyframes from a video, (2) analyze human body posture or movements from video frames, (3) generate action segmentation or motion breakdown reports, (4) process dance, sports, or fitness videos for pose analysis, (5) create instructional documentation or image-text tutorials from video demonstrations, or (6) deduplicate repetitive video frames.
---

# Video Keyframe Extractor

基于 YOLOv8-Pose 的视频关键帧提取与动作拆解工具。输入视频文件，自动完成分帧、姿态提取、动作分段、代表帧精选，输出结构化的 Markdown 图文教程文档。

## 依赖

运行前确保已安装：

```bash
pip install ultralytics opencv-python numpy
```

首次运行会自动下载 `yolov8n-pose.pt` 模型（约 6MB）。

如需使用 AI 描述功能，还需：

```bash
pip install openai anthropic
```

并设置环境变量：

```bash
export OPENAI_API_KEY="your-key"      # 如果使用 OpenAI
export ANTHROPIC_API_KEY="your-key"   # 如果使用 Anthropic
```

## 工作流程

### 方式一：一键流水线（推荐）

使用 `pipeline.py` 一次完成全部分析：

```bash
# 基础模式（去重 + 规则描述）
python scripts/pipeline.py -i input.mp4 -o ./output --dedup

# AI 增强模式（去重 + AI 描述 + 图文教程）
python scripts/pipeline.py -i input.mp4 -o ./output --dedup --use-ai --ai-provider openai
```

可选参数：
- `--fps 2`：每秒提取 2 帧（默认 1）
- `--model yolov8m-pose.pt`：使用更大的模型提升精度
- `--threshold 15`：动作分段角度阈值（默认 20）
- `--window 5`：动作分段最小窗口（默认 3）
- `--dedup`：启用智能帧间去重
- `--dedup-threshold 5.0`：去重像素差异阈值
- `--use-ai`：启用 AI 描述生成
- `--ai-provider openai`：AI 提供商（openai / anthropic）
- `--ai-model gpt-4o`：指定模型名称

### 方式二：分步执行

当需要单独控制某一步时使用：

**Step 1: 视频分帧（支持去重）**

```bash
python scripts/extract_frames.py -i input.mp4 -o ./output/frames --fps 1 --dedup
```

**Step 2: 姿态关键点提取**

```bash
python scripts/pose_extract.py -i ./output/frames -o ./output --model yolov8n-pose.pt --video-source input.mp4
```

**Step 3 (可选): AI 动作描述生成**

```bash
python scripts/ai_describer.py -i ./output/pose_keypoints.json -o ./output/descriptions.json --provider openai
```

**Step 4: 生成图文教程**

```bash
# 规则描述版
python scripts/generate_breakdown.py -i ./output/pose_keypoints.json -o ./output/breakdown.md --frames-dir frames

# AI 增强版
python scripts/generate_breakdown.py -i ./output/pose_keypoints.json -o ./output/breakdown.md \
  --frames-dir frames --ai-descriptions ./output/descriptions.json
```

## 输出说明

流水线完成后，输出目录包含：

| 文件/目录 | 说明 |
|-----------|------|
| `frames/` | 提取的帧图片（JPG，已去重） |
| `pose_keypoints.json` | 每帧 17 个 COCO 关键点坐标、置信度、关节角度 |
| `pose_summary.json` | 姿态摘要（朝向、手臂位置、腿部状态） |
| `descriptions.json` | AI 生成的自然语言动作描述（仅启用 `--use-ai` 时） |
| `breakdown.md` | 图文教程文档（步骤化拆解 + 代表帧 + 动作描述） |

## 核心特性

### 1. 智能帧间去重

`extract_frames.py` 支持 `--dedup` 模式，基于像素级 MSE 差异检测连续相似帧，避免输出大量重复图片。适用于：
- 视频中有长时间静止或缓慢变化镜头
- 需要精简数据集，减少后续处理量

### 2. 动作分段与代表帧精选

`generate_breakdown.py` 基于关节角度变化自动划分动作段，并从每段中精选 1-2 张最具代表性的教学帧：
- **短片段**（< 1.5秒）：精选 1 张（姿态最明确的帧）
- **长片段**：精选 2 张（起始代表帧 + 结束代表帧），展示动作转换

### 3. AI 动作描述增强

`ai_describer.py` 调用大模型 API（OpenAI / Anthropic），基于骨架关键点数据生成专业的自然语言动作描述。在图文教程中优先展示 AI 描述，规则描述作为兜底。

### 4. 图文教程化输出

生成的 `breakdown.md` 采用教程风格编排：
- 步骤总览表
- 分步详细教学（每一步配关键画面 + 姿态描述 + 关节角度）
- 练习提示

## 脚本说明

### scripts/extract_frames.py
使用 OpenCV 从视频中按指定帧率提取帧图片。支持 `.mp4`、`.avi`、`.mov` 等格式。`--dedup` 基于 resize 后的灰度图 MSE 去重。

### scripts/pose_extract.py
使用 YOLOv8-Pose 对每帧图片提取 17 个 COCO 身体关键点，计算 10 组关节角度，判定身体朝向、手臂位置、腿部状态。

### scripts/ai_describer.py
调用 LLM API 为每帧检测成功帧生成专业动作描述。支持 OpenAI（gpt-4o-mini 等）和 Anthropic（claude-3-5-sonnet 等）。

### scripts/generate_breakdown.py
基于关键点 JSON 进行动作分段，精选代表帧，生成图文教程 Markdown。支持 `--ai-descriptions` 加载 AI 描述增强输出。

### scripts/pipeline.py
串联上述脚本的流水线入口，自动传递参数和目录路径。

## 关键参数建议

| 参数 | 默认值 | 适用场景 |
|------|--------|----------|
| `--fps 1` | 1帧/秒 | 舞蹈、慢动作教学 |
| `--fps 5` | — | 快速运动、体育分析 |
| `--threshold 20` | 20度 | 一般动作分段 |
| `--threshold 10` | — | 精细动作、慢速变化 |
| `--model yolov8n-pose` | nano | 速度优先 |
| `--model yolov8m-pose` | — | 精度优先 |
| `--dedup` | 关闭 | 视频中有大量重复/静止帧时开启 |
| `--use-ai` | 关闭 | 需要专业自然语言描述时开启 |

## 前端集成 Pipeline

关键帧提取只是第一步。完整管线从视频到前端展示需要以下步骤：

### 完整流程

```
视频 MP4 → pipeline.py 分帧+姿态提取 → 人工筛选代表帧 → 编写步骤拆解 → 生成 video.ts → 部署素材到 public/ → 前端展示
```

### Step 1: 自动分帧 + 姿态提取

```bash
python scripts/pipeline.py -i "input.mp4" -o "./output/视频名" --dedup --fps 1
```

输出：`output/视频名/frames/` 包含去重后的帧图片

### Step 2: 人工筛选代表帧

从 `frames/` 中为每个步骤选 1 张代表帧：
- 选择动作清晰、画面稳定的帧
- 按步骤顺序命名：`step01_xxx.jpg`, `step02_xxx.jpg`
- 第一帧作为缩略图：`thumbnail.jpg`

### Step 3: 编写步骤拆解

参考静态页面或教材内容，人工编写每个视频的步骤拆解：

```typescript
{
  id: 'v1',
  title: '视频标题',
  subtitle: '描述',
  videoUrl: '/videos/视频文件名.mp4',
  thumbnailUrl: '/video-frames/v1/thumbnail.jpg',
  duration: '12:30',
  difficulty: '中等',
  module: '模块X · 技法类',
  steps: [
    { id: 's1', title: '步骤名', timestamp: '00:00', imageUrl: '/video-frames/v1/step01.jpg', description: '描述', tips: '提示' },
    ...
  ],
}
```

### Step 4: 部署素材

```bash
# 视频文件软链接到 public/videos/
ln -s "源视频路径" public/videos/视频文件名.mp4

# 关键帧图片复制到 public/video-frames/{videoId}/
cp output/视频名/frames/selected_*.jpg public/video-frames/v1/
```

### Step 5: 更新 video.ts

将步骤拆解数据写入 `books/{bookId}/data/video.ts`，更新 `videoList` 数组。

### Step 6: 前端验证

- 启动 dev server
- 打开视频清单页面，验证视频卡片列表
- 点击进入详情页，验证视频播放 + 步骤导航 + 关键帧图片

## 技能实训视频特殊说明

### YOLOv8-Pose 对技能实训视频的局限性

YOLOv8-Pose 主要检测人体姿态，对技能实训视频存在以下局限：
- **步骤划分粗**：技能动作变化不如运动剧烈，关节角度变化小，自动分段往往只分出2-3步
- **无法识别工具/原料状态**：无法判断温度、成熟度、材质变化等关键信息
- **无法识别精细操作**：手部精细动作检测精度有限

### 推荐工作方式

1. **自动分帧**：用 pipeline.py 自动提取去重帧（这一步价值最大）
2. **人工选帧**：从提取的帧中人工筛选代表帧
3. **人工编写步骤**：参考教材或静态页面编写步骤拆解
4. **AI 辅助描述**：可用 `--use-ai` 生成姿态描述作为参考，但最终内容需人工校对

### 批量处理多个视频

```bash
# 批量处理目录下所有视频
for video in videos/*.mp4; do
  name=$(basename "$video" .mp4)
  python scripts/pipeline.py -i "$video" -o "output/$name" --dedup --fps 1 &
done
wait
echo "所有视频处理完成"
```
