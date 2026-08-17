import { AppointmentForm } from './AppointmentForm';
import { SeoMetadata } from './SeoMetadata';
import { SolutionCard } from './solutions/SolutionCard';
import { solutions } from '../data/solutionsData';
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema, websiteSchema } from '../lib/seo';

const servicePages = {
  enterprise: {
    path: '/enterprise',
    eyebrow: '企业服务',
    title: '让 AI 从一个真实流程开始。',
    description: '米地咨询帮助企业从高频、可衡量的业务任务出发，设计工作流、完成小范围试点，并把有效方法留在团队里。',
    pathTitle: '用三步完成一次小范围验证。',
    intro: '不需要先做大而全的改造。我们会从现有流程和团队协作出发，找到一个值得验证的起点。',
    audience: ['企业负责人或业务负责人', '运营、客服、内容、知识管理等团队', '正在选择首个 AI 试点的中小企业'],
    priorities: ['哪个业务场景值得先投入', '现有流程如何接入 AI', '试点是否改善了效率、质量或协作'],
    steps: [
      ['选定场景', '梳理目标、参与者、现有材料与判断指标。', '场景与指标'],
      ['设计并试跑', '把流程拆成输入、判断和交付，完成一次小范围试点。', '试点工作流'],
      ['复盘并交接', '核对效率、质量与协作变化，把有效方法留给团队。', '复盘与建议'],
    ],
    deliverables: ['场景优先级与验证指标', '可试跑的 AI 工作流', '试点复盘与下一步建议'],
    boundary: '如果当前只需要采购工具，不希望梳理场景，或期待一次替代整个团队与全部流程，我们会建议先不开始。',
    faqs: [
      ['第一次交流会聊什么？', '我们会先了解你的业务流程、已经尝试过什么，以及你希望在近期改善的结果。交流的目标是判断是否值得开始，而不是立刻给出复杂方案。'],
      ['一定要先做完整的数字化改造吗？', '不需要。服务从一个真实流程开始，但会同时判断现有数据、协作方式和工具条件是否支撑这个试点。'],
      ['可以只做培训吗？', '可以。如果团队当前最需要的是建立共同方法，服务可以围绕真实任务设计培训与练习，而不是只讲工具功能。'],
    ],
  },
  individual: {
    path: '/individual',
    eyebrow: '个体成长',
    title: '把 AI 用成自己的工作能力。',
    description: '米地咨询陪职场人与学习者从一项真实任务开始，建立可反复使用的 AI 工作流，把成果沉淀为作品与机会。',
    pathTitle: '用三步把方法放进一项真实任务。',
    intro: '工具会变，但判断任务、组织输入、与 AI 协作并完成交付的能力可以留下来。',
    audience: ['希望改善学习与工作的职场人', '正在积累作品或转换方向的学习者', '想把零散工具变成稳定方法的人'],
    priorities: ['把 AI 放进一项具体任务', '减少每次从零开始', '把过程沉淀为模板、作品或个人资产'],
    steps: [
      ['选定任务', '明确一项当前任务、完成标准与现有材料。', '任务与目标'],
      ['共建方法', '组织输入、步骤和检查标准，完成一次真实交付。', '个人工作流'],
      ['沉淀资产', '整理可复用的提示、模板、作品与下一步行动。', '模板与复盘'],
    ],
    deliverables: ['一套与当前任务相关的 AI 工作流', '可复用的模板与检查清单', '任务复盘与后续行动建议'],
    boundary: '如果当前只需要通用提示词合集，或希望 AI 在不了解目标和上下文的情况下替你完成所有判断，我们会建议先不开始。',
    faqs: [
      ['没有技术背景可以开始吗？', '可以。起点是你的真实任务，而不是编程基础。我们会根据任务选择适合的工具与方法。'],
      ['交流后需要长期报名吗？', '不需要。第一次交流先判断你的问题、目标和适合的起点，再决定是否继续。'],
      ['会帮我做作品集吗？', '会一起判断哪些任务值得沉淀，并把过程、成果和复盘整理成可展示的内容。'],
    ],
  },
};

function FaqList({ items }) {
  return (
    <section className="service-page__faq" aria-labelledby="service-faq-title">
      <h2 id="service-faq-title">常见问题</h2>
      <div>
        {items.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ServicePage({ type }) {
  const page = servicePages[type];
  const pageSolutions = solutions.filter((solution) => solution.type === type);
  const serviceName = type === 'enterprise' ? '企业 AI 落地服务' : '个体 AI 成长服务';
  const overviewGroups = [
    ['适合谁', page.audience],
    ['先处理什么', page.priorities],
    ['会带走什么', page.deliverables],
  ];
  const trustItems = [
    ['先判断是否适合', '提交预约不代表已经进入正式服务。第一次交流用于了解现状、目标和匹配度。'],
    ['过程有明确输出', `每一步都对应一份可查看的中间结果，包括${page.deliverables.join('、')}。`],
    ['预约信息有明确用途', '表单中的联系方式和问题描述，仅用于准备并联系本次沟通。'],
    ['不合适的情况会提前说明', page.boundary],
  ];

  return (
    <main className={`service-page service-page--${type}`}>
      <SeoMetadata
        title={`${serviceName}｜米地咨询`}
        description={page.description}
        canonicalPath={page.path}
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          serviceSchema({ name: serviceName, description: page.description, path: page.path, audience: page.audience }),
          faqSchema(page.faqs.map(([question, answer]) => ({ question, answer }))),
          breadcrumbSchema([{ name: '首页', path: '/' }, { name: page.eyebrow, path: page.path }]),
        ]}
      />
      <section className="service-page__hero">
        <div className="service-page__inner">
          <p>{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <a href={`/?service=${type}#appointment`}>开始一次交流</a>
        </div>
      </section>

      <section className="service-page__section service-page__overview">
        <div className="service-page__inner">
          <header className="service-page__overview-header">
            <div>
              <p>服务概览</p>
              <h2>先判断，这是不是你现在需要的帮助。</h2>
            </div>
            <p>{page.intro}</p>
          </header>
          <div className="service-page__overview-grid">
            {overviewGroups.map(([title, items]) => (
              <section key={title}>
                <h3>{title}</h3>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="service-page__section service-page__solutions">
        <div className="service-page__inner">
          <header className="service-page__section-header">
            <p>相关方案</p>
            <h2>可以先从与你最接近的方案读起。</h2>
          </header>
          <div className="service-page__solution-list">
            {pageSolutions.map((solution) => <SolutionCard key={solution.slug} solution={solution} />)}
          </div>
        </div>
      </section>

      <section className="service-page__section service-page__section--tinted">
        <div className="service-page__inner">
          <header className="service-page__section-header">
            <p>合作路径</p>
            <h2>{page.pathTitle}</h2>
          </header>
          <ol className="service-page__steps">
            {page.steps.map(([title, body, output], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
                <p>{output}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="service-page__section service-page__confidence">
        <div className="service-page__inner">
          <header className="service-page__section-header service-page__trust-header">
            <p>合作说明</p>
            <h2>先了解过程和边界，再决定是否开始。</h2>
          </header>
          <div className="service-page__confidence-grid">
            <dl className="service-page__trust-list">
              {trustItems.map(([title, body]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{body}</dd>
                </div>
              ))}
            </dl>
            <FaqList items={page.faqs} />
          </div>
        </div>
      </section>

      <AppointmentForm defaultServiceType={type} compact />
    </main>
  );
}
