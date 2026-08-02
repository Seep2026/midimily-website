const PROTOTYPE_ARTICLES = {
  lead: {
    path: '企业 AI 落地',
    title: '企业 AI 流程试点：从一个高频任务开始',
    summary: '与其讨论全面智能化，不如先找到一个重复、高频、结果可衡量的任务。',
    annotation: '第一个试点的价值，不是证明 AI 无所不能，而是确认一条流程能够稳定跑通。',
    href: '/evidence/enterprise-ai-workflow-pilot',
  },
  secondary: {
    path: '个体 AI 成长',
    title: '30 天个人 AI 工作流：从会提问到能交付',
    summary: '把零散使用变成一套可以重复的工作方式。',
    href: '/evidence/personal-ai-workflow-30-days',
  },
  closing: {
    path: '企业 AI 判断',
    title: 'AI 咨询 vs AI 培训：企业应该先选哪一个',
    summary: '先判断问题属于认知、流程，还是组织落地。',
    href: '/evidence/ai-consulting-vs-ai-training',
  },
};

// Phase 3B-3 development prototype only. It does not read or mutate production content data.
export function HomeEditorialSectionPrototype() {
  const { lead, secondary, closing } = PROTOTYPE_ARTICLES;

  return (
    <main className="home-editorial-section-prototype">
      <section
        className="home-editorial-section-prototype__shell"
        aria-labelledby="home-editorial-section-prototype-title"
      >
        <p className="home-editorial-section-prototype__section-label">实践观察</p>

        <div className="home-editorial-section-prototype__layout">
          <article className="home-editorial-section-prototype__lead-story">
            <p className="home-editorial-section-prototype__content-path">{lead.path}</p>
            <h1 id="home-editorial-section-prototype-title" className="home-editorial-section-prototype__lead-title">
              <a href={lead.href}>{lead.title}</a>
            </h1>
            <p className="home-editorial-section-prototype__lead-summary">{lead.summary}</p>

            <aside className="home-editorial-section-prototype__annotation" aria-label="编辑批注">
              <p>{lead.annotation}</p>
            </aside>
          </article>

          <article className="home-editorial-section-prototype__secondary-story">
            <p className="home-editorial-section-prototype__content-path">{secondary.path}</p>
            <h2 className="home-editorial-section-prototype__secondary-title">
              <a href={secondary.href}>{secondary.title}</a>
            </h2>
            <p className="home-editorial-section-prototype__secondary-summary">{secondary.summary}</p>
          </article>
        </div>

        <article className="home-editorial-section-prototype__closing-story">
          <p className="home-editorial-section-prototype__content-path">{closing.path}</p>
          <h2 className="home-editorial-section-prototype__closing-title">
            <a href={closing.href}>{closing.title}</a>
          </h2>
          <p className="home-editorial-section-prototype__closing-summary">{closing.summary}</p>
        </article>
      </section>
    </main>
  );
}
