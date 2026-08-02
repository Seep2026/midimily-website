import { serviceOverviewCards } from '../data/homeV2Data';

export function ServicesOverview() {
  return (
    <section className="editorial-home-section editorial-home-start" aria-labelledby="home-start-title">
      <div className="editorial-home-section__inner">
        <header className="editorial-home-section__header">
          <h2 id="home-start-title">从第一步开始</h2>
          <p>先选一个真实场景，跑通一个可复用的小闭环。</p>
        </header>

        <div className="editorial-home-start__paths">
          {serviceOverviewCards.map((card) => (
            <article key={card.id}>
              <p className="editorial-home-start__path">{card.tag}</p>
              <h3>{card.title}</h3>
              <p>{card.firstStep}</p>
              <ul>{card.actions.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="editorial-home-start__links">
                {card.href ? <a href={card.href}>查看服务说明</a> : null}
                <a href="#contact">{card.cta}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
