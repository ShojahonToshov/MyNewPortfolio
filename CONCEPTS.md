# Preview and maintain the concepts

Run `npm run dev` and open `/4` for **Systems Atlas**, `/5` for **Field Notes**. The concept navigator retains Home and `/1`, `/2`, `/3`.

- `src/data/studies.js`: illustrative project content and existing contact destinations.
- `src/components/concepts/`: shared shell, contact footer, architecture SVG and local demos.
- `src/pages/Variant4.jsx`, `src/pages/Variant5.jsx`: independent experiences.
- `src/styles/concepts.css`: scoped visual systems and responsive / reduced-motion rules.
- `DESIGN.md`: audit, design exploration, rationale, verification and remaining content constraints.

Validation: `npm run lint` and `npm run build`.

For deployment, configure SPA route fallback to `index.html`. After building, set the `SITE_URL` environment variable to the real HTTPS origin and run `npm run seo` to generate `dist/sitemap.xml` and update `dist/robots.txt`. No domain is assumed or published by this task.

Before public launch, replace the explicitly labeled studies with verified project descriptions, role, repository/demo links, screenshots, architecture, constraints and outcomes. Do not remove the study labels while content is still illustrative.
