# Priyanshu // Mission 05

## Experience
- Replace the placeholder with a single fullscreen, non-scrolling game journey where only one cinematic scene is active: authentication, access, Jack’s briefing, tower ascension, classified memory discovery, decryption, love letter, memory archive, mission log, final briefing, and completion.
- Keep the romance concealed until the classified five-month memory reveal: `02.05.2026 → 02.10.2026`, followed by the private message from Kashvi to Priyanshu.
- Use near-black, neon-red, and cyan HUD styling with fast glitch wipes, scanline transitions, brief blackouts, particles, and distortion; calm the effects significantly while the letter is being read.
- Generate and reuse one original slim, masked, cybernetic sword-runner visual with red/cyan rim light at five key moments, composed beside the interface against the Tower rather than permanently dominating the screen.

## Interaction
- Validate `KASHVI` case-insensitively and show the three escalating wrong-password messages without revealing it.
- Add a persistent, subtle Tower Ascension tracker that marks completed, current, and locked stages without resembling website navigation.
- Animate staged loading sequences, terminal typing, the classified anniversary reveal, progressive paragraph-by-paragraph letter decryption, expandable mission entries, a photo-memory lightbox, and restart back to authentication.
- Add a persistent sound on/off control with synthesized ambient, terminal, authentication, decryption, glitch, and transition cues that starts only after user interaction and remains optional.
- Place the short personalized `KASHVI` weakness and dependency system analyses after the emotional section without turning the experience into comedy.
- Keep controls keyboard-accessible and motion reduced when the visitor requests reduced motion.

## Editable content
- Centralize the intact love letter, anniversary dates, mission entries, memory placeholders, funny system messages, labels, character settings, audio settings, and sequence timings in clearly named data blocks.
- Build reusable terminal, tracker HUD, glitch text, loading sequence, typewriter, memory gallery, mission card, recurring character, and final-message pieces.

## Technical details
- Use the existing React/TanStack/Tailwind setup, CSS keyframes, and semantic design tokens; no backend is needed.
- Generate one original runner-and-Tower visual system and retain local placeholder memory slots until photos are provided.
- Add page-specific metadata, then verify the complete scene progression on desktop and mobile, including password errors, anniversary reveal, tracker state, modal interaction, expansion controls, and restart.
