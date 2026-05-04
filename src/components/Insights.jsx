import { solutions } from '../data/solutionsData';
import { SolutionCard } from './solutions/SolutionCard';

export function Insights() {
  const enterprise = solutions.find((solution) => solution.type === 'enterprise');
  const individual = solutions.find((solution) => solution.type === 'individual');
  const previewSolutions = [enterprise, individual].filter(Boolean);

  return (
    <section id="solutions-preview" className="px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="max-w-[780px] space-y-3">
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[40px]">
            精选 AI 方案
          </h2>
          <p className="text-[16px] text-[#627896]">
            用 Web Deck 快速理解企业落地和个体成长路径，把 AI 的变化转成可以讨论、可以行动的方案。
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[16px] border border-[#d6e0f4] bg-[#f6f9ff] p-4 text-[14px] text-[#5f7593]">
            <span className="block text-[17px] text-[#304864]">企业 AI 落地方案</span>
            <span className="mt-2 block">场景 · 流程 · 工具 · 培训 · 陪跑</span>
          </div>
          <div className="rounded-[16px] border border-[#d1e5df] bg-[#f2fbf8] p-4 text-[14px] text-[#5f7593]">
            <span className="block text-[17px] text-[#304864]">个体 AI 成长方案</span>
            <span className="mt-2 block">工具 · 学习 · 工作 · 求职 · 成长</span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {previewSolutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>

        <a
          href="/solutions"
          className="mt-8 inline-flex min-h-11 items-center rounded-[12px] border border-[#d1dff0] bg-white/86 px-4 text-[14px] text-[#4e709a] transition hover:border-[#b6cde9] hover:bg-white"
        >
          查看全部方案
        </a>
      </div>
    </section>
  );
}
