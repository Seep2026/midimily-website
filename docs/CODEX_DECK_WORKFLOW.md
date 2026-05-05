# Codex Deck Workflow

本文件定义 Codex 为 midimily 新增/更新方案 deck 的标准流程。  
原则：先读规范，再产内容，再构建验证。

## 0) 约束边界

- 不替换当前 Slidev 方案。
- `guizang-ppt-skill` 仅用于草稿与版式参考，不作为线上渲染引擎。
- 不引入 stella-decks 源码，不 fork stella-decks。
- 不新增 PDF/PPT 下载 UI。
- 不新增后台/CMS/登录。

## 1) 生成前必读

在创建任何新 deck 前，必须先读取：

1. `docs/MIDIMILY_DECK_DESIGN.md`
2. `docs/NARRATIVE_REVIEW_CHECKLIST.md`

未读取上述规范，不得直接写 `slides.md`。

## 2) 创建方案目录与 BRIEF

新方案目录结构：

```text
decks/{slug}/
  BRIEF.md
  meta.json
  slides.md
  (可选) assets/
```

先写 `BRIEF.md`，明确：

- 方案目标
- 目标用户
- 核心问题
- 读完后希望用户做什么
- 语气
- 不要写什么

## 3) 产出内容文件

可选草稿环节（推荐）：

- 先用 `guizang-ppt-skill` 生成一版叙事与版式草稿，用于快速试错。
- 把确认后的文案结构回填到 `slides.md`（Slidev）中。
- 线上发布仍走 `/solutions/{slug}/slidev/` 路径。

1. 创建/更新 `meta.json`
2. 创建/更新 `slides.md`
3. 内容须符合：
   - 每页一个重点
   - 中文短句
   - CTA 自然收束

## 4) 叙事审查

按 `docs/NARRATIVE_REVIEW_CHECKLIST.md` 逐项审查。  
未通过项需要回改后再构建。

## 5) 构建与集成

单个 deck 构建：

```bash
pnpm deck:build -- {slug}
```

批量 deck 构建：

```bash
pnpm deck:build:all
```

更新方案清单：

- 修改 `content/solutions/manifest.json`
- 确保 slug、状态、展示顺序正确

主站构建校验：

```bash
pnpm build
```

## 6) 发布前检查

- Deck 路径可访问
- 方案入口可跳转
- 无多余下载按钮
- 无不符合品牌语气内容

## 7) 关于未来 PDF 输出（仅开发侧能力）

如后续需要离线材料，可参考：

- Puppeteer 截图/渲染
- pdf-lib 合并与目录处理

注意：当前阶段不实现公开页面的 PDF/PPT 下载按钮。
