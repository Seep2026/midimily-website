# Midimily Personality Refresh

> Purpose: guide future UI updates that borrow the useful parts of a lightweight educational-platform experience while preserving Midimily's professional, calm, trustworthy AI service brand.

This document complements:

- `design-system/MIDIMILY_MASTER.md`
- `design-system/MIDIMILY_DECK.md`

It should be read before changing the homepage, individual growth pages, enterprise service pages, `/solutions`, or Web Deck entry surfaces.

---

## 1. Educational-Platform Elements That Fit Midimily

The educational-platform reference is useful because Midimily is not only selling services. It is also helping users understand a new way of working with AI. The following patterns can be absorbed:

### Lightweight Learning Platform Feel

Use the feeling of a guided learning environment:

- Clear entry points.
- Ordered next steps.
- A sense of "I know where to begin."
- Calm progress cues.
- Short, action-oriented copy.

For Midimily, this should feel like a professional learning companion, not a school app.

### Claymorphism Cards

Soft raised cards can make abstract AI services feel more approachable.

Useful for:

- Service entrance cards.
- Growth path modules.
- Solution cover cards.
- Step-by-step process blocks.
- Light progress indicators.

Use the effect lightly: warm surface, soft inner highlight, low contrast border, subtle shadow.

### Path-Based Growth

The path metaphor fits both Midimily service lines:

- Enterprise AI landing: from scenario discovery to process implementation.
- Individual AI growth: from tool usage to stable AI workflow.

Use paths as structured guidance, not gamified levels.

### Course Directory Preview

The course directory idea maps well to:

- `/solutions` deck cover wall.
- Individual growth module previews.
- Enterprise AI implementation playbooks.
- Web Deck outline preview.

Each card should answer: what is this, who is it for, what will I understand next?

### Progress Tracking Feeling

Midimily can use progress cues without creating accounts or actual tracking:

- "Step 1 / 4" service path.
- "8-page Web Deck" as scope signal.
- "Start here" / "Next action" microcopy.
- Thin progress rails in decks and path sections.
- Completed-looking but non-interactive markers for structured flows.

Do not imply user-specific saved progress unless the site actually supports it.

### Clear CTA

Educational platforms often show a strong next step. Midimily should use:

- Primary CTA: "预约咨询", "查看方案", "开始了解".
- Secondary CTA: "查看 Web Deck", "了解服务路径".
- CTA placed after context, not repeated aggressively.

---

## 2. Educational-Platform Elements That Do Not Fit Midimily

Avoid importing the demo too literally.

### Too Playful

Do not use:

- Bright candy colors.
- Cartoon-heavy icon systems.
- Childlike typography.
- Big badge rewards.
- Confetti-style completion effects.

Midimily's tone is warm, not childish.

### Over-Gamification

Avoid:

- XP, levels, streaks.
- Achievement badges.
- Leaderboards.
- Quest language.
- Progress percentages that imply real personal tracking.

The brand should feel like a trusted advisor, not a learning game.

### Dense Dashboard UI

Avoid turning public pages into a logged-in LMS dashboard.

Do not add:

- User avatar navigation.
- Enrolled course states.
- Assignment/checklist panels.
- Admin-like data blocks.
- Fake analytics.

### Heavy Claymorphism

Claymorphism becomes heavy when every surface has thick borders, large shadows, and inflated padding.

Avoid:

- Large "pillow" cards everywhere.
- Strong gray outer shadows.
- Excessive rounded corners.
- Nested raised cards.

### Template SaaS Look

Do not make Midimily look like a generic AI course marketplace.

Avoid:

- Generic course thumbnails.
- Neon AI gradients.
- Overused feature grids.
- Stock "online learning" patterns.

---

## 3. Light Claymorphism Rules For Midimily

Claymorphism should be used as a tactile layer, not as the whole visual language.

### Surface

Recommended surfaces:

- Warm white: `#fffaf3`, `#fffdf8`
- Blue-tinted white: `#f6f9fd`
- Mist blue: `#eef5fb`
- Pale cyan: `#edf8f7`

Use mostly solid surfaces. Gradients should be barely visible.

### Border

Use low-saturation borders:

- Blue gray: `rgba(133, 163, 198, 0.22)`
- Cyan: `rgba(126, 190, 190, 0.20)`
- Blue purple: `rgba(151, 146, 210, 0.18)`

Border width:

- Standard cards: `1px`
- Selected cards: `1px` or `1.5px`

### Shadow

Use soft, low-opacity shadows:

