import { useState } from 'react';
import {
  APPOINTMENT_NEED_OPTIONS,
  APPOINTMENT_STAGE_OPTIONS,
  APPOINTMENT_TIME_OPTIONS,
} from '../../shared/appointment-options.js';

const initialForm = {
  serviceType: 'enterprise',
  need: '',
  name: '',
  organization: '',
  contact: '',
  time: '',
  stage: '',
  website: '',
};

export function AppointmentForm({ defaultServiceType = 'enterprise', compact = false }) {
  const [form, setForm] = useState({ ...initialForm, serviceType: defaultServiceType });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === 'serviceType' ? { need: '' } : {}),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(import.meta.env.VITE_APPOINTMENT_API_URL || '/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || '提交暂时没有成功，请稍后再试。');
      }

      setStatus('success');
      setForm({ ...initialForm, serviceType: form.serviceType });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '提交暂时没有成功，请稍后再试。');
    }
  };

  const options = APPOINTMENT_NEED_OPTIONS[form.serviceType];

  return (
    <section
      id="appointment"
      className={`appointment-form-section${compact ? ' appointment-form-section--compact' : ''}`}
      aria-labelledby="appointment-title"
    >
      <div className="appointment-form-section__inner">
        <header className="appointment-form-section__header">
          <p>开始交流</p>
          <h2 id="appointment-title">先说说你正在处理的事。</h2>
          <p>提交后，米地咨询会在 1 个工作日内通过你留下的方式联系你。</p>
        </header>

        {status === 'success' ? (
          <div className="appointment-form__success" role="status" tabIndex={-1}>
            <h3>已收到你的信息。</h3>
            <p>我们会在 1 个工作日内联系你，确认下一步交流的时间和准备内容。</p>
            <button type="button" onClick={() => setStatus('idle')}>再提交一条</button>
          </div>
        ) : (
          <form className="appointment-form" onSubmit={handleSubmit}>
            <fieldset className="appointment-form__choice">
              <legend>你想讨论哪一类事情？</legend>
              <div>
                <label>
                  <input
                    type="radio"
                    name="serviceType"
                    value="enterprise"
                    checked={form.serviceType === 'enterprise'}
                    onChange={handleChange}
                  />
                  <span>企业 AI 落地</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="serviceType"
                    value="individual"
                    checked={form.serviceType === 'individual'}
                    onChange={handleChange}
                  />
                  <span>个体 AI 成长</span>
                </label>
              </div>
            </fieldset>

            <div className="appointment-form__grid">
              <label className="appointment-form__field appointment-form__field--wide">
                <span>你目前最想解决什么？</span>
                <select name="need" value={form.need} onChange={handleChange} required>
                  <option value="">请选择</option>
                  {options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label className="appointment-form__field">
                <span>怎么称呼你？</span>
                <input name="name" autoComplete="name" value={form.name} onChange={handleChange} required />
              </label>
              <label className="appointment-form__field">
                <span>{form.serviceType === 'enterprise' ? '公司或团队名称' : '所在行业或当前身份'} <em>可选</em></span>
                <input name="organization" value={form.organization} onChange={handleChange} />
              </label>
              <label className="appointment-form__field">
                <span>微信或手机号码</span>
                <input name="contact" autoComplete="tel" value={form.contact} onChange={handleChange} required />
              </label>
              <label className="appointment-form__field">
                <span>方便联系的时段</span>
                <select name="time" value={form.time} onChange={handleChange} required>
                  <option value="">请选择</option>
                  {APPOINTMENT_TIME_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label className="appointment-form__field appointment-form__field--wide">
                <span>目前处于哪一步？</span>
                <select name="stage" value={form.stage} onChange={handleChange} required>
                  <option value="">请选择</option>
                  {APPOINTMENT_STAGE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
            </div>

            <label className="appointment-form__trap" aria-hidden="true">
              请保持此项为空
              <input name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={handleChange} />
            </label>

            <div className="appointment-form__submit">
              <button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? '正在提交…' : '提交预约'}
              </button>
              <p>提交即表示你同意米地咨询仅为本次沟通使用以上信息。</p>
            </div>
            {status === 'error' ? <p className="appointment-form__error" role="alert">{errorMessage}</p> : null}
          </form>
        )}
      </div>
    </section>
  );
}
