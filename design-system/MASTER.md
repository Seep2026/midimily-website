# Midimily 最小设计系统总入口

> 状态：Phase 4A 冻结版  
> 唯一方向：**Editorial Clarity × Human Observation / 编辑式清晰，人本式观察**

本文件是后续 Codex 与人工进行视觉工作的唯一入口。任何页面、组件、样式或视觉资产任务开始前，必须先读本文件，再读相关 pattern；不得从 prototype CSS、旧设计说明或 Skill 建议直接生成生产实现。

## 1. 规则优先级

发生冲突时按以下顺序处理：

1. 本文件的品牌方向、硬约束与停止规则；
2. `design-system/patterns/` 中与当前页面相符的 pattern；
3. `design-system/tokens.md`；
4. 当前页面经人工确认的局部约束；
5. `DESIGN.md` 与既有 `design-system/MIDIMILY_*.md` 中不冲突的产品或子系统规则；
6. `$frontend-design`、`$ui-ux-pro-max`、`$design-audit` 等 Skill 的通用建议。

页面 pattern 可以覆盖一般建议，但不能覆盖本文件的品牌硬约束。Skill 输出若建议视频 Hero、Web Font、Soft UI、卡片阴影、渐变或通用 Landing Page 结构，应直接拒绝，不得以“Skill 推荐”为理由改变已确认方向。

现有文档的定位：

- `MIDIMILY_MASTER.md`：历史基线和产品子系统上下文，不再是视觉总入口；其中 Inter、卡片上浮、渐变、网格和节点等规则不适用于本轮冻结的编辑页面。
- `MIDIMILY_DECK.md`：Web Deck 专项内容与版式参考；仍须服从本文件。
- `MIDIMILY_PERSONALITY_REFRESH.md`：历史探索记录；Claymorphism、软阴影、路径 chip、伪进度和轻拟物不得迁入编辑页面。

## 2. 品牌方向

Midimily 用清晰的编辑判断解释 AI 如何进入真实工作与个人成长。页面首先呈现一个值得记住的判断，再提供情境、路径或证据；它不是新闻流、SaaS 功能页，也不是抽象 AI 视觉陈列。

用户在十秒内应留下三个印象：

- 一屏有且只有一个明确主角；
- 暖白、蓝灰文字、发丝线和页边批注构成稳定编辑语法；
- 内容总是回到真实任务、小闭环和人的实践，而不是模型崇拜。

遮住 Logo 后，仍应通过左对齐的稳定阅读轴、非对称但可预测的权重、蓝色只标记编辑判断、无卡片依赖的内容分组识别 Midimily。

## 3. 八条硬原则

1. **一屏一主角。** 两秒内无法指出唯一主角即不通过。
2. **蓝色必须表达语义。** 只用于链接、Focus、编辑判断或结构标记；不得形成大面积背景。
3. **容器不是默认答案。** 优先用字号、宽度、留白与规则线分组；圆角仅服务真实交互对象。
4. **编号必须可追溯。** 没有真实序列、时间或栏目关系就不显示编号。
5. **中文承担信息。** 英文只在真实术语或品牌名称中出现，不作眉题装饰。
6. **图像必须提供证据。** 真实人物、界面、工作现场或结果记录优先；没有证据时宁可无图。
7. **移动端重新编排。** 不是压缩桌面双栏；DOM 与视觉顺序都要保持主次清晰。
8. **动效只确认状态。** 默认静态成立；不以淡入、上浮、视差或轨道动画制造气氛。

## 4. 冻结资源

- Token：[`tokens.md`](tokens.md)
- 编辑批注：[`patterns/editorial-note.md`](patterns/editorial-note.md)
- 文章头部：[`patterns/article-header.md`](patterns/article-header.md)
- 首页首屏：[`patterns/home-hero.md`](patterns/home-hero.md)
- 首页文章组：[`patterns/editorial-story-group.md`](patterns/editorial-story-group.md)
- 聚合列表：[`patterns/editorial-listing.md`](patterns/editorial-listing.md)
- 反模式：[`anti-patterns.md`](anti-patterns.md)
- 收敛依据：`docs/visual-redesign/08-prototype-convergence.md`

## 5. AI UI 停止规则

若一个方案同时命中三个或以上典型 AI UI 特征，必须停止实现并重新设计。典型特征包括：超大全屏无衬线字、黑白灰加亮蓝、空洞大留白、细网格、渐变光斑、玻璃拟态、漂浮几何体、无意义连接线、统一卡片阵列、三列等宽卡片、英文微标签、虚构编号、仪表盘包装、滚动淡入、Hover 上浮、发光按钮或节点。

“命中”只按实际可见结果判断，不因开发者声明了内容理由而自动豁免。最多允许两个低风险通用特征，且每个必须有明确内容职责。

## 6. 实现前检查

- 已读取本文件、相关 pattern、token 和 anti-pattern。
- 使用真实内容；没有内容的字段留空，不补假作者、日期、指标或英文标签。
- 同一屏可指出唯一主角，蓝色不抢主角。
- 没有默认卡片化，也没有把所有条目套同一字段模板。
- 375 / 390、768、1024、1440px 的重排逻辑明确。
- 链接和控件至少 44px 可触达，`:focus-visible` 清楚，视觉顺序与键盘顺序一致。
- 无横向溢出；辅助文字满足对比要求。
- 无必要动效；若存在过渡，尊重 `prefers-reduced-motion`。
- 变更范围、回滚方式和截图基线已写明。

## 7. 当前冻结边界

冻结的是文章头部、首页 Hero、首页编辑文章组、Evidence 聚合列表及其共用语言，不是完整全站设计系统。Header、Footer、正文、方案库、Web Deck、图像系统、SitePet、暗色模式与全局页面背景仍保持现状，必须按迁移顺序单独审计和人工确认。
