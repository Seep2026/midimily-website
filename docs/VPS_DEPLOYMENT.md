# VPS 部署与更新

`scripts/deploy-vps.sh` 同时发布静态网站和预约邮件服务。VPS 完成一次性配置后，后续可以使用同一条命令更新。

## 一次性配置

### 1. 网站构建环境

在项目目录创建不纳入 Git 的 `.env.production`：

```bash
VITE_AI_NAVIGATOR_BASE_URL=https://tokenfleet.cn/v1
VITE_AI_NAVIGATOR_API_KEY=<production-key>
VITE_AI_NAVIGATOR_MODEL=glm-5.1
```

`VITE_` 变量会进入浏览器代码。腾讯云 SecretId 和 SecretKey 不得写在这个文件中。

### 2. 预约服务环境

在 VPS 创建 `/etc/midimily/appointment.env`：

```bash
EMAIL_MODE=tencent-ses
APPOINTMENT_PORT=8787
APPOINTMENT_HOST=127.0.0.1
APPOINTMENT_ALLOWED_ORIGINS=https://midimily.com
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

限制文件权限：

```bash
sudo chown root:root /etc/midimily/appointment.env
sudo chmod 600 /etc/midimily/appointment.env
```

### 3. systemd 服务

创建 `/etc/systemd/system/midimily-appointment.service`，将占位内容替换为 VPS 上的实际用户和项目路径：

```ini
[Unit]
Description=Midimily appointment email service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=<运行用户>
WorkingDirectory=<midimily 项目绝对路径>
Environment=NODE_ENV=production
EnvironmentFile=/etc/midimily/appointment.env
ExecStart=/usr/bin/node server/appointment-server.mjs
Restart=on-failure
RestartSec=5
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

先用 `command -v node` 确认 Node 路径。如果不是 `/usr/bin/node`，需要同步修改 `ExecStart`。

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now midimily-appointment
curl --fail http://127.0.0.1:8787/health
```

### 4. Nginx 预约代理

在 `midimily.com` 的 HTTPS `server` 中增加：

```nginx
location = /api/appointments {
  proxy_pass http://127.0.0.1:8787/api/appointments;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_connect_timeout 5s;
  proxy_read_timeout 20s;
}
```

验证后重载：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 发布前预检

首次配置或修改服务器环境后，先执行：

```bash
./scripts/deploy-vps.sh --check
```

预检只检查 Git、Node.js、npm、systemd 服务、预约环境变量和网站构建变量，不会拉取代码、删除文件、重启服务或重载 Nginx。

## 日常更新

当前版本已提交并推送到远程仓库后，在 VPS 项目目录执行：

```bash
./scripts/deploy-vps.sh --branch main
```

脚本依次执行：

1. 预检预约 systemd 服务和 `/etc/midimily/appointment.env`。
2. 拉取指定分支，默认仅允许 fast-forward 更新。
3. 使用 `npm ci` 按 `package-lock.json` 安装依赖。
4. 运行 ESLint 和预约服务自动测试。
5. 使用生产密钥只读检查腾讯云 SES 模板，模板未审核通过时停止发布。
6. 重新构建全部 Web Deck 和网站 `dist`。
7. 重启 `midimily-appointment.service`，并轮询 `/health` 确认服务恢复。
8. 执行 `nginx -t`，通过后重载 Nginx。

## 可选参数

```text
--branch <name>                 发布指定分支
--force                         丢弃 VPS 项目目录内的本地更改
--skip-tests                    跳过代码检查和预约测试
--skip-appointment-restart      仅发布静态网站，跳过预约服务检查与重启
--skip-nginx-reload             跳过 Nginx 检查与重载
```

`--force` 会执行 `git reset --hard` 和 `git clean -fd`，只应在确定 VPS 项目目录没有需要保留的本地文件时使用。生产密钥放在 `/etc/midimily/appointment.env`，不会被 Git 清理。

## 异常查看

```bash
sudo systemctl status midimily-appointment --no-pager
sudo journalctl -u midimily-appointment -n 100 --no-pager
curl --fail http://127.0.0.1:8787/health
```

Vite 可能会提示供应商 PageAgent `PageController.ts` 内使用 `eval`。Midimily 集成已禁用 PageAgent 的 JavaScript 执行工具，该警告不会阻断构建。
