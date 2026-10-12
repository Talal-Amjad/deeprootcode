import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project, ProjectMockupKind } from "@/types";

/**
 * Project image: a real screenshot when `project.image` is set, otherwise a theme-aware
 * illustrative UI mockup for the project type. Mockups contain no numbers or claims.
 */
export function ProjectVisual({
  project,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-2", className)}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const Mockup = mockups[project.mockup];
  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
      <svg
        viewBox="0 0 400 260"
        role="img"
        aria-label={`Illustrative ${mockupLabels[project.mockup]} mockup for ${project.title}`}
        className="relative h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <Mockup />
      </svg>
    </div>
  );
}

const mockupLabels: Record<ProjectMockupKind, string> = {
  dashboard: "dashboard",
  chat: "AI assistant",
  workflow: "automation workflow",
  mobile: "mobile app",
  research: "research notebook",
};

const C = {
  surface: "var(--surface)",
  bg: "var(--bg)",
  border: "var(--border)",
  strong: "var(--border-strong)",
  fg: "var(--fg)",
  muted: "var(--fg-subtle)",
  accent: "var(--accent)",
  signal: "var(--signal)",
};

function Window({ x = 40, y = 26, w = 320, h = 210, children }: { x?: number; y?: number; w?: number; h?: number; children: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={C.surface} stroke={C.border} />
      <circle cx={x + 14} cy={y + 13} r="3" fill={C.strong} />
      <circle cx={x + 24} cy={y + 13} r="3" fill={C.strong} />
      <circle cx={x + 34} cy={y + 13} r="3" fill={C.strong} />
      <line x1={x} x2={x + w} y1={y + 26} y2={y + 26} stroke={C.border} />
      {children}
    </g>
  );
}

function Line({ x, y, w, color = C.strong, h = 5 }: { x: number; y: number; w: number; color?: string; h?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={color} />;
}

function Dashboard() {
  return (
    <Window>
      {/* sidebar */}
      <rect x="40" y="52" width="62" height="184" fill={C.bg} />
      <line x1="102" x2="102" y1="52" y2="236" stroke={C.border} />
      {[66, 82, 98, 114, 130].map((y, i) => (
        <Line key={y} x={50} y={y} w={i === 1 ? 40 : 34} color={i === 1 ? C.accent : C.strong} />
      ))}
      {/* tiles */}
      {[114, 194, 274].map((x, i) => (
        <g key={x}>
          <rect x={x} y="62" width="74" height="40" rx="6" fill={C.bg} stroke={C.border} />
          <Line x={x + 9} y={72} w={30} />
          <Line x={x + 9} y={84} w={i === 0 ? 46 : i === 1 ? 38 : 52} h={8} color={i === 0 ? C.accent : C.fg} />
        </g>
      ))}
      {/* chart */}
      <rect x="114" y="112" width="234" height="66" rx="6" fill={C.bg} stroke={C.border} />
      <path
        d="M124 164 C 150 160, 160 140, 184 146 S 222 126, 246 134 S 290 116, 312 122 S 334 112, 338 110"
        stroke={C.accent}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M124 168 C 152 166, 168 156, 190 158 S 230 148, 254 152 S 300 140, 338 142"
        stroke={C.signal}
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="3 4"
        strokeLinecap="round"
      />
      {/* table */}
      {[188, 204, 220].map((y, i) => (
        <g key={y}>
          <Line x={118} y={y} w={60} />
          <Line x={194} y={y} w={44} />
          <rect x={300} y={y - 2} width="40" height="9" rx="4.5" fill={i === 1 ? C.signal : C.accent} opacity="0.35" />
        </g>
      ))}
    </Window>
  );
}

function Chat() {
  return (
    <Window>
      {/* user bubble */}
      <rect x="196" y="44" width="148" height="30" rx="10" fill={C.accent} opacity="0.9" />
      <Line x={208} y={53} w={110} color="var(--accent-fg)" />
      <Line x={208} y={63} w={70} color="var(--accent-fg)" />
      {/* assistant bubble */}
      <rect x="56" y="86" width="200" height="66" rx="10" fill={C.bg} stroke={C.border} />
      <Line x={68} y={98} w={170} />
      <Line x={68} y={110} w={150} />
      <Line x={68} y={122} w={164} />
      <rect x="68" y="134" width="42" height="11" rx="5.5" fill={C.signal} opacity="0.25" />
      <rect x="114" y="134" width="42" height="11" rx="5.5" fill={C.signal} opacity="0.25" />
      {/* source panel */}
      <rect x="268" y="86" width="76" height="66" rx="8" fill={C.bg} stroke={C.border} />
      {[96, 110, 124, 138].map((y, i) => (
        <g key={y}>
          <rect x="276" y={y} width="8" height="8" rx="2" fill={i < 2 ? C.signal : C.strong} />
          <Line x={290} y={y + 1.5} w={44} />
        </g>
      ))}
      {/* user bubble 2 */}
      <rect x="226" y="164" width="118" height="20" rx="10" fill={C.accent} opacity="0.9" />
      <Line x={238} y={171.5} w={80} color="var(--accent-fg)" />
      {/* input */}
      <rect x="56" y="200" width="288" height="24" rx="12" fill={C.bg} stroke={C.strong} />
      <Line x={70} y={209.5} w={120} />
      <circle cx="330" cy="212" r="7" fill={C.accent} />
    </Window>
  );
}

function Workflow() {
  const steps = [
    { x: 40, label: "inbox" },
    { x: 130, label: "extract" },
    { x: 220, label: "validate" },
    { x: 310, label: "post" },
  ];
  return (
    <g>
      {steps.slice(0, -1).map((step, i) => (
        <path
          key={step.label}
          d={`M ${step.x + 66} 112 C ${step.x + 78} 112, ${steps[i + 1].x - 12} 112, ${steps[i + 1].x} 112`}
          stroke={C.accent}
          strokeWidth="1.8"
          strokeDasharray="4 4"
          fill="none"
        />
      ))}
      {steps.map((step, i) => (
        <g key={step.label}>
          <rect x={step.x} y="82" width="66" height="60" rx="10" fill={C.surface} stroke={i === 2 ? C.accent : C.border} />
          <rect x={step.x + 10} y="92" width="14" height="14" rx="4" fill={i === 2 ? C.accent : C.signal} opacity="0.85" />
          <text x={step.x + 10} y="126" fontSize="10" fill={C.muted} fontFamily="var(--font-mono)">
            {step.label}
          </text>
        </g>
      ))}
      {/* review branch */}
      <path d="M 253 142 C 253 170, 253 172, 253 182" stroke={C.strong} strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
      <rect x="196" y="182" width="114" height="44" rx="10" fill={C.surface} stroke={C.border} />
      <circle cx="212" cy="204" r="6" fill="none" stroke={C.signal} strokeWidth="1.5" />
      <Line x={226} y={196} w={66} />
      <Line x={226} y={207} w={44} />
      {/* log */}
      <rect x="40" y="30" width="320" height="30" rx="8" fill={C.surface} stroke={C.border} />
      {[54, 120, 186, 252].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="45" r="3.5" fill={i === 3 ? C.accent : C.signal} />
          <Line x={x + 8} y={42.5} w={40} />
        </g>
      ))}
    </g>
  );
}

