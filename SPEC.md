# Spec: GoodHart Labs review booking page (from Mukul, call and Slack, Nov 12 2026)

Purpose: middle of the funnel page. Clinical AI vendors book a paid one-time review of their model.

1. Use Mukul's design image wording ("All the English stays"), developer may adjust wording but keep the meaning.
2. "What we do" block: keep points 1, 2, 3 and 6 only (remove 4 and 5).
3. Hero headline "Find the failures your benchmarks didn't catch, before hospitals do." with CTA "Fix Your Failures" (keep Mukul's wording) and a secondary button.
4. First screen shows hero plus what we do. Second screen: the example assessment card coded (not an image), data points hoverable and interactive. A header above it.
5. Third screen: tab buttons Severity, Findings, Reproducibility, Scope, Drift, Controls, each showing its panel from the design.
6. Severity selected by default. Tabs auto advance every 5 seconds (agreed with Stavan, originally 3).
7. Clicking a tab holds it while the mouse stays over it; when the mouse leaves, auto advancing resumes.
8. Rename F1, F2 style codes to plain labels like "Critical case 1", "Critical case 2".
9. Only three scrolls. No smooth scroll library, no scroll hijacking. Avoid extra scrolling.
10. Same CTA again at the bottom, then a footer.
11. CTA opens a popup form: Name, Phone Number, Email, Company Name, Position in the company (CEO, CIO etc).
12. On Next, data is stored immediately in the Supabase database, whether or not the user continues.
13. After Next, Calendly opens to schedule a call.
14. Success page: thank you for connecting.
15. Stack chosen with Stavan: React, Vite, Tailwind (no Play CDN). Simplicity is key.
16. Security: no injection, no bad practices; Supabase public key is in the browser, so row level security must allow insert only.
