import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import pulga from "@/assets/pulga.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar de Pulga · Día de Muertos" },
      { name: "description", content: "Un altar digital con cempasúchil, papel picado y veladoras para recordar a Pulga, nuestro perrito." },
      { property: "og:title", content: "Altar de Pulga · Día de Muertos" },
      { property: "og:description", content: "Un altar digital para recordar a Pulga con flores, luz y cariño." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Marigold({ size = 48, className = "" }: { size?: number; className?: string }) {
  const petals = Array.from({ length: 14 });
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden>
      {[46, 34, 22].map((r, ring) =>
        petals.map((_, i) => {
          const a = (i / petals.length) * 360 + ring * 13;
          return (
            <ellipse key={`${ring}-${i}`} cx="50" cy={50 - r * 0.55} rx={9 - ring} ry={r * 0.5}
              transform={`rotate(${a} 50 50)`}
              fill={ring === 1 ? "var(--marigold-deep)" : "var(--marigold)"}
              stroke="var(--marigold-deep)" strokeWidth="1" />
          );
        }),
      )}
      <circle cx="50" cy="50" r="9" fill="var(--marigold-deep)" />
    </svg>
  );
}

const flagColors = ["var(--rosa)", "var(--marigold)", "var(--secondary)", "var(--marigold-deep)", "var(--accent)", "oklch(0.7 0.15 160)"];

function PapelPicado() {
  return (
    <div className="relative w-full pt-2">
      <div className="absolute left-0 right-0 top-3 h-px bg-cera/60" />
      <div className="flex justify-center gap-1 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <svg key={i} viewBox="0 0 80 100" className="sway grow-hover w-14 shrink-0 md:w-20"
            style={{ animationDelay: `${i * 0.2}s` }} aria-hidden>
            <path d="M0 0H80V88L70 100L60 88L50 100L40 88L30 100L20 88L10 100L0 88Z" fill={flagColors[i % flagColors.length]} opacity="0.92" />
            <g fill="var(--noche)">
              <circle cx="40" cy="38" r="10" />
              <ellipse cx="27" cy="22" rx="5" ry="7" />
              <ellipse cx="53" cy="22" rx="5" ry="7" />
              <ellipse cx="18" cy="36" rx="4" ry="6" />
              <ellipse cx="62" cy="36" rx="4" ry="6" />
              <path d="M10 66 L20 60 L30 66 L40 60 L50 66 L60 60 L70 66 L70 70 L10 70Z" />
              <circle cx="15" cy="80" r="2.5" /><circle cx="40" cy="80" r="2.5" /><circle cx="65" cy="80" r="2.5" />
            </g>
          </svg>
        ))}
      </div>
    </div>
  );
}

function Petals() {
  const [items, setItems] = useState<{ left: number; size: number; dur: number; delay: number; drift: number }[]>([]);
  useEffect(() => {
    setItems(Array.from({ length: 36 }).map(() => ({
      left: Math.random() * 100, size: 8 + Math.random() * 12, dur: 8 + Math.random() * 10,
      delay: -Math.random() * 15, drift: (Math.random() - 0.5) * 200,
    })));
  }, []);
  return (
    <>
      {items.map((p, i) => (
        <span key={i} className="petal" style={{
          left: `${p.left}vw`, width: p.size, height: p.size,
          animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
          ["--drift" as string]: `${p.drift}px`,
        }} />
      ))}
    </>
  );
}

function Arch() {
  const n = 23;
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: n }).map((_, i) => {
        const t = Math.PI - (i / (n - 1)) * Math.PI;
        const x = 50 + Math.cos(t) * 46;
        const y = 52 - Math.sin(t) * 46;
        return (
          <div key={i} className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}>
            <Marigold size={i % 2 ? 54 : 70} className="grow-hover" />
          </div>
        );
      })}
      {[60, 70, 80, 90].map((y) => (
        <div key={y} className="contents">
          <div className="pointer-events-auto absolute -translate-x-1/2" style={{ left: "4%", top: `${y}%` }}><Marigold size={60} className="grow-hover" /></div>
          <div className="pointer-events-auto absolute -translate-x-1/2" style={{ left: "96%", top: `${y}%` }}><Marigold size={60} className="grow-hover" /></div>
        </div>
      ))}
    </div>
  );
}

