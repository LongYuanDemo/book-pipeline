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
    durationSeconds: 350,
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
          start: 2,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> T0["急危重症护理学概况"]\n A --> T1["急救医疗服务体系"]\n A --> T2["院前急救"]\n A --> T3["急诊科救护"]\n A --> T4["重症监护"]\n\n class A new\n class T0 new\n class T1 new\n class T2 new\n class T3 new\n class T4 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 28,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["大家注意"]\n A --> N1["这里有一个非常关键的区分点"]\n A --> N2["所谓急危重症"]\n A --> N3["顾名思义"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 54,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["那么它涵盖的范围有多广呢"]\n A --> N1["我给大家举一个例子"]\n A --> N2["让大家更容易理解"]\n A --> N3["假设今天下午三点"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 79,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["但实际上"]\n A --> N1["这门学科的内涵远不止于此"]\n A --> N2["它还包含了大量的预防性护理"]\n A --> N3["如何预防长期卧床患者发生深静脉血栓"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 109,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["在这个体系中"]\n A --> N1["有一个至关重要的环节叫做“急救医疗调度”"]\n A --> N2["大家可能觉得没什么"]\n A --> N3["不就是接电话吗"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 135,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["一个高效的EMSS体系"]\n A --> N1["核心就是“空窗期”的最小化"]\n A --> N2["每一个环节的衔接越紧密"]\n A --> N3["中间没有浪费的地方"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 160,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["在这些极端环境下进行高难度的急救操作"]\n A --> N1["对护理人员的心理素质和动手能力要求极其高"]\n A --> N2["院前急救的原则可以用几个字来总结"]\n A --> N3["叫作“先救命后治病”"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 186,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["差距就是这么大"]\n A --> N1["这就说明"]\n A --> N2["院前急救不仅仅是急救医生的责任"]\n A --> N3["也是每一个人的公共卫生使命"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 213,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["院前急救的重要性"]\n A --> N1["不仅在于开始的处置"]\n A --> N2["更在于和下一环节的无缝衔接"]\n A --> N3["接下来我们进入第四个任务"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 238,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["急诊科救护不仅仅是对病情的判断"]\n A --> N1["还包括大量的急救操作和协调工作"]\n A --> N2["比如抢救室里突发心电风暴的患者"]\n A --> N3["需要马上进行电除颤"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 264,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["这一点是很多初学者容易忽略的"]\n A --> N1["大家一定要提前有心理准备"]\n A --> N2["现在我们讲最后一个任务"]\n A --> N3["重症监护"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 291,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["这种“诊断性”的护理能力"]\n A --> N1["在ICU里是必备的"]\n A --> N2["重症监护中最常见的操作是呼吸机管理"]\n A --> N3["呼吸机能够帮助重症患者维持足够的氧气供应"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 317,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["讲到这里"]\n A --> N1["五个任务都讲完了"]\n A --> N2["接下来我们进行一个知识串联与总结"]\n A --> N3["不知道大家有没有感觉到"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 342,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> N0["哪些环节是院前急救"]\n A --> N1["哪些环节是急诊科分诊"]\n A --> N2["哪些环节属于病房护士的观察预警"]\n A --> N3["标注完之后"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 347,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第一章 急危重症护理学基础知识"]\n A --> B["知识回顾"]\n A --> C["课后复习"]\n\n class B new\n class C new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
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
    durationSeconds: 413,
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
          start: 1,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> T0["心肺脑复苏术"]\n A --> T1["通畅气道术"]\n A --> T2["创伤急救技术"]\n A --> T3["呼吸支持技术"]\n A --> T4["洗胃术"]\n\n class A new\n class T0 new\n class T1 new\n class T2 new\n class T3 new\n class T4 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 27,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["因为大脑对缺氧的耐受度非常低"]\n A --> N1["如果缺血缺氧超过四到六分钟"]\n A --> N2["就会造成不可逆的损伤"]\n A --> N3["我们的急救不仅要“救心”"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 53,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["说到这里"]\n A --> N1["我们再来看看临床表现和诊断"]\n A --> N2["一个心搏骤停的患者"]\n A --> N3["通常表现为意识突然丧失"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 79,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["我们来详解“CABD”"]\n A --> N1["首先是C"]\n A --> N2["胸外心脏按压"]\n A --> N3["患者必须仰卧在硬板或地面上"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 104,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["自愿实施紧急救助行为造成受助人损害的"]\n A --> N1["救助人不承担民事责任"]\n A --> N2["这给大家见义勇为吃了一颗定心丸"]\n A --> N3["我们刚才讲了基础生命支持"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 129,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["掌握正确的气道通畅术"]\n A --> N1["对于挽救生命至关重要"]\n A --> N2["我们要能快速识别气道梗阻"]\n A --> N3["如果患者突然不能说话"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 154,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["口咽通气管适用于昏迷但有自主呼吸的患者"]\n A --> N1["可以防止舌后坠"]\n A --> N2["让气道保持通畅"]\n A --> N3["它的放置方法有一定的技巧"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 180,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["如果是动脉出血"]\n A --> N1["血液呈喷射状"]\n A --> N2["非常危险"]\n A --> N3["静脉出血则呈涌出状"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 206,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["螺旋形包扎法"]\n A --> N1["用于前臂"]\n A --> N2["上臂等粗细不均的部位"]\n A --> N3["还有“8”字形包扎法"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 233,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["搬运过程中要平稳"]\n A --> N1["密切观察伤员的病情变化"]\n A --> N2["创伤急救的四项基础技术"]\n A --> N3["每一个步骤都凝聚着无数前人的经验和教训"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 260,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["使用时要做到“快"]\n A --> N1["我们要谈到更高级的呼吸支持——呼吸机"]\n A --> N2["当患者病情严重"]\n A --> N3["需要进行长时间或精确控制的呼吸支持时"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 287,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["气道压力过低报警"]\n A --> N1["可能提示管道漏气"]\n A --> N2["脱管或者患者呼吸抑制"]\n A --> N3["呼吸支持技术"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 313,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["洗胃的方法有两种"]\n A --> N1["电动洗胃法和注射器洗胃法"]\n A --> N2["电动洗胃法是利用电动洗胃机"]\n A --> N3["通过负压吸引和正压冲洗"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 340,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["我们进入第六个任务"]\n A --> N1["常用的重症监护技术"]\n A --> N2["刚才我们所学的所有急救技术"]\n A --> N3["最终的目标都是将患者从生死线上拉回来"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 366,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["如果血氧饱和度持续下降"]\n A --> N1["说明呼吸或循环功能出现了问题"]\n A --> N2["需要及时处理"]\n A --> N3["对于危重患者"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 392,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> N0["在创伤急救中"]\n A --> N1["一个错误的搬运动作"]\n A --> N2["就可能让患者终身瘫痪"]\n A --> N3["我们的素质目标第一条"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 406.2,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第二章 常用救护技术"]\n A --> B["知识回顾"]\n A --> C["课后复习"]\n\n class B new\n class C new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
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
    durationSeconds: 242,
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
          start: 1,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> T0["急性中毒患者的救护"]\n A --> T1["环境及理化因素损伤患者的救护"]\n A --> T2["常见急症患者的救护"]\n\n class A new\n class T0 new\n class T1 new\n class T2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 26,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> N0["生活中毒可能源于误食"]\n A --> N1["用药过量"]\n A --> N2["甚至是自杀行为"]\n A --> N3["而职业中毒则与工作环境有关"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 51,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> N0["大家注意"]\n A --> N1["洗胃时用的液体很有讲究"]\n A --> N2["比如对硫磷中毒不能用高锰酸钾溶液"]\n A --> N3["因为它会把毒性更强的对氧磷氧化出来"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 77,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> N0["意识水平是判断中毒严重程度的金标准之一"]\n A --> N1["阿托品化与阿托品中毒的鉴别"]\n A --> N2["几乎是考试的必考点"]\n A --> N3["阿托品化表现为瞳孔较前扩大"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 104,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> N0["中毒的原因多种多样"]\n A --> N1["冬天在密闭的房间里烧煤取暖"]\n A --> N2["夏天在车里开着空调睡觉"]\n A --> N3["或者是在浴室里用燃气热水器洗澡"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 130,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> N0["重度中毒时"]\n A --> N1["浓度超过50%"]\n A --> N2["患者会深昏迷"]\n A --> N3["甚至引起迟发性脑病"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 156,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> N0["重症中暑"]\n A --> N1["特别是热射病"]\n A --> N2["是最凶险的"]\n A --> N3["它的特点是核心体温超过40摄氏度"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 183,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> N0["如果患者有活动性疼痛"]\n A --> N1["比如心绞痛"]\n A --> N2["可以舌下含服硝酸甘油"]\n A --> N3["但要注意"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 209,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> N0["无论是急性中毒"]\n A --> N1["环境损伤还是常见急症"]\n A --> N2["它们的核心都是威胁生命"]\n A --> N3["我们的救护思维一定是先救命再治伤"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 234,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> N0["我们今天学习的所有知识"]\n A --> N1["都是为了将来在某个紧急关头"]\n A --> N2["能够冷静"]\n A --> N3["精确地出手"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 239,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第三章 常见急危重症患者的救护"]\n A --> B["知识回顾"]\n A --> C["课后复习"]\n\n class B new\n class C new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
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
    durationSeconds: 387,
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
          start: 2,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> T0["概述"]\n A --> T1["灾害现场检伤分类"]\n A --> T2["常见灾害事故的现场救护"]\n\n class A new\n class T0 new\n class T1 new\n class T2 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 27,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["是先给那个腿骨折的打石膏"]\n A --> N1["还是先给那个胸部穿透伤的通气"]\n A --> N2["这就是灾害事故现场救护要解决的核心问题"]\n A --> N3["在资源极度有限"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 54,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["灾害的分类有很多种"]\n A --> N1["我们看原文"]\n A --> N2["可以按原因分"]\n A --> N3["分为自然灾害和人为灾害"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 81,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["第二个是艰难性"]\n A --> N1["大家想想"]\n A --> N2["灾区现场是什么样子的"]\n A --> N3["可能道路中断"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 106,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["防护包括三个层面"]\n A --> N1["第一个是免疫预防"]\n A --> N2["比如在出发前接种针对性的疫苗"]\n A --> N3["这是主动免疫"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 132,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["最后还强调了救援前的各项准备"]\n A --> N1["尤其是个人职业安全防护"]\n A --> N2["这些知识"]\n A --> N3["让我们进入第二个任务"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 158,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["这类伤员的伤情极其严重"]\n A --> N1["生命体征极不稳定"]\n A --> N2["随时可能死亡"]\n A --> N3["出现了严重的呼吸困难"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 183,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["对于这类伤员"]\n A --> N1["简单的包扎止血之后"]\n A --> N2["可以让他们在指定区域等待"]\n A --> N3["或者由非专业人员进行后续照看"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 208,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["他同时存在两个问题"]\n A --> N1["开放性气胸会导致呼吸循环障碍"]\n A --> N2["是致命的"]\n A --> N3["必须立即处理"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 233,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["我们不是贴一个标签就万事大吉了"]\n A --> N1["而是要对伤员进行持续的"]\n A --> N2["反复的评估和重新分类"]\n A --> N3["这就是为什么在救援现场"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 259,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["首先来看地震"]\n A --> N1["地震具有突发性强"]\n A --> N2["破坏性大"]\n A --> N3["伤亡人数多"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 284,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["对于黄色伤员"]\n A --> N1["比如下肢骨折"]\n A --> N2["脊柱损伤的伤员"]\n A --> N3["要特别注意"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 309,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["对于被救出的伤员"]\n A --> N1["首先要判定的不是他有没有烧伤"]\n A --> N2["而是他的气道有没有问题"]\n A --> N3["如果伤员有声音嘶哑"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 339,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["另外还有碾压伤"]\n A --> N1["切割伤等"]\n A --> N2["对于交通事故的救护"]\n A --> N3["首要原则是安全"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 365,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> N0["这些知识是一个整体"]\n A --> N1["需要大家融会贯通"]\n A --> N2["我要给大家布置课后学习建议"]\n A --> N3["请大家一定不要只是死记硬背"]\n\n class A new\n class N0 new\n class N1 new\n class N2 new\n class N3 new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        },
        {
          start: 381.3,
          element: {
            diagram: {
              content: m(`%%{init: {"theme": "default", "look": "handDrawn", "flowchart": {"useMaxWidth": false}, "themeCSS": "foreignObject {overflow: visible} p {margin: 0 !important; padding: 2px 6px !important} .edgeLabel {background: transparent !important; font-size: 12px !important; color: #5f6368 !important} .edgeLabel rect {fill: transparent !important}"}}%%\n\nflowchart TD\n A["第四章 灾害事故的现场救护"]\n A --> B["知识回顾"]\n A --> C["课后复习"]\n\n class B new\n class C new\n classDef default fill:#f8f9fa,stroke:#9aa0a6\n classDef metadata fill:#fef7e0,stroke:#fbbc04,color:#e37400\n classDef new fill:#e8f0fe,stroke:#4285f4\n`),
            },
          },
        }
      ],
    },
  }
];
