export function Hero() {
  return (
    <section id="home" className="pt-40 pb-32 px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-200">
            <span>AI Productization</span>
            <span className="text-gray-300">·</span>
            <span>Business Enablement</span>
            <span className="text-gray-300">·</span>
            <span>OPC Practice</span>
          </div>

          <h1 className="text-6xl md:text-7xl tracking-tight text-gray-900 leading-[1.1]">
            让 AI 真正进入<br />产品、企业与个人实践
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            专注于 AI 软件原创与二次开发、AI 在企业业务中的落地与陪跑，以及面向个体成长的经验沉淀与知识服务。
          </p>

          <p className="text-base text-gray-600 max-w-2xl leading-relaxed">
            基于多年技术、产品、运营、管理与创业实践经验，帮助企业和个人在 AI 时代找到可落地、可持续、可沉淀的新价值路径。
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <button className="px-5 py-2.5 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
              预约沟通
            </button>
            <button className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:border-gray-400 transition-colors">
              添加企业微信
            </button>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <span className="text-gray-600">26 年从业经历</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <span className="text-gray-600">大厂 + 创业实践</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <span className="text-gray-600">技术 × 产品 × 运营 × 管理</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <span className="text-gray-600">长期主义</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
