import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, LockKeyhole, Maximize2, Volume2, VolumeX, X } from "lucide-react";
import runnerImage from "../../assets/runner-tower.jpg";
import {
  CHARACTER_CONFIG,
  LOVE_LETTER,
  MEMORY_ITEMS,
  MISSION_ENTRIES,
  SEQUENCE_TIMINGS,
  SYSTEM_MESSAGES,
  TRACKER_STAGES,
  UI_LABELS,
} from "./mission-data";

type Scene = "auth" | "access" | "briefing" | "ascension" | "memory" | "letter" | "archive" | "missions" | "final-briefing" | "complete";

const sceneOrder: Scene[] = ["auth", "access", "briefing", "ascension", "memory", "letter", "archive", "missions", "final-briefing", "complete"];

const trackerByScene: Record<Scene, number> = {
  auth: 0, access: 1, briefing: 2, ascension: 3, memory: 4, letter: 4, archive: 5, missions: 5, "final-briefing": 6, complete: 7,
};

const accessLines = [
  "BYPASSING FIREWALL... ████████████████████ 100%",
  "DECRYPTING NETWORK... ████████████████████ 100%",
  "NEURAL LINK... CONNECTED",
  "MEMORY ARCHIVE... LOCATED",
  "PRIVATE MESSAGE... FOUND",
  "IDENTITY VERIFIED.",
  "RUNNER: PRIYANSHU",
];

const ascentLines = [
  "CONNECTING TO TOWER... ████████████████████ 100%",
  "BYPASSING SECURITY... ████████████████████ 100%",
  "ESTABLISHING NEURAL LINK... CONNECTED",
  "ACCESSING MEMORY CORE...",
  "DECRYPTING PERSONAL ARCHIVE... ████████████████████ 100%",
  "JACK'S NEURAL LINK... CONNECTED",
  "PRIVATE MEMORY DETECTED.",
  "ONE MESSAGE FOUND.",
];

function useAudioSystem() {
  const [enabled, setEnabled] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<OscillatorNode | null>(null);

  const tone = (frequency = 240, duration = 0.08, kind: OscillatorType = "square") => {
    if (!enabled) return;
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = contextRef.current ?? new AudioContextClass();
    contextRef.current = ctx;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = kind;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  };

  const toggle = () => {
    setEnabled((current) => {
      const next = !current;
      if (!next && ambientRef.current) {
        ambientRef.current.stop();
        ambientRef.current = null;
      }
      if (next) {
        const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
        if (AudioContextClass) {
          const ctx = contextRef.current ?? new AudioContextClass();
          contextRef.current = ctx;
          const oscillator = ctx.createOscillator();
          const gain = ctx.createGain();
          oscillator.type = "sine";
          oscillator.frequency.value = 52;
          gain.gain.value = 0.008;
          oscillator.connect(gain).connect(ctx.destination);
          oscillator.start();
          ambientRef.current = oscillator;
        }
      }
      return next;
    });
  };

  useEffect(() => () => {
    void contextRef.current?.close();
  }, []);
  return { enabled, toggle, tone };
}

function Hud({ scene, sound, onSound }: { scene: Scene; sound: boolean; onSound: () => void }) {
  const progress = trackerByScene[scene];
  return (
    <>
      <div className="hud-corner hud-top-left" aria-hidden="true" />
      <div className="hud-corner hud-top-right" aria-hidden="true" />
      <div className="hud-topbar">
        <div><span className="status-dot" /> SYSTEM ONLINE</div>
        <div className="hidden sm:block">SIGNAL STRENGTH: 98%</div>
        <button className="sound-control" onClick={onSound} aria-label={sound ? "Turn sound off" : "Turn sound on"}>
          {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span>SOUND {sound ? "ON" : "OFF"}</span>
        </button>
      </div>
      {scene !== "auth" && (
        <aside className="mission-tracker" aria-label="Tower ascension progress">
          <div className="tracker-title">TOWER ASCENSION <span>{String(Math.min(progress + 1, 7)).padStart(2, "0")}/07</span></div>
          <div className="tracker-rail">
            {TRACKER_STAGES.map((stage, index) => {
              const state = index < progress ? "complete" : index === progress ? "current" : "locked";
              return (
                <div key={stage} className={`tracker-item ${state}`} aria-current={state === "current" ? "step" : undefined}>
                  <span className="tracker-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="tracker-label">{stage}</span>
                  <span aria-hidden="true">{state === "complete" ? "✓" : state === "current" ? "●" : "—"}</span>
                </div>
              );
            })}
          </div>
        </aside>
      )}
      <div className="hud-footer" aria-hidden="true"><span>NEURAL LINK ACTIVE</span><span>ARCHIVE ENCRYPTION: ENABLED</span><span>CONNECTION: SECURE</span></div>
    </>
  );
}

function GlitchText({ children, className = "" }: { children: string; className?: string }) {
  return <span className={`glitch-text ${className}`} data-text={children}>{children}</span>;
}

function ActionButton({ children, onClick, disabled = false }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return <button className="action-button" onClick={onClick} disabled={disabled}><span>{children}</span></button>;
}

function TerminalPanel({ children, label = "DĀRMA // SECURE SHELL" }: { children: React.ReactNode; label?: string }) {
  return <div className="terminal-panel"><div className="terminal-cap"><span>{label}</span><span>● ● ●</span></div><div className="terminal-body">{children}</div></div>;
}

function RunnerVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`runner-visual ${compact ? "compact" : ""}`}>
      <img src={runnerImage} alt={CHARACTER_CONFIG.description} width={1280} height={1600} />
      <div className="runner-scan" aria-hidden="true" />
      <div className="runner-tag"><span>ENTITY // {CHARACTER_CONFIG.name}</span><b>NEURAL LINK ACTIVE</b></div>
    </div>
  );
}

