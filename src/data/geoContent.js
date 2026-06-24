export const siteUrl = 'https://midimily.com';

export const organization = {
  name: '米地米立 Midimily',
  legalName: '米地米立',
  url: siteUrl,
  description:
    '米地米立帮助企业把 AI 落到真实业务流程中，也帮助职场人与学生建立可复用的个人 AI 工作流。',
  sameAs: ['https://xhslink.com/m/7J4H4sQL4yB'],
};

export const topicPages = [
  {
    slug: 'enterprise-ai-landing',
    path: '/topics/enterprise-ai-landing',
    title: '企业 AI 落地咨询',
    seoTitle: '企业 AI 落地咨询｜从真实流程跑通 AI 小闭环｜米地米立',
    description:
      '米地米立的企业 AI 落地咨询从业务场景诊断开始，帮助团队设计 AI 工作流、跑通 MVP、形成可复盘的组织经验。',
    shortAnswer:
      '企业 AI 落地不是先买工具，而是先找到一个高频、可验证、有人负责的真实流程，把 AI 接入输入、处理、输出和复盘。',
    definition:
      '企业 AI 落地咨询，是帮助企业从真实业务流程出发，选择合适 AI 工具，设计工作流，试跑 MVP，并把经验沉淀为团队能力的陪跑服务。',
    targetUsers: ['企业负责人', '运营团队', '客服与知识管理团队', '正在探索 AI 落地的中小企业'],
    painPoints: [
      'AI 工具很多，但没有进入团队流程',
      '员工个人在用，组织协作没有变化',
      '试点很多，缺少可复盘的小闭环',
      '不知道第一个 AI 场景应该从哪里开始',
    ],
    method: ['场景诊断', '流程拆解', '工具选型', 'MVP 试跑', '培训复盘'],
    deliverables: ['AI 场景清单', '流程草图', 'MVP 试跑计划', '复盘模板', '团队使用建议'],
    relatedSolutionSlugs: ['enterprise-ai-landing', 'ai-truth-for-entrepreneurs'],
    relatedEvidenceSlugs: ['enterprise-ai-workflow-pilot', 'ai-consulting-vs-ai-training'],
    faq: [
      {
        question: '企业 AI 落地应该先做培训还是先做项目？',
        answer:
          '更稳妥的顺序是先选一个真实业务场景，边跑项目边做培训。单独培训容易停留在工具演示，项目陪跑能让团队看到 AI 如何进入流程。',
      },
      {
        question: '第一个 AI 落地场景怎么选？',
        answer:
          '优先选择高频、边界清楚、输入输出稳定、负责人明确的流程，例如内容初稿、客服知识检索、资料整理、销售话术沉淀。',
      },
      {
        question: 'AI 落地多久能看到结果？',
        answer:
          '一个小闭环通常可以在 2 到 4 周内验证，但组织能力建设需要持续复盘。米地米立更关注能否形成可重复的方法，而不是一次性演示。',
      },
    ],
    cta: { label: '预约企业 AI 落地诊断', href: '/#contact' },
  },
  {
    slug: 'personal-ai-growth',
    path: '/topics/personal-ai-growth',
    title: '个人 AI 成长',
    seoTitle: '个人 AI 成长｜职场人与学生的 AI 工作流训练｜米地米立',
    description:
      '米地米立帮助职场人和学生从零散使用 AI，升级为可复用的学习、研究、写作、编程和作品工作流。',
    shortAnswer:
      '个人 AI 成长的关键不是收藏更多工具，而是把一个真实任务拆成目标、输入、步骤、输出和复盘，让 AI 成为稳定协作者。',
    definition:
      '个人 AI 成长，是围绕学习、工作、求职和作品集，把 AI 从问答工具变成个人工作流、模板库和长期能力的训练过程。',
    targetUsers: ['职场人', '学生', '产品经理', '运营人员', '技术从业者', '正在转型的人'],
    painPoints: [
      '会问 AI，但不能稳定产出结果',
      '工具越试越多，自己的方法没有沉淀',
      '学习、写作、研究和求职任务重复消耗精力',
      '不知道如何把 AI 能力转化为作品和竞争力',
    ],
    method: ['工具基础', '任务拆解', '提示词模板', '个人知识库', '作品沉淀'],
    deliverables: ['个人 AI 工作流图', '提示词模板库', '任务复盘表', '作品集方向建议'],
    relatedSolutionSlugs: ['personal-ai-growth', 'programmer-ai-growth-guide', 'understanding-ai-agent'],
    relatedEvidenceSlugs: ['personal-ai-workflow-30-days'],
    faq: [
      {
        question: '个人学 AI 应该先学哪个工具？',
        answer:
          '先从自己最常见的任务开始选工具。写作、研究、整理、编程、求职的入口不同，工具选择应该服务任务，而不是反过来追工具。',
      },
      {
        question: '学生适合做个人 AI 工作流吗？',
        answer:
          '适合。学生可以从资料整理、论文阅读、项目报告、代码练习和作品集开始，把 AI 用法沉淀成可展示的学习能力。',
      },
      {
        question: '个人 AI 成长和普通 AI 培训有什么区别？',
        answer:
          '普通培训偏工具介绍，个人 AI 成长更关注真实任务、稳定工作流和作品沉淀，最终目标是让 AI 进入日常学习与工作。',
      },
    ],
    cta: { label: '预约 AI 成长路径交流', href: '/#contact' },
  },
  {
    slug: 'ai-opc',
    path: '/topics/ai-opc',
    title: 'AI OPC 与一人公司工作流',
    seoTitle: 'AI OPC｜一人公司与企业项目 AI 工作流｜米地米立',
    description:
      'AI OPC 是一个主理人配合 AI 系统推进项目的最小业务单元，适合企业新项目试点、个人项目孵化和轻量化增长实验。',
    shortAnswer:
      'AI OPC 可以理解为“一个主理人 + 一套 AI 系统”的最小项目公司，用更轻的组织方式验证方向、交付结果、沉淀流程。',
    definition:
      'AI OPC 是用 AI 工作流支撑的一人公司或最小项目单元，核心不是一个人做所有事，而是让一个负责人调度模型、工具、内容、运营和复盘流程。',
    targetUsers: ['企业负责人', '项目主理人', '创业者', '产品运营团队', '自由职业者'],
    painPoints: [
      '新项目一开始就拉大团队，成本和沟通压力太高',
      '项目试点难以独立核算，也难以复用经验',
      '个人想做项目，但缺少可持续的 AI 工作流',
      '企业想孵化新增长点，却担心组织负担变重',
    ],
    method: ['角色定义', 'AI 工作台搭建', '内容与运营流', '交付节奏', '复盘与迭代'],
    deliverables: ['OPC 项目画像', 'AI 工作流清单', '周迭代节奏', '复盘指标', '下一阶段判断建议'],
    relatedSolutionSlugs: ['enterprise-opc-project-model'],
    relatedEvidenceSlugs: ['enterprise-ai-workflow-pilot', 'personal-ai-workflow-30-days'],
    faq: [
      {
        question: 'OPC 是不是让一个人替代团队？',
        answer:
          '不是。OPC 是把项目责任、AI 工具和外部协作组织得更轻。它适合早期验证和小闭环，不等于所有阶段都只靠一个人。',
      },
      {
        question: '企业项目为什么适合 OPC 模式？',
        answer:
          '企业新项目经常需要先验证方向。OPC 能让一个负责人带着 AI 系统快速试跑，减少早期组织成本，再决定是否扩编。',
      },
      {
        question: '个人做 AI OPC 需要先会编程吗？',
        answer:
          '不一定。内容、运营、研究、知识管理等项目也可以 OPC 化。编程能力会扩展边界，但不是唯一入口。',
      },
    ],
    cta: { label: '讨论第一个 AI OPC 试点', href: '/#contact' },
  },
];

