# Phase 0：当前网站技术、组件与视觉资产基线

> 审计日期：2026-08-01  
> 审计对象：`midimily-website` 当前工作树  
> 方向约束：Editorial Clarity × Human Observation（编辑式清晰，人本式观察）

## 0. 范围、方法与证据边界

本文件补齐缺失的 Phase 0，只记录当前仓库真实存在的实现，不把 `DESIGN.md`、设计系统文档中的目标值误写成已落地事实。

- 代码证据：`package.json`、`vite.config.js`、`src/App.jsx`、`src/main.jsx`、`src/components/**`、`src/data/**`、`src/styles/**`、`content/**`、`public/**`、`slidev-theme-midimily/**`。
- 设计依据：`PRODUCT.md`、`DESIGN.md`、`design-system/MIDIMILY_MASTER.md`、`design-system/MIDIMILY_DECK.md`、`design-system/MIDIMILY_PERSONALITY_REFRESH.md`。
- 运行证据：沿用 `01-design-audit.md` 已记录的 1440×1000 与 390×844 检查结果；本轮未为运行项目修改依赖或配置。
- Skill 用法：`frontend-design` 只约束真实内容和单一视觉方向；`ui-ux-pro-max` 只用于响应式、可访问性和交互核对；`design-audit` 用于证据链与风险分级。三者均不覆盖 03 已确定的品牌方向。
- 当前工作树已有 `PRODUCT.md`、`DESIGN.md` 与视觉审计文档变更；它们不属于本轮写入范围。

## 1. 技术栈

| 检查项 | 当前事实 | 证据与影响 |
|---|---|---|
| 前端框架 | React 18.3.1 | `src/main.jsx` 挂载 `src/App.jsx`。 |
| 构建工具 | Vite 6.3.5 + `@vitejs/plugin-react` | `vite.config.js` 同时注册 React、Tailwind 和自定义 Slidev 目录中间件。 |
| 路由方式 | 手写 History API 路由 | `src/App.jsx` 读取 `window.location.pathname`；`src/lib/appNavigation.js` 处理站内跳转。未使用 React Router。未知路径回落首页，没有独立 404 页面。 |
| 渲染方式 | 客户端 SPA | 主站没有 SSR、SSG 或预渲染。`public/solutions/**/slidev` 是已经构建的静态 Slidev 产物，不等于主站 SSG。 |
| 内容来源 | 本地 JS/JSON | 首页来自 `src/data/homeV2Data.js`；主题与证据来自 `src/data/geoContent.js`；方案来自 `content/solutions/manifest.json`、各方案 `meta.json` 与 `deck.json`。无 CMS、Markdown 文章管线或远程 API。 |
| “文章”数据结构 | `evidenceItems` 是最接近文章的实体 | 字段含 `slug/path/type/typeLabel/title/seoTitle/description/audience/summary/finding/sections/relations`；没有作者、发布日期或封面字段。方案数据另有受众、说明、标签、页数、版本日期和 Deck 数据。 |
| CSS 方案 | Tailwind 工具类 + 全局 CSS + 大量 JSX 硬编码 | `src/styles/index.css` 汇入 `fonts.css`、`theme.css`、`globals.css`；组件内直接使用任意值颜色、圆角、阴影。 |
| Tailwind | 使用 Tailwind CSS 4.1.12 | 通过 `@tailwindcss/vite` 接入；同时安装 `tw-animate-css`。 |
| CSS variables | 存在，但覆盖率很低 | `src/styles/theme.css` 有语义变量和 `@theme inline`；实际 JSX 仍有约 414 处十六进制颜色，仅极少数语义色工具类直接消费这些变量。 |
| Design tokens | 文档 token、`theme.css` token 与组件值并存 | `design-system/MIDIMILY_MASTER.md` 定义 `--mily-*`，但当前 `theme.css` 使用另一套 `--background/--primary/...`，组件又使用硬编码值，形成三套来源。 |
| 组件库 | 无通用 UI 组件库 | 未发现 shadcn、MUI、Ant Design 等。按钮、标签、卡片、文章头部多为页面内实现。 |
| 字体加载 | 未加载项目字体文件或 Web Font | `src/styles/fonts.css` 为空；主站实际依赖浏览器/系统无衬线回退。设计文档写有 Inter/PingFang，但仓库没有加载 Inter，因此不能把 Inter 视为当前事实。 |
| 图片优化 | Vite import 与 `public` 直链 | 没有 `<picture>`、`srcset/sizes`、内容图懒加载管线或专用图片优化服务。主站图片主要是 Logo、二维码和小红书横幅。 |
| 图标 | 组件内联 SVG + 少量字符图形 | 未安装图标库。`HeroNetworkEffect.jsx` 含多枚内联 SVG；它们属于当前 Hero 图形系统，不是独立资产。 |
| 响应式断点 | Tailwind 默认 `sm/md/lg` | 主要是 640、768、1024px；未见 `xl/2xl` 的系统使用。Slidev 另有 900px 自定义断点。 |
| 动画 | CSS transition + 原生 RAF + `tw-animate-css` | 无 Framer Motion/GSAP。Hero 网络效果使用 `requestAnimationFrame` 和指针位移；宠物有循环动画；Slidev 有独立入场动画。 |
| 暗色模式 | 只有变量草案，没有可用模式 | `theme.css` 有 `.dark`，但页面没有切换器，也未发现实际 `dark:` 变体使用。不能宣称支持暗色模式。 |
| SEO | 客户端元数据 + JSON-LD + 静态站点文件 | `SeoMetadata.jsx` 在 `useEffect` 中写入 title、description、OG、canonical 与 JSON-LD；Schema 包含 Organization、WebSite、BreadcrumbList、FAQPage、Service、Article、CollectionPage。另有 sitemap、robots、llms。缺少 OG image/Twitter Card；不执行 JS 的抓取器只会看到 `index.html` 默认元数据。 |