function Mobile() {
  return (
    <g>
      <rect x="140" y="12" width="120" height="236" rx="20" fill={C.surface} stroke={C.strong} strokeWidth="1.5" />
      <rect x="182" y="20" width="36" height="6" rx="3" fill={C.strong} />
      <Line x={154} y={40} w={60} h={8} color={C.fg} />
      <Line x={154} y={54} w={80} />
      <rect x="152" y="68" width="96" height="10" rx="5" fill={C.bg} stroke={C.border} />
      <rect x="152" y="68" width="62" height="10" rx="5" fill={C.accent} opacity="0.8" />
      {[90, 120, 150, 180].map((y, i) => (
        <g key={y}>
          <rect x="152" y={y} width="96" height="24" rx="6" fill={C.bg} stroke={C.border} />
          <rect
            x="159"
            y={y + 7}
            width="10"
            height="10"
            rx="3"
            fill={i < 2 ? C.signal : "none"}
            stroke={i < 2 ? "none" : C.strong}
          />
          <Line x={176} y={y + 9.5} w={i % 2 ? 48 : 58} />
        </g>
      ))}
      <rect x="152" y="214" width="96" height="22" rx="11" fill={C.accent} />
      <Line x={178} y={222.5} w={44} color="var(--accent-fg)" />
      {/* sync indicator */}
      <g>
        <rect x="276" y="96" width="92" height="40" rx="10" fill={C.surface} stroke={C.border} />
        <circle cx="292" cy="116" r="5" fill={C.signal} />
        <Line x={304} y={109} w={52} />
        <Line x={304} y={119} w={36} />
      </g>
      <g>
        <rect x="32" y="146" width="92" height="40" rx="10" fill={C.surface} stroke={C.border} />
        <rect x="44" y="158" width="16" height="16" rx="4" fill={C.accent} opacity="0.3" />
        <Line x={68} y={160} w={44} />
        <Line x={68} y={170} w={30} />
      </g>
    </g>
  );
}

function Research() {
  return (
    <Window>
      {/* code cells */}
      {[44, 96].map((y, cell) => (
        <g key={y}>
          <text x="52" y={y + 14} fontSize="9" fill={C.muted} fontFamily="var(--font-mono)">
            [{cell + 1}]
          </text>
          <rect x="72" y={y} width="140" height={cell ? 60 : 44} rx="6" fill={C.bg} stroke={C.border} />
          <Line x={80} y={y + 9} w={36} color={C.signal} />
          <Line x={120} y={y + 9} w={60} />
          <Line x={80} y={y + 21} w={96} />
          <Line x={88} y={y + 33} w={70} color={C.accent} />
          {cell === 1 && <Line x={88} y={y + 45} w={84} />}
        </g>
      ))}
      <text x="52" y="178" fontSize="9" fill={C.muted} fontFamily="var(--font-mono)">
        [3]
      </text>
      <rect x="72" y="164" width="140" height="62" rx="6" fill={C.bg} stroke={C.border} />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <Line x={80} y={174 + r * 12} w={40} />
          <Line x={128} y={174 + r * 12} w={24} color={r === 1 ? C.accent : C.strong} />
          <Line x={160} y={174 + r * 12} w={24} />
        </g>
      ))}
      {/* chart */}
      <rect x="224" y="44" width="124" height="182" rx="6" fill={C.bg} stroke={C.border} />
      <line x1="236" x2="236" y1="58" y2="200" stroke={C.strong} />
      <line x1="236" x2="338" y1="200" y2="200" stroke={C.strong} />
      <path d="M240 72 C 260 140, 280 170, 336 182" stroke={C.accent} strokeWidth="2" fill="none" />
      <path d="M240 86 C 262 150, 290 176, 336 190" stroke={C.signal} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
      <Line x={244} y={212} w={30} color={C.accent} />
      <Line x={282} y={212} w={30} color={C.signal} />
    </Window>
  );
}

const mockups: Record<ProjectMockupKind, () => React.JSX.Element> = {
  dashboard: Dashboard,
  chat: Chat,
  workflow: Workflow,
  mobile: Mobile,
  research: Research,
};
