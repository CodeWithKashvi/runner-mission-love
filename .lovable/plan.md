# Priyanshu // Mission 05

## Experience
- Replace the placeholder with one continuous fullscreen cyberpunk mission, moving through authentication, access granted, Jack’s briefing, ascension, message decryption, the letter, memory archive, mission log, final briefing, and completion screen.
- Keep the romance concealed until the decrypted message, with a near-black, neon-red and cyan HUD aesthetic, restrained scanlines, particles, glitches, and cinematic transitions.
- Use an original futuristic runner silhouette as Jack’s recurring visual presence, avoiding copyrighted artwork and generic fantasy imagery.

## Interaction
- Validate `KASHVI` case-insensitively and show the three escalating wrong-password messages without revealing it.
- Animate staged loading sequences, terminal typing, progressive paragraph-by-paragraph letter decryption, expandable mission entries, a photo-memory lightbox, and restart back to authentication.
- Keep controls keyboard-accessible and motion reduced when the visitor requests reduced motion.

## Editable content
- Centralize the love letter, mission entries, memory placeholders, labels, and sequence timings in clearly named data blocks.
- Build reusable terminal, HUD, glitch text, loading sequence, typewriter, memory gallery, mission card, character, and final-message pieces.

## Technical details
- Use the existing React/TanStack/Tailwind setup, CSS keyframes, and semantic design tokens; no backend is needed.
- Generate one original runner/environment visual and retain local placeholder memory slots until photos are provided.
- Add page-specific metadata, then verify the full journey on desktop and mobile, including password errors, modal interaction, expansion controls, and restart.
