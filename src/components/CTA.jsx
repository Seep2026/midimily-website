import milyQq from '../styles/mily-qq.png';
import milyWx from '../styles/mily-wx.png';

function HoverContactButton({ label, imageSrc, imageAlt }) {
  return (
    <div className="editorial-contact-action">
      <a href="#contact">{label}</a>
      <div className="editorial-contact-action__code">
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  );
}

export function CTA() {
  return (
    <section id="contact" className="editorial-home-section editorial-contact" aria-labelledby="contact-title">
      <div className="editorial-home-section__inner">
        <h2 id="contact-title">企业在适应 AI，个体也在适应 AI</h2>
        <p>
          如果你正在思考 AI 如何进入业务，或如何提升个体竞争力，可以先从一次交流开始。
        </p>

        <div className="editorial-contact__paths">
          <article>
            <h3>企业 AI 落地交流</h3>
            <p>
              一起梳理 AI 应用场景，判断适合切入的业务流程。
            </p>
            <HoverContactButton label="预约一次 AI 落地诊断" imageSrc={milyWx} imageAlt="微信二维码" />
          </article>

          <article>
            <h3>个体 AI 成长交流</h3>
            <p>
              一起梳理你的学习、工作与职业发展中的 AI 使用路径。
            </p>
            <HoverContactButton label="预约一次 AI 成长路径交流" imageSrc={milyQq} imageAlt="QQ二维码" />
          </article>
        </div>
      </div>
    </section>
  );
}
