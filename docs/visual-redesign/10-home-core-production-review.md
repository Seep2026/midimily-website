# Phase 5：首页核心区域正式迁移生产审计

> 审计日期：2026-08-02  
> 审计对象：正式首页 `/` 的 Home Hero 与 Editorial Story Group  
> Preset：`general`（品牌与编辑内容首页生产复审）  
> 审计性质：实现完成后的只读审计；本文件不触发自动修改

## 1. 总体结论

**综合评分：9.3 / 10**  
**结论：通过 Phase 5 生产迁移审计，建议进入人工视觉确认。人工确认后，可以继续分阶段铺开，但不建议把 Evidence 列表、正文和首页旧 Section 合并为一次改造。**

正式首页保留了两个 prototype 的核心品质：首屏只有一个可复述的品牌判断，企业与个体是两条不等权观察路径；文章组以主稿、次稿和收尾稿形成约 60 / 25 / 15 的阅读速度。Hero 与文章组共享 1180px 外轴、暖白背景、蓝灰文字、发丝线和中文编辑批注，视觉上是一段连续叙事，不是两个拼接 Demo。

当前主要风险不是新核心本身，而是它结束后立即回到旧首页的渐变、圆角卡片和双按钮语法，形成明显的代际差。全局 SitePet 在 768px 和手机宽度会靠近次路径或批注，但实测未遮挡文字与链接；本轮按边界只记录，不修改。

## 2. 审计范围与证据

### 2.1 页面与截图

- 新首页：1440×1000、768×900、390×844、375×812。
- 文章组补充视图：1440×1000、390×844。
- 正式 Article Header 回归：`/evidence/enterprise-ai-workflow-pilot`，1440×1000。
- 旧首页与新首页桌面对照、首页文章组与 Article Header 并排对照。
- 截图保存在项目外临时目录：`/tmp/midimily-phase5-audit.YixEfE/`，未进入正式资产。

主要文件：

- `src/components/HomePage.jsx:36`：仅用局部 token scope 串联两个正式 Pattern，后续旧 Section 保持原样。
- `src/content/homeEditorial.js:24`：用 slug + role + displayOrder + 人工短说明/批注建立首页编排，不修改 Evidence。
- `src/components/editorial/HomeHero.jsx:9`：真实 H1、两条路径和单一 `aside` 批注。
- `src/components/editorial/EditorialStoryGroup.jsx:15`：H2 主稿、H3 次稿/收尾稿和按角色省略字段。
- `src/components/editorial/HomeHero.css:15` 与 `EditorialStoryGroup.css:7`：共享 1180px 外轴与暖白语义 token，局部定义各自排版尺度。

### 2.2 运行与实现证据

- 1440px：Hero 标题 72px、两行；文章组主稿 / 次稿 / 收尾稿分别为 61 / 31 / 24px。
- 768px：Hero 高约 877px，标题 54px、两行；路径区改为纵向流，不压缩桌面双轴。
- 390px：Hero 标题约 44.46px、两行；顺序为企业路径 → 个体路径 → Hero 批注；路径可点击高度约 132 / 99px。
- 375px：无横向溢出；核心五个链接最小高度 57px；文章组标题约 35.63 / 23 / 19px。
- 390px 文章组 DOM 与视觉顺序均为主稿 → 主稿批注 → 次稿 → 收尾稿；三篇虽然回到同一宽度，但字号、字段和节奏保持不同。
- Hero 企业路径 Focus 实测为 3px `#2e5b94` 实线、5px offset；所有核心链接都有文字名称。
- 五个核心链接均通过实际点击进入正确主题或 Evidence 页面；三篇 Evidence 页面各有且只有一个正式 `.editorial-article-header`。
- 首页 title、description、canonical 与完整 JSON-LD 在迁移前后逐项相同；H1 由旧口号替换为新主张，但数量保持 1。
- 新浏览器会话 console 为 0 error / 0 warning；四档视口均满足 `scrollWidth === clientWidth`。
- `pnpm lint`、Vite production build、`git diff --check` 通过；production `dist` 未发现两个首页 prototype 的 root id 或类名前缀。
- 构建仍有既有 `PageController.ts` 使用 `eval` 的提示，与本轮首页迁移无关，本轮未新增 warning。