### 1.1 关键技术结论

1. 主站是单入口客户端 SPA，不具备真正的逐页服务端渲染或静态生成。
2. 当前视觉系统不是单一 token 驱动；文档、CSS variables 和 JSX 任意值相互重叠。
3. 仓库没有可直接映射“文章封面”的字段和图片管线，静态样板不能假装这一能力已经存在。
4. 文章型内容确实存在，但位于 Evidence 体系；其作者、日期、封面均不可凭空补齐。
5. 全局 Header、Footer、SitePet、App 路由和主题样式耦合所有页面，是第一轮样板应冻结的高风险层。

## 2. 页面地图

所有主站页面均由 `src/App.jsx` 选择并在同一个全局 Header、SitePet、Footer 外壳内客户端渲染。

| 页面类型 | 路由 | 入口文件 | Layout / 主要组件 | 数据来源 | 渲染 | 影响页面的全局样式 |
|---|---|---|---|---|---|---|
| 首页 | `/` | `src/components/HomePage.jsx` | `Hero`、`ServicesOverview`、`BusinessService`、`IndividualGrowth`、`PracticeSamples`、`Insights`、`CTA` | `homeV2Data.js`、`solutionsData.js` | CSR | `index.css`、`theme.css`、`globals.css`，并受全局 Header/Footer/SitePet 影响 |
| 文章详情页（现有最接近形态） | `/evidence/:slug` | `src/components/geo/EvidenceDetailPage.jsx` | Breadcrumbs、内联 Article Header、ShortAnswer、分节正文、LinkGrid | `geoContent.js:evidenceItems` | CSR | 同上；没有独立富文本样式层 |
| 文章列表页（现有最接近形态） | `/evidence` | `src/components/geo/EvidencePage.jsx` | 页面头部、证据卡片列表/网格 | `geoContent.js:evidenceItems` | CSR | 同上 |
| 栏目索引页 | `/topics` | `src/components/geo/TopicIndexPage.jsx` | 页面头部、主题卡片 | `geoContent.js:topicPages` | CSR | 同上 |
| 栏目页 | `/topics/:slug` | `src/components/geo/TopicPage.jsx` | Breadcrumbs、双栏头部、ShortAnswer、方法/受众/FAQ、关联内容 | `geoContent.js:topicPages` 与关联方案/证据 | CSR | 同上 |
| 标签页 | 不存在 | — | 标签只作为局部 pill 展示，没有可点击标签路由 | — | — | — |
| 搜索页 | 不存在 | — | 无站内搜索组件、索引或路由 | — | — | — |
| 关于页 | 不存在 | — | 品牌/资历信息散落在首页 Hero 与 Footer | `homeV2Data.js` | — | — |
| 方案列表 | `/solutions` | `src/components/SolutionsPage.jsx` | 页面头部、`SolutionCard` 列表 | `solutionsData.js` | CSR | 同上 |
| 方案详情 | `/solutions/:slug/` | `src/components/solutions/SolutionDetailPage.jsx` | 双栏详情头部、CTA、ShortAnswer、Deck 预览和关联内容 | 方案 `meta.json/deck.json` | CSR | 同上 |
| Web Deck | `/solutions/:slug/deck/` | `src/components/solutions/DeckViewerPage.jsx` | iframe/Deck 舞台、控制与回退 | `solutionsData.js` + `public/solutions/**/slidev` | CSR 外壳 + 静态 Slidev | 主站样式与 `slidev-theme-midimily/styles/index.css` 两套系统 |
| Slidev 兼容跳转 | `/solutions/:slug/slidev/*` | `src/App.jsx:SlidevRedirectPage` | 跳转到 Deck | 路由参数 | CSR | 主站全局层 |

