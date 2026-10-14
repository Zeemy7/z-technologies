# Z Technologies

Company site for Z Technologies Limited. Static HTML, CSS, and one script. There is no install step and no production build.

Public site: https://ztechnologiesltd.com

Contact: info@ztechnologiesltd.com

## Preview locally

From this folder:

```bash
python -m http.server 8765
```

Open http://127.0.0.1:8765/

Pages:

- `/`
- `/about/`
- `/products/`
- `/contact/`
- `/privacy/`
- `/terms/`

## Contact form

The form validates in the browser, then opens a draft in the visitor’s email app to info@ztechnologiesltd.com. It does not deliver mail by itself, and the site does not store submissions.

To receive messages without an email app, connect a form backend (for example a Cloudflare Worker plus an email provider) and replace the submit handler in `js/site.js`. Until that exists, the mailto draft is the working path.

## Deploy

The live site is the existing Cloudflare Worker project `z-technologies`, connected to GitHub repository `Zeemy7/z-technologies`. Do not create a second Cloudflare project.

When a change is approved, commit and push to `main`. Cloudflare redeploys from that branch. Leave the current build settings as they are: this site has no build command, and the files are published from the repository root.

Legal pages in `/privacy/` and `/terms/` are initial templates. They need a lawyer’s review before they are treated as final.
