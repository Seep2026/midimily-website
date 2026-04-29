export function Insights() {
  const articles = [
    {
      title: '开源 AI 项目拆解与产品化机会',
      excerpt: '从技术能力到产品价值，如何识别真正值得投入的开源项目，以及二次开发的切入点。',
      category: '产品化',
    },
    {
      title: '企业 AI 落地中的真实问题与误区',
      excerpt: '不是每个场景都需要 AI，也不是每个 AI 方案都能落地。分享实践中的经验与教训。',
      category: '业务实践',
    },
    {
      title: '计算机人、职场人与 OPC 的 AI 时代转型',
      excerpt: '技术背景如何成为 AI 时代的优势？如何将经验转化为可持续的个人价值？',
      category: '个人成长',
    },
  ];

  return (
    <section id="insights" className="py-32 px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl text-gray-900 mb-4 tracking-tight leading-tight">
            持续记录 AI 时代的产品、业务与个体实践
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="text-xs text-gray-400 mb-4 uppercase tracking-wider">{article.category}</div>
              <h3 className="text-lg text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">{article.title}</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed">{article.excerpt}</p>
            </div>
          ))}
        </div>

        <div>
          <button className="px-5 py-2.5 border border-gray-300 text-sm text-gray-700 rounded-md hover:border-gray-400 transition-colors">
            查看全部观点
          </button>
        </div>
      </div>
    </section>
  );
}
