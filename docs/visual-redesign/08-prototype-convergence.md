# Phase 4A：Prototype 收敛与最小设计系统冻结

> 日期：2026-08-01  
> 状态：三个 prototype 已通过审计与人工确认，探索阶段正式结束。  
> 唯一方向：**Editorial Clarity × Human Observation / 编辑式清晰，人本式观察**

## 1. 范围、材料与 Skill 使用

本次读取了 `PRODUCT.md`、`DESIGN.md`、Phase 0–3B 的 `00`–`07` 文档、三个 prototype 的全部 JSX / CSS / HTML，以及既有 `design-system/MIDIMILY_*.md`。

- `$frontend-design`：用于确认屏幕文本均为真实内容、拒绝假数据和装饰性英文。其严格 Swiss token 与暖白、人本方向冲突，因此不把 “Swiss” 当最终风格名称，也不引入 Web Font。
- `$ui-ux-pro-max`：按 Skill 要求运行 design-system、UX 和 React 检索。检索返回 Video-first Hero、Soft UI、粉色 CTA、Newsreader/Roboto 和阴影；这些与已确认方向冲突，全部拒绝。只保留可见 Focus、键盘顺序、reduced-motion、无横滚及 375/768/1024/1440 响应检查。
- `$design-audit`：以代码、三个审计分数和人工确认作收敛证据，不重新评分或生成第四个方向。

本轮只新增设计文档。未修改正式页面、组件、CSS、路由、数据、依赖、字体、prototype 或旧设计文件。

## 2. 已有设计系统审计

| 文件 | 可保留 | 与冻结方向冲突 | Phase 4A 定位 |
|---|---|---|---|
| `MIDIMILY_MASTER.md` | 品牌定位、暖白与蓝灰基线、44px 触控、移动端无横滚 | Inter 未加载；允许卡片上浮、渐变、网格、节点；卡片作为常用容器 | 历史基线，不再作为唯一入口 |
| `MIDIMILY_DECK.md` | 每页一个判断、中文长度、Deck 专项结构 | 部分步骤卡、编号和装饰线只适用于真实 Deck 序列 | Web Deck 专项参考，服从新 MASTER |
| `MIDIMILY_PERSONALITY_REFRESH.md` | 清晰路径、拒绝假进度、移动可读性 | Claymorphism、软阴影、路径 chip、Hover 位移、轻渐变 | 历史探索记录，不可直接指导编辑页面 |

新增 `design-system/MASTER.md` 作为唯一入口；旧文件不覆盖、不删除，避免破坏 Deck 和历史上下文。优先级已经写入 MASTER。

## 3. 三个 prototype 数值对照

### 3.1 共用基础与交互

| 项目 | Article Header | Home Hero | Editorial Section | 是否应统一 |
|---|---|---|---|---|
| 暖白背景 | `#fcf8f2` | `#fcf8f2`（暖白 A） | `#fcf8f2` | 是，先作为编辑页面局部候选，不全站迁移 |
| 主文字 | `#2e415f` | `#2e415f` | `#2e415f` | 是 |
| 正文 / 次级文字 | `#405a7c` / `#526f96` | 同左 | 同左 | 是，按语义分层 |
| 链接 / 批注文字 | `#344e72` | `#344e72` | `#344e72` | 是 |
| 编辑蓝 / Focus | `#7c92bb` / `#2e5b94` | 同左 | 同左 | 是，禁止扩成大底色 |
| 发丝线 | `#d7e3f0` | `#d7e3f0` | `#d7e3f0` | 是，默认 1px |
| 字体栈 | system-ui + PingFang/YaHei | 同左 | 同左 | 是；补 Android/Noto 回退，不加 Inter |
| 外层宽度 | `min(1180px, 100%-112px)` | 同左 | 同左 | 是，wide measure |
| 900px 行为 | 双栏变单流 | 路径区重排 | 主稿、次稿、收尾重排 | 统一行为，不强制共用同一布局实现 |
| 手机边距 | 20px，断点 520 | 20px，断点 600 | 20px，断点 600 | 边距统一；断点保留 pattern 差异 |
| Focus | 3px / offset 5 | 3px / offset 4 | 3px / offset 5 | 统一为 3px / 5px |
| Hover | 文字变色/下划线，160ms | 下划线，无位移 | 下划线，无位移 | 统一无位移；160ms 可作 fast token |
| reduced-motion | 移除过渡 | 全局降级 | 全局降级 | 是，静态优先 |

### 3.2 排版、布局与批注

