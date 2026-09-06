# ∆N∆RTH (ANARTH) — Official Artist Portfolio

A modern, responsive artist portfolio website for ANARTH (∆N∆RTH), a Marathi hip-hop artist.

## Features

- **Hero Section**: Full-screen video background with artist branding
- **Music Section**: Showcase of released tracks (CHARITRA, BACKBONE, LEGACY) with streaming links
- **Music Videos**: Lazy-loaded YouTube players with error handling and responsive design
- **Lyrics**: Interactive popup modal for reading song lyrics with file-based loading
- **Gallery**: Masonry layout with lightbox viewer
- **Artist Profiles**: Professional brand-colored social media links
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Accessibility**: Full keyboard navigation, ARIA labels, skip-to-content links
- **Performance**: Lazy loading images, optimized fonts, minimal dependencies

## Project Structure

```
g:\MyWebsite/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── scripts.js          # Interactive features
├── favicon.svg         # Browser tab icon
├── vercel.json         # Vercel deployment config
├── README.md           # This file
├── Assets/             # Images, videos, artwork
│   ├── artworks/       # Album artwork
│   ├── Thumbnail/      # Video thumbnails
│   ├── profile photo/  # Artist profile image
│   ├── gallary images/ # Gallery images
│   └── video/          # Hero background video
├── Lyrics/             # Song lyrics (text files)
│   ├── charitra.txt
│   ├── backbone.txt
│   └── Legacy.txt
└── links.txt           # Official streaming/social links
```

## Local Development

### Using http-server (Node.js)

```bash
cd g:\MyWebsite
npx http-server -p 8000 --cors

# Open browser to http://localhost:8000
```

### Using Python

```bash
cd g:\MyWebsite
python -m http.server 8000

# Open browser to http://localhost:8000
```

**Note**: Server must be started from the root `MyWebsite` directory for relative asset paths to work correctly.

## Deployment

### Vercel

This project is configured for automatic deployment to Vercel:

1. Push code to GitHub
2. Connect repo to Vercel
3. Vercel automatically deploys from the root directory
4. Site is live at your Vercel domain

**Configuration**: `vercel.json` handles routing and caching

### GitHub Pages

1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Select `main` branch as source
4. Site is live at `username.github.io/MyWebsite`

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, responsive design
- **JavaScript**: Vanilla (no frameworks)
- **Fonts**: Google Fonts (Space Grotesk, Noto Sans Devanagari)
- **Icons**: SVG brand logos

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Full keyboard navigation
- ARIA labels and roles
- Skip-to-content link
- Focus indicators
- Prefers-reduced-motion support
- High contrast text

## Performance

- Image lazy loading
- Font preconnect
- Minimal CSS/JS
- Responsive images
- Optimized modal rendering
- No third-party dependencies

## License

© 2026 ANARTH. All rights reserved.

## Contact

For bookings and collaborations:
- Email: pratikdhote52@gmail.com
- Instagram: https://www.instagram.com/anarth_8
- YouTube: https://www.youtube.com/channel/UC_oH8JIxrPz5upv_p8ieNjQ
- Spotify: https://open.spotify.com/artist/0kLMYg4mAcI0nTroc95Nmc