- Small card: `0 10px 28px rgba(66, 90, 120, 0.06)`
- Hover: `0 14px 34px rgba(66, 90, 120, 0.09)`

Avoid hard drop shadows.

### Highlight

Use a subtle inner glow or surface highlight:

- `inset 0 1px 0 rgba(255, 255, 255, 0.78)`
- Optional background radial gradient with opacity below `0.45`

### Radius

Follow the site rule that cards should remain restrained:

- Small control: `14px-18px`
- Service card: `20px-24px`
- Deck cover card: `18px-22px`

Avoid overly inflated 32px+ rounded cards unless used for a single large hero surface.

### Interaction

Hover movement:

- Translate Y: `-2px` to `-4px`
- Transition: `180ms-240ms ease`

Do not add bouncy or springy animation.

---

## 4. Homepage Personality Rules

The homepage should feel like a guided doorway into two serious but approachable service paths.

### Hero

Keep the hero calm and decisive:

- One clear brand positioning sentence.
- One supporting sentence about enterprise landing and individual growth.
- CTA group should appear within the first screen on desktop.
- Avoid stacking too many proof points above the fold.

Recommended hero feeling:

> "You are not lost in AI change. There is a path."

### Two Service Entrances

Enterprise and individual entrances should look like productized pathways.

Each entrance can include:

- Service name.
- One-sentence value.
- 3-4 path chips.
- One "start here" style CTA.

Do not make them look like blog category cards.

### Soft Learning Cues

Homepage can borrow course-platform affordances:

- "从这里开始"
- "3 步理解"
- "适合谁"
- "下一步"

But keep copy businesslike and restrained.

### Self-Praise Control

Remove or weaken language that reads as self-introduction or self-praise.

Prefer:

- What user can do next.
- What problem can be clarified.
- What process can begin.

Avoid:

- Long founder credentials.
- "我们很懂 AI" style claims.
- Dense capability boasting.

---

## 5. Individual Growth Path Rules

The individual growth experience should feel like a calm, structured development path.

### Path Structure

Use 3-5 stages:

1. 认识 AI 工具
2. 建立工作流
3. 沉淀模板
4. 形成作品
5. 规划下一步

Each stage should include:

- Short title.
- One clear outcome.
- One suggested action.

### Progress Feeling

Use visual path cues:

- Small numbered nodes.
- Thin rails.
- Step cards.
- "当前建议起点" marker.

Do not imply saved user progress.

### Tone

Individual growth copy should be:

- Encouraging.
- Realistic.
- Non-alarmist.
- Practical.

Avoid:

- "不学 AI 就会淘汰" panic language.
- Productivity bro tone.
- Overpromising career transformation.

### Visual Style

Individual path can use slightly warmer and softer surfaces:

- Pale cyan.
- Mist blue.
- Warm white.
- Small blue-purple accents.

Cards may be a bit more rounded than enterprise cards, but still restrained.

---

## 6. Enterprise AI Landing Path Rules

Enterprise pages should feel like an implementation roadmap.

### Path Structure

Use 4-5 stages:

1. 场景梳理
2. 流程拆解
3. 工具选型
4. 团队培训
5. 陪跑复盘

Each stage should show:

- Business problem.
- Implementation action.
- Expected output.

### Visual Tone

Enterprise surfaces should be more structured:

- Slightly sharper spacing.
- Fewer decorative elements.
- More grid discipline.
- Calm blue-gray dominant tone.

### Progress Signals

Use progress cues as implementation clarity:

- Roadmap rail.
- Step numbers.
- "产出物" chips.
- "适合场景" blocks.

Avoid:

- Course-like "lesson" language.
- Fake maturity score.
- Overly playful badges.

### CTA

Enterprise CTA should be action-oriented:

- "预约企业 AI 咨询"
- "从一个业务场景开始"
- "梳理第一个 AI 小闭环"

Do not overuse "立即转型".

---

## 7. `/solutions` Cover Wall Rules

The solutions page should feel like a branded product library, not a card list.

### Page Personality

It should communicate:

- Curated.
- Structured.
- Quietly premium.
- Easy to browse.
- Useful for discussion.

### Direction Filters

Enterprise and individual direction cards should function like calm filters:

- Selected state: subtle border + breathing dot.
- No large "currently selected" label.
- Clicking selected direction again resets to all.

The filter cards should not dominate the deck wall.

### Deck Cover Cards

Each cover card should show:

- Deck first-page visual.
- Minimal timestamp in lower-right if needed.
- No duplicated title/description under the cover.
- Entire card clickable.

Timestamp should feel like a watermark, not metadata competing with the title.

