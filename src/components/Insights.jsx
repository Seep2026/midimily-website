import { solutions } from '../data/solutionsData';
import { SolutionCard } from './solutions/SolutionCard';

export function Insights() {
  const enterprise = solutions.find((solution) => solution.type === 'enterprise');
  const individual = solutions.find((solution) => solution.type === 'individual');
  const previewSolutions = [enterprise, individual].filter(Boolean);

  return (
    <section id="solutions-preview" className="px-4 py-10 sm:px-6 md:px-8 md:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="mb-6 max-w-[720px] md:mb-8">
          <h2 className="text-[30px] font-semibold leading-tight text-[#2e415f] sm:text-[36px] md:text-[42px]">
            精选 AI 方案
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-[#6b81a0] sm:text-[18px]">
            一页页读懂 AI 落地、成长与实践方法。
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {previewSolutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
        <div className="mt-7 flex justify-center md:mt-9">
          <a
            href="/solutions"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-[#c7daf0] bg-white/76 px-6 text-[15px] font-semibold text-[#526f96] shadow-[0_14px_34px_rgba(115,139,171,0.12)] transition hover:-translate-y-0.5 hover:border-[#9fb9da] hover:bg-white hover:text-[#2e5b94]"
          >
            查看全部方案
          </a>
        </div>
      </div>
    </section>
  );
}
