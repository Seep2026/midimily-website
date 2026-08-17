# 预约邮件服务

网站表单将 `POST /api/appointments` 交给独立的 Node 服务处理。浏览器不会包含收件邮箱、抄送邮箱或腾讯云密钥。

## 当前发送方式

预约服务支持三种模式：

- `EMAIL_MODE=console`：仅在终端显示邮件内容，不对外发送。
- `EMAIL_MODE=tencent-ses`：通过腾讯云邮件推送 `SendEmail` API 发送，是当前推荐模式。
- `EMAIL_MODE=smtp`：保留原有 SMTP 兼容方式。

## 腾讯云前置条件

真实发送前，腾讯云控制台需要同时具备：

1. `midimily.com` 发信域名已验证通过。
2. `admin@midimily.com` 已创建为可用发信地址。
3. 已创建并审核通过“预约通知”邮件模板。当前模板 ID 为 `212453`。
4. 已获得同一密钥的 `SecretId` 和 `SecretKey`。

> 新开通的邮件推送账号默认只能使用审核通过的模板发送。仅有发信地址和 SecretId 还不足以完成投递。

## 创建腾讯云模板

在腾讯云邮件推送控制台创建触发类模板。模板中使用以下变量：

```text
{{service}}
{{need}}
{{name}}
{{organization}}
{{contact}}
{{time}}
{{stage}}
```

建议的纯文本模板：

```text
米地咨询新预约

咨询方向：{{service}}
当前需求：{{need}}
称呼：{{name}}
公司或身份：{{organization}}
联系方式：{{contact}}
方便联系的时段：{{time}}
当前阶段：{{stage}}
```

建议的 HTML 模板：

```html
<div style="font-family:Arial,'PingFang SC','Microsoft YaHei',sans-serif;color:#2e415f;line-height:1.7">
  <h2 style="font-size:20px;margin:0 0 16px">米地咨询新预约</h2>
  <table style="border-collapse:collapse;width:100%;max-width:640px">
    <tr><th style="border-bottom:1px solid #d7e3f0;padding:10px 14px 10px 0;text-align:left;width:140px">咨询方向</th><td style="border-bottom:1px solid #d7e3f0;padding:10px 0">{{service}}</td></tr>
    <tr><th style="border-bottom:1px solid #d7e3f0;padding:10px 14px 10px 0;text-align:left">当前需求</th><td style="border-bottom:1px solid #d7e3f0;padding:10px 0">{{need}}</td></tr>
    <tr><th style="border-bottom:1px solid #d7e3f0;padding:10px 14px 10px 0;text-align:left">称呼</th><td style="border-bottom:1px solid #d7e3f0;padding:10px 0">{{name}}</td></tr>
    <tr><th style="border-bottom:1px solid #d7e3f0;padding:10px 14px 10px 0;text-align:left">公司或身份</th><td style="border-bottom:1px solid #d7e3f0;padding:10px 0">{{organization}}</td></tr>
    <tr><th style="border-bottom:1px solid #d7e3f0;padding:10px 14px 10px 0;text-align:left">联系方式</th><td style="border-bottom:1px solid #d7e3f0;padding:10px 0">{{contact}}</td></tr>
    <tr><th style="border-bottom:1px solid #d7e3f0;padding:10px 14px 10px 0;text-align:left">方便联系的时段</th><td style="border-bottom:1px solid #d7e3f0;padding:10px 0">{{time}}</td></tr>
    <tr><th style="border-bottom:1px solid #d7e3f0;padding:10px 14px 10px 0;text-align:left">当前阶段</th><td style="border-bottom:1px solid #d7e3f0;padding:10px 0">{{stage}}</td></tr>
  </table>
</div>
```

`stage` 只能使用网站下拉框中的固定选项，不接受自由文本。

## 本机配置

本机预约邮件使用不会被 Git 跟踪的 `.env.appointment.local`：

```bash
EMAIL_MODE=tencent-ses
APPOINTMENT_TRUST_PROXY=true
APPOINTMENT_TO=<主收邮箱>
APPOINTMENT_CC=<抄送邮箱>
APPOINTMENT_FROM="米地咨询 <admin@midimily.com>"
APPOINTMENT_REPLY_TO=admin@midimily.com

TENCENTCLOUD_SECRET_ID=<SecretId>
TENCENTCLOUD_SECRET_KEY=<SecretKey>
TENCENT_SES_REGION=ap-hongkong
TENCENT_SES_TEMPLATE_ID=212453
```

不要将任何密钥放入 `VITE_` 开头的环境变量。`VITE_` 变量会进入浏览器代码。

## 本机验证

先运行不调用腾讯云的自动测试：

```bash
npm run appointments:test
```

模板审核期间，可以只查询模板状态，不发送邮件：

```bash
npm run appointments:ses:check
```

启动本机预约接口（会自动读取 `.env.local` 和 `.env.appointment.local`）：

```bash
npm run appointments:start
```

再发送一封真实联调邮件：

```bash
npm run appointments:ses:test
```

接口成功时终端会输出 `RequestId` 和 `MessageId`。这表示腾讯云已接受请求并放入发送队列，不等于收件服务商已完成投递。最终送达状态可在腾讯云控制台查看。

如果暂时还没有模板 ID，可以继续使用安全的终端模式：

```bash
EMAIL_MODE=console npm run appointments:start
```

## 生产环境配置

建议将生产变量放在服务器的 `/etc/midimily/appointment.env`，而不是项目目录或 Git 仓库。

创建 `/etc/systemd/system/midimily-appointment.service`：

```ini
[Unit]
Description=Midimily appointment email service
After=network.target

[Service]
Type=simple
User=<运行站点的系统用户>
WorkingDirectory=<midimily 项目绝对路径>
EnvironmentFile=/etc/midimily/appointment.env
ExecStart=/usr/bin/node server/appointment-server.mjs
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

配置完成后启用服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now midimily-appointment
curl http://127.0.0.1:8787/health
```

Nginx 需要把表单接口转发到本机服务：

```nginx
location = /api/appointments {
  proxy_pass http://127.0.0.1:8787/api/appointments;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

服务提供 `GET /health`，可用于上线后的健康检查。它包含字段校验、隐藏字段防垃圾提交和基本频率限制。

## IP 预约限制

- 同一客户端 IP 在 60 分钟内只能成功提交一次预约。
- 字段校验失败或腾讯云发送失败不会占用这次名额。
- Nginx 将真实客户端地址写入 `X-Real-IP`，预约服务通过 `APPOINTMENT_TRUST_PROXY=true` 读取它。
- 限制记录保存在预约服务的内存中，服务重启后会重置。