### Cover Layout

Cover wall should preserve rhythm:

- Desktop: 2-column or responsive grid with generous gap.
- Mobile: 1-column.
- No horizontal overflow.
- Card aspect ratio should feel like a presentation cover.

### Learning Platform Influence

Borrow course library clarity:

- Covers should feel browsable.
- Category filtering should be obvious.
- Deck entry should be direct.

Do not add enrollment, course duration, completion state, or ratings.

---

## 8. CTA Rules

CTA should reduce decision pressure.

### Primary CTA

Use when the user is ready to act:

- 预约企业 AI 咨询
- 预约个体成长咨询
- 从第一个场景开始

### Secondary CTA

Use when the user is still exploring:

- 查看方案
- 打开 Web Deck
- 了解服务路径

### CTA Style

Primary:

- Solid low-saturation blue.
- Warm white text.
- 44px+ height.

Secondary:

- Warm white / transparent surface.
- Blue-gray text.
- Subtle border.

### CTA Placement

Place CTAs:

- Hero.
- End of service sections.
- Last page of Web Deck.
- Contact section.

Do not repeat CTAs in every card unless each card represents a separate action.

---

## 9. Restrained Background Pattern Rules

Backgrounds should support attention, not compete with content.

### Allowed

- Very subtle radial glow.
- Faint grid with opacity below `0.06`.
- Soft linear gradient from warm white to pale blue.
- Small node/line hints with low opacity.

### Not Allowed

- Strong geometric patterns.
- Moving backgrounds behind dense text.
- Large gradient blobs.
- Dark sci-fi background.
- Bokeh/orb decoration.
- High-saturation purple-blue gradients.

### Page Guidance

Homepage:

- Can use one large subtle background atmosphere.

Solutions:

- Background should be quieter than homepage.
- Deck covers should carry most visual interest.

Web Deck:

- Background must not compete with slide content.

---

## 10. Mobile Rules

Mobile should feel calm, not compressed.

### Layout

- Stack service/path cards vertically.
- Reduce decorative backgrounds.
- Avoid side-by-side comparisons unless each item is very short.
- Keep CTA buttons at least 44px high.
- Use 16px minimum body text.

### Cards

- Use less shadow.
- Keep padding moderate.
- Avoid nested cards.
- Keep path rails simple.

### Deck Covers

- One cover per row.
- Maintain readable title size.
- Timestamp should stay subtle.

### Header And Navigation

- Keep navigation compact.
- Avoid squeezing too many labels into one line.
- Touch targets must be comfortable.

### Pet Assistant

- Mobile pet should remain hidden or extremely low-interruption.
- It must not cover CTA, deck navigation, or contact methods.

---

## 11. Codex UI Update Checklist

Before changing Midimily UI, Codex must check:

### Brand Fit

- [ ] Does the change still feel professional and trustworthy?
- [ ] Does it avoid childish learning-platform cues?
- [ ] Does it preserve warm business tone?

### Educational-Platform Influence

- [ ] Does the UI give users a clearer path?
- [ ] Does it create helpful progress or structure cues?
- [ ] Does it avoid fake progress, gamification, and dashboard clutter?

### Claymorphism

- [ ] Are card borders soft and low-saturation?
- [ ] Are shadows subtle enough?
- [ ] Are there no nested raised cards?
- [ ] Does the page still breathe?

### Content Hierarchy

- [ ] Is there one main message per section?
- [ ] Are titles and descriptions not duplicated unnecessarily?
- [ ] Are CTAs clear but not pushy?

### Solutions Page

- [ ] Is the cover wall still the main product surface?
- [ ] Are direction filters clear but lightweight?
- [ ] Does each cover click directly into the Web Deck?
- [ ] Are timestamps watermark-like?

### Mobile

- [ ] No horizontal overflow.
- [ ] Text remains readable.
- [ ] Touch targets are at least 44px.
- [ ] Decoration is reduced.

### Accessibility

- [ ] Interactive cards have accessible labels.
- [ ] Keyboard navigation works.
- [ ] Color is not the only state indicator.
- [ ] Contrast remains readable.
- [ ] Motion respects reduced-motion where relevant.

---

## Practical Summary

Midimily may borrow from educational-platform design in three ways:

1. Make service paths clearer.
2. Make solution browsing feel more structured.
3. Make AI growth feel approachable and progressive.

Midimily should not become a course marketplace, dashboard, or gamified learning app.

The desired result is:

> A professional AI service website with the clarity of a learning platform, the softness of light claymorphism, and the calm confidence of a trusted advisor.