### 页面结构缺口

- 没有传统媒体意义的独立“文章”内容模型；本项目的文章详情样板应明确以 Evidence 内容为原型。
- 没有 Tag/Search/About/404，对下一阶段三个静态样板没有阻塞，但不能在样板中虚构入口。
- 未知路径回落首页，会掩盖错误 URL；本轮只记录，不修改路由。

## 3. 核心组件关系与风险

| 组件类别 | 文件 | 使用页面 / 影响范围 | 重复与局部样式 | 样板复用判断 | 修改风险 |
|---|---|---|---|---|---|
| Header | `src/components/Header.jsx` | 所有主站路由，1 个全局实例 | 导航、移动菜单和样式集中在组件内 | 样板只复用其占位高度和 Logo，不改实现 | **高：改一次影响全站** |
| Navigation | `Header.jsx`；Footer 内另有链接组 | 所有页面 | Header 与 Footer 各自实现，无共享 Nav 组件 | 保留链接语义，静态样板不接管 | 高 |
| Hero | `src/components/Hero.jsx` | 仅首页 | 依赖 `HeroNetworkEffect`、三入口卡、统计、多个局部样式 | 只复用真实文案，不复用现有网络视觉 | 中 |
| Hero 图形 | `src/components/HeroNetworkEffect.jsx` | 首页首屏 | RAF、指针响应、内联 SVG、节点与连线 | 不复用；与 03 禁用的通用 AI 网络语言冲突 | 中 |
| Article Card | `src/components/geo/EvidencePage.jsx` 内联；`src/components/solutions/SolutionCard.jsx` 是方案卡 | Evidence 列表；首页 Insights 与方案库 | 没有统一 ArticleCard；同类卡片外观差异大 | 样板新建隔离展示结构时可引用数据，不应改 `SolutionCard` | 高（SolutionCard 影响首页与方案库） |
| Featured Article | 不存在 | — | 首页 `Insights` 只是两个同权 `SolutionCard` | 样板可定义“主文章”展示，但不能伪称已有组件 | 低（仅静态样板） |
| Section | 首页各 Section 文件独立 | 首页 7 段 | 多数重复“标题—说明—卡片”，无统一 Section API | 复用宽度与节距作基线，不复用同权结构 | 中 |
| Tag / Pill | `src/components/geo/GeoBlocks.jsx:PillList`；多页面内联 span | 多页 | 重复实现，`rounded-full` 使用密集 | 样板最多保留一个有真实语义的类型标签 | 中 |
| Button | 多页面内联 `<a>`/`<button>` | 全站 | 无共享 Button；颜色、圆角、阴影重复但不一致 | 样板保留真实 href 与焦点语义，不动全局 | 高 |
| Image | 原生 `<img>`、CSS 背景、Slidev iframe | Header、CTA、Footer、SitePet | 无共享 Image 组件或优化策略 | 只用已确认本地资产；不得伪造内容图 | 中 |
| Article Header | `src/components/geo/EvidenceDetailPage.jsx`、`src/components/geo/TopicPage.jsx`、`src/components/solutions/SolutionDetailPage.jsx` | 三类详情页 | 三套独立结构；Solution/Topic 双栏，Evidence 单栏 | 详情头部样板以 Evidence 数据为准，不改三套正式实现 | 高 |
| Article Body | `src/components/geo/EvidenceDetailPage.jsx` 内联 sections | 3 个 Evidence 详情 | 结构化段落卡，不是富文本 renderer | 样板本轮只做到头部边界 | 中 |
| Related Content | `src/components/geo/GeoBlocks.jsx:LinkGrid` | Topic/Evidence/Solution 详情 | 共享程度较好 | 详情头部样板不得改动或向上侵入 | 中 |
| Footer | `src/components/Footer.jsx` | 所有页面 | 含导航和小红书横幅 | 静态样板冻结 | **高：改一次影响全站** |
| SitePet / 小米立 | `src/components/pet/SitePet.jsx` + vendor pet | 所有页面 | 全局交互、spritesheet 动画 | 仅可在隔离 Hero 样板试一个静态小尺寸变体 | **高：正式实现影响全站** |
| SEO | `src/components/SeoMetadata.jsx` | 页面按需调用 | 客户端 DOM 写入；多个 Schema 构造 | 样板必须完全冻结 | **高：影响索引和分享** |
| Deck | `src/components/solutions/DeckViewerPage.jsx` + `slidev-theme-midimily/**` | 六个方案 | 独立 Vue/Slidev 主题，与 React 主站并存 | 不进入三个样板 | **高：独立构建链** |