function LoadingSequence({ lines, onComplete }: { lines: readonly string[]; onComplete: () => void }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= lines.length) return;
    const timer = window.setTimeout(() => setShown((value) => value + 1), SEQUENCE_TIMINGS.accessLine);
    return () => window.clearTimeout(timer);
  }, [shown, lines.length]);
  return (
    <div className="sequence-wrap">
      <div className="sequence-lines" aria-live="polite">
        {lines.slice(0, shown).map((line) => <p key={line}><span>›</span> {line}</p>)}
        {shown < lines.length && <span className="cursor" />}
      </div>
      {shown >= lines.length && <div className="sequence-result"><GlitchText className="result-title">ACCESS GRANTED.</GlitchText><p>WELCOME, RUNNER.</p><ActionButton onClick={onComplete}>ENTER NETWORK</ActionButton></div>}
    </div>
  );
}

function Authentication({ onSuccess, tone }: { onSuccess: () => void; tone: (f?: number, d?: number) => void }) {
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const errors = ["ACCESS DENIED.\nThat ain't the password, Runner.", "INCORRECT.\nThink about your girlfriend.", "FINAL WARNING.\nYou have ONE job."];
  const authenticate = () => {
    if (password.trim().toUpperCase() === "KASHVI") { tone(680, 0.25); onSuccess(); return; }
    tone(110, 0.2); setAttempts((count) => Math.min(count + 1, 3)); setPassword("");
  };
  return (
    <div className="auth-scene scene-content">
      <div className="tower-mark"><span>DĀRMA TOWER</span><i>SECURE NETWORK</i></div>
      <TerminalPanel label="AUTH_NODE // 00">
        <p className="eyebrow">RUNNER AUTHENTICATION REQUIRED</p>
        <div className="data-grid"><span>USER</span><b>: UNKNOWN</b><span>CLEARANCE</span><b>: LEVEL 0</b><span>ENCRYPTION</span><b>: ACTIVE</b><span>CONNECTION</span><b>: SECURE</b></div>
        <form onSubmit={(event) => { event.preventDefault(); authenticate(); }}>
          <label htmlFor="mission-password">PASSWORD REQUIRED</label>
          <div className="password-row"><span aria-hidden="true">›</span><input id="mission-password" value={password} onChange={(event) => { setPassword(event.target.value); tone(180, 0.025); }} autoComplete="off" autoFocus aria-describedby={attempts ? "auth-error" : undefined} /></div>
          <ActionButton onClick={authenticate}>AUTHENTICATE</ActionButton>
        </form>
        <div id="auth-error" className="auth-message" role="alert">{attempts > 0 ? errors[attempts - 1] : "\u00A0"}</div>
      </TerminalPanel>
      <p className="auth-warning">UNAUTHORIZED ACCESS WILL BE TERMINATED.</p>
    </div>
  );
}

function Briefing({ next }: { next: () => void }) {
  return (
    <div className="split-scene scene-content">
      <div className="brief-copy"><p className="eyebrow">DĀRMA TOWER<br />LEVEL 00 // ASCENSION</p><h1>RUNNER<br /><GlitchText>DETECTED.</GlitchText></h1><div className="runner-name">PRIYANSHU</div><blockquote>“You're late.”</blockquote><div className="mission-spec"><span>NEW MISSION</span><dl><dt>RUNNER</dt><dd>PRIYANSHU</dd><dt>OBJECTIVE</dt><dd>REACH THE TOP.</dd><dt>THREAT LEVEL</dt><dd>UNKNOWN</dd></dl></div><ActionButton onClick={next}>BEGIN ASCENSION</ActionButton></div>
      <RunnerVisual />
    </div>
  );
}

