# Portfolio — Deployment Notes

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Optional (recommended) | GitHub Personal Access Token for higher API rate limits. Without it, unauthenticated limit is 60 req/hr. Create one at [GitHub Settings → Tokens](https://github.com/settings/tokens). Only needs `public_repo` read scope. |
| `NEXT_PUBLIC_FORMSPREE_ID` | Optional | Formspree form ID for the contact form. Create one at [formspree.io](https://formspree.io). Without this, the contact form falls back to `mailto:`. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Your deployed site URL (e.g. `https://divyasingh.dev`). Used for sitemap generation. |

## API Routes & Caching

| Route | Source | Cache TTL | Fallback |
|-------|--------|-----------|----------|
| `/api/github` | GitHub REST API | 1 hour | Hard-coded from research |
| `/api/github/contributions` | GitHub Events API | 6 hours | Empty heatmap |
| `/api/leetcode` | LeetCode GraphQL (unofficial) | 1 hour | Resume stats (500+ solved) |
| `/api/codeforces` | Codeforces Official API | 1 hour | Verified data (rating 1062) |

## Assumptions Made

1. **GitHub username:** Confirmed as `divya-3005` via API verification
2. **Codeforces handle:** Confirmed as `divyasingh22` (rating 1062, 3 contests)
3. **LeetCode handle:** Using `divya_singh22` — the LeetCode GraphQL proxy may be blocked; fallback data is from the resume
4. **CodeChef:** Static "2★" display — no handle was provided for live fetch
5. **Resume PDF:** The "Resume" button currently links to `#`. Drop your PDF into `public/resume.pdf` and update the link in `Hero.tsx`
6. **Contact form:** Falls back to `mailto:` unless `NEXT_PUBLIC_FORMSPREE_ID` is set

## Deployment to Vercel

```bash
# 1. Push to GitHub
git add -A && git commit -m "feat: complete portfolio" && git push

# 2. Import in Vercel
#    - Go to vercel.com/new
#    - Import your GitHub repo
#    - Add environment variables (GITHUB_TOKEN, NEXT_PUBLIC_FORMSPREE_ID)
#    - Deploy!

# 3. (Optional) Add custom domain in Vercel dashboard
```

## Adding/Rotating API Keys

- **GitHub Token:** Go to GitHub Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens → Generate new token with `public_repo` read-only scope. Add as `GITHUB_TOKEN` in your Vercel project settings.
- **Formspree:** Create a form at formspree.io, get the form ID (e.g. `xyzAbCdE`), and set it as `NEXT_PUBLIC_FORMSPREE_ID`.

## Cool Features

- **Command Palette:** Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to search and jump to any section
- **Terminal Easter Egg:** Type `sudo whoami` anywhere on the page for a fun surprise!
- **Dark/Light Mode:** Toggle via the sun/moon icon in the navbar
- **Live Data:** GitHub repos, Codeforces rating, and LeetCode stats refresh automatically via ISR
- **Contribution Heatmap:** Built from GitHub events — will show more data once a GitHub token is added

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- Recharts (charts/graphs)
- Lucide React (icons)
- Formspree (contact form)
