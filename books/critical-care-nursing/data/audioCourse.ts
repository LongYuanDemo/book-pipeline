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
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["急危重症护理学概况"]\n T0 -->|"定义"| N0["急危重症定义"]\n\n class T0 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 102,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["急危重症护理学概况"]\n T0 -->|"定义"| N0["急危重症定义"]\n N0 -->|"展开"| N1["学科核心目标"]\n\n class T0 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 222,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["急救医疗服务体系"]\n T1 -->|"包含"| N0["EMSS体系构成"]\n\n class T1 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 291,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["急救医疗服务体系"]\n T1 -->|"包含"| N0["EMSS体系构成"]\n N0 -->|"功能"| N1["EMSS运行机制"]\n\n class T1 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 402,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart LR\n T2["院前急救模块"]\n T2 -->|"步骤"| N0["现场伤情评估"]\n\n class T2 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 462,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart LR\n T2["院前急救模块"]\n T2 -->|"步骤"| N0["现场伤情评估"]\n N0 -->|"步骤"| N1["急救医疗调度"]\n\n class T2 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 522,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart LR\n T2["院前急救模块"]\n T2 -->|"步骤"| N0["现场伤情评估"]\n N0 -->|"步骤"| N1["急救医疗调度"]\n N1 -->|"步骤"| N2["现场紧急处置"]\n\n class T2 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 572,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart LR\n T2["院前急救模块"]\n T2 -->|"步骤"| N0["现场伤情评估"]\n N0 -->|"步骤"| N1["急救医疗调度"]\n N1 -->|"步骤"| N2["现场紧急处置"]\n N2 -->|"步骤"| N3["安全转运护送"]\n\n class T2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 671,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["急诊科救护模块"]\n T3 -->|"分类"| N0["急诊分诊分级"]\n\n class T3 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 732,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["急诊科救护模块"]\n T3 -->|"分类"| N0["急诊分诊分级"]\n N0 -->|"展开"| N1["急诊抢救流程"]\n\n class T3 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 823,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T4["重症监护模块"]\n T4 -->|"分类"| N0["ICU收治范围"]\n\n class T4 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 882,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T4["重症监护模块"]\n T4 -->|"分类"| N0["ICU收治范围"]\n N0 -->|"展开"| N1["重症监测技术"]\n\n class T4 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 953,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T5["本章知识点总结"]\n T5 -->|"包含"| N0["EMSS全链条构成"]\n\n class T5 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 972,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T5["本章知识点总结"]\n T5 -->|"包含"| N0["EMSS全链条构成"]\n N0 -->|"总结"| N1["各环节核心任务"]\n\n class T5 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 996.96,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识 · 要点回顾"]\n A -->|"1"| S0["急救医疗服务体系EMSS由院前急救、急诊科、ICU构成"]\n S0 -->|"2"| S1["院前急救核心为现场处置+安全转运"]\n S1 -->|"3"| S2["急危重症护理覆盖急救全流程多环节核心工作"]\n\n class A new\n class S0 new\n class S1 new\n class S2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
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
          start: 59,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常用救护技术模块概述"]\n T0 -->|"包含"| N0["心肺脑复苏术"]\n\n class T0 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 117,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常用救护技术模块概述"]\n T0 -->|"包含"| N0["心肺脑复苏术"]\n N0 -->|"包含"| N1["通畅气道术"]\n\n class T0 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 176,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常用救护技术模块概述"]\n T0 -->|"包含"| N0["心肺脑复苏术"]\n N0 -->|"包含"| N1["通畅气道术"]\n N1 -->|"包含"| N2["创伤急救技术"]\n\n class T0 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 234,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常用救护技术模块概述"]\n T0 -->|"包含"| N0["心肺脑复苏术"]\n N0 -->|"包含"| N1["通畅气道术"]\n N1 -->|"包含"| N2["创伤急救技术"]\n N2 -->|"包含"| N3["呼吸支持技术"]\n\n class T0 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 292,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常用救护技术模块概述"]\n T0 -->|"包含"| N0["心肺脑复苏术"]\n N0 -->|"包含"| N1["通畅气道术"]\n N1 -->|"包含"| N2["创伤急救技术"]\n N2 -->|"包含"| N3["呼吸支持技术"]\n N3 -->|"包含"| N4["洗胃术"]\n\n class T0 new\n class N4 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 350,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常用救护技术模块概述"]\n T0 -->|"包含"| N0["心肺脑复苏术"]\n N0 -->|"包含"| N1["通畅气道术"]\n N1 -->|"包含"| N2["创伤急救技术"]\n N2 -->|"包含"| N3["呼吸支持技术"]\n N3 -->|"包含"| N4["洗胃术"]\n N4 -->|"包含"| N5["重症监护技术"]\n\n class T0 new\n class N5 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 466,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["常用救护技术分类"]\n T1 -->|"分类"| N0["生命支持类技术"]\n\n class T1 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 559,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["常用救护技术分类"]\n T1 -->|"分类"| N0["生命支持类技术"]\n N0 -->|"分类"| N1["创伤处置类技术"]\n\n class T1 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 653,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["常用救护技术分类"]\n T1 -->|"分类"| N0["生命支持类技术"]\n N0 -->|"分类"| N1["创伤处置类技术"]\n N1 -->|"分类"| N2["重症监测类技术"]\n\n class T1 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 781,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart LR\n T2["救护技术应用流程"]\n T2 -->|"步骤"| N0["伤情快速评估"]\n\n class T2 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 862,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart LR\n T2["救护技术应用流程"]\n T2 -->|"步骤"| N0["伤情快速评估"]\n N0 -->|"步骤"| N1["对症技术选择"]\n\n class T2 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 945,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart LR\n T2["救护技术应用流程"]\n T2 -->|"步骤"| N0["伤情快速评估"]\n N0 -->|"步骤"| N1["对症技术选择"]\n N1 -->|"步骤"| N2["规范操作实施"]\n\n class T2 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 1026,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart LR\n T2["救护技术应用流程"]\n T2 -->|"步骤"| N0["伤情快速评估"]\n N0 -->|"步骤"| N1["对症技术选择"]\n N1 -->|"步骤"| N2["规范操作实施"]\n N2 -->|"步骤"| N3["效果动态评估"]\n\n class T2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 1084,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["模块内容总结回顾"]\n T3 -->|"回顾"| N0["核心技术类别"]\n\n class T3 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 1119,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["模块内容总结回顾"]\n T3 -->|"回顾"| N0["核心技术类别"]\n N0 -->|"回顾"| N1["操作应用逻辑"]\n\n class T3 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 1169.9,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术 · 要点回顾"]\n A -->|"1"| S0["常用救护技术包含6类核心操作"]\n S0 -->|"2"| S1["可按功能分为生命支持、创伤处置、重症监测三类"]\n S1 -->|"3"| S2["临床应用遵循评估-选择-实施-评估的流程"]\n\n class A new\n class S0 new\n class S1 new\n class S2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
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
          start: 71,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常见急危重症救护模块框架"]\n T0 -->|"包含"| N0["急性中毒救护"]\n\n class T0 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 208,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常见急危重症救护模块框架"]\n T0 -->|"包含"| N0["急性中毒救护"]\n N0 -->|"包含"| N1["环境理化损伤救护"]\n\n class T0 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 348,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["常见急危重症救护模块框架"]\n T0 -->|"包含"| N0["急性中毒救护"]\n N0 -->|"包含"| N1["环境理化损伤救护"]\n N1 -->|"包含"| N2["常见急症救护"]\n\n class T0 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 453,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["各类急危重症救护核心要点"]\n T1 -->|"展开"| N0["中毒急救原则"]\n\n class T1 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 523,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["各类急危重症救护核心要点"]\n T1 -->|"展开"| N0["中毒急救原则"]\n N0 -->|"展开"| N1["理化损伤处置要点"]\n\n class T1 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 593,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["各类急危重症救护核心要点"]\n T1 -->|"展开"| N0["中毒急救原则"]\n N0 -->|"展开"| N1["理化损伤处置要点"]\n N1 -->|"展开"| N2["急症识别要点"]\n\n class T1 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 641,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["模块内容总结回顾"]\n T2 -->|"总结"| N0["救护核心框架"]\n\n class T2 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 669,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["模块内容总结回顾"]\n T2 -->|"总结"| N0["救护核心框架"]\n N0 -->|"总结"| N1["分类处置逻辑"]\n\n class T2 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 690.36,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护 · 要点回顾"]\n A -->|"1"| S0["常见急危重症救护包含3类核心任务"]\n S0 -->|"2"| S1["不同类型急危重症对应差异化处置要点"]\n S1 -->|"3"| S2["需掌握分类救护的核心逻辑与原则"]\n\n class A new\n class S0 new\n class S1 new\n class S2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
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
          start: 55,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["灾害事故现场救护概述"]\n T0 -->|"定义"| N0["灾害救护核心目标"]\n\n class T0 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 165,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T0["灾害事故现场救护概述"]\n T0 -->|"定义"| N0["灾害救护核心目标"]\n N0 -->|"展开"| N1["现场救护基本原则"]\n\n class T0 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 351,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["灾害现场检伤分类"]\n T1 -->|"定义"| N0["检伤分类目的"]\n\n class T1 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 439,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["灾害现场检伤分类"]\n T1 -->|"定义"| N0["检伤分类目的"]\n N0 -->|"分类"| N1["四色分级标准"]\n\n class T1 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 549,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T1["灾害现场检伤分类"]\n T1 -->|"定义"| N0["检伤分类目的"]\n N0 -->|"分类"| N1["四色分级标准"]\n N1 -->|"注意"| N2["检伤操作要点"]\n\n class T1 new\n class N2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 736,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["常见灾害现场救护要点"]\n T2 -->|"分类"| N0["自然灾害救护要点"]\n\n class T2 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 857,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T2["常见灾害现场救护要点"]\n T2 -->|"分类"| N0["自然灾害救护要点"]\n N0 -->|"分类"| N1["事故灾害救护要点"]\n\n class T2 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 999,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["本章内容总结回顾"]\n T3 -->|"包含"| N0["核心知识框架梳理"]\n\n class T3 new\n class N0 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 1043,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n T3["本章内容总结回顾"]\n T3 -->|"包含"| N0["核心知识框架梳理"]\n N0 -->|"注意"| N1["实操注意事项"]\n\n class T3 new\n class N1 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 1093.12,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护 · 要点回顾"]\n A -->|"1"| S0["灾害现场救护核心原则"]\n S0 -->|"2"| S1["四色检伤分类判定标准"]\n S1 -->|"3"| S2["不同类型灾害救护要点"]\n\n class A new\n class S0 new\n class S1 new\n class S2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        }
      ],
    },
  }
];
