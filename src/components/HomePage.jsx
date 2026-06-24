import { Hero } from './Hero';
import { ServicesOverview } from './ServicesOverview';
import { BusinessService } from './BusinessService';
import { IndividualGrowth } from './IndividualGrowth';
import { PracticeSamples } from './PracticeSamples';
import { Insights } from './Insights';
import { CTA } from './CTA';
import { SeoMetadata } from './SeoMetadata';
import { siteMeta } from '../data/homeV2Data';
import { organizationSchema, serviceSchema, websiteSchema } from '../lib/seo';

export function HomePage() {
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
            name: '企业 AI 落地咨询',
            description: '从真实业务流程出发，帮助企业设计 AI 工作流、试跑 MVP 并沉淀组织能力。',
            path: '/topics/enterprise-ai-landing',
            audience: ['企业负责人', '运营团队', '客服与知识管理团队'],
          }),
          serviceSchema({
            name: '个体 AI 成长顾问',
            description: '帮助职场人与学生把 AI 工具转化为学习、工作、求职和作品集能力。',
            path: '/topics/personal-ai-growth',
            audience: ['职场人', '学生', '程序员', '运营人员'],
          }),
        ]}
      />
      <Hero />
      <ServicesOverview />
      <BusinessService />
      <IndividualGrowth />
      <PracticeSamples />
      <Insights />
      <CTA />
    </main>
  );
}