## 3. 评分表

| 维度 | 评分（0–10） | 正式页面与代码依据 |
|---|---:|---|
| Hero 主次 | 9.4 | H1 是唯一绝对主角；无图、按钮组、指标、英文眉题或装饰几何竞争，1440/768/390/375 均保持两行主张。 |
| 双路径表达 | 9.2 | 桌面主路径 720px 轴、次路径 220–300px 侧轴；移动按企业 → 个体 → 批注重排，路径不是等权按钮或套餐卡。 |
| 编辑文章权重 | 9.4 | 61/31/24px 桌面尺度、不同宽度和不同字段形成约 60/25/15；主稿拥有唯一文章批注，三篇没有统一模板。 |
| 首页整体节奏 | 8.8 | Hero 与文章组共享暖白和外轴，滚动时由主张自然进入证据；文章组之后的旧蓝白渐变卡片区形成可见代差。 |
| 与 Article Header 一致性 | 9.4 | 三者共用系统字体、暖白、蓝灰、发丝线、编辑蓝和左轴；并排截图显示同一品牌，但各 Pattern 没有机械复制同一双栏。 |
| 中文排版 | 9.2 | 使用正式系统字体栈、`line-break: strict`、balanced/pretty wrap；中英数字长短标题无截断、孤立英文眉题或装饰字距。 |
| 移动端体验 | 9.1 | 390/375px 单列、20px 边距、无横滚、最小链接 57px；全局 SitePet 接近批注末端，但未遮挡内容。 |
| 可访问性 | 9.3 | 一个 H1，文章组使用 H2/H3、`article` 和有名称的 `aside`；Focus 3px/5px 实测可见，链接文本自解释，DOM 顺序正确。 |
| 样式隔离 | 9.4 | 新 CSS 仅由两个 editorial 组件导入并置于 `.editorial-token-scope`；未改 body、Tailwind、路由、Header/Footer/SitePet 或 SEO。 |
| AI UI 风险控制 | 9.8 | 无渐变、玻璃、网格、卡片阵列、发光、mockup、英文微标签、双 CTA、指标或动画；仅命中“大无衬线标题”和结构留白两项低风险特征。 |

## 4. 必答问题

### 4.1 正式首页是否保留两个 prototype 的核心品质？

**是。** Hero 保留“观点先于功能”、双路径不等权和单一编辑批注；文章组保留主稿完整论述、次稿窄轴停顿、收尾稿横向结束的三种速度。生产实现没有复制 A/B 设置、小米立签名开关、prototype reset、测试查询参数或独立入口逻辑。

### 4.2 Hero 与文章区是否像一个完整首页？

**在核心范围内成立。** 两者由同一个 `.home-editorial-core` 承载，使用同一 1180px 轴和暖白底，Hero 底部路径之后以一条结构线进入“实践观察”。文章组不是重新出现一个 Hero，也没有用大卡片宣布新 Section，因此滚动关系是“先提出判断，再给出证据”。

### 4.3 是否出现新的 SaaS 或 Newsletter 倾向？

**未出现。** 没有双 CTA、产品图、客户 Logo、指标、订阅框、作者中心、日期流、期号、`Latest` 或等密度文章列表。两条路径都是内容观察入口，三篇文章由编辑角色而非统一卡片或发布时间组织。

### 4.4 是否与 Article Header 属于同一品牌？

**是。** 首页和文章页共享暖白、深蓝灰、克制编辑蓝、系统中文字体、稳定左轴和批注语法；首页通过路径与多稿权重解决发现问题，文章页通过标题与侧注解决阅读入口问题。共同语言一致，结构责任不同。

### 4.5 旧首页后续区域是否形成明显视觉代差？

**是，中等偏明显。** 紧随文章组的 `ServicesOverview` 重新使用冷蓝渐变背景、双等权圆角卡片、胶囊动作项和按钮；再往下仍有编号卡片与实践样本阵列。新旧背景过渡本身不突兀，但容器密度、圆角和信息模板突然增加，用户会感到从编辑页面返回旧 SaaS/卡片语法。

