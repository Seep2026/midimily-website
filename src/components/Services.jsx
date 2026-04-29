export function Services() {
  const services = [
    {
      title: 'AI 软件原创与二次开发',
      description: '围绕 AI 能力、开源项目与真实业务需求，开展从产品构思、能力整合到二次开发与上线实践的完整工作，帮助客户更快形成可验证、可迭代的 AI 产品。',
      tags: ['开源二开', '产品设计', 'MVP验证', '功能整合'],
    },
    {
      title: 'AI 技术在企业业务中的实践与陪跑',
      description: '面向企业业务场景，协助推进 AI 在内容、运营、知识管理、流程协同等方向的应用，不只提供建议，更关注具体推进、落地执行与持续优化。',
      tags: ['场景梳理', '工具接入', '流程协同', '落地陪跑'],
    },
    {
      title: '个人经验沉淀与知识服务',
      description: '将多年技术、产品、运营、创业与独立实践中的经验持续沉淀，形成适合职场人、计算机相关专业毕业生与转型人群的内容、咨询与知识服务。',
      tags: ['职业认知', 'AI转型', 'OPC实践', '问题咨询'],
    },
  ];

  return (
    <section id="services" className="py-32 px-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20 space-y-4 max-w-3xl">
          <h2 className="text-5xl text-gray-900 tracking-tight leading-tight">
            围绕 AI 时代的三类真实需求，提供持续服务
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            不是只谈技术，也不是只卖知识。米地.米立连接的是：产品化、业务落地与个体成长。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <h3 className="text-lg text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-gray-50 text-xs text-gray-600 rounded border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
