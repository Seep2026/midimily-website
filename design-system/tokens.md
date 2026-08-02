# Midimily 最小 Token 冻结

> 来源：三个已通过并经人工确认的 prototype。Token 只冻结重复出现且承担相同语义的值，不对局部差异取平均。

## 1. 分层原则

- **Foundation**：稳定原子值，可作为 CSS 单一来源。
- **Semantic**：页面使用的语义别名，不暴露色阶含义。
- **Pattern**：只在对应 pattern 范围内使用；不是全局 token。
- 不因 prototype 使用过某个值就自动全局化。

## 2. Foundation tokens

建议未来实现使用以下命名；本轮不写入生产 CSS。

```css
:root {
  --mily-color-warm-50: #fcf8f2;
  --mily-color-ink-900: #2e415f;
  --mily-color-ink-800: #344e72;
  --mily-color-ink-700: #405a7c;
  --mily-color-ink-600: #526f96;
  --mily-color-blue-400: #7c92bb;
  --mily-color-blue-700: #2e5b94;
  --mily-color-rule-200: #d7e3f0;

  --mily-font-sans: ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Roboto, "Noto Sans CJK SC", "Noto Sans SC",
    Arial, sans-serif;

  --mily-space-1: 8px;
  --mily-space-2: 16px;
  --mily-space-3: 20px;
  --mily-space-4: 24px;
  --mily-space-5: 32px;
  --mily-space-6: 48px;
  --mily-space-7: 64px;
  --mily-space-8: 96px;

  --mily-measure-wide: 1180px;
  --mily-measure-content: 780px;
  --mily-measure-narrow: 620px;

  --mily-motion-fast: 160ms;
  --mily-focus-width: 3px;
  --mily-focus-offset: 5px;
}
```

### 字体回退策略

- macOS / iOS：系统 Latin 字体通过 `system-ui` / `-apple-system`，中文回退到 `PingFang SC`。
- Windows：`Segoe UI` 负责 Latin 与数字，中文回退到 `Microsoft YaHei`。
- Android：系统通常选择 Roboto，中文回退到 Noto Sans CJK / Noto Sans SC。
- Linux 与其他环境：`system-ui`、Noto、Arial、`sans-serif` 依次兜底。
- 中英文、数字共用同一 family 层级；只用字号、行高、字重和宽度建立层级。
- `Inter` 当前未被项目加载，不得写成已存在字体。`DESIGN.md` 中的 Inter 建议应在不与现有脏改动冲突的独立文档提交中改为上述真实栈；未完成前以本文件为准。

## 3. Semantic tokens

| Semantic token | Foundation | 用途 |
|---|---|---|
| `--mily-page-background` | `warm-50` | 经确认的编辑页面局部背景候选 |
| `--mily-text-primary` | `ink-900` | 主标题、唯一主角 |
| `--mily-text-secondary` | `ink-700` | 摘要和主体说明 |
| `--mily-text-muted` | `ink-600` | 内容路径、元信息、次要说明 |
| `--mily-editorial-accent` | `blue-400` | 批注线和结构性强调 |
| `--mily-editorial-note` | `ink-800` | 批注文字 |
| `--mily-hairline` | `rule-200` | 1px 分隔线 |
| `--mily-link` | `ink-800` | 默认文本链接 |
| `--mily-link-hover` | `blue-700` | Hover / active 文字状态 |
| `--mily-focus-ring` | `blue-700` | 3px Focus ring |
| `--mily-content-wide` | `1180px` | 页面外层最大宽度 |
| `--mily-content-measure` | `780px` | 主阅读轴上限 |
| `--mily-content-narrow` | `620px` | 摘要、批注、窄正文候选 |

暖白目前是已确认样板的候选底色，不等同于批准全站一次性迁移。辅助文字不得自动回退到旧 `#607795` / `#8b9bb2`；其在暖白上的对比风险已由 Phase 1 审计记录。

## 4. Pattern-local values

以下值保留为 pattern 参数，不进入全局 token：

| Pattern | 局部值 | 原因 |
|---|---|---|
| Article Header | 标题 54–66px、摘要 650px、侧注 220–280px | 文章标题长度与页头留白特有 |
| Home Hero | 标题 54–72px、摘要 670px、主路径 720px | 品牌主张需比文章头部更开放 |
| Story Group | 主稿 48–61px、右侧 240–300px、三级稿 160/500/余量 | 用于 60/25/15 编辑权重 |
| Editorial Note | 2px 或 3px 蓝线、15–17px 字号 | 由所在 pattern 和位置决定 |
| Mobile | 520px（文章头部）、600px（Hero/文章组） | 两类标题和内容结构的真实换行点不同 |

不统一断点数字本身；统一的是在约 900px 拆除桌面双轴、在手机宽度回到单列与 20px 边距的行为。

## 5. 必须删除或不得生产化的 prototype 值

- Hero 中性背景实验：`#f7faff`、`#4d6687`、`#cfdceb`。
- Prototype 设置面板、查询参数 A/B 控制及其按钮样式。
- 小米立静态签名的绝对定位、61×66 / 50×54 / 45×49 尺寸。
- `--prototype-*` 命名和 prototype 根级 `:root` 重置。
- 为截图适配的 `min-height: 100svh` 不应被自动复制到正式文章区。

## 6. CSS 迁移约束

未来建立 `src/styles/editorial/tokens.css` 作为这组 token 的单一 CSS 来源，先由迁移页面的局部 CSS 导入。不要一次性重写全局变量、Tailwind 配置或旧组件。Tailwind 如后续需要使用，只消费同一组 CSS variables，不另建一套色值。JSX 不出现颜色、间距或字号硬编码；Pattern 的局部值留在相应 CSS 文件并注释来源。