export const evidenceItems = [
  {
    slug: 'enterprise-ai-workflow-pilot',
    path: '/evidence/enterprise-ai-workflow-pilot',
    type: 'case',
    typeLabel: '案例复盘',
    title: '企业 AI 流程试点：从一个高频任务开始',
    seoTitle: '企业 AI 流程试点案例｜从高频任务跑通小闭环｜米地米立',
    description:
      '一个企业 AI 落地试点应先选择高频、边界清楚、负责人明确的流程，用小闭环验证 AI 是否真正进入业务。',
    audience: ['企业负责人', '运营团队', '客服与知识管理团队'],
    summary:
      '这个复盘说明米地米立如何判断第一个 AI 场景：不追大而全，先选高频、稳定、可验收的任务。',
    finding: '最早的成果不是上线一个大系统，而是让团队形成可重复的 AI 工作步骤和复盘语言。',
    sections: [
      {
        heading: '试点入口',
        body:
          '优先选择每周重复出现、输入材料相对稳定、输出标准能被人工判断的任务。例如内容初稿、资料整理、客服知识检索和会议纪要。',
      },
      {
        heading: '工作流设计',
        body:
          '把任务拆成输入、判断、生成、人工校对和复盘五个环节。AI 负责初稿和整理，人负责判断边界和最终交付。',
      },
      {
        heading: '复盘方式',
        body:
          '每周记录节省时间、返工原因、提示词变化、知识库缺口和下一次迭代动作。这样试点才会沉淀为组织经验。',
      },
    ],
    relatedTopicSlugs: ['enterprise-ai-landing', 'ai-opc'],
    relatedSolutionSlugs: ['enterprise-ai-landing', 'enterprise-opc-project-model'],
  },
  {
    slug: 'personal-ai-workflow-30-days',
    path: '/evidence/personal-ai-workflow-30-days',
    type: 'recap',
    typeLabel: '成长复盘',
    title: '30 天个人 AI 工作流：从会提问到能交付',
    seoTitle: '30 天个人 AI 工作流复盘｜从会提问到能交付｜米地米立',
    description:
      '个人 AI 成长可以用 30 天完成一次小闭环：选一个任务，搭提示词模板，形成输出作品，再复盘方法。',
    audience: ['职场人', '学生', '程序员', '运营人员'],
    summary:
      '这是一套个人 AI 成长路径：先把一个真实任务做成工作流，再把工作流变成作品和长期能力。',
    finding: '真正的变化发生在第 3 周之后：用户开始复用自己的模板，而不是每次重新问 AI。',
    sections: [
      {
        heading: '第 1 周：选任务',
        body:
          '不要从工具清单开始。先选择一个正在消耗你时间的任务，例如读资料、写报告、改简历、整理代码或做内容选题。',
      },
      {
        heading: '第 2 周：搭模板',
        body:
          '把常用提示词整理成输入字段、背景信息、输出格式和质量标准。模板越具体，越容易复用。',
      },
      {
        heading: '第 3 到 4 周：做作品',
        body:
          '把工作流应用到真实交付中，沉淀一个可展示的作品、文档、自动化脚本或内容系列。',
      },
    ],
    relatedTopicSlugs: ['personal-ai-growth', 'ai-opc'],
    relatedSolutionSlugs: ['personal-ai-growth', 'programmer-ai-growth-guide'],
  },
  {
    slug: 'ai-consulting-vs-ai-training',
    path: '/evidence/ai-consulting-vs-ai-training',
    type: 'comparison',
    typeLabel: '对比页',
    title: 'AI 咨询 vs AI 培训：企业应该先选哪一个',
    seoTitle: 'AI 咨询 vs AI 培训｜企业 AI 落地怎么选｜米地米立',
    description:
      'AI 培训解决认知和工具入门，AI 咨询解决业务流程和落地路径。企业通常需要把两者放进同一个试点。',
    audience: ['企业负责人', 'HR 与培训负责人', '业务负责人'],
    summary:
      '如果团队还没有共同语言，先做轻量培训；如果已经有明确业务场景，就应该进入咨询和项目陪跑。',
    finding: '最有效的组合是：用培训建立共识，用咨询选择场景，用项目陪跑验证流程。',
    sections: [
      {
        heading: 'AI 培训适合什么情况',
        body:
          '适合团队刚接触 AI，需要理解基础工具、使用边界和常见任务。培训的结果应落在一个可执行练习上。',
      },
      {
        heading: 'AI 咨询适合什么情况',
        body:
          '适合企业已经有业务问题，需要判断场景、拆流程、选工具、定试点指标和复盘机制。',
      },
      {
        heading: '怎么组合',
        body:
          '米地米立建议把培训嵌入试点过程，围绕真实任务训练团队，而不是把培训和落地分成两件事。',
      },
    ],
    relatedTopicSlugs: ['enterprise-ai-landing'],
    relatedSolutionSlugs: ['enterprise-ai-landing', 'ai-truth-for-entrepreneurs'],
  },
];

