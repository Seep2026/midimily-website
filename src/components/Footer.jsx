export function Footer() {
  return (
    <footer className="py-20 px-8 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="text-lg text-gray-900 mb-3">米地.米立</div>
            <p className="text-[13px] text-gray-500 mb-3">AI 技术产品化、AI 在企业落地与 OPC 实践</p>
            <p className="text-[13px] text-gray-600 leading-relaxed max-w-md">
              专注于 AI 软件原创与二次开发、AI 在企业业务中的落地与陪跑，以及面向个体成长的经验沉淀与知识服务。
            </p>
          </div>

          <div>
            <h4 className="text-sm text-gray-900 mb-4">导航</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><a href="#home" className="text-gray-500 hover:text-gray-900 transition-colors">首页</a></li>
              <li><a href="#services" className="text-gray-500 hover:text-gray-900 transition-colors">服务</a></li>
              <li><a href="#insights" className="text-gray-500 hover:text-gray-900 transition-colors">观点</a></li>
              <li><a href="#about" className="text-gray-500 hover:text-gray-900 transition-colors">关于</a></li>
              <li><a href="#contact" className="text-gray-500 hover:text-gray-900 transition-colors">联系</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-gray-900 mb-4">联系方式</h4>
            <ul className="space-y-2.5 text-[13px] text-gray-500">
              <li>企业微信</li>
              <li>hello@midimily.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-[13px] text-gray-500 text-center">
          <p>© 2026 米地.米立 Midimily. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
