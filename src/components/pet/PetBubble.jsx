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

    </aside>
  );
}
