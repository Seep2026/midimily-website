export function WhyMe() {
  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-5 gap-16 items-start">
        <div className="md:col-span-3 space-y-6">
          <h2 className="text-5xl text-gray-900 tracking-tight leading-tight">
            为什么由我来做这件事
          </h2>
          <div className="space-y-6 text-[15px] leading-relaxed text-gray-600">
            <p>
              我拥有多年技术、产品、运营与管理经验，经历过大厂，也经历过创业。
              今天重新进入 AI 这条主线，我更关注的不是&quot;模型更新有多快&quot;，而是一个更现实的问题：
            </p>
            <p className="text-lg text-gray-900">
              AI 如何真正进入产品、业务与个人实践，而不只是停留在演示和热闹里。
            </p>
            <p>
              因此，米地.米立关注的不只是能力接入，更是能力的产品化、组织化与长期价值沉淀。
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {[
            { number: '26 年', label: '从业经历' },
            { number: '大厂 + 创业', label: '双重实践' },
            { number: '技术 × 产品 × 运营', label: '全栈经验' },
            { number: 'AI 长期实践者', label: '持续探索' },
          ].map((item, index) => (
            <div
              key={index}
              className="pb-6 border-b border-gray-200 last:border-0"
            >
              <div className="text-sm text-gray-900 mb-1">{item.number}</div>
              <div className="text-[13px] text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
