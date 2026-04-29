export function WhoFor() {
  return (
    <section className="py-32 px-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl text-gray-900 mb-4 tracking-tight leading-tight">
            这些场景，可能正适合我参与
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">
              面向企业
            </h3>
            <ul className="space-y-5">
              {[
                '想基于 AI 做新产品探索的团队',
                '想围绕开源项目做二次开发的团队',
                '想推动 AI 进入业务流程的企业',
                '缺少既懂技术又懂业务协同的外部支持者',
                '希望不是只听建议，而是有人一起推进落地',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  <span className="text-[15px] text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm text-gray-500 uppercase tracking-wider">
              面向个人
            </h3>
            <ul className="space-y-5">
              {[
                '想理解 AI 对职业影响的职场人',
                '计算机及相关专业毕业生',
                '想尝试 OPC 或独立路径的人',
                '想把既有经验与 AI 结合起来的人',
                '想寻找现实可行转型路径的人',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  <span className="text-[15px] text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
