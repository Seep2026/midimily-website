import { useEffect, useRef, useState } from 'react';
import { resolvePetNavigatorInput } from '../../lib/petNavigator';
import { sitePetConfig } from './petConfig';

const initialMessages = [
  {
    id: 'intro',
    role: 'assistant',
    text: '你可以直接告诉我：想了解企业 AI 落地、个人 AI 成长、教育机构增长，或预约一次咨询。',
  },
];

function getStoredMessages() {
  try {
    const rawValue = window.sessionStorage.getItem(sitePetConfig.navigatorMessagesKey);
    if (!rawValue) {
      return initialMessages;
    }

    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return initialMessages;
    }

    return parsed
      .filter((message) => message?.role === 'assistant' || message?.role === 'user')
      .map((message) => ({
        id: String(message.id || `${message.role}-${Date.now()}`),
        role: message.role,
        text: String(message.text || ''),
      }))
      .filter((message) => message.text.trim());
  } catch {
    return initialMessages;
  }
}

function saveMessages(messages) {
  window.sessionStorage.setItem(sitePetConfig.navigatorMessagesKey, JSON.stringify(messages));
}

function ClearConversationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      <path d="M6.6 14.4 14.9 6c.7-.7 1.8-.7 2.5 0l.6.6c.7.7.7 1.8 0 2.5l-8.4 8.3c-.5.5-1.1.8-1.8.8H5.6v-2.2c0-.7.3-1.3.8-1.8Z" />
      <path d="m13.4 7.5 3 3" />
      <path d="M4.8 20h10.5" />
      <path d="M19 4.2v2.2" />
      <path d="M17.9 5.3h2.2" />
    </svg>
  );
}

function MiziLoadingIcon() {
  return (
    <span
      className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[#7894bd]"
      aria-label="正在理解你的意思"
      role="status"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 animate-spin"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      >
        <path d="M12 3.8v16.4" />
        <path d="M3.8 12h16.4" />
        <path d="M6.2 6.2l11.6 11.6" />
        <path d="M17.8 6.2 6.2 17.8" />
      </svg>
    </span>
  );
}

function MessageList({ messages }) {
  const listRef = useRef(null);

  useEffect(() => {
    const element = listRef.current;
    if (!element) {
      return;
    }

    element.scrollTop = element.scrollHeight;
  }, [messages]);

  return (
    <div ref={listRef} className="max-h-[180px] space-y-2 overflow-y-auto pr-1" aria-live="polite">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <p
            className={`max-w-[86%] rounded-[14px] px-3 py-2 text-[13px] leading-relaxed ${
              message.role === 'user'
                ? 'bg-[#7c92bb] text-white'
                : 'border border-[#d9e4f1] bg-white/82 text-[#405a7a]'
            }`}
          >
            {message.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export function PetNavigatorPanel({ onGuideActivity }) {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState(getStoredMessages);
  const isComposingRef = useRef(false);
  const hasConversation = messages.some((message) => message.role === 'user');

  const appendMessage = (role, text) => {
    setMessages((current) => {
      const nextMessages = [
        ...current,
        {
          id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          role,
          text,
        },
      ].slice(-24);

      saveMessages(nextMessages);
      return nextMessages;
    });
  };

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const handleSubmitText = async (rawText) => {
    const text = rawText.trim();
    if (!text || isThinking) {
      return;
    }

    setInput('');
    appendMessage('user', text);
    setIsThinking(true);
    onGuideActivity?.('think');

    try {
      const result = await resolvePetNavigatorInput(text);
      appendMessage('assistant', result.beforeMessage);

      window.setTimeout(() => {
        if (result.afterMessage && result.afterMessage !== result.beforeMessage) {
          appendMessage('assistant', result.afterMessage);
        }
      }, 320);

      onGuideActivity?.(result.success ? 'happy' : 'failed');
    } catch (error) {
      console.warn('[PetNavigator] Failed to resolve input.', error);
      appendMessage('assistant', '我这边没有处理成功。你可以换一种说法，比如“我想看企业 AI 落地”或“我想预约咨询”。');
      onGuideActivity?.('failed');
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitText(input);
  };

  const handleClearMessages = () => {
    setInput('');
    setMessages([...initialMessages]);
    saveMessages(initialMessages);
  };

  return (
    <aside
      data-page-agent-ignore="true"
      className="pointer-events-auto w-[min(360px,calc(100vw-24px))] rounded-[18px] border border-[#d6e2f0] bg-[#fffdf9]/96 p-4 text-[#324967] shadow-[0_12px_30px_rgba(84,108,145,0.14)] backdrop-blur-md"
      aria-label="米立 AI 向导"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[16px] font-semibold text-[#2e415f]">米立 AI 向导</h2>
          <p className="mt-1 text-[12px] leading-relaxed text-[#6a7f9d]">告诉我你想了解的，我帮你搞定网页切换～</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {isThinking ? <MiziLoadingIcon /> : null}
          {hasConversation ? (
            <button
              type="button"
              aria-label="清空对话"
              title="清空对话"
              onClick={handleClearMessages}
              className="grid h-9 w-9 place-items-center rounded-full border border-transparent text-[#8798af] transition hover:border-[#dce7f4] hover:bg-white/74 hover:text-[#58749c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9db3d7]"
            >
              <ClearConversationIcon />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4">
        <MessageList messages={messages} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <label className="min-w-0 flex-1">
          <span className="sr-only">告诉米立你想了解什么</span>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={1}
            placeholder={isThinking ? '米立正在理解你的意思...' : '输入你的问题，按 Enter 发送'}
            className="min-h-11 w-full resize-none rounded-[12px] border border-[#d4e1ef] bg-white/88 px-3 py-3 text-[13px] leading-relaxed text-[#324967] outline-none transition placeholder:text-[#6f819b] focus:border-[#9db3d7] focus:ring-2 focus:ring-[#d7e3f5]"
            disabled={isThinking}
            onCompositionStart={() => {
              isComposingRef.current = true;
            }}
            onCompositionEnd={() => {
              isComposingRef.current = false;
            }}
            onKeyDown={(event) => {
              if (
                event.key === 'Enter' &&
                !event.shiftKey &&
                !isComposingRef.current &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                handleSubmitText(event.currentTarget.value);
              }
            }}
          />
        </label>
      </form>
    </aside>
  );
}