| 项目 | Article Header | Home Hero | Editorial Section | 是否应统一 |
|---|---|---|---|---|
| 主标题桌面 | 54–66px / 650 / 1.14 | 54–72px / 680 / 1.13 | 主稿 48–61px / 670 / 1.17 | 否；冻结各 pattern 的角色尺度 |
| 主标题手机 | 36–40px / 1.2 | 40–48px / 1.18 | 35–39px / 1.22 | 否；Hero 最大、文章组更紧凑 |
| 主阅读宽 | 780px | 标题 800px、主路径 720px | 主稿 760px | 统一 780px content measure；800/720/760 留作局部 |
| 摘要宽 | 650px | 670px | 620px | 不平均；分别服务标题长度和节奏 |
| 桌面侧轴 | 220–280px | 220–300px | 240–300px | 统一 220–300px 原则，具体由 pattern 控制 |
| 桌面列间距 | 64–104px | 64–120px | 70–120px | 不建精细 token；保留 clamp 局部值 |
| 编辑批注 | 17px、3px 顶线、侧轴下移 222px | 16px、2px 左线、侧轴 | 17px、2px 左线、主稿流内 | 统一语义/无容器；位置和线方向按 pattern |
| 移动批注 | 主流内 16px、左线 | 主流内 15px、左线 | 主流内 15px、左线 | 统一流内降级；字号允许 15–16px |
| 路径 / 元信息 | 类型 14px；元信息 14px | 眉题 14px；两条内容路径 | section/path 14px | 统一“真实中文、低权重”，不统一字段 |
| 规则线 | 页顶；批注强调线 | 页顶；路径上下线 | 页顶；次稿和收尾分隔 | 统一线色，位置由内容关系决定 |
| 移动重排 | 侧注移入标题后 | 企业→批注→个体 | 主稿→批注→次稿→收尾 | 统一“重新排序而非压缩”，不共用 DOM 模板 |

### 3.3 应删除的实验值

Hero 的中性 B（`#f7faff`、`#4d6687`、`#cfdceb`）、预览设置区、URL 查询参数控制、小米立绝对定位尺寸均为实验工具，不进入生产。三个 prototype 的 `--prototype-*`、根级 reset 和为截图设置的 `100svh` 也不能复制为生产 token。

## 4. Token 冻结决策

### 4.1 全局候选

色值、真实系统字体栈、8/16/20/24/32/48/64/96 间距阶梯、1180/780/620 三个 measure、160ms 快速颜色过渡、3px/5px Focus 规则进入 Foundation。背景、主/次文字、批注、链接、规则线和 Focus 映射为 semantic tokens。

### 4.2 页面与组件局部

标题字号、行高、列宽、列间距、section 上下留白、侧注偏移、路径内部列比、主次稿尺度均留在 pattern。它们由内容角色决定，不应被一个全站类型阶梯机械抹平。

### 4.3 暂不进入系统

圆角、阴影、暗色模式、图像比例、SitePet 尺寸、Header 高度、Deck token 和动画曲线尚未被三个样板共同验证，不纳入最小冻结。

完整定义见 `design-system/tokens.md`。

## 5. 字体策略

当前没有加载 Inter，也不安装新字体。生产候选为系统无衬线栈：macOS 使用系统 Latin + PingFang，Windows 使用 Segoe UI + Microsoft YaHei，Android 使用 Roboto + Noto Sans CJK/SC，其他平台以 system-ui / Arial / sans-serif 兜底。

中英文和数字使用同一 family 层级，通过字号、行高、字重、字宽与内容宽度建立差异。`DESIGN.md` 当前把 Inter 写在首位，与真实环境不符；本轮因该文件已有用户修改而不覆盖，后续应在独立文档提交中改为真实栈并注明“不加载 Web Font”。在修正前，新 MASTER / tokens 优先。

## 6. 冻结的四个 Pattern

| Pattern | 核心责任 | 关键边界 |
|---|---|---|
| `editorial-note` | 提供一条可由内容支持的编辑判断 | 最多两句、无卡片、桌面可侧轴、移动进主流 |
| `article-header` | 建立标题、摘要、最少元信息的阅读入口 | 标题唯一主角；不含正文、封面、作者卡和分享 |
| `home-hero` | 先给主张，再给企业/个体两条观察路径 | 不做双 CTA、产品 Hero、Logo 墙或 mockup |
| `editorial-story-group` | 用 primary/secondary/tertiary 表达三篇内容取舍 | 不做等宽卡片，不让三篇使用相同字段模板 |

