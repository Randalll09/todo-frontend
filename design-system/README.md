# Installing "Very Human" into a Tailwind + shadcn/ui codebase

This package ports the **very human** design system (pastel glassmorphism/neumorphism, soft-modern) into a Next.js/React app already using **Tailwind CSS v4** and **shadcn/ui**. It is a token + convention bridge, not new components — you'll ask shadcn's CLI to generate primitives, then restyle them with the tokens below so they match this system exactly.

## 0. About the fonts
Font binaries are **not** in this package — you're adding them directly into the repo. Put the four files somewhere public (e.g. `public/fonts/` or `app/fonts/`) and fix the four `url()` paths at the top of `globals.css` to match:
- `PretendardVariable.woff2` — body/UI typeface (variable font, weight range 45–920)
- `GmarketSansLight.otf` (300), `GmarketSansMedium.otf` (500), `GmarketSansBold.otf` (700) — display typeface

## 1. Drop in `globals.css`
Copy `globals.css` from this folder over (or merge into) your app's global stylesheet — it must load before any component renders. It:
- declares the four `@font-face` rules
- defines every design token as a CSS custom property on `:root`, plus a `[data-theme="dark"]` override block (dark mode = swap the attribute on `<html>`, nothing else changes)
- bridges shadcn's expected variable names (`--background`, `--primary`, `--radius`, …) onto the very-human tokens, so shadcn's stock component code needs **zero** prop changes to pick up the brand
- registers the pastel/sand/lilac/etc. color ramps, radii, and fonts as Tailwind theme values via `@theme inline` (Tailwind v4 syntax — if you're on Tailwind v3, see §5)
- adds three small utility classes: `.glass`, `.neu-raised` / `.neu-pressed`, `.blob`, `.grad-text`

## 2. Generate shadcn primitives, then restyle
Run the shadcn CLI as normal for whatever the feature needs:
```
npx shadcn@latest add button card dialog badge input textarea select checkbox switch tabs avatar progress tooltip toast
```
shadcn writes each component with Tailwind classes referencing `bg-primary`, `bg-card`, `rounded-md`, etc. — those already resolve to very-human tokens via the bridge in step 1. Then hand-restyle each to match the system exactly (shadcn's defaults are boxier/flatter than this brand):

| shadcn primitive | very-human equivalent | what to change |
|---|---|---|
| `Button` | `Button` (core) | `rounded-full` (pill, not `rounded-md`); primary variant = solid `bg-blush-400` → hover `bg-blush-500` → active `scale-[0.975]`; add a `neu`-styled variant using `.neu-raised`/`.neu-pressed`; ghost variant washes `bg-sand-100` on hover, not `bg-accent` |
| `Card` | `Card` / `GlassPanel` | `rounded-[28px]` (`rounded-3xl` ≈ 24px in stock Tailwind — override to the exact 28px `--r-xl` token), `shadow-[var(--shadow-md)]`, 1px `border-sand-200`; for the glass variant drop the border and apply `.glass` instead |
| `Badge` | `Badge` / `Tag` | fully pill (`rounded-full`), soft-tint backgrounds (`bg-blush-100 text-blush-700`) rather than solid fills |
| `Dialog` | `Dialog` | sheet radius 36px (`--r-2xl`), scrim `rgba(52,42,38,.28)` + 6px blur, apply `.glass-strong` to the panel itself, enter/exit with a fade + 8px translate at 220ms `--ease-soft` (`--dur-base`) — no slide-ins |
| `Input` / `Textarea` | `Input` / `Textarea` | resting state can be `.neu-raised` on `sand-100` wells instead of a hairline box; focus ring is `box-shadow:var(--ring-focus)`, never a Tailwind `ring-2 ring-blue-500` |
| `Select`, `Checkbox`, `Radio`, `Switch` | same names | switch and radio fully round; checkbox stays 6px (`--r-xs`) — the one deliberately-square-ish control; radio dot uses `--ease-bounce` on check |
| `Tabs` | `Tabs` / `SegmentedControl` | segmented track sits on `.neu-raised` sand-100, active pill is `bg-card` + `shadow-sm`, sliding at 220ms `--ease-soft` |
| `Avatar` | `Avatar` | circular, fallback initials on `bg-accent-soft text-blush-700` |
| `Progress` | `ProgressBar` | pill track (`rounded-full`), fill is `var(--grad-bloom)` not a flat color |
| `Tooltip` / `Toast` | `Tooltip` / `Toast` | small radius (`--r-md`/`--r-lg`), `.glass` background, fade+4px translate, `--dur-fast` |

Reference the source design system's component `.jsx`/`.d.ts`/`.prompt.md` files (see §4) for exact class combinations already worked out — copy the JSX structure, translate its inline CSS-var usage into Tailwind utility classes using the token names in `globals.css`.

## 3. Design rules to carry over (don't reinvent)
- **One gradient block per screen**, never behind more than ~2 lines of body text. Two gradient sections never sit adjacent — a plain `bg-sand-50` section always separates them.
- **Three depth systems, never mixed on one element**: soft warm shadow (default cards), glass (`.glass`, only over gradients/photos/busy backgrounds — never on flat sand), neumorphism (`.neu-raised`/`.neu-pressed`, only on `sand-100`/`sand-50` fill, used for wells/tracks/pressed states).
- **Nothing is square.** Radii run 6/10/14/20/28/36/48px + pill + `--r-blob` (organic blob shape for decorative shapes/feature tiles, not a Tailwind default — use the literal `var(--r-blob)`). The only near-square element is the 6px checkbox.
- **Motion**: 140/220/360ms, `cubic-bezier(.32,.72,0,1)` default, fades + small translates only — no slide-across, no parallax. Hover lifts 2px + deepens shadow one step; press scales to 97.5%.
- **Color discipline**: saturated pastel only at small scale (button fill, icon chip, selected tag); everything larger is a tint (`-100`) or a gradient. Warm sand neutrals, never grey.
- **Icons**: Lucide, 2px stroke, rendered via `currentColor` (mask or the `lucide-react` package) — 16/20/22/24px depending on context, never above 28px in UI. No emoji, no unicode-symbol icons.
- **Copy voice** (if you're writing UI text too): short, warm, Korean-first with sentence-case English; -어요/-아요 endings; questions over commands; errors apologize for the system, never blame the user; no emoji anywhere. Full detail in the source `readme.md` §Content Fundamentals.

## 4. Full source reference
This handoff is a subset. For exact component structure, every token, all 21 primitives with variants, and the two full UI-kit recreations (mobile journalling app + marketing site), see the source design system project (`readme.md` at its root is the manifest). Pull specific `.jsx` files from `components/**` as reference when restyling shadcn output — do not ship that JSX as-is (it targets this project's own bundler), copy its structure and class choices into your shadcn components instead.

## 5. If you're on Tailwind v3, not v4
`@theme inline` is v4-only. On v3, instead extend `tailwind.config.js`:
```js
theme: { extend: {
  colors: { blush: {50:'var(--blush-50)',100:'var(--blush-100)',/* …200-700 */},
            sand: {0:'var(--sand-0)',50:'var(--sand-50)',/* …100-900 */},
            /* peach, butter, mint, sky, lilac the same way */
            background:'var(--background)', primary:'var(--primary)' /* …rest of the bridge vars */ },
  borderRadius: { xs:'var(--r-xs)', sm:'var(--r-sm)', md:'var(--r-md)', lg:'var(--r-lg)', xl:'var(--r-xl)', '2xl':'var(--r-2xl)', '3xl':'var(--r-3xl)', pill:'var(--r-pill)' },
  fontFamily: { display:['var(--font-display)'], body:['var(--font-body)'], mono:['var(--font-mono)'] },
}}
```
and drop the `@theme inline{...}` block from `globals.css` (keep everything else — the `:root` tokens, dark override, `@layer base`, utilities).
