# EchoNet 3.0 — Vercel Web Deployment

This directory contains the complete web edition of **EchoNet 3.0**, ready for instant zero-configuration deployment to **Vercel** (`https://vercel.com`).

---

## Capabilities of the Web Edition

1. **Universal Device Support:** Works on any **iPhone (iOS Safari)**, **Android (Chrome)**, and **Laptop/PC** without installing any APK or app store package.
2. **Offline Progressive Web App (PWA):**
   - Automatically caches itself on the device via `sw.js`.
   - On **iPhone**: Open Safari $\rightarrow$ tap **Share** $\rightarrow$ tap **Add to Home Screen**.
   - On **Android**: Tap the **Install** prompt.
   - Once added, it opens and functions **100% offline with zero cellular or Wi-Fi**.
3. **Real Satellite GPS:** Captures real satellite GPS latitude, longitude, and accuracy via HTML5 Geolocation.
4. **Peer-to-Peer Data Mesh (WebRTC):** Direct browser-to-browser P2P multi-hop data relay using WebRTC data channels.
5. **Local Store-and-Forward:** Distress calls are saved in the device's persistent storage and synced when other peers or gateways reconnect.
6. **Dual Mode:**
   - **🚨 Victim SOS View:** High-visibility RED (SOS), AMBER (Medical), and BLUE (Supplies) buttons with emergency chime.
   - **🛰️ Rescue Command Console:** Interactive OpenStreetMap (Leaflet.js), incident table, and official evacuation broadcaster.

---

## How to Deploy to Vercel (2 Minutes)

### Option 1: Via Vercel Web Dashboard (Easiest)
1. Go to [https://github.com/new](https://github.com/new) and create a repository (e.g. `echonet-web`).
2. Upload the contents of this folder (`vercel_app`) to that GitHub repository.
3. Go to [https://vercel.com](https://vercel.com) and log in.
4. Click **"Add New..."** $\rightarrow$ **"Project"**.
5. Select your `echonet-web` repository and click **Deploy**.
6. Vercel will give you a live production URL (e.g. `https://echonet-web.vercel.app`) in under 30 seconds!

### Option 2: Via Vercel CLI
Run in this directory:
```bash
npm install -g vercel
vercel deploy --prod
```

---

## File Structure

- `index.html` — Full responsive PWA application (Victim SOS + Rescue Command Map).
- `sw.js` — Offline service worker cache.
- `manifest.json` — PWA manifest for home screen installation.
- `logo.png` — Emergency shield branding.
- `vercel.json` — Vercel routing rules.
- `api/messages.js` — Serverless endpoint for cloud syncing when internet is present.
- `api/evacuation.js` — Serverless endpoint for official evacuation broadcasts.
"# echonet---MAC" 
