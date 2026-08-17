import { HomeHero } from './editorial/HomeHero';
import { AppointmentForm } from './AppointmentForm';
import { SeoMetadata } from './SeoMetadata';
import { siteMeta } from '../data/homeV2Data';
import { getAppointmentServiceType } from '../lib/appointmentRoute';
import { organizationSchema, serviceSchema, websiteSchema } from '../lib/seo';

export function HomePage() {
  const appointmentServiceType = getAppointmentServiceType(
    typeof window === 'undefined' ? '' : window.location.search,
  );

  return (
    <main>
      <SeoMetadata
        title={siteMeta.title}
        description={siteMeta.description}
        canonicalPath="/"
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          serviceSchema({
            name: '企业 AI 落地服务',
            description: '从真实业务流程出发，帮助企业设计 AI 工作流、试跑 MVP 并沉淀组织能力。',
            path: '/enterprise',
            audience: ['企业负责人', '运营团队', '客服与知识管理团队'],
          }),
          serviceSchema({
            name: '个体 AI 成长服务',
            description: '帮助职场人与学生把 AI 工具转化为学习、工作、求职和作品集能力。',
            path: '/individual',
            audience: ['职场人', '学生', '程序员', '运营人员'],
          }),
        ]}
      />
      <div className="editorial-token-scope home-editorial-core">
        <HomeHero />
        <section className="home-principles" aria-labelledby="home-principles-title">
          <div className="home-principles__inner">
            <header>
              <p>米地咨询的想法</p>
              <h2 id="home-principles-title">AI 应该服务于人的判断，而不是制造更多焦虑。</h2>
            </header>
            <div>
              <p>
                我们不把每一个问题都推给 AI。先理解你正在做的事、真正卡住的环节和想得到的结果，再决定是否值得用 AI 改变它。
              </p>
              <p>
                对企业，先跑通一个小闭环；对个体，先完成一个真实任务。有效的方法，才值得被留下和扩大。
              </p>
            </div>
          </div>
        </section>
      </div>
      <AppointmentForm defaultServiceType={appointmentServiceType} />
    </main>
  );
}
