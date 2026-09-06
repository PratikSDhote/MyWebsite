ANARTH (∆N∆RTH) — Local site

Quick local preview:

```cmd
cd /d g:\MyWebsite
npx http-server -p 8000 --cors

# then open http://localhost:8000/site/index.html
```

**IMPORTANT**: The server must be started from the `MyWebsite` root directory (not from the `site/` subfolder) so that fetch requests to `../Lyrics/` files work correctly.

What this build includes:
- Hero with background video (uses `Assets/video/VID_20260825223617.mp4`)
- Music, Videos, Gallery, Lyrics pages using existing assets
- Accessibility improvements, lazy-loading, OG/Twitter tags

Notes:
- The site references the `Assets/` folder; keep the folder structure intact.
- Do not expose `links.txt` or raw private files to the public site; streaming links are embedded only where needed.
