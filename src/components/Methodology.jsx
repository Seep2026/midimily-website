export function Methodology() {
  const steps = [
    {
      number: '01',
      title: '判断场景价值',
      description: '不是所有问题都值得 AI 化，先判断是否真有业务意义。',
    },
    {
      number: '02',
      title: '选择合适路径',
      description: '原创、二次开发、开源整合、工具协同，各有边界与成本差异。',
    },
    {
      number: '03',
      title: '快速进入实践',
      description: '优先找到可验证、可上线、可复盘的最小路径，而不是一开始就追求完美。',
    },
    {
      number: '04',
      title: '持续陪跑优化',
      description: 'AI 的价值不在一次性交付，而在后续使用、调整与团队协同中被放大。',
    },
  ];

  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-5xl text-gray-900 mb-4 tracking-tight leading-tight">
            我的关注点，不只是&quot;能不能做&quot;，更是&quot;能不能跑起来&quot;
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative space-y-4"
            >
              <div className="text-sm text-gray-400">{step.number}</div>
              <h3 className="text-lg text-gray-900">{step.title}</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
