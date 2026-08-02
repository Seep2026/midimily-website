# Phase 6：Evidence 列表与栏目页正式迁移审计

> 审计日期：2026-08-02  
> 审计对象：`/evidence`、`/topics` 与 3 个 `/topics/:slug` 中的 Evidence 关联列表  
> Preset：`general`（编辑型内容聚合页生产复审）  
> 审计性质：实现、验证与截图完成后的只读审计；本文件不触发自动修改

## 1. 总体结论

**综合评分：9.2 / 10**  
**结论：通过 Phase 6 生产迁移审计，建议进入人工视觉确认。人工确认后，下一个独立阶段应优先迁移 Evidence 正文，不应与首页后续旧 Section 合并。**

`/evidence` 与 `/topics` 已从双列圆角卡片改为稳定纵向编辑列表。页面标题、一句说明、真实编辑说明和列表扫描轴共用正式暖白、蓝灰、发丝线和系统字体。首页 Editorial Story Group → Evidence 聚合页 → Article Header 现在构成连续语法，同时列表没有复制首页 60 / 25 / 15 精选结构。

3 个栏目详情页只替换了“案例、复盘与对比”区块，没有修改栏目正文、CTA、FAQ 或全站 `LinkGrid`。这保持了范围安全，但也意味着栏目页内部仍存在新纵向列表与旧圆角内容块的语言代差。

## 2. 编码前真实页面地图

| 页面 | 路由 | 入口组件 | 当前数据源 | 迁移前列表实现 | 共用关系 / 本轮处理 |
|---|---|---|---|---|---|
| Evidence 总列表 | `/evidence` | `EvidencePage.jsx` | `geoContent.js:evidenceItems` | 页内双列圆角卡片 | 迁移为 `EditorialListingHeader + EditorialList` |
| 栏目索引 | `/topics` | `TopicIndexPage.jsx` | `geoContent.js:topicPages` | 页内双列圆角卡片 | 与 Evidence 总列表共用新正式组件 |
| 企业 AI 栏目 | `/topics/enterprise-ai-landing` | `TopicPage.jsx` | 当前 topic + `getEvidenceBySlugs` | 全站 `LinkGrid` 双列卡片 | 只将 2 条 Evidence 换为 `EditorialList`；方案仍用 `LinkGrid` |
| 个人成长栏目 | `/topics/personal-ai-growth` | `TopicPage.jsx` | 当前 topic + `getEvidenceBySlugs` | 同上 | 同一组件的 1 条数据状态 |
| AI OPC 栏目 | `/topics/ai-opc` | `TopicPage.jsx` | 当前 topic + `getEvidenceBySlugs` | 同上 | 同一组件的 2 条数据状态 |

代码确认不存在 Evidence 分类路由、标签路由、筛选、分页或加载更多。本轮因此没有新增对应 UI，也没有改变数据查询。

### 2.1 共用与高风险边界

- 3 个 `/topics/:slug` 是同一 `TopicPage` 的不同真实数据状态。
- 迁移前 Evidence 总列表与栏目索引只是复制了相似 class，没有真实共享卡片组件。
- `GeoBlocks.LinkGrid` 同时服务 Topic、Evidence 详情和 Solution 详情；直接改它会影响本轮外页面，因此保留不动。
- `App.jsx`、`GeoBlocks.Breadcrumbs`、全局 CSS、Header、Footer、SitePet、SEO 工具、Evidence 数据模型均属高风险层，本轮未修改。
- 首页、Evidence 详情头部、Evidence 正文、Solutions 与 Web Deck 不纳入本轮。

## 3. 正式 Editorial Listing Pattern

`design-system/patterns/editorial-listing.md` 已定义并由生产组件实现：

- 聚合页 H1 使用 48–58px 桌面尺度，明显低于 Home Hero；标题是页面唯一主角。
- 真实编辑说明在桌面使用侧轴，900px 以下进入主流；不使用卡片背景。
- 列表项是 `ol > li > article > heading > a`，优先级为标题 > 摘要 > 真实内容路径。
- 桌面使用 150px 内容路径窄轴 + 最大 720px 标题摘要轴；栏目索引无路径时自然收为单主轴。
- 600px 以下为 20px 页边距的单列，不是桌面卡片压缩。
- 列表完全无图、无阴影、无独立背景、无圆角、无按钮；只用层级、留白和单条发丝线分组。
- 空状态只使用真实说明与可选文字链接，不新增 H1、插图、宠物、图标或 CTA 卡片。

## 4. 验证证据

### 4.1 视口与路由

实测目标为 1440×1000、768×900、390×844 和 375×812。浏览器滚动条占用后实际 `clientWidth` 分别约为 1425 / 753 / 375 / 360px。

