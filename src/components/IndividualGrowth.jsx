import { individualSteps } from '../data/homeV2Data';

export function IndividualGrowth() {
  return (
    <section id="individual" className="editorial-home-section editorial-home-process editorial-home-process--individual" aria-labelledby="individual-title">
      <div className="editorial-home-section__inner">
        <header className="editorial-home-section__header">
          <p>个体成长路径</p>
          <h2 id="individual-title">从会用 AI，到用 AI 做出结果</h2>
          <p>建立自己的 AI 工作流，把工具变成能力。</p>
        </header>

        <ol className="editorial-home-process__steps">
          {individualSteps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
              <p>{step.progress}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
