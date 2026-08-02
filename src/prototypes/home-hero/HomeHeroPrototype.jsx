import { useState } from 'react';

const PROTOTYPE_CONTENT = {
  title: '不只看趋势，先跑一个小闭环。',
  summary: '米地米立持续观察 AI 如何进入真实工作与个人成长，并把复杂变化转化为可以开始、验证和复用的具体行动。',
  annotation: '先让一件具体的事情跑通，再讨论更大的智能化。',
  paths: [
    {
      name: '企业 AI 落地',
      description: '从一个高频任务开始，看见 AI 如何真正进入流程、协作与交付。',
      href: '/topics/enterprise-ai-landing',
    },
    {
      name: '个体 AI 成长',
      description: '从会使用工具，到形成自己的稳定工作流与交付能力。',
      href: '/topics/personal-ai-growth',
    },
  ],
};

function initialOption(name, expectedValue) {
  return new URLSearchParams(window.location.search).get(name) === expectedValue;
}

// Phase 3B-2 development prototype only. It does not read or mutate production content data.
export function HomeHeroPrototype() {
  const [neutralBackground, setNeutralBackground] = useState(() => initialOption('background', 'neutral'));
  const [showPet, setShowPet] = useState(() => initialOption('pet', 'signature'));
  const [primaryPath, secondaryPath] = PROTOTYPE_CONTENT.paths;

  return (
    <main
      className="home-hero-prototype"
      data-background={neutralBackground ? 'neutral' : 'warm'}
      data-pet={showPet ? 'signature' : 'none'}
    >
      <section className="home-hero-prototype__hero" aria-labelledby="home-hero-prototype-title">
        <div className="home-hero-prototype__shell">
          <p className="home-hero-prototype__eyebrow">米地米立的实践观察</p>

          <div className="home-hero-prototype__statement">
            <h1 id="home-hero-prototype-title" className="home-hero-prototype__title">
              {PROTOTYPE_CONTENT.title}
            </h1>
            <p className="home-hero-prototype__summary">{PROTOTYPE_CONTENT.summary}</p>
          </div>

          <div className="home-hero-prototype__paths">
            <a className="home-hero-prototype__primary-path" href={primaryPath.href}>
              <span className="home-hero-prototype__path-name">{primaryPath.name}</span>
              <span className="home-hero-prototype__path-description">{primaryPath.description}</span>
            </a>

            <div className="home-hero-prototype__side-axis">
              <aside className="home-hero-prototype__annotation" aria-label="编辑批注">
                <p>{PROTOTYPE_CONTENT.annotation}</p>
              </aside>

              {showPet ? (
                <span
                  className="home-hero-prototype__pet-signature"
                  role="img"
                  aria-label="小米立静态签名"
                />
              ) : null}

              <a className="home-hero-prototype__secondary-path" href={secondaryPath.href}>
                <span className="home-hero-prototype__secondary-name">{secondaryPath.name}</span>
                <span className="home-hero-prototype__secondary-description">{secondaryPath.description}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="prototype-settings" className="home-hero-prototype__settings" aria-labelledby="prototype-settings-title">
        <div className="home-hero-prototype__settings-inner">
          <div>
            <p className="home-hero-prototype__settings-kicker">仅用于本地样板比较</p>
            <h2 id="prototype-settings-title">样板预览设置</h2>
          </div>

          <div className="home-hero-prototype__setting-group" aria-label="背景方案">
            <span>背景</span>
            <button type="button" aria-pressed={!neutralBackground} onClick={() => setNeutralBackground(false)}>
              暖白 A
            </button>
            <button type="button" aria-pressed={neutralBackground} onClick={() => setNeutralBackground(true)}>
              中性 B
            </button>
          </div>

          <div className="home-hero-prototype__setting-group" aria-label="小米立方案">
            <span>小米立</span>
            <button type="button" aria-pressed={!showPet} onClick={() => setShowPet(false)}>
              默认无
            </button>
            <button type="button" aria-pressed={showPet} onClick={() => setShowPet(true)}>
              静态签名
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
