# Phase 7 全站生产视觉审计

> 审计对象：当前本地生产实现  
> 方向：Editorial Clarity × Human Observation / 编辑式清晰，人本式观察  
> Preset：`general`（编辑内容站）  
> 审计方式：真实路由代码检查、1440 / 1024 / 768 / 390px 浏览器检查、键盘与触控尺寸抽查、console、lint、build、SEO 元数据核对。

## 1. 迁移范围

| 页面 / 区域 | 当前组件 | 迁移前主要问题 | 本轮处理 |
|---|---|---|---|
| 首页后续区块 | `ServicesOverview`、`BusinessService`、`IndividualGrowth`、`PracticeSamples`、`CTA` | 渐变、胶囊、等权卡片和重复 Section 模板 | 改为非对称路径、真实步骤序列、纵向实践清单和文本式联系区 |
| Evidence 正文 | `EvidenceDetailPage`、`GeoBlocks` | 正文、结论、受众和相关内容均以圆角容器承载 | 建立 780px 阅读轴、页边结论、发丝分段与文本关联列表 |
| Topic 详情余下区域 | `TopicPage`、`GeoBlocks` | 双 CTA、卡片化定义/受众/交付/痛点/FAQ | 改为主次链接、双轴事实区、真实方法序列和无卡片 FAQ |
| 方案库与方案详情 | `SolutionsPage`、`SolutionCard`、`SolutionCategoryCard`、`SolutionDetailPage` | 抽象 Deck 假封面、渐变筛选卡、Hover 上浮、胶囊元信息 | 改为编辑列表、线性筛选和内容阅读轴；Web Deck 子系统保持原样 |
| Global Chrome | `Header`、`Footer` | 半透明模糊、圆角移动菜单、四栏模板感 | 改为暖白发丝框架、清晰 active/focus、轻量移动菜单与编辑式页脚 |
| 导航与辅助 | `Breadcrumbs`、`SitePet` | Breadcrumbs 权重偏高；小米立在窄屏覆盖正文 | Breadcrumbs 降权并在手机省略当前项；1180px 以下不渲染小米立入口 |

## 2. 总评分

总分：**9.1 / 10**。全站主内容流已经形成统一的暖白、蓝灰、左对齐阅读轴、发丝分组和克制链接语法；卡片不再是默认内容容器。保留的旧视觉集中在独立 Web Deck 和小米立交互面板，未与主要编辑阅读流直接混用。

| 维度 | 分数 | 代码或页面依据 |
|---|---:|---|
| 全站视觉一致性 | 9.2 | App 根级使用冻结 token scope；首页、Evidence、Topic、方案页共用暖白、阅读轴和发丝规则 |
| 首页完整度 | 9.1 | Hero、精选内容、服务路径、真实步骤、实践样本与联系区形成完整叙事，不再回落卡片网格 |
| 聚合页扫描效率 | 9.3 | Evidence / Topic 延续 Editorial Listing；方案库同步改为纵向编辑列表 |
| 正文阅读体验 | 9.1 | Evidence 正文收敛至 780px；ShortAnswer、结论、正文与相关链接有明确节奏 |
| Topic 页完整度 | 9.1 | 标题、短答案、定义、受众、交付、痛点、方法、Evidence 与 FAQ 形成连续内容轴 |
| Global Chrome | 8.9 | Header/Footer 与页面同色同线；移动菜单 44px；导航 active 可辨认 |
| 中文排版 | 9.1 | 真实系统中文字体栈、自然换行、稳定行高；390px 无标题横溢 |
| 移动端体验 | 9.0 | 390 / 768px 均无横向溢出；双轴重新排列；窄屏移除小米立遮挡源 |
| 可访问性 | 8.9 | 语义列表/导航/详情元素、可见 focus、44px 主交互尺寸；内容不依赖 Hover 才可理解 |
| 样式隔离 | 9.3 | 新规则集中于 `src/styles/editorial/production.css` 与 `GeoBlocks.css`；未改全局 token/Tailwind 配置 |
| AI UI 风险控制 | 9.5 | 生产主内容流无渐变光斑、玻璃、统一卡片阵列、英文微标签、虚构编号或 Hover 上浮 |

## 3. 关键结论

1. **已完成迁移：** 首页全部主区块、Evidence 聚合与详情、Topic 聚合与详情、方案库与常规方案详情、Header、Footer、Breadcrumbs。
2. **仍保留旧视觉：** Web Deck 播放/控制子系统、小米立的对话面板与气泡、三个不存在页面的错误状态。它们是独立交互或低频状态，不构成主阅读流断层。
3. **视觉断层：** 常规页面之间未发现明显断层；进入 Web Deck 后会切换到演示子系统语言，这是本轮明确保留的功能边界。
4. **SitePet：** 1440px 位于内容外侧安全区；1180px 以下不渲染，390 / 768 / 1024px 不再遮挡标题、正文、FAQ、Footer 或触控入口。
5. **Header / Footer：** 色彩、规则线、字体、链接状态与正文协调；移动端菜单与 Footer 均保持单列阅读节奏。
6. **SEO / 路由 / 数据：** 抽查 8 条真实路由；首页、Topic、Evidence、方案列表及详情的 title、canonical、JSON-LD 均保持。未修改路由架构、SEO 生成逻辑或内容数据模型。Web Deck 保持既有独立行为。

## 4. 问题与同轮修复

| 优先级 | 问题 | 结果 |
|---|---|---|
| P0 | 构建、路由、SEO、数据错误 | 未发现 |
| P1 | 小米立在 390px 正文右下方覆盖文字 | 已修复：1180px 以下不渲染入口，宽桌面保留且落在内容外侧 |
| P1 | 移动端品牌首页链接可点击高度只有 38px | 已修复：Header 品牌入口最小高度 44px |
| P1 | 横向溢出、不可读辅助字、focus 缺失 | 抽查未发现；390 / 768 / 1024 / 1440px 横向溢出均为 0 |

修复后重新检查：lint PASS；build PASS；console error 0；`git diff --check` 结果见最终交付。

## 5. 剩余 P2

- 首页后半连续使用发丝纵向列表，长时间浏览时节奏略趋同；后续只有在获得真实工作截图或流程证据后，才适合引入一次有信息价值的图像停顿。
- Footer 的社交账号仍是现有文字加本地图片形式，信息成立但视觉精度低于主内容；需等待正式社交资产规范，不建议本轮猜测重做。
- Web Deck 与常规编辑页面的视觉切换仍明显；它属于独立演示系统，应在单独范围内审计，不能用本轮页面 CSS 强行覆盖。

以上均不阻塞上线，不建议在缺少真实素材或独立 Deck 任务时立即修复。

## 6. 审计证据

截图目录：`/tmp/midimily-phase7-audit/`

- 首页：`home-full-1440.jpg`、`home-full-390.jpg`
- Evidence：`evidence-full-1440.jpg`、`evidence-full-390.jpg`
- Topic：`topic-full-1440.jpg`、`topic-full-390.jpg`
- 移动 Header / Footer：`home-390-header-final.jpg`、`home-390-footer-final.jpg`
- SitePet 高风险页：`solution-detail-1440.jpg`（宠物位于内容外侧）；`topic-768.jpg`（窄屏不渲染）

## 7. 结论

建议结束 Phase 7 并进入人工全站确认。当前实现已经从“局部 prototype 风格”收敛为可连续浏览的生产语言，同时保留 SEO、路由、数据、Web Deck 与现有内容能力；没有需要继续自动修复的 P0 / P1 问题。
