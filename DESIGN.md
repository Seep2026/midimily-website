# Design

## Design System

Midimily uses a light brand surface for an AI service website and solution deck library. The system is documented in more detail in `design-system/MIDIMILY_MASTER.md`, `design-system/MIDIMILY_DECK.md`, and `design-system/MIDIMILY_PERSONALITY_REFRESH.md`. This root file is the compact design source for impeccable workflows.

## Visual Style

Midimily should feel light-tech, warm-business, clear, and trustworthy. The visual language uses warm white surfaces, pale blue-gray layers, low-saturation blue-purple emphasis, and soft cyan accents.

The design should not feel cyberpunk, neon, black-gold, traditional consulting, or generic SaaS. Keep backgrounds quiet. Let hierarchy, spacing, deck covers, and calm interaction carry the brand.

## Color

Primary palette:

- Warm background: `#fcf8f2`
- Soft cool background: `#f7faff`
- Surface: `#fbfdff`
- Warm surface: `#fffdf9`
- Main text: `#2e415f`
- Ink: `#344e72`
- Body text: `#607795`
- Subtle text: `#8b9bb2`
- Border: `#d7e3f0`
- Primary blue: `#7c92bb`
- Soft enterprise blue: `#e9f2ff`
- Low-saturation plum: `#8f9cd6`
- Growth cyan: `#8cc7bd`
- Soft growth cyan: `#eefbf8`

Enterprise direction may lean pale blue-purple. Individual growth may lean pale cyan-blue. Keep saturation low and avoid large areas of dominant purple.

## Typography

Use the current system sans stack:

`Inter, "PingFang SC", "Microsoft YaHei", sans-serif`

Hierarchy:

- Hero H1: 52 to 68px desktop, 34 to 42px mobile.
- Page H1: 44 to 56px desktop, 32 to 38px mobile.
- Section H2: 30 to 40px desktop, 26 to 32px mobile.
- Card title: 20 to 28px desktop, 18 to 22px mobile.
- Body: 15 to 18px desktop, 15 to 16px mobile.
- Meta: 12 to 14px.

Use balanced headings and short Chinese lines. Avoid all-caps body text and long dense paragraphs.

## Layout

Main content max width is usually 1120 to 1220px. Web Deck stage width is about 1220 to 1240px.

Spacing rhythm:

- 8px for small internal gaps.
- 16px for compact card padding.
- 24px for default card padding.
- 32px for section internals.
- 48px for normal module separation.
- 72px for hero to next section on desktop.

Mobile horizontal padding should be about 20 to 24px. No page should create horizontal scroll.

## Components

### Header

Fixed top header, translucent warm-white or blue-white surface, light border, compact brand logo plus two-line wordmark. Desktop navigation includes enterprise service, individual growth, practice, solutions, and contact. Mobile uses a compact menu.

### Cards

Cards should use light borders and restrained background layering. Avoid nested cards unless the nested structure is functionally necessary. Default radii should sit around 12 to 18px. Solution cover cards may reach 20 to 24px.

Avoid heavy wide shadows paired with borders. Use one clear boundary method.

### Buttons

Buttons use action-oriented labels such as "查看全部方案", "预约企业 AI 咨询", "返回方案". Touch targets must be at least 44px. Use primary blue for main actions and white or ghost surfaces for secondary actions.

### Solution Library

The `/solutions` page is a branded cover wall, not a blog list. On mobile, category filters should be compact tabs. Solution cards should primarily show the deck cover, plus minimal meta when useful. Clicking a card opens the Web Deck directly.

### Web Deck

Web Deck pages should remain readable inside the main site shell. Desktop preserves a horizontal presentation feel. Mobile should avoid a compressed 16:9 strip and use viewport-height reading space. Controls should be compact: return action and current page count are enough.

### Pet

The website pet is 小米立, a low-distraction brand companion. It should stay subtle, avoid blocking CTAs, and use warm, helpful copy.

## Motion

Motion is quiet and purposeful:

- Hover lift for clickable cards.
- Subtle flow lines in the hero AI network.
- Gentle pet animation.
- Lightweight page and deck interactions.

Respect `prefers-reduced-motion`. Do not use fast flicker, bounce, elastic motion, or heavy animation libraries for basic interactions.

## Content Rules

Use clear Chinese short sentences. Every word should earn its place. Avoid repeated titles and explanatory labels when the visual structure already communicates the meaning.

Preferred method line:

不只看趋势，先跑一个小闭环。

## Implementation Notes

Current stack:

- Vite React SPA.
- Tailwind CSS v4 utilities through Vite.
- Slidev build artifacts embedded through React deck routes.
- Static solution data in `content/solutions/manifest.json` and `decks/*`.

When changing UI, preserve existing data and deck build flows unless explicitly requested.
