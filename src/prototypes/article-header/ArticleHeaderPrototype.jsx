// Development-only Phase 3B-1 prototype. It intentionally does not read or mutate production content data.
export function ArticleHeaderPrototype() {
  return (
    <main className="article-header-prototype">
      <article className="article-header-prototype__shell" aria-labelledby="prototype-article-title">
        <header className="article-header-prototype__layout">
          <div className="article-header-prototype__reading-axis">
            <a className="article-header-prototype__category" href="/topics/enterprise-ai-landing">
              企业 AI 落地
            </a>

            <h1 id="prototype-article-title" className="article-header-prototype__title">
              <span className="article-header-prototype__desktop-line">企业 AI 流程试点：</span>
              <span>从一个高频任务开始</span>
            </h1>

            <p className="article-header-prototype__summary">
              不要从“全面智能化”开始。先找到一个重复、高频、结果可衡量的任务。
            </p>

            <p className="article-header-prototype__meta">实践观察 · 约 6 分钟阅读</p>
          </div>

          <aside className="article-header-prototype__annotation" aria-label="编辑批注">
            <p>真正重要的不是模型多强，而是第一个闭环是否跑得通。</p>
          </aside>
        </header>
      </article>
    </main>
  );
}
