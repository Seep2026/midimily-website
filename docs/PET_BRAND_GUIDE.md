# Midimily Pet Brand Guide

## 当前默认品牌宠物
- 名称：小米立
- 资源 ID：`midimily-penguin`

## 资源路径
- `public/assets/pets/midimily-penguin/pet.json`
- `public/assets/pets/midimily-penguin/spritesheet.webp`

## 资源格式
- `pet.json`
- `spritesheet.webp`

## Fallback 策略
- 网站前台锁定展示：`midimily-penguin`
- 如果 `midimily-penguin` 的 `pet.json` 或 `spritesheet.webp` 加载失败，页面只记录 warning，不自动切换到其他形象。
- `crimson-whoop` 仅作为历史资源保留，不再作为运行时自动 fallback。

## 后续替换宠物方式
1. 新增目录：`public/assets/pets/{new-pet-id}/`
2. 放入：
   - `public/assets/pets/{new-pet-id}/pet.json`
   - `public/assets/pets/{new-pet-id}/spritesheet.webp`
3. 更新 `src/components/pet/petConfig.js` 中的：
   - `activePetId`
   - 对应 `petProfiles` 条目

## 备注
- 现有 `crimson-whoop` 不删除，作为历史资源留档。
- 页面逻辑通过配置驱动，不在 `SitePet.jsx` 中硬编码宠物资源路径。
