import { businessSteps } from '../data/homeV2Data';

export function BusinessService() {
  return (
    <section id="business" className="editorial-home-section editorial-home-process" aria-labelledby="business-title">
      <div className="editorial-home-section__inner">
        <header className="editorial-home-section__header">
          <p>企业服务路径</p>
          <h2 id="business-title">企业 AI 落地路径</h2>
          <p>从一个真实流程开始，跑通可验证的小闭环。</p>
        </header>

        <ol className="editorial-home-process__steps">
          {businessSteps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
              <p>{step.output}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
