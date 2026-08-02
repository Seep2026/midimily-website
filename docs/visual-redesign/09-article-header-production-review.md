# Phase 4B：Evidence 文章详情页头部正式迁移审计

> 审计日期：2026-08-02  
> 审计对象：全部 `/evidence/:slug` 正式详情页  
> Preset：`general`（编辑型内容页生产复审）  
> 审计性质：实现完成后的只读审计；本文件不触发自动修改

## 1. 总体结论

**综合评分：9.3 / 10**  
**结论：通过 Phase 4B 生产迁移审计，建议进入人工视觉确认。人工确认后，可以开始首页 Hero 的独立正式迁移。**

正式页面保留了 prototype 的核心品质：标题是唯一主角，有批注时形成清楚的桌面侧轴，移动端进入阅读流；无批注时不保留空侧栏、占位线或提示文字。真实数据、SEO、正文、推荐内容和全局页面结构均未被改写。主要未决风险来自新编辑头部与旧卡片化正文之间的语言差异，以及全局 SitePet 在小屏下仍可能靠近正文卡片；两者都超出本轮边界，不应在本审计后自动修正。

## 2. 审计范围与证据

### 页面与视口

- 有批注：`/evidence/enterprise-ai-workflow-pilot`，1440×1000、768×900、390×844、375×812。
- 无批注：`/evidence/personal-ai-workflow-30-days`，1440×1000、390×844。
- 额外路由：`/evidence/ai-consulting-vs-ai-training` 与首页 `/`。
- 截图保存在项目外临时目录：`/tmp/midimily-phase4b-audit.zShsFp/`，不进入正式资产。

正式截图：

- `new-annotated-1440.jpg`
- `new-annotated-390.jpg`
- `new-no-note-1440.jpg`
- `new-no-note-390.jpg`

旧版对照保留 `old-annotated-1440.jpg`。移动旧版以 `05-article-header-prototype-review.md` 的 390px 指标和迁移前 DOM 基线说明为准；不为制造对照而恢复旧生产分支。

### 运行与代码证据

- 1440px 有批注页：外层 1180px、主轴 780px、侧注 280px；标题 65.52px、两行；摘要 21px / 650px。
- 768px：桌面 grid 已变为 block，批注宽 620px 并进入主阅读流。
- 390px：标题约 39.98px、三行；摘要 18px；批注 16px；内容类型链接高度 44px。
- 375px：标题约 38.44px；无横向溢出。
- 四个目标宽度均满足 `scrollWidth === clientWidth`；浏览器 console 无 error / warning。
- Focus 实测为 3px `#2e5b94` 实线、5px offset，目标高度 44px。
- `pnpm lint`、Vite production build、`git diff --check` 均通过。
- Production build 未发现三个 prototype 的 root id、类名前缀或独立入口；只有既有 `PageController.ts` 的 `eval` 警告，本轮未新增 warning。

## 3. 评分表

| 维度 | 评分（0–10） | 正式页面与代码依据 |
|---|---:|---|
| Prototype 一致性 | 9.2 | 保留 1180/780/280 桌面关系、系统字体、暖白、侧注、移动单列和克制链接状态；没有复制 prototype reset、强制断行或截图 `100svh`。 |
| 正式数据适配 | 9.4 | `typeLabel/title/description` 直接映射真实 Evidence；`summary` 继续留在正文 ShortAnswer；不存在的作者、可见日期、阅读时长和封面全部省略。 |
| 标题层级 | 9.3 | 全部详情页只有一个 H1；1440px 标题 65.52px，摘要与批注明显退后，无标签胶囊、按钮或图片竞争。 |
| 编辑批注 | 9.1 | 只由 `editorialNotes.js` 命中真实 slug；桌面为页边短注，≤900px 进入内容流；无默认生成、无 JSX 内硬编码。 |
| 无批注状态 | 9.4 | 两篇未映射文章的 annotation count 为 0、空 aside count 为 0；桌面改为 860px 单轴，移动无空位和占位线。 |
| 中文排版 | 9.0 | 系统中文字体栈、strict line break、balanced/pretty wrap；三篇不同长度标题在桌面和移动均自然断行。 |
| 移动端体验 | 9.0 | 390/375px 单列、20px 等效内边距、44px 内容类型入口、无横滚；现有面包屑在长标题时仍会占两行。 |
| 可访问性 | 9.2 | `<header><h1><aside>` 语义明确，编辑批注有 accessible name，Focus 可见，DOM 与视觉顺序一致，reduced-motion 移除唯一颜色过渡。 |
| SEO 保持 | 10 | 迁移前后 title、meta description、canonical 和完整 JSON-LD 字符串一致；H1 数量保持 1，路由与数据加载未变。 |
| 样式隔离 | 9.3 | Token 仅由 ArticleHeader CSS 导入并限定在 `.editorial-token-scope`；类名前缀独立，没有修改全局主题、Tailwind 配置或 body。 |
| AI UI 风险控制 | 9.8 | 无卡片头部、渐变、玻璃、网格、发光、几何体、英文微标签、Issue、mockup、双 CTA 或动效；只命中“大无衬线标题”和结构留白两项低风险特征。 |

