# Assets

This folder contains image and animation assets used by chat-triggered
overlays (e.g. meme/image commands).

## Usage: TODO
Assets are served directly from this repository using GitHub’s raw file URLs
(`raw.githubusercontent.com`) and are consumed by StreamElements browser
sources.

## Guidelines
- Prefer **WEBM** for animations (smaller size, better performance)
- Keep file sizes small to avoid overlay lag
- Assets should be safe for stream use (Twitch ToS compliant)
- Version filenames if replacing assets (e.g. `sandwich_v2.webm`)

## Notes
This folder contains **media only**.
No overlay logic or configuration should be added here.
