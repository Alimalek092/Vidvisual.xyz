---
name: video-gif-export-pipeline
description: Use when building or fixing video, GIF, image, or caption export in Vid-Visual, including rendering, encoding, formats, resolutions, watermarks, file size, storage, download links, and export progress.
---

# Video and GIF Export Pipeline

## First, always
Read the current export code and the data format that describes a project. Then evaluate the options below against what is already built. Verify tool flags, library APIs, and platform limits in the official docs before using them. If you cannot verify something, write "unverified".

## Options to compare (write a short decision table before building)
A. In the browser: Canvas with MediaRecorder, WebCodecs, or ffmpeg compiled to WebAssembly. No server cost, but speed and memory depend on the user's device, and cheap phones may fail or overheat. Browser support differs, so test Android Chrome and iPhone Safari.
B. On the server: ffmpeg in a worker or container, or a React-based programmatic video renderer such as Remotion. Output is consistent on every device, but it costs compute and needs a queue. Serverless function time, memory, and size limits depend on the plan and change, so read the current Vercel docs. Long renders belong in a background worker, not in a normal request.
Default recommendation for scale: server-side render jobs for video, browser-side for short GIFs and still images, with the same project data driving both.

## Specifications (examples to confirm with me, since plan limits are my decision)
- Video: MP4 with H.264 video and AAC audio for broad compatibility. WebM as optional.
- Resolutions: 720p for free, 1080p for paid is an example only.
- Aspect ratios: 16:9, 9:16, 1:1, with safe areas for text.
- GIF: optimize the color palette, keep frame rate around 12 to 15, default width at most about 720px, and show the estimated file size before export. Confirm the exact ffmpeg filters in the docs.
- Free-plan watermark applied as an overlay during render, never as a CSS trick the user can remove.
- Captions: export as SRT or VTT as well.
- Deterministic output: the same project data must give the same result.

## Job flow
Create export job, validate plan and credits, queue, render, upload to private storage, create a signed download link with an expiry, notify the user, clean up old files on a schedule. Support progress updates, cancel, retry, and automatic credit refund on failure. Set file size and duration caps and explain them in the UI.

## UX
Preview before export, estimated time, "we'll email you when it's ready", clear errors, a re-download option while the link is valid.

## Tests
Render a fixed sample project and compare the output with a stored reference (frame checksums or file properties). Test a failed render, a canceled render, and an expired link.

## Output
The decision table first. Then build the smallest working slice (for example one aspect ratio, one format), verify it, and list what remains.