具体规则见 `design-system/patterns/`。这四个 pattern 是已验证边界，不是全站组件库。

## 7. 内容角色与数据规划

### 7.1 立即阶段：展示层映射

第一轮不改 Evidence 数据模型。页面层以 slug 为键建立小型人工配置：

```js
{
  slug,
  role: 'primary' | 'secondary' | 'tertiary',
  displayOrder,
  editorialNote,
  shortDescription
}
```

`contentPath` 从现有 topic/type 映射，标题和正式摘要继续读取 Evidence。`editorialNote` 可从现有 `finding` 起草但必须人工确认；`shortDescription` 可从 summary/description 缩写但不能运行时机械截断。没有字段就省略，不补假信息。

文章头部第一次迁移只需要当前 Evidence 的类型、标题、摘要和既有阅读信息；若编辑批注尚未存在，可对单个试点 slug 使用局部人工映射，不推动全模型改造。

### 7.2 正式阶段：分离证据与编排

保留 Evidence 作为事实/证据模型，另建首页编辑编排配置。`role` 与 `displayOrder` 在选入文章组时必需；`editorialNote` 只对 primary 必需；`shortDescription` 对显示说明的角色必需；`contentPath` 必须能映射到真实栏目。字段是否显示由角色决定，不让所有 Evidence 永久拥有同一展示模板。

## 8. CSS 迁移策略（计划，不实施）

1. 建立 `src/styles/editorial/tokens.css`，只定义 `tokens.md` 冻结的变量，不带全局 reset 或页面样式。
2. 首次由文章详情页的局部 CSS 导入；不先改 `src/index.css`、Tailwind 配置或全局主题。
3. Pattern CSS 与生产组件同目录，类名以页面/组件作用域限定；局部字号、列宽和间距留在 pattern CSS。
4. JSX 不硬编码颜色、字号和间距；内容映射可暂时局部存在。
5. 旧页面与新样式共存：未命中试点条件的页面继续使用原 DOM/CSS。
6. 不复制 prototype 根级 reset、设置面板、测试查询参数或 `min-height` 截图值。
7. Tailwind 若将来需要消费 token，通过 CSS variable 映射到现有配置；不得维护第二套 hex。
8. 每个迁移单独截图、审计、人工确认和回滚；旧样式在该 pattern 全部迁移前保持冻结。

### 回滚原则

每次迁移必须能通过删除局部 CSS 导入和单一路由/slug 守卫恢复旧渲染，不依赖全局 token 回退或数据迁移脚本。

## 9. 第一次正式迁移：文章详情页头部

### 9.1 允许范围

- `src/components/geo/EvidenceDetailPage.jsx` 中仅文章头部的条件渲染；
- 新增同目录局部 CSS，例如 `EvidenceDetailPage.editorial.css`；
- 新增最小 `src/styles/editorial/tokens.css` 并仅由局部 CSS 导入；
- 对一个真实 slug 做页面级展示映射；
- 文章头部响应式、链接 Hover / Focus 和 reduced-motion；
- 1440 / 768 / 390px 截图与只读审计。

### 9.2 禁止范围

正文、目录、推荐阅读、Header、Footer、SitePet、首页、全局背景、封面系统、作者/日期/阅读量、SEO、History API 路由、Evidence 模型、依赖、字体和全局 token 重写。

### 9.3 隔离方式

`EvidenceDetailPage` 影响所有 Evidence 路由，是高风险文件。第一步只对 `enterprise-ai-workflow-pilot`（或正式数据中人工确认的真实等价 slug）启用新头部；其他 slug 保留旧分支。优先用局部常量 + slug 守卫，不修改主路由。若上线环境需要开关，再使用现有构建环境能力；不要为一个试点新建配置系统。

### 9.4 高风险点

- 条件分支误命中所有 Evidence；
- 头部 DOM 改动影响既有 SEO 标题或结构化数据；
- 局部 CSS 选择器泄漏到正文；
- Header 高度与 prototype 独立入口不同；
- 真实长标题、字段缺失和移动端换行破坏节奏。

### 9.5 验证与回滚

1. 记录迁移前 1440 / 768 / 390px 基线截图。
2. 验证试点 route 与至少三个未试点 Evidence route。
3. 检查标题唯一性、DOM 标题层级、键盘 Focus、44px 链接、无横滚、console、lint、build。
4. 比对 SEO 输出与 structured data 未变化。
5. 由 `$design-audit` 只读复审并人工确认。
6. 回滚时移除 slug 守卫分支、局部 CSS import 和新增 CSS/token 文件；旧头部始终保留，数据无需回滚。

