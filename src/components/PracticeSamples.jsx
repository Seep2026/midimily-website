import { practiceCards } from '../data/homeV2Data';

export function PracticeSamples() {
  return (
    <section id="practice" className="editorial-home-section editorial-home-practice" aria-labelledby="practice-title">
      <div className="editorial-home-section__inner">
        <header className="editorial-home-section__header">
          <h2 id="practice-title">正在实践的 AI 样本</h2>
          <p>不是只讲趋势，而是把 AI 放进真实任务里。</p>
        </header>

        <ol className="editorial-home-practice__list">
          {practiceCards.map((card) => (
            <li key={card.title}>
              <article><h3>{card.title}</h3><p>{card.body}</p><p>{card.tags.join(' · ')}</p></article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