### 3.1 重复实现与全站影响

- **全站级变更点**：`src/App.jsx`、`src/components/Header.jsx`、`src/components/Footer.jsx`、`src/components/pet/SitePet.jsx`、`src/styles/index.css`、`src/styles/theme.css`、`src/styles/globals.css`。
- **视觉差异最大的同类组件**：Evidence 卡、Topic 卡、SolutionCard；Evidence/Topic/Solution 三类详情头部；页面内的按钮与 pill。
- **第一轮不应直接改动**：全局 Header/Footer/SitePet、路由判断、SeoMetadata、SolutionCard、DeckViewer/Slidev、三套详情页正式实现、`theme.css` 与设计系统 token。
- **适合样板复用**：真实数据对象、现有页面最大宽度、语义标题顺序、真实 href、Logo；复用指“读取/引用”，不是修改源组件。

## 4. 样式基线

### 4.1 色彩与 token

| 项目 | 当前实现 | 状态判断 |
|---|---|---|
| 页面背景 | `--background: #fcf8f2` 暖白 | 已存在并应用；不是 Phase 3A 自动沿用的最终候选 |
| 卡片背景 | `#fffdf9`，同时大量使用白色、浅蓝和渐变任意值 | 重复且不统一 |
| 主文本 | 变量 `#3f2f23`；设计文档另有 `#2e415f/#344e72`；组件常用蓝灰硬编码 | token 冲突 |
| 正文 | 设计文档 `#607795`，组件亦有多种蓝灰 | 在暖白上的约 4.34:1 对比度低于普通文本 4.5:1 目标 |
| 辅助文字 | 常见 `#8b9bb2`、`#7890ad` 等 | 多处过淡；分别约 2.67:1、3.29:1（对白底量级） |
| 品牌/强调 | 变量主色 `#8f7358`，设计文档强调色 `#7c92bb/#8f9cd6/#8cc7bd`，组件另有大量蓝紫 | 没有单一来源 |
| 边框 | `rgba(122,95,70,.18)`；设计文档是蓝灰线；组件另有任意值 | 暖棕与蓝灰系统并存 |

