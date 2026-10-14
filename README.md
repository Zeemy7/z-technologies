# Z Technologies Limited

Company site for Stack, Stratum, and Manifest.AI. Static HTML, CSS, and one script. There is no build step.

Before you publish, replace every `hello@yourdomain.com` with the real public email address.

## Put it on the domain you already own

The site is the files in this folder. Whichever host you use, `index.html` has to sit at the web root, next to `stack.html`, `stratum.html`, `manifest.html`, `css/`, and `js/`. Do not upload the `.git` folder.

### Path A — you do not have website hosting yet

Use Cloudflare Pages. It is free, it issues HTTPS, and it is built for a domain you already own.

1. Create an account at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages → Create → Pages → Upload assets** (Direct Upload).
3. Name the project `z-technologies` and upload this folder’s site files.
4. Open the deployed `pages.dev` URL and confirm the home page, Stack, Stratum, and Manifest.AI all load.
5. In that project, open **Custom domains** and add your domain (and `www` if you want it).
6. Cloudflare shows the DNS record to add.
   - If the domain’s nameservers are already on Cloudflare, it can add the record for you.
   - If the domain is still at the registrar where you bought it (Namecheap, GoDaddy, Google Domains, and so on), add the record Cloudflare prints. For `www` that is usually a **CNAME** pointing at your `*.pages.dev` hostname. For the bare domain (`yourdomain.com` with no `www`), Cloudflare will ask you to move the domain’s nameservers to Cloudflare, or to use the record it shows. Copy what the dashboard says. Do not invent an IP address.
7. Leave **MX** records alone if you receive email on this domain. Changing nameservers does not delete them when you are only moving DNS to Cloudflare, but check the MX list after the move so mail still points at your mail host.
8. Wait for DNS. Often a few minutes, sometimes a few hours. Cloudflare turns on HTTPS once the domain resolves.

Visiting the domain should show this site. If it shows a parked page, the new record has not replaced the old one yet, or it was added on `www` only.

### Path B — the domain already points at hosting you pay for

Use that host (cPanel, Hostinger, Namecheap hosting, or similar).

1. Open the host’s file manager or connect with FTP.
2. Go to the web root, usually `public_html` or `www`.
3. Upload `index.html`, `stack.html`, `stratum.html`, `manifest.html`, `404.html`, `favicon.svg`, `css/`, and `js/`.
4. If an old `index.html` is there, replace it. If your files landed inside an extra folder, move them up so the address is `yourdomain.com`, not `yourdomain.com/z-technologies/`.
5. You do not change nameservers for this path. The domain already points at the host. Only change DNS if the domain is not pointed at this hosting yet — use the **A** or **CNAME** record shown in the host’s “connect your domain” panel.

HTTPS should already be available as “SSL” or “Let’s Encrypt” in the hosting panel. Turn it on, then force HTTPS if the panel offers that.

### How to tell it worked

- `https://yourdomain.com` shows the Z Technologies home page.
- `/stack`, no — the pages are `/stack.html`, `/stratum.html`, and `/manifest.html`.
- The padlock is present. If the browser warns about a certificate, wait for the host to finish issuing it, then reload.