验收标准：试点页达到 prototype 的层级、批注、暖白与移动阅读轴；其他文章像素与行为无意外变化；没有三项 AI UI 风险；可用单一小提交完整回滚。

## 10. 正式迁移顺序

1. 文章详情页头部；
2. 首页 Hero；
3. 首页编辑文章组；
4. 文章列表与栏目页；
5. 文章正文；
6. Header 与 Footer；
7. 图像与真实证据系统；
8. 其他页面与子系统。

每一步单独审计、人工确认、可回滚。一次迭代不得同时修改两个高风险层，例如“全局 token + Header”或“数据模型 + 首页结构”。

## 11. Prototype 保留策略

- 目前保留三个 prototype，并建议在视觉重设计分支中提交，作为回归基线；不得进入正式导航或生产内容流。
- 暂不删除，直到前三个正式迁移 pattern 均通过审计、人工确认，且基线截图和文档已归档。
- 建议以后为 `src/prototypes/` 增加 README，写明开发预览路径、非生产性质、禁止复制根级 CSS、删除条件；本轮遵守“不修改 prototype”而不新增。
- CI/验收应检查 production `dist` 不含 prototype HTML、根 id 和 prototype 类名前缀；不要用样板文章标题作泄漏信号，因为这些真实内容也可能合法存在于正式 Evidence 数据。若入口标识进入产物，先修正隔离，再迁移页面。
- Prototype 只用于视觉回归，不作为共享组件或 token 源；生产实现必须依据 MASTER / tokens / patterns。

本轮用临时目录执行了 Vite production build：构建成功，产物中未发现三个 prototype 的 root id、类名前缀或独立 HTML。构建中仍有既有 `PageController.ts` 使用 `eval` 的警告，与本轮文档工作和 prototype 隔离无关。

## 12. Git 与工作区建议（只读）

当前工作区在本轮前已存在 `PRODUCT.md`、`DESIGN.md` 修改，以及 `.agents/`、`.codex/`、`docs/visual-redesign/`、`src/prototypes/` 未跟踪内容。本轮未清理、覆盖、暂存或提交它们。

建议在提交前先人工审阅并创建 `codex/visual-redesign-phase4` 分支；按依赖关系拆成：

1. `docs: establish visual redesign brief and baseline`：`PRODUCT.md`、`DESIGN.md` 与 `00`–`04`；先确认其中 GEO 维护说明是否属于同一产品上下文。
2. `prototype: add approved editorial visual samples`：三个 prototype 与 `05`–`07` 审计。
3. `docs: freeze minimal editorial design system`：新 MASTER、tokens、四个 patterns、anti-patterns 和本文件。

不要把 `.agents/` / `.codex/` Skill 安装文件与产品代码混在默认提交中；先确认团队是否希望把 project-local Skill 纳入仓库。上述只是建议，本轮不创建分支、不暂存、不提交。

## 13. 下一阶段 Codex 提示词草案

```text
执行 Phase 4B-1：文章详情页头部第一次正式迁移。

开始前读取 design-system/MASTER.md、tokens.md、anti-patterns.md、
patterns/editorial-note.md、patterns/article-header.md，以及
docs/visual-redesign/08-prototype-convergence.md。

只对一个经确认的真实 Evidence slug 启用新文章头部。允许修改
EvidenceDetailPage.jsx 的局部条件渲染、新增同目录局部 CSS 和最小
editorial token CSS。不得修改正文、推荐阅读、Header、Footer、SitePet、
首页、路由、SEO、Evidence 数据模型、全局主题、依赖或字体。

旧头部必须作为未命中 slug 的回退。先记录 1440/768/390 基线，再实现；
验证试点 route 和至少三个非试点 route、键盘 Focus、无横滚、console、lint、
build 与 SEO 输出。完成后使用 $design-audit 只读审计，不根据审计自动扩展
范围。若设计命中三个以上 AI UI 特征，停止实现并重新设计。
```

## 14. 收敛结论

Prototype 阶段到此结束。共同语言已足以支持第一次受控迁移：暖白局部背景、蓝灰文字、克制编辑蓝、系统字体、稳定左轴、非对称权重、发丝线、编辑批注、移动端重新编排和静态优先。尚未冻结的全站组件与图像系统必须按迁移序列逐项验证，不得从三个样板外推成一次性全站改版。
