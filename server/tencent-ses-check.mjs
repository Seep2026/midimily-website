import {
  createTencentSesClient,
  getTencentSesApiConfig,
} from './appointment-mailer.mjs';

const STATUS_LABELS = {
  0: '审核通过',
  1: '审核中',
  2: '审核拒绝',
};

try {
  const config = getTencentSesApiConfig();
  const client = await createTencentSesClient(config.clientConfig);
  const response = await client.GetEmailTemplate({ TemplateID: config.templateId });

  console.info(JSON.stringify({
    templateId: config.templateId,
    templateName: response.TemplateName,
    templateStatus: response.TemplateStatus,
    templateStatusLabel: STATUS_LABELS[response.TemplateStatus] || '不可用',
    requestId: response.RequestId,
  }));

  if (response.TemplateStatus !== 0) {
    throw new Error(`模板 ${config.templateId} 尚未审核通过。`);
  }
} catch (error) {
  console.error(`腾讯云 SES 检查失败：${error instanceof Error ? error.message : '未知错误'}`);
  process.exitCode = 1;
}