## 4. 必答问题

### 4.1 是否保留 prototype 的核心品质？

**是。** 标题、摘要、批注、内容类型的权重顺序没有被正式 Header、Breadcrumbs 或真实正文打乱；蓝色只用于链接、Focus 和批注线。正式实现进一步补齐了无批注状态与全部 Evidence 数据适配。

### 4.2 是否因真实页面结构产生妥协？

**有两处合理妥协。** 第一，固定 Header 与 Breadcrumbs 占据了 prototype 中不存在的顶部空间，因此正式头部减少自身顶部 padding，没有复制 prototype 的整页留白。第二，正文仍保持 980px 居中卡片结构，头部使用 1180px 非对称轴，进入 ShortAnswer 时阅读宽度会收窄；这反映当前系统迁移边界，不应借机重构正文。

### 4.3 有批注与无批注状态是否都成立？

**成立。** 有批注页在 1440px 使用 280px 侧注，768px 以下进入正文流；无批注页不渲染 aside，桌面阅读轴扩至 860px，390px 不留空白。不存在默认批注或“暂无批注”。

### 4.4 暖白头部与现有正文是否自然衔接？

**基本自然。** ArticleHeader 局部使用 `#fcf8f2`，Evidence main 原本也是同一暖白，因此没有上下色块断裂；头部底部留白直接过渡到 ShortAnswer。差异来自正文仍大量使用浅蓝/白色圆角卡片，而非背景本身。

### 4.5 是否存在全局样式污染？

**未发现。** 新变量只定义在 `.editorial-token-scope`，CSS 仅由正式 ArticleHeader 导入；首页检查不到 `.editorial-article-header`，全局 body、theme、Tailwind 与 Header/Footer/SitePet 均未修改。

### 4.6 是否建议进入人工确认？

**建议。** 应并排查看有/无批注的 1440px 与 390px 截图，重点确认标题尺度、头部到旧正文的节奏，以及 Breadcrumbs 在移动首屏中的信息密度。

### 4.7 是否可以进入首页 Hero 正式迁移？

**技术与设计审计上可以，但应先完成本轮人工确认。** Article Header 已证明 token、字体、Focus、暖白和响应式策略可进入正式生产；首页 Hero 仍需作为独立高风险层实施，不能顺带修改正文、Header 或全局背景。

## 5. 旧实现清理核对

已删除 EvidenceDetailPage 内联旧头部：胶囊 `typeLabel`、旧 H1、旧 description 段落和包裹它们的 `<header className="mt-8">`。这些旧视觉均由 Tailwind 字符串直接定义，没有独立 CSS 文件可删除。

因仍被其他页面或正文使用而保留：

- `GeoBlocks.PillList` 与其胶囊样式；Evidence 正文的受众列表仍使用。
- `GeoBlocks.ShortAnswer`；正文内容与视觉不在本轮范围。
- Evidence 列表、Solution 详情中的相似 `typeLabel` 胶囊；它们不是旧详情头部的专属实现。
- 正文卡片、LinkGrid、Breadcrumbs 和页面 main 的既有暖白背景。

搜索确认 EvidenceDetailPage 已不存在旧 `<header className="mt-8">` 或旧 `item.typeLabel` 胶囊字符串。

## 6. 三个主要提升

1. **正式页面第一次拥有明确编辑主角。** 标题不再与胶囊标签和紧邻正文卡片同权。
2. **批注成为可维护内容能力。** 单一 slug 映射、无默认生成、无批注自然省略。
3. **生产约束得到验证。** 三篇真实数据、四档视口、Focus、SEO 与构建均通过，且不污染其他页面。

## 7. 三个主要风险

1. **新头部与旧正文存在语言代差。** 进入 ShortAnswer 后重新出现圆角卡片密度，这是后续正文迁移问题，不是本轮回退理由。
2. **品牌识别仍依赖真实文案。** 无图策略正确，但视觉识别仍主要由标题、暖白和批注共同承担。
3. **移动首屏仍受全局结构影响。** Breadcrumbs 会换成两行，SitePet 在继续下滚时可能靠近正文卡片；本轮不得修改二者。

## 8. 审计停止点

审计完成后不再修改 Article Header。下一步只进行人工视觉确认；未确认前不迁移首页 Hero，不修改正文、推荐内容、Header、Footer、SitePet、SEO、数据模型、字体或全局 token。