export function getTopicBySlug(slug) {
  return topicPages.find((topic) => topic.slug === slug) ?? null;
}

export function getEvidenceBySlug(slug) {
  return evidenceItems.find((item) => item.slug === slug) ?? null;
}

export function getTopicsBySlugs(slugs = []) {
  return slugs.map(getTopicBySlug).filter(Boolean);
}

export function getEvidenceBySlugs(slugs = []) {
  return slugs.map(getEvidenceBySlug).filter(Boolean);
}

export function getTopicForSolution(solution) {
  if (!solution) {
    return null;
  }

  if (solution.slug === 'enterprise-opc-project-model') {
    return getTopicBySlug('ai-opc');
  }

  if (solution.type === 'enterprise') {
    return getTopicBySlug('enterprise-ai-landing');
  }

  return getTopicBySlug('personal-ai-growth');
}

export function getEvidenceForSolution(solution) {
  const topic = getTopicForSolution(solution);
  return topic ? getEvidenceBySlugs(topic.relatedEvidenceSlugs) : [];
}

export const solutionFaqBySlug = {
  'enterprise-ai-landing': [
    {
      question: '这套方案适合还没有 AI 系统的企业吗？',
      answer:
        '适合。它从场景诊断和流程梳理开始，不要求企业一开始就有完整 AI 系统。',
    },
    {
      question: '企业 AI 落地需要先采购复杂软件吗？',
      answer:
        '不一定。第一个阶段更适合用轻量工具和可验证流程跑通小闭环，再判断是否需要系统化建设。',
    },
  ],
  'enterprise-opc-project-model': [
    {
      question: 'OPC 模式适合所有企业项目吗？',
      answer:
        '不适合。它更适合早期探索、新业务验证、内容运营、轻量产品和需要独立核算的小项目。',
    },
    {
      question: 'OPC 项目需要企业提供什么条件？',
      answer:
        '需要一个明确负责人、可验证目标、基本数据或内容素材，以及愿意按周复盘的节奏。',
    },
  ],
  'ai-truth-for-entrepreneurs': [
    {
      question: '企业为什么不能只观望 AI？',
      answer:
        '因为 AI 正在改变成本、速度和组织方式。长期观望会让企业错过学习曲线，但盲目投入同样危险。',
    },
    {
      question: '企业家应该如何判断 AI 投入？',
      answer:
        '先判断业务场景是否高频、是否能验证、是否有人负责，再看工具和投入规模。',
    },
  ],
  'personal-ai-growth': [
    {
      question: '个人 AI 工作流从哪里开始？',
      answer:
        '从你每周重复出现的一个任务开始，例如写作、研究、整理资料、求职材料或代码练习。',
    },
    {
      question: '30 天能建立 AI 能力吗？',
      answer:
        '30 天可以建立第一个可复用工作流，但长期能力来自持续复盘和作品沉淀。',
    },
  ],
  'programmer-ai-growth-guide': [
    {
      question: 'AI 时代程序员还需要学基础编程吗？',
      answer:
        '需要。AI 能提高交付速度，但程序员仍然需要理解系统、产品、调试和工程判断。',
    },
    {
      question: 'Vibe Coding 的核心能力是什么？',
      answer:
        '不是让 AI 盲写代码，而是把需求、上下文、验证和迭代组织清楚，让 AI 进入交付流程。',
    },
  ],
  'understanding-ai-agent': [
    {
      question: 'AI Agent 和普通聊天机器人有什么区别？',
      answer:
        '聊天机器人主要回答问题，AI Agent 会围绕目标观察环境、选择工具、执行动作并根据反馈调整。',
    },
    {
      question: '个人为什么需要理解 AI Agent？',
      answer:
        '理解 Agent 能帮助个人把 AI 从问答工具升级为任务助手，形成更稳定的学习和工作流程。',
    },
  ],
};