`design-system/MIDIMILY_MASTER.md` 的 `--mily-*` 仅存在于规范文字，不等于当前组件已经消费。Phase 3A 必须以隔离样板验证新方向，不能直接把任何一套变量写成全局真值。

### 4.2 字体、字号与行高

- 实际字体：系统无衬线回退；`fonts.css` 为空，没有项目字体安装或加载。
- 首页 H1 约使用 34/42/54px 的响应式阶梯；详情页 H1 约 36/44/56px；Section H2 常见 30/36/40px。
- 正文多在 14–18px；meta 多在 11–13px。小字号、低对比、pill 同时出现时可读性风险最高。
- `theme.css` 为基础标题统一 `line-height: 1.5`，但组件工具类经常覆盖，实际不是单一排版系统。
- `DESIGN.md` 所写 Inter/PingFang 是目标描述；由于 Inter 未加载，后续样板必须依赖现有系统字体，不可新增字体。

### 4.3 间距、容器、圆角、阴影与边框

| 项目 | 当前值 / 模式 | 判断 |
|---|---|---|
| 主容器 | 首页常见 `max-w-[1220px]`；Topic/Solution 约 1120px；Evidence 约 980px；Header 约 1280px | 1120–1220 可安全作为桌面样板基线；不同页面阅读宽度有合理差异 |
| Header | 最小高度约 76px；锚点滚动偏移约 88px | 样板需预留，但不改 Header |
| 移动横边距 | 基础 `px-4` 即 16px，`sm:px-6`、`md:px-8` | 与设计文档建议 20–24px 不一致；样板可局部测试 20px，不迁移全局 |
| Section 垂直间距 | 常见 56px（移动）、80px（md）、96px（lg） | 可作为节奏控制上限，不要求每段等距 |
| 圆角 | `rounded-full` 在源代码中约 42 处；另有 12/16/18/20/24px 多套 | 胶囊和容器圆角过多；数值碎片化 |
| 阴影 | 多组手写 box-shadow，约二十余种组合 | 无统一 token；静态样板应以无阴影/单一弱阴影为上限 |
| 边框 | 暖棕、蓝灰和透明任意值并存 | 不适合直接全局替换 |
| 卡片比例 | `SolutionDeckPreview` 为 16:9；Hero 网络画面约 16:10 | 方案封面规则较稳定；不能套用到没有图片字段的 Evidence |
| Deck 高度 | 移动约 70svh，桌面上限约 680px | 属于 Deck 子系统，样板冻结 |

### 4.4 已统一、冲突与迁移判断

- **已较统一**：Tailwind 断点语法；主内容上限在 980–1220px 内；固定 Header 的安全距离；方案封面 16:9；标题总体遵守从 H1 到 H2 的层级。
- **重复但不同**：卡片圆角、阴影、按钮形态、pill、页面头部、正文色、容器宽度。
- **硬编码集中区**：组件任意值颜色、渐变、阴影、圆角、内容宽度。
- **冲突 token**：`theme.css` 暖棕语义色、`MIDIMILY_MASTER.md` 蓝灰 `--mily-*`、JSX 蓝紫/青渐变。
- **可安全沿用**：系统无衬线、现有真实标题/摘要、1120–1220px 桌面容器范围、语义标题、真实链接、16:9 方案封面（仅方案内容）。
- **暂不能全站迁移**：暖白/纯白背景切换、主文本/品牌蓝、圆角、阴影、移动 padding、Header/Footer、Deck token。

## 5. 当前布局模式

