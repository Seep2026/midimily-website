export function Collaboration() {
  return (
    <section className="py-32 px-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20">
          <h2 className="text-5xl text-gray-900 mb-4 tracking-tight leading-tight">
            可以怎样合作
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-xl text-gray-900 mb-8">企业合作</h3>
            <ul className="space-y-4 mb-10">
              {[
                'AI 产品方向共创',
                '开源项目评估与二次开发建议',
                'AI 场景梳理与业务落地支持',
                '内容、运营、知识流程中的 AI 接入',
                '中短期项目推进与陪跑',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  <span className="text-[15px] text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
              预约企业沟通
            </button>
          </div>

          <div className="p-10 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-xl text-gray-900 mb-8">个人咨询</h3>
            <ul className="space-y-4 mb-10">
              {[
                'AI 时代职业认知与路径判断',
                '计算机相关专业毕业生发展建议',
                'OPC 路径交流与现实问题讨论',
                '经验沉淀、知识服务与问题咨询',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  <span className="text-[15px] text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 border border-gray-300 text-gray-700 text-sm rounded-md hover:border-gray-400 transition-colors">
              预约个人交流
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