function Veladora({ delay = 0, label }: { delay?: number; label: string }) {
  return (
    <div className="grow-hover flex flex-col items-center">
      <div className="flame mb-1 h-9 w-5" style={{ animationDelay: `${delay}s` }} />
      <div className="h-2 w-1 bg-noche" />
      <div className="relative flex h-36 w-24 flex-col items-center justify-center overflow-hidden rounded-b-xl rounded-t-md border-2 border-marigold/60 bg-cera/90 shadow-[0_0_40px_var(--marigold)]">
        <img src={pulga.url} alt="Pulga en la veladora" className="h-20 w-16 rounded-full border-2 border-rosa object-cover object-[50%_35%]" />
        <span className="mt-1 font-script text-lg text-secondary">{label}</span>
      </div>
    </div>
  );
}

function DogIntro({ onStart, leaving }: { onStart: () => void; leaving: boolean }) {
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-noche ${leaving ? "curtain-out" : ""}`}>
      <p className="mb-6 font-script text-3xl text-marigold">Para entrar, aprieta la naricita</p>
      <svg viewBox="0 0 300 280" className="w-72 md:w-96">
        <path d="M40 60 Q20 160 80 170 L95 80Z" fill="var(--marigold-deep)" />
        <path d="M260 60 Q280 160 220 170 L205 80Z" fill="var(--marigold-deep)" />
        <ellipse cx="150" cy="140" rx="100" ry="105" fill="oklch(0.85 0.07 70)" />
        <ellipse cx="150" cy="195" rx="58" ry="45" fill="var(--cera)" />
        <circle cx="110" cy="120" r="13" fill="var(--noche)" /><circle cx="114" cy="115" r="4" fill="var(--cera)" />
        <circle cx="190" cy="120" r="13" fill="var(--noche)" /><circle cx="194" cy="115" r="4" fill="var(--cera)" />
        <path d="M150 205 Q135 225 120 215 M150 205 Q165 225 180 215" stroke="var(--noche)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <g role="button" aria-label="Aprieta la nariz para entrar" tabIndex={0} onClick={onStart}
          onKeyDown={(e) => e.key === "Enter" && onStart()} className="nose-pulse" style={{ transformOrigin: "150px 180px", transformBox: "view-box" }}>
          <ellipse cx="150" cy="180" rx="26" ry="19" fill="var(--noche)" />
          <ellipse cx="142" cy="173" rx="7" ry="4" fill="oklch(0.6 0.05 300)" />
        </g>
      </svg>
      <p className="mt-6 text-sm tracking-[0.3em] text-muted-foreground uppercase">boop 🐾</p>
    </div>
  );
}

function Index() {
  const [stage, setStage] = useState<"intro" | "leaving" | "altar">("intro");
  const start = () => {
    setStage("leaving");
    setTimeout(() => setStage("altar"), 1000);
  };

  return (
    <main className="relative min-h-screen">
      {stage !== "altar" && <DogIntro onStart={start} leaving={stage === "leaving"} />}
      {stage !== "intro" && (
        <div className="reveal">
          <Petals />
          <header><PapelPicado /></header>

          <section className="mx-auto mt-6 max-w-5xl px-4 text-center">
            <p className="font-script text-3xl text-marigold">Día de Muertos</p>
            <h1 className="font-display text-6xl font-black tracking-tight md:text-8xl">
              Para <span className="text-marigold">Pulga</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Que el camino de pétalos te traiga de vuelta a casa esta noche.
            </p>
          </section>

          <section className="relative mx-auto mt-10 aspect-[4/5] w-full max-w-2xl md:aspect-square">
            <Arch />
            <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2">
              <div className="grow-hover overflow-hidden rounded-t-full border-8 border-marigold shadow-[0_0_60px_var(--marigold-deep)]">
                <img src={pulga.url} alt="Pulga, nuestro perrito" className="h-72 w-56 object-cover object-[50%_35%] md:h-96 md:w-72" />
              </div>
              <p className="mt-3 text-center font-script text-4xl text-cera">Pulga</p>
            </div>
          </section>

          <section className="mx-auto mt-10 flex max-w-5xl flex-wrap items-end justify-center gap-10 px-4">
            <Veladora label="Te quiero" delay={0} />
            <Veladora label="Pulga" delay={0.4} />
            <Veladora label="Siempre" delay={0.8} />
          </section>

          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2 px-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <Marigold key={i} size={40} className="grow-hover" />
            ))}
          </div>

          <section className="mx-auto mt-16 max-w-2xl px-6 pb-24 text-center">
            <blockquote className="grow-hover rounded-[var(--radius)] border border-border bg-card/70 p-8 font-display text-2xl italic leading-relaxed">
              “Pequeñito de cuerpo, inmenso de corazón. Gracias por cada mirada, cada colita moviéndose y cada día a mi lado.”
            </blockquote>
            <p className="mt-6 font-script text-2xl text-marigold">Con amor, siempre 🐾</p>
          </section>
        </div>
      )}
    </main>
  );
}
