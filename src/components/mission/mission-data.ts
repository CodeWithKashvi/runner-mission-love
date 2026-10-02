import img1 from "./img1.jpeg";
import img2 from "./img2.jpeg";
import img3 from "./img3.jpeg";

export const LOVE_LETTER = [
  "My Panda,",
  "If you're reading this, then you somehow managed to get through the entire system just to find this message. And honestly… that feels very you. 😂",
  "Happy 5th month anniversary, my love. ❤️",
  "Five months.",
  "It doesn't sound like a huge amount of time when you say it like that, but somehow you've become such a huge part of my life that I can't imagine these months without you.",
  "We've had our cute moments, our stupid moments, our arguments, our random conversations, the times we've annoyed each other, and probably enough nonsense to fill an entire server. And somehow, through all of it, you're still the person I want beside me.",
  "You're my boyfriend, but you're also the person I want to tell random things to, the person I want to bother for absolutely no reason, the person I want to share my happiness with, and the person I look for when I just need someone.",
  "I don't think I always say it properly, but I really do appreciate you.",
  "I appreciate the little things.\nThe conversations.\nThe time you give me.\nThe way you became part of my everyday life without me even realizing how much I'd started depending on your presence.",
  "And yes, sometimes you make me want to throw you out of a window. 😭\nBut unfortunately for you, you're stuck with me.",
  "Because I love you.",
  "I love you when you're being sweet.\nI love you when you're being annoying.\nI love you when you're making me laugh.\nI love you when we're being complete idiots together.\nAnd even when we're fighting, somewhere underneath all that anger, I still care about you more than I can explain.",
  "Five months ago, we officially became us.",
  "And I don't know exactly what the next months, years, or levels of this crazy game are going to look like.",
  "But I know one thing.",
  "I want to keep discovering them with you.",
  "So, my favourite Runner, congratulations.",
  "You completed Level 5.",
  "But unfortunately…",
  "There is no final level.",
  "Because I'm not planning on letting this mission end anytime soon. ❤️",
  "I love you, my Panda.",
  "More than this little website could ever possibly put into words.",
  "Happy 5 months, Priyanshu.",
  "Always your Kashvi. ❤️",
] as const;

export const MISSION_ENTRIES = [
  { id: "001", title: "THE BEGINNING", description: "You proposed to me first, and I kept denying you… and then somehow, on 2nd May, everything changed. We went to Chowpaty, explored around, had so much fun at Jump KATM, and then ended up at Band Hills, just sitting together, talking and kissing. And then I suddenly asked you, “बंदा बनोगे?” 😭 I still remember how shocked you looked because you absolutely did not expect me to be the one asking. And when you said yes, that became the beginning of us. ❤️" },
  { id: "002", title: "THE FIRST MEMORIES", description: "I think some of my favourite memories are simply the little moments I've had with you — the random conversations, the stupid laughs, the time we spent together, and all those moments that didn't seem extraordinary when they happened but became so special because they were with you. Those were the moments when I started realizing just how much I love being with you." },
  { id: "003", title: "THE CHAOS", description: "Since we're in long distance, sometimes we literally run out of things to talk about 😭 so obviously we had to find a solution — GAMES. Four in a Row, Monopoly, and every random game we can find. Half the time we're actually playing, and the other half we're just annoying each other. 😂 But I love that we always find something to do together, even when we're miles apart." },
  { id: "004", title: "SOMEHOW STILL TOGETHER", description: "One thing I really love about you is the effort you make. Even when there's nothing to talk about, you don't just let the distance win. You go looking for games, things we can do together, little surprises, presents, anything that can make me smile. You always find some way to make me feel loved even when you can't be here. And maybe these things seem small to you, but they mean so much to me. I notice your effort, my love. And I love you for it. ❤️" },
  { id: "005", title: "FIVE MONTHS", description: "Five months of us. ❤️ From me denying your proposal to me suddenly looking at you and asking “बंदा बनोगे?” — I honestly don't think either of us knew where that one question would take us. And now here we are, five months later, with all our memories, games, chaos, laughter, distance, gifts, love and everything in between. I don't know what the next levels of our story will look like, but I know I want to experience all of them with you. Happy 5 months, my Panda. I love you. ❤️" },
] as const;

export const MEMORY_ITEMS = [
  { id: "MEMORY_001", date: "2 May 2026", caption: "PHOTO FILE AWAITING RECOVERY", image: img1 },
  { id: "MEMORY_002", date: "that hug", caption: "PHOTO FILE AWAITING RECOVERY", image: img2 },
  { id: "MEMORY_003", date: "US BEING US", caption: "PHOTO FILE AWAITING RECOVERY", image: img3 },
] as const;

export const SYSTEM_MESSAGES = {
  weakness: ["KASHVI", "KASHVI", "KASHVI"],
  dependency: "RUNNER HAS DEVELOPED AN EXTREME DEPENDENCY ON ONE PARTICULAR HUMAN.",
  identified: "KASHVI",
  prognosis: "NO CURE FOUND.",
} as const;

export const CHARACTER_CONFIG = {
  name: "JACK",
  description: "Original masked cybernetic sword-runner overlooking Dārma Tower",
} as const;

export const SEQUENCE_TIMINGS = {
  accessLine: 390,
  typeCharacter: 11,
  sceneTransition: 520,
} as const;

export const UI_LABELS = {
  anniversaryDate: "02.05.2026 → 02.10.2026",
  runner: "PRIYANSHU",
  partner: "KASHVI",
} as const;

export const TRACKER_STAGES = [
  "AUTHENTICATION",
  "ACCESS",
  "BRIEFING",
  "ASCENSION",
  "MEMORY CORE",
  "ARCHIVE",
  "FINAL LEVEL",
] as const;
