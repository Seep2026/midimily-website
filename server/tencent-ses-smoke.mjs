import { sendAppointmentEmail } from './appointment-mailer.mjs';

if (process.env.EMAIL_MODE !== 'tencent-ses') {
  throw new Error('请先在环境变量中设置 EMAIL_MODE=tencent-ses。');
}

const result = await sendAppointmentEmail({
  serviceType: 'enterprise',
  need: '判断哪个业务流程最值得先做',
  name: '本机测试',
  organization: '米地咨询',
  contact: '无需回复',
  time: '由米地咨询联系确认',
  stage: '尚未开始，想先判断方向',
});

console.info(`Tencent SES smoke test completed: requestId=${result.requestId || 'unknown'} messageId=${result.messageId || 'unknown'}`);
