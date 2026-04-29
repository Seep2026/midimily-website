export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-[15px] tracking-tight text-gray-900">米地.米立</div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[13px]">
          <a href="#home" className="text-gray-500 hover:text-gray-900 transition-colors">首页</a>
          <a href="#services" className="text-gray-500 hover:text-gray-900 transition-colors">服务</a>
          <a href="#insights" className="text-gray-500 hover:text-gray-900 transition-colors">观点</a>
          <a href="#about" className="text-gray-500 hover:text-gray-900 transition-colors">关于</a>
          <a href="#contact" className="text-gray-500 hover:text-gray-900 transition-colors">联系</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:block px-4 py-2 text-[13px] text-gray-600 hover:text-gray-900 transition-colors">
            企业微信
          </button>
          <button className="px-4 py-2 text-[13px] bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
            预约沟通
          </button>
        </div>
      </div>
    </header>
  );
}