function Ascension({ next }: { next: () => void }) {
  const [complete, setComplete] = useState(false);
  return (
    <div className="split-scene reverse scene-content">
      <RunnerVisual compact />
      <div className="ascent-copy"><p className="eyebrow">LEVEL 04 // TOWER UPLINK</p><h2>TOWER<br />ASCENSION</h2><TerminalPanel label="LIVE_PROCESS // ELEVATION"><LoadingSequence lines={ascentLines} onComplete={() => setComplete(true)} /></TerminalPanel>{complete && <ActionButton onClick={next}>ACCESS MEMORY CORE</ActionButton>}</div>
    </div>
  );
}

function MemoryReveal({ next }: { next: () => void }) {
  return (
    <div className="split-scene scene-content memory-discovery">
      <div><p className="eyebrow">MEMORY CORE // UNAUTHORIZED SIGNAL</p><h2><GlitchText>MEMORY FILE</GlitchText><br />DETECTED</h2><div className="classified-grid"><span>CLASSIFICATION</span><b>PERSONAL</b><span>DATE</span><b>{UI_LABELS.anniversaryDate}</b><span>STATUS</span><b>FIVE MONTHS</b></div><div className="private-file"><h3>PRIVATE MESSAGE FOUND.</h3><p>SOURCE: <b>KASHVI</b></p><p>RECIPIENT: <b>PRIYANSHU</b></p><p>ENCRYPTION: <b>PERSONAL</b></p></div><ActionButton onClick={next}>DECRYPT MEMORY</ActionButton></div>
      <RunnerVisual compact />
    </div>
  );
}

function LetterScene({ next }: { next: () => void }) {
  const [visible, setVisible] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (visible >= LOVE_LETTER.length) return;
    const current = LOVE_LETTER[visible - 1];
    if (!current) return;
    const delay = Math.max(420, Math.min(1450, current.length * SEQUENCE_TIMINGS.typeCharacter));
    const timer = window.setTimeout(() => setVisible((value) => value + 1), delay);
    return () => window.clearTimeout(timer);
  }, [visible]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [visible]);
  return (
    <div className="letter-scene scene-content">
      <header className="letter-header"><div><p>CLASSIFIED MEMORY // 001</p><h2>STATUS: <span>DECRYPTED</span></h2></div><div><p>SOURCE: KASHVI</p><p>RECIPIENT: PRIYANSHU</p></div></header>
      <div className="letter-scroll" ref={scrollRef} tabIndex={0}>
        {LOVE_LETTER.slice(0, visible).map((paragraph, index) => <p key={index} className={`${index === visible - 1 ? "decrypting" : ""} ${paragraph === "I love you, my Panda." ? "love-line" : ""}`}>{paragraph}</p>)}
        {visible < LOVE_LETTER.length && <span className="cursor" />}
        {visible >= LOVE_LETTER.length && <div className="letter-end"><div className="system-analysis"><p>SYSTEM ANALYSIS</p><span>RUNNER: PRIYANSHU</span><span>KNOWN WEAKNESSES: {SYSTEM_MESSAGES.weakness.join(" • ")}</span><b>THREAT LEVEL: CRITICAL</b><span>{SYSTEM_MESSAGES.dependency}</span><span>IDENTIFIED AS: {SYSTEM_MESSAGES.identified}</span><b>{SYSTEM_MESSAGES.prognosis}</b></div><ActionButton onClick={next}>OPEN MEMORY ARCHIVE</ActionButton></div>}
      </div>
    </div>
  );
}

