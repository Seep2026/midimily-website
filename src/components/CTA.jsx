export function CTA() {
  return (
    <section id="contact" className="py-32 px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h2 className="text-5xl text-gray-900 tracking-tight leading-tight">
            如果你正在寻找 AI 时代的新落点，欢迎和我聊聊
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg text-gray-900 mb-4">企业合作</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                如果你的团队正在探索 AI 产品方向、计划进行开源项目二次开发，或希望推动 AI 在业务中的实际落地，我们可以一起推进。
              </p>
            </div>

            <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg text-gray-900 mb-4">个人交流</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                如果你正在思考 AI 对职业的影响、计算机专业的发展路径，或是 OPC 与独立实践的可能性，欢迎交流探讨。
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
              预约沟通
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 text-sm rounded-md hover:border-gray-400 transition-colors">
              添加企业微信
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
