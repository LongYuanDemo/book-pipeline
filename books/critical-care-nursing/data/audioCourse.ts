import type { VisualSequenceLesson } from '../../../src/types/audio';

const MERMAID_CONFIG = `%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\n`;

const CLASS_DEFS = `\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`;

function m(content: string): string {
  return MERMAID_CONFIG + content + CLASS_DEFS;
}

export const audioCourseLessons: VisualSequenceLesson[] = [
  {
    id: 'audio-l1',
    title: '第一章 急危重症护理学基础知识',
    moduleTitle: '模块一：第一章 急危重症护理学基础知识',
    durationSeconds: 1003,
    audioUrl: '/audio/audio-l1.mp3',
    visualSequence: {
      audioUrl: '/audio/audio-l1.mp3',
      dialog: { id: 'audio-l1' },
      frames: [
        {
          start: 0,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n\n class A new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 28,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["急危重症护理学概况"]\n T0 -->|"定义"| N0["学科定义"]\n\n class T0 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 89,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["急危重症护理学概况"]\n T0 -->|"定义"| N0["学科定义"]\n N0 -->|"包含"| N1["核心任务范畴"]\n\n class T0 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 150,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["急危重症护理学概况"]\n T0 -->|"定义"| N0["学科定义"]\n N0 -->|"包含"| N1["核心任务范畴"]\n N1 -->|"展开"| N2["学科发展历程"]\n\n class T0 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 240,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["急救医疗服务体系"]\n T1 -->|"分类"| N0["EMSS构成"]\n\n class T1 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 302,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["急救医疗服务体系"]\n T1 -->|"分类"| N0["EMSS构成"]\n N0 -->|"展开"| N1["体系运转机制"]\n\n class T1 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 371,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["急救医疗服务体系"]\n T1 -->|"分类"| N0["EMSS构成"]\n N0 -->|"展开"| N1["体系运转机制"]\n N1 -->|"说明"| N2["资源衔接要求"]\n\n class T1 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 451,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["院前急救"]\n T2 -->|"步骤"| N0["急救响应流程"]\n\n class T2 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 511,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["院前急救"]\n T2 -->|"步骤"| N0["急救响应流程"]\n N0 -->|"包含"| N1["现场处置原则"]\n\n class T2 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 582,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["院前急救"]\n T2 -->|"步骤"| N0["急救响应流程"]\n N0 -->|"包含"| N1["现场处置原则"]\n N1 -->|"展开"| N2["转运安全要点"]\n\n class T2 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 663,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["急诊科救护"]\n T3 -->|"分类"| N0["分诊分级标准"]\n\n class T3 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 722,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["急诊科救护"]\n T3 -->|"分类"| N0["分诊分级标准"]\n N0 -->|"步骤"| N1["急诊抢救流程"]\n\n class T3 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 782,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["急诊科救护"]\n T3 -->|"分类"| N0["分诊分级标准"]\n N0 -->|"步骤"| N1["急诊抢救流程"]\n N1 -->|"展开"| N2["绿色通道管理"]\n\n class T3 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 843,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T4["重症监护"]\n T4 -->|"包含"| N0["ICU收治范围"]\n\n class T4 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 882,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T4["重症监护"]\n T4 -->|"包含"| N0["ICU收治范围"]\n N0 -->|"展开"| N1["器官功能监测"]\n\n class T4 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 922,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T4["重症监护"]\n T4 -->|"包含"| N0["ICU收治范围"]\n N0 -->|"展开"| N1["器官功能监测"]\n N1 -->|"说明"| N2["重症护理要点"]\n\n class T4 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 962,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T5["章节内容总结"]\n T5 -->|"总结"| N0["模块核心框架"]\n\n class T5 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 982,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T5["章节内容总结"]\n T5 -->|"总结"| N0["模块核心框架"]\n N0 -->|"梳理"| N1["环节衔接逻辑"]\n\n class T5 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 996.96,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识 · 要点回顾"]\n A -->|"1"| S0["急救医疗服务体系构成"]\n S0 -->|"2"| S1["院前急救处置原则"]\n S1 -->|"3"| S2["急诊分诊分级标准"]\n S2 -->|"4"| S3["重症监护核心要点"]\n\n class A new\n class S0 new\n class S1 new\n class S2 new\n class S3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        }
      ],
    },
  },
  {
    id: 'audio-l2',
    title: '第二章 常用救护技术',
    moduleTitle: '模块二：第二章 常用救护技术',
    durationSeconds: 1166,
    audioUrl: '/audio/audio-l2.mp3',
    visualSequence: {
      audioUrl: '/audio/audio-l2.mp3',
      dialog: { id: 'audio-l2' },
      frames: [
        {
          start: 0,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n\n class A new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 32,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常用救护技术概述"]\n T0 -->|"定义"| N0["救护技术适用场景"]\n\n class T0 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 105,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常用救护技术概述"]\n T0 -->|"定义"| N0["救护技术适用场景"]\n N0 -->|"展开"| N1["救护技术学习目标"]\n\n class T0 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 245,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["基础生命支持类技术"]\n T1 -->|"包含"| N0["心肺脑复苏术"]\n\n class T1 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 315,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["基础生命支持类技术"]\n T1 -->|"包含"| N0["心肺脑复苏术"]\n N0 -->|"包含"| N1["通畅气道术"]\n\n class T1 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 385,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["基础生命支持类技术"]\n T1 -->|"包含"| N0["心肺脑复苏术"]\n N0 -->|"包含"| N1["通畅气道术"]\n N1 -->|"包含"| N2["呼吸支持技术"]\n\n class T1 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 525,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["创伤与救治类技术"]\n T2 -->|"包含"| N0["创伤急救技术"]\n\n class T2 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 595,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["创伤与救治类技术"]\n T2 -->|"包含"| N0["创伤急救技术"]\n N0 -->|"包含"| N1["洗胃术"]\n\n class T2 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 769,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["重症监护类技术"]\n T3 -->|"展开"| N0["重症监护技术分类"]\n\n class T3 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 839,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["重症监护类技术"]\n T3 -->|"展开"| N0["重症监护技术分类"]\n N0 -->|"展开"| N1["监护技术应用要点"]\n\n class T3 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 991,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T4["本章内容总结回顾"]\n T4 -->|"步骤"| N0["技术类别梳理"]\n\n class T4 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 1061,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T4["本章内容总结回顾"]\n T4 -->|"步骤"| N0["技术类别梳理"]\n N0 -->|"步骤"| N1["操作核心要点"]\n\n class T4 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 1166.06,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术 · 要点回顾"]\n A -->|"1"| S0["心肺脑复苏术"]\n S0 -->|"2"| S1["通畅气道术"]\n S1 -->|"3"| S2["创伤急救技术"]\n S2 -->|"4"| S3["洗胃术"]\n S3 -->|"5"| S4["重症监护技术"]\n\n class A new\n class S0 new\n class S1 new\n class S2 new\n class S3 new\n class S4 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        }
      ],
    },
  },
  {
    id: 'audio-l3',
    title: '第三章 常见急危重症患者的救护',
    moduleTitle: '模块三：第三章 常见急危重症患者的救护',
    durationSeconds: 697,
    audioUrl: '/audio/audio-l3.mp3',
    visualSequence: {
      audioUrl: '/audio/audio-l3.mp3',
      dialog: { id: 'audio-l3' },
      frames: [
        {
          start: 0,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n\n class A new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 35,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["急性中毒患者救护"]\n T0 -->|"包含"| N0["中毒诊断要点"]\n\n class T0 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 85,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["急性中毒患者救护"]\n T0 -->|"包含"| N0["中毒诊断要点"]\n N0 -->|"展开"| N1["清除毒物方法"]\n\n class T0 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 139,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["急性中毒患者救护"]\n T0 -->|"包含"| N0["中毒诊断要点"]\n N0 -->|"展开"| N1["清除毒物方法"]\n N1 -->|"补充"| N2["特效解毒剂应用"]\n\n class T0 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 230,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["环境理化损伤救护"]\n T1 -->|"步骤"| N0["中暑急救流程"]\n\n class T1 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 286,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["环境理化损伤救护"]\n T1 -->|"步骤"| N0["中暑急救流程"]\n N0 -->|"分类"| N1["淹溺施救要点"]\n\n class T1 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 342,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["环境理化损伤救护"]\n T1 -->|"步骤"| N0["中暑急救流程"]\n N0 -->|"分类"| N1["淹溺施救要点"]\n N1 -->|"补充"| N2["烧烫伤处置原则"]\n\n class T1 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 439,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["常见急症患者救护"]\n T2 -->|"包含"| N0["急腹症识别要点"]\n\n class T2 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 495,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["常见急症患者救护"]\n T2 -->|"包含"| N0["急腹症识别要点"]\n N0 -->|"展开"| N1["脑卒中急救要点"]\n\n class T2 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 550,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["常见急症患者救护"]\n T2 -->|"包含"| N0["急腹症识别要点"]\n N0 -->|"展开"| N1["脑卒中急救要点"]\n N1 -->|"补充"| N2["急性胸痛处置流程"]\n\n class T2 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 620,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["急危重症救护总结"]\n T3 -->|"总结"| N0["施救核心原则"]\n\n class T3 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 656,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["急危重症救护总结"]\n T3 -->|"总结"| N0["施救核心原则"]\n N0 -->|"补充"| N1["风险预防要点"]\n\n class T3 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 690.36,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护 · 要点回顾"]\n A -->|"1"| S0["急性中毒急救要点"]\n S0 -->|"2"| S1["环境损伤处置流程"]\n S1 -->|"3"| S2["常见急症识别施救"]\n S2 -->|"4"| S3["急危重症救护原则"]\n\n class A new\n class S0 new\n class S1 new\n class S2 new\n class S3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        }
      ],
    },
  },
  {
    id: 'audio-l4',
    title: '第四章 灾害事故的现场救护',
    moduleTitle: '模块四：第四章 灾害事故的现场救护',
    durationSeconds: 1098,
    audioUrl: '/audio/audio-l4.mp3',
    visualSequence: {
      audioUrl: '/audio/audio-l4.mp3',
      dialog: { id: 'audio-l4' },
      frames: [
        {
          start: 0,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n\n class A new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 32,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["灾害事故现场救护概述"]\n T0 -->|"定义"| N0["灾害救护核心目标"]\n\n class T0 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 120,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["灾害事故现场救护概述"]\n T0 -->|"定义"| N0["灾害救护核心目标"]\n N0 -->|"包含"| N1["现场救护基本原则"]\n\n class T0 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 209,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["灾害事故现场救护概述"]\n T0 -->|"定义"| N0["灾害救护核心目标"]\n N0 -->|"包含"| N1["现场救护基本原则"]\n N1 -->|"展开"| N2["救护人员能力要求"]\n\n class T0 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 340,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["灾害现场检伤分类"]\n T1 -->|"分类"| N0["检伤分类优先级"]\n\n class T1 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 428,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["灾害现场检伤分类"]\n T1 -->|"分类"| N0["检伤分类优先级"]\n N0 -->|"展开"| N1["四类伤情标识规范"]\n\n class T1 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 516,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["灾害现场检伤分类"]\n T1 -->|"分类"| N0["检伤分类优先级"]\n N0 -->|"展开"| N1["四类伤情标识规范"]\n N1 -->|"步骤"| N2["现场检伤操作流程"]\n\n class T1 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 648,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["常见灾害现场救护要点"]\n T2 -->|"举例"| N0["地震创伤救护要点"]\n\n class T2 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 746,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["常见灾害现场救护要点"]\n T2 -->|"举例"| N0["地震创伤救护要点"]\n N0 -->|"展开"| N1["火灾灼伤处置规范"]\n\n class T2 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 846,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["常见灾害现场救护要点"]\n T2 -->|"举例"| N0["地震创伤救护要点"]\n N0 -->|"展开"| N1["火灾灼伤处置规范"]\n N1 -->|"举例"| N2["洪涝淹溺急救流程"]\n\n class T2 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 955,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["灾害救护内容总结"]\n T3 -->|"总结"| N0["核心救护逻辑梳理"]\n\n class T3 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 1021,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["灾害救护内容总结"]\n T3 -->|"总结"| N0["核心救护逻辑梳理"]\n N0 -->|"补充"| N1["常见操作误区提示"]\n\n class T3 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 1093.12,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护 · 要点回顾"]\n A -->|"1"| S0["灾害现场救护基本原则"]\n S0 -->|"2"| S1["检伤分类优先级划分"]\n S1 -->|"3"| S2["常见灾害伤情处置要点"]\n\n class A new\n class S0 new\n class S1 new\n class S2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        }
      ],
    },
  }
];
