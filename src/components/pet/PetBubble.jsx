export function PetBubble({ message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <aside
      className="pointer-events-auto w-[min(280px,calc(100vw-32px))] rounded-[18px] border border-[#cbd8f2] bg-[#fffdf8]/95 p-4 text-[#405a7a] shadow-[0_16px_34px_rgba(72,94,130,0.18)] backdrop-blur-md"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <p className="min-w-0 flex-1 text-[13px] leading-relaxed">{message}</p>
        <button
          type="button"
          aria-label="关闭提示"
          onClick={onClose}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[16px] leading-none text-[#7a8aa4] transition hover:bg-[#edf3fb] hover:text-[#526b91]"
        >
          ×
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href="/#business"
          className="rounded-full border border-[#c9d7ef] bg-[#f3f7ff] px-3 py-1.5 text-[12px] text-[#55739e] transition hover:border-[#adc3e3] hover:bg-white"
        >
          了解企业服务
        </a>
        <a
          href="/#individual"
          className="rounded-full border border-[#d2d8ef] bg-[#f8f6ff] px-3 py-1.5 text-[12px] text-[#60719b] transition hover:border-[#b9c4e4] hover:bg-white"
        >
          了解个人成长
        </a>
      </div>
    </aside>
  );
}