| 模式 | 当前实现 | 问题判断 |
|---|---|---|
| 首页首屏 | 品牌标题 + 说明 + 行动入口 + 网络图形 + 三张入口卡 + 资历统计 | 同屏主角过多；Hero 网络与三入口共同竞争主标题 |
| 文章网格 | Evidence/Topic/Solutions 分别以卡片组织 | 卡片是默认承载方式，没有统一文章卡语法 |
| 一主多次 | 首页 Insights 只取企业/个体各一张同权 SolutionCard | 名义上精选，视觉上没有明确主次 |
| 图文并排 | Hero、Topic/Solution 详情头部常用双栏 | 在缺少真实内容图时，右栏由抽象图形或信息块填充 |
| 文章列表 | Evidence 列表使用相似卡片 | 可扫描，但编辑判断主要靠类型标签而非权重变化 |
| 文章详情头部 | Evidence 单栏；Topic/Solution 双栏 | 三类语法不统一，首页与文章详情缺少共同的“批注/观察”语言 |
| 正文 | Evidence 为 ShortAnswer + 三个 section；Topic/Solution 为卡片化结构 | 内容完整，但每段都容器化会削弱连续阅读 |
| 推荐阅读 | `LinkGrid` 统一关联内容 | 功能清楚，但仍是规则卡片网格 |
| Footer | 多列链接 + 小红书横幅 | 功能完整；品牌与社交素材混合，移动端较长 |

### 5.1 指定风险判断

- 默认三列卡片：**存在**，尤其首页入口、服务/实践和列表区。
- 同权重内容过多：**存在**，卡片尺寸、圆角和背景相近，主次主要靠文案而非结构。
- Section 节奏重复：**存在**，多次出现“区块标题—说明—卡片阵列”。
- 过多容器和圆角：**存在**，01 运行审计记录首页约 22 个大型圆角容器、约 79 个 `rounded-full` 渲染元素。
- 图片仅作为填充：主站实际上**缺少内容图片**；当前风险更准确地说是“用抽象网络、渐变封面替代证据图像”。
- 移动端只是桌面压缩：**部分存在**；断点会改列数，但内容顺序和同权结构多沿用桌面，首页运行高度约从 4980px 增至 8161px。
- 首页和文章页缺乏共同视觉语言：**存在**；Hero 网络、方案封面和 Evidence 文本页各自成套。

## 6. 真实视觉资产清单

仓库未发现可直接作为 Evidence 文章封面的真实场景照片、客户项目照片、产品界面截图或通用文章封面。编译后的 Slidev 文件不算新的源素材。

| 资产 | 路径 | 类型 | 当前用途 | 可否直接使用 | 授权风险 | 样板适用性 |
|---|---|---|---|---|---|---|
| 品牌 Logo | `src/styles/LogoScandina.png` | PNG，1563×1563 | Header、Slidev；`public/solutions/**` 有编译副本 | 可直接用于内部静态样板 | 仓库无独立授权/来源记录，正式发布前宜确认 | 可用于 Header 语境；不当文章封面 |
| 小米立 | `public/assets/pets/midimily-penguin/spritesheet.webp` | WebP spritesheet，1536×1872 | 全局 SitePet 动画 | 可裁切后仅用于隔离样板验证 | 仓库无独立权属说明，需人工确认 | Hero 最多一次；文章区/详情头部不使用 |
| 小米立源图 | `public/assets/pets/midimily-penguin/spritesheet.png` | PNG spritesheet | 动画源/备用 | 仅适合制作流程，不应直接整图展示 | 同上 | 不直接用于样板 |
| 小米立旧版 | `public/assets/pets/midimily-penguin/spritesheet.pre-gridfix.webp` | WebP | 历史备份 | 不建议继续使用 | 同上 | 不适用 |
| 旧宠物 Crimson Whoop | `public/assets/pets/crimson-whoop/spritesheet.webp` | WebP spritesheet | 未发现主站激活 | 不建议继续使用 | 第三方/来源需确认 | 不适用 |
| 微信二维码 | `src/styles/mily-wx.png` | PNG | CTA 联系入口 | 功能上可继续用 | 联系方式归属需维护者确认 | 不作视觉样板素材 |
| QQ 二维码 | `src/styles/mily-qq.png` | PNG | CTA 联系入口 | 功能上可继续用 | 联系方式归属需维护者确认 | 不作视觉样板素材 |
| 小红书横幅 | `src/styles/redbook_mily.png` | PNG，356×142 | Footer 外链 | 当前功能可用；低分辨率 | 含真人肖像，需确认肖像与平台素材使用权 | 不适合作 Hero/文章封面 |
| 小红书横幅备份 | `src/styles/redbook_mily.jpg` | JPG | 未见主站使用 | 不建议重复使用 | 同上 | 不适用 |
| 小红书 Logo | `src/styles/redbook_logo.png` | PNG | 未见主站使用 | 需确认平台品牌规范 | 第三方商标 | 不适用 |
| Favicon | `public/favicon.ico` | ICO | 浏览器图标 | 可用于原用途 | 与 Logo 同源风险 | 不进入内容样板 |
| Slidev Logo 编译副本 | `public/solutions/*/slidev/assets/LogoScandina-*.png` | PNG | 已构建 Deck | 不应从编译目录反向复用 | 同品牌源资产 | 不适用，使用源 Logo |
| Slidev 内置 logo | `public/solutions/*/slidev/assets/logo-*.png` | PNG | 构建依赖 | 不使用 | 第三方/构建产物 | 不适用 |
| Hero 内联图标与节点 | `src/components/HeroNetworkEffect.jsx` | 内联 SVG / CSS 图形 | 首页抽象网络 | 不建议继续扩展 | 代码自有但语义通用 | 与新方向冲突 |
| 方案渐变封面 | `src/components/solutions/SolutionCard.jsx:SolutionDeckPreview` 等 | CSS 生成视觉 | SolutionCard / Deck 预览 | 仅可保留现有方案功能 | 无外部版权风险；风格风险高 | 不用于三个新样板 |
| page-agent 光标 | `src/vendor/page-agent/**` | SVG | 第三方组件内部 | 只按原依赖使用 | 受 vendor 许可证约束 | 不适用 |