- 5 个聚合/栏目路由 × 4 个视口，共20 个状态均满足 `scrollWidth === clientWidth`。
- `/evidence` 为 3 条，`/topics` 为 3 条，3 个栏目详情分别为 2 / 1 / 2 条 Evidence；数量与 `geoContent.js` 一致。
- 每页且只有一个 H1。`/evidence` 和 `/topics` 列表项使用 H2，栏目页区块用 H2、列表项用 H3。
- Evidence 标题链接桌面最小高度实测约 44.16px；390px 三个长标题链接高度均约 72.63px。
- 列表首条链接实际点击后正确进入 `/evidence/enterprise-ai-workflow-pilot`，且详情页只渲染一个正式 `.editorial-article-header`。
- 新建生产预览标签的 Console 为 0 error / 0 warning。

### 4.2 空状态

当前公开数据没有自然空列表，也没有筛选可制造“无结果”。审计时临时将 `/evidence` 的列表传入置空，确认：

- 显示“目前还没有已发布的案例、复盘或对比内容。”；
- `role="status"`，H1 仍为 1，不渲染空 `ol`，390px 无横滚；
- 没有插图、图标、动画、引荐卡片或虚构内容。

截图完成后已立即恢复 `items={listingItems}`。最终源码不保留测试开关，数据查询逻辑未改变。

### 4.3 SEO、构建与隔离

- `/evidence` 迁移前后保持 title `AI 落地案例、复盘与对比｜米地米立`、原 meta description、canonical `https://midimily.com/evidence` 与完整 JSON-LD。
- `/topics` 与 3 个 `/topics/:slug` 的 `SeoMetadata` 参数、Schema 构造、路由与内容查询未改。
- `pnpm lint`、Vite production build、`git diff --check` 全部通过。
- Production build 未发现 3 个 prototype 的 root id、类名前缀或独立入口。
- 构建仍只有既有 `PageController.ts` 使用 `eval` 的提示；本轮没有新增 warning。

### 4.4 截图

截图保存在项目外临时目录 `/tmp/midimily-phase6-audit.ucSBEY/`，不进入正式资产：

- `evidence-1440.png`、`evidence-390.png`、`evidence-768.png`；
- `topic-enterprise-evidence-1440.png`、`topic-enterprise-evidence-390.png`；
- `empty-evidence-390.png`；
- `old-new-evidence-1440.png`；
- `home-list-article-1440.png`。

## 5. 评分表

| 维度 | 评分（0–10） | 生产页与代码依据 |
|---|---:|---|
| 页面标题层级 | 9.2 | 聚合 H1 为 58px 上限，低于 Hero 且高于 26–32px 列表题；说明与侧注明显退后。 |
| 列表扫描效率 | 9.3 | 150 / 720px 双轴与单一纵向顺序支持先扫标题、再看路径和摘要；无按钮与标签噪音。 |
| 编辑感 | 9.1 | 页头只保留一条真实编辑说明，列表依靠排版和内容路径，没有 Featured、Issue、热度或伪索引。 |
| 与首页一致性 | 9.4 | 共用暖白、1180px 外轴、深蓝灰、克制编辑蓝、左对齐和发丝线，但未复制首页精选权重。 |
| 与 Article Header 一致性 | 9.3 | 同一 token / 字体 / Focus 语法，聚合页标题尺度和信息密度更适合扫描。 |
| 卡片依赖控制 | 9.8 | 新列表无独立背景、圆角、阴影、图片或整项 Hover；仅栏目页本轮外正文仍有旧卡片。 |
| 中文排版 | 9.1 | 系统中文字体栈、strict line break、balanced/pretty wrap；中英数字长标题在 4 档宽度无截断或横滚。 |
| 移动端体验 | 8.8 | 20px 边距、单列重排、当前面包屑层视觉省略、链接高度合格；SitePet 在 768px 接近第二条摘要。 |
| 可访问性 | 9.1 | H1/H2/H3、`nav/ol/li/article`、`aria-current`、空状态 `role=status`；链接 44px 且定义 3px/5px `:focus-visible`。 |
| 样式隔离 | 9.5 | 新 CSS 只使用 `editorial-list*` 类并从既有局部 token 读值；未改 body、Tailwind、全局 Breadcrumbs 或其他 pattern。 |
| AI UI 风险控制 | 9.9 | 无卡片阵列、渐变、玻璃、网格、发光、几何体、英文微标签、虚构编号、仪表盘或装饰动效。 |

## 6. 必答问题

### 6.1 是否解决首页到详情页之间的视觉断层？

**核心路径已基本解决。** 首页文章组、`/evidence` 和 Evidence Article Header 共享同一暖白、左轴、蓝灰、发丝线与真实判断语法，三页并排时不再从编辑首页突然跳入白色圆角卡片网格。但栏目详情内部与 Evidence 正文仍有旧卡片层，全站断层尚未完全消失。

### 6.2 是否重新退化为普通博客列表？

**没有。** 它不使用日期、作者、缩略图、“阅读更多”或统一摘要卡片。桌面内容路径窄轴与稳定主阅读轴更接近编辑索引，而不是时间流博客。