function MemoryGallery({ next }: { next: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedMemory = selected === null ? null : MEMORY_ITEMS[selected];
  useEffect(() => {
    if (selected === null) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selected]);
  return (
    <div className="archive-scene scene-content"><div className="scene-heading"><p className="eyebrow">ACCESS LEVEL: KASHVI</p><h2>MEMORY<br />ARCHIVE</h2><span>03 RECOVERY SLOTS // READY</span></div><div className="memory-grid">{MEMORY_ITEMS.map((memory, index) => <button key={memory.id} className="memory-card" onClick={() => setSelected(index)}><div className="memory-placeholder"><span>{String(index + 1).padStart(2, "0")}</span><LockKeyhole size={22} /><i>AWAITING IMAGE</i></div><div><b>{memory.id}</b><span>RECOVERED</span><small>STATUS: STABLE // DATE: {memory.date}</small></div><Maximize2 size={17} /></button>)}</div><ActionButton onClick={next}>OPEN MISSION LOG</ActionButton>{selectedMemory && selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${selectedMemory.id} preview`}><button className="close-button" onClick={() => setSelected(null)} aria-label="Close memory"><X /></button><div className="lightbox-memory"><div className="memory-placeholder"><span>{String(selected + 1).padStart(2, "0")}</span><LockKeyhole size={34} /><i>REPLACE WITH YOUR PHOTO</i></div><h3>{selectedMemory.id} // RECOVERED</h3><p>{selectedMemory.caption}</p></div></div>}</div>
  );
}

function MissionLog({ next }: { next: () => void }) {
  const [open, setOpen] = useState(0);
  return <div className="mission-log scene-content"><div className="scene-heading"><p className="eyebrow">ARCHIVE // CHRONOLOGY</p><h2>RUNNER<br />MISSION LOG</h2></div><div className="mission-list">{MISSION_ENTRIES.map((mission, index) => <div key={mission.id} className={`mission-entry ${open === index ? "open" : ""}`}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>MISSION {mission.id}</span><b>{mission.title}</b><ChevronDown /></button><div className="mission-description"><p>{mission.description}</p></div></div>)}</div><ActionButton onClick={next}>INITIATE FINAL BRIEFING</ActionButton></div>;
}

function FinalBriefing({ next }: { next: () => void }) {
  return <div className="split-scene reverse scene-content final-brief"><RunnerVisual /><div><p className="eyebrow">FINAL MISSION</p><h2>REACH THE<br />FINAL LEVEL.</h2><dl><dt>RUNNER</dt><dd>PRIYANSHU</dd><dt>JACK // SYSTEM LOG</dt><dd>“Some things are worth protecting.”</dd></dl><div className="completion-call">MISSION 05<br /><GlitchText>COMPLETE.</GlitchText></div><ActionButton onClick={next}>COMPLETE MISSION</ActionButton></div></div>;
}

function FinalMessage({ restart }: { restart: () => void }) {
  return <div className="complete-scene scene-content"><div className="completion-box"><p>MISSION 05 // COMPLETE</p><div className="final-pair"><span>RUNNER: PRIYANSHU</span><span>PARTNER: KASHVI</span></div><p>CONNECTION STATUS:</p><div className="connection-bar"><i /></div><small>100% // STABLE</small><h1>I LOVE YOU,<br />MY PANDA. <span>❤️</span></h1><p className="signature">— KASHVI</p></div><div className="new-objective"><p>NEW OBJECTIVE UNLOCKED</p><h2>KEEP KASHVI HAPPY.</h2><dl><dt>DIFFICULTY:</dt><dd>IMPOSSIBLE</dd><dt>TIME LIMIT:</dt><dd className="forever">FOREVER.</dd></dl></div><ActionButton onClick={restart}>RESTART MISSION</ActionButton></div>;
}

export function MissionExperience() {
  const [scene, setScene] = useState<Scene>("auth");
  const [transitioning, setTransitioning] = useState(false);
  const audio = useAudioSystem();
  const go = (next: Scene) => {
    if (transitioning) return;
    audio.tone(92, 0.24, "sawtooth");
    setTransitioning(true);
    window.setTimeout(() => { setScene(next); setTransitioning(false); }, SEQUENCE_TIMINGS.sceneTransition);
  };
  const advance = () => {
    const index = sceneOrder.indexOf(scene);
    const nextScene = sceneOrder[index + 1];
    if (nextScene) go(nextScene);
  };
  const current = useMemo(() => {
    switch (scene) {
      case "auth": return <Authentication onSuccess={() => go("access")} tone={audio.tone} />;
      case "access": return <div className="access-scene scene-content"><TerminalPanel label="ROOT ACCESS // VERIFIED"><LoadingSequence lines={accessLines} onComplete={advance} /></TerminalPanel></div>;
      case "briefing": return <Briefing next={advance} />;
      case "ascension": return <Ascension next={advance} />;
      case "memory": return <MemoryReveal next={advance} />;
      case "letter": return <LetterScene next={advance} />;
      case "archive": return <MemoryGallery next={advance} />;
      case "missions": return <MissionLog next={advance} />;
      case "final-briefing": return <FinalBriefing next={advance} />;
      case "complete": return <FinalMessage restart={() => go("auth")} />;
    }
  }, [scene, transitioning, audio.enabled]);
  return <main className={`mission-shell scene-${scene} ${transitioning ? "is-transitioning" : ""}`}><div className="world-backdrop" /><div className="noise" /><div className="scanlines" /><Hud scene={scene} sound={audio.enabled} onSound={audio.toggle} /><div className="scene-stage" key={scene}>{current}</div>{transitioning && <div className="transition-wipe"><span>SHIFTING LEVEL...</span></div>}</main>;
}

declare global { interface Window { webkitAudioContext?: typeof AudioContext; } }