### 6.1 素材结论

- **可直接用于样板**：本地 Logo（原用途）、现有文字数据、现有真实链接。
- **可裁切或调整后使用**：小米立 spritesheet，但仅在权属确认后作为单一静态姿态；本轮不实际裁切。
- **需要确认授权**：Logo 原始权属、小米立创作/生成来源、Footer 真人肖像、小红书平台标识、二维码对应账户。
- **仅适合临时占位**：若版式必须验证图片区，只能使用明确标注“素材待确认（不进入正式页面）”的中性灰块；不能伪装成最终视觉。
- **风格不一致/不建议继续使用**：通用网络节点、渐变方案封面作为文章图、Slidev 构建 logo、旧宠物资产。
- **缺失项**：文章封面、真实人物照片、产品截图、界面截图、项目现场照片、独立装饰 SVG、可追溯第三方图片清单。

## 7. 第一轮复用与冻结边界

### 可复用

- `geoContent.js` 与 `homeV2Data.js` 的真实标题、摘要、finding、路径和双服务线用语。
- 系统无衬线字体；现有语义 HTML 与标题层级。
- 1120–1220px 的桌面内容宽度范围、980px 的文章阅读上限。
- Header 的实际占位、Logo、真实导航链接，但只作为样板环境引用。

### 可在隔离样板局部覆盖

- 样板自身的白/浅灰背景、20px 移动端横边距、单一蓝色批注、局部非对称布局。
- 样板内部的文字层级、分隔线和一种受限圆角。
- 仅用于版式验证的中性素材占位说明。

### 暂时不能修改

- 正式页面 JSX、CSS、全局 token、路由、内容数据、SEO、图片与依赖。
- Header、Footer、SitePet、SolutionCard、SeoMetadata、DeckViewer 和 Slidev 主题。
- 暖白背景、正文色、按钮、圆角在全站范围的迁移。

## 8. Phase 0 结论

当前网站内容和路径已经能完整表达“企业 AI 落地 + 个体 AI 成长”，技术上也能稳定运行；视觉记忆弱并非内容不足，而是三套 token、多个卡片语法、抽象 AI 图形和同权 Section 同时存在。Phase 3A 应先用隔离静态样板验证“一个主角、真实内容、蓝色编辑判断、人物/任务证据优先”的语法，不能先改全局主题来制造表面一致。