### 6.3 是否仍有卡片化残留？

**新 Editorial Listing 内没有。** `/evidence` 和 `/topics` 的被替换卡片、pill 与按钮已删除。卡片残留在栏目详情的 ShortAnswer、适合人群、交付、方法、FAQ 和方案 `LinkGrid`，它们属于后续页面/正文阶段，本轮未扩大清理。

### 6.4 分类与筛选是否过重？

**不存在过重问题，因为真实产品尚无分类/标签/筛选机制。** 界面只在单条 Evidence 上显示真实 `typeLabel`，且是普通低权重文字，不是 pill。

### 6.5 移动端是否适合连续扫描？

**适合。** 内容路径 → 标题 → 摘要的单列顺序稳定，三条文章没有退化为三张同款卡片；当前面包屑层在手机视觉上省略，H1 不被导航重复抢占。375/390px 无横滚。

### 6.6 是否存在 SitePet 干扰？

**存在轻度、可记录的干扰。** 1440px 的 SitePet 位于右侧空轴，没有遮挡标题或摘要；768px 时会靠近第二条摘要右端。390px 栏目页截图中它不遮挡 Evidence 列表，但会触及后续旧 FAQ 卡片。按范围只记录，本轮不修改 SitePet。

### 6.7 是否建议继续进入 Evidence 正文迁移？

**建议，但先完成本轮人工确认，并保持为独立阶段。** 详情头部下方的 ShortAnswer、sections 与相关内容仍是圆角卡片语法，已成为当前内容路径最明显的下一处断层。

### 6.8 是否建议先处理首页后续旧 Section？

**不建议抢在 Evidence 正文之前。** 首页旧 Section 的渐变与卡片代差仍很显眼，但与本轮不应合并。先完成“首页发现 → 列表扫描 → 详情阅读”的 Evidence 主路径，再单独处理首页后续服务 Section，风险更可控。

### 6.9 下一阶段最高优先级是什么？

**Evidence 正文的阅读轴与内容块迁移。** 优先处理 ShortAnswer、正文 sections 和相关内容之间的连续阅读节奏；仍不修改 Header、Footer、SitePet、数据模型或图像系统。

## 7. 旧结构与样式清理

已删除：

- `EvidencePage` 的双列 20px 圆角卡片、type pill、每卡“阅读全文”和旧 ShortAnswer 卡容器。
- `TopicIndexPage` 的双列 20px 圆角卡片、每卡“阅读服务说明”和旧 ShortAnswer 卡容器。
- `TopicPage` 中只用于 Evidence 关联内容的 `LinkGrid` 调用。

已保留：

- `GeoBlocks.LinkGrid`：仍服务栏目相关方案、Evidence 详情和 Solution 详情，删除会越界。
- `GeoBlocks.Breadcrumbs`：详情页仍使用；聚合页采用局部 `EditorialListingHeader` variant，没有全局重写。
- `ShortAnswer`、`PillList`、`FaqList` 和 Topic 页旧卡片正文：属于后续正文/其他页面迁移范围。
- 首页 Editorial Story Group 与 Article Header：只作回归对照，没有修改。

旧 Evidence/Topic 列表样式全部是 JSX 内 Tailwind 字符串，没有可删除的独立旧 CSS 文件。搜索确认两个聚合入口已不再包含旧 `md:grid-cols-2`、`rounded-[20px]` 或“阅读全文”结构。

## 8. 三个主要提升

1. **内容发现路径首次连续。** 首页精选、聚合扫描和详情头部属于同一品牌语法。
2. **列表摆脱卡片模板。** 三条内容无图、无热度、无日期仍可稳定扫描。
3. **新 pattern 有真实复用而没有扩成框架。** 两个聚合入口和三个栏目 Evidence 区块共用最小组件，高风险 `LinkGrid` 与全局 Breadcrumbs 保持原状。

## 9. 三个主要风险

1. **栏目页仍有显著内部代差。** 新 Evidence 列表的无容器排版与上下旧 CTA、pill、FAQ 和卡片正文并置。
2. **SitePet 在中小屏仍可以进入内容轴。** 768px 靠近列表摘要，390px 栏目页靠近后续 FAQ；本轮不能修改。
3. **内容规模尚小。** 当前只有 3 条 Evidence，纵向 pattern 在 20–50 条、真实分类或分页出现后仍需要再验证，但不应现在预先虚构筛选。

## 10. AI UI 停止规则与停止点

可见结果只命中“较大系统无衬线标题”和“结构性留白”两项低风险通用特征。前者承担真实页面标题，后者分隔页面定义与持续扫描；发丝线均是列表边界，不组成网格。没有第三项 AI UI 特征，不触发停止规则。

本轮到此停止。不修改 Evidence 正文、Header、Footer、SitePet、首页后续 Section、全局 body、数据模型或图像系统；不提交 Git commit。