### 4.6 是否建议进入 Evidence 正文和列表系统迁移？

**建议，但必须拆开。** 按冻结顺序先处理 Evidence 列表与栏目页，验证多条真实内容在正式信息架构中的权重；通过审计与人工确认后，再单独处理 Evidence 正文。不得把列表、正文、Header 和全局 token 合并为一次迁移。

### 4.7 下一阶段最优先处理什么？

**第一优先是 Evidence 列表与栏目页的受控迁移。** 它能检验当前编辑编排是否可以从首页三篇扩展到真实内容发现，同时遵守 MASTER 的迁移顺序。并行只应记录首页旧 Section 的代差清单，不在同一阶段顺手重构。

## 5. 旧首页清理核对

已删除：

- `src/components/Hero.jsx`：旧渐变 Hero、双 CTA、统计胶囊和三张入口卡。
- `src/components/HeroNetworkEffect.jsx`：旧网络节点、渐变连线、鼠标跟随与循环动画。
- `src/components/Insights.jsx`：旧“精选 AI 方案”双卡片预览及居中按钮。
- `src/data/homeV2Data.js` 中仅供旧 Hero 使用的 `heroStats` 与 `heroEntryCards`。

保留及原因：

- `ServicesOverview`、`BusinessService`、`IndividualGrowth`、`PracticeSamples`、`CTA`：均属于尚未批准迁移的首页后续区域。
- `SolutionCard` 及方案数据：仍服务正式方案页，不属于旧首页专属样式。
- `#hero` 与 `#solutions-preview` id：分别维持首页导航和现有 SitePet Section Observer 行为；未修改路由或 SitePet。
- Header、Footer、SitePet、全局背景与正式 Article Header：均保持现状。

搜索确认生产源码已无 `Hero`、`HeroNetworkEffect`、`Insights`、`heroStats` 或 `heroEntryCards` 引用；prototype 目录保持不变。

## 6. 三个主要提升

1. **首页第一次由一句可复述判断统领首屏。** 旧版 Logo、网络图、双按钮、数据胶囊和入口卡的竞争被移除。
2. **内容发现拥有真实编辑取舍。** 首页直接读取三篇 Evidence 标题与路径，由集中配置只管理角色、顺序、短说明和批注。
3. **跨页面品牌语法成立。** 首页主张、文章组与 Article Header 在桌面和移动端共享颜色、阅读轴和批注逻辑，同时保持各自结构责任。

## 7. 三个主要风险

1. **新旧首页语言代差。** 文章组之后重新出现渐变、圆角卡片、胶囊和双按钮，可能削弱前两屏建立的编辑记忆。
2. **品牌识别仍高度依赖文案与编排。** 本轮无图是正确边界，但真实人物、流程和结果证据尚未进入视觉系统。
3. **全局 SitePet 与新留白关系未重新验证。** 768/390/375px 下宠物会靠近次路径或批注；当前不遮挡，但未来内容长度变化可能压缩安全距离。

## 8. AI UI 停止规则复核

可见结果命中两项低风险通用特征：较大无衬线主标题、较多结构性留白。前者承载真实品牌判断，后者把主张、路径和证据分成明确阅读阶段；移除会损害理解。发丝线均用于路径边界、Section 转场或批注，不构成无意义细网格。

没有第三项典型 AI UI 特征，因此未触发停止规则。未发现卡片阵列、渐变光斑、玻璃、漂浮几何、发光节点、英文微标签、虚构编号、仪表盘包装或装饰动画。

## 9. 审计结论与停止点

本轮生产迁移通过，建议人工并排确认以下材料：

1. `old-vs-new-home-1440.png`：确认简化幅度与唯一主角是否达到预期；
2. `new-home-390.png` 与 `new-home-375.png`：确认移动端双路径和批注顺序；
3. `home-vs-article-header-1440.png`：确认首页与文章页是否属于同一品牌；
4. `new-home-stories-detail-1440.png` 与 `new-home-stories-detail-390.png`：确认三篇内容的 60 / 25 / 15 感知权重。

审计完成后立即停止。不修改 Evidence 正文、列表页、Header、Footer、SitePet、全局 body、数据模型、prototype 或图像系统；不提交 Git commit。
