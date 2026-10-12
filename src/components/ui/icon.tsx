import {
  BookOpen,
  BrainCircuit,
  Bug,
  CodeXml,
  Compass,
  Cpu,
  Database,
  FlaskConical,
  GitBranch,
  Globe,
  GraduationCap,
  Hammer,
  Layers,
  Lightbulb,
  MessagesSquare,
  Microscope,
  Network,
  Presentation,
  Puzzle,
  RefreshCw,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Target,
  TestTubeDiagonal,
  Workflow,
  type LucideProps,
} from "lucide-react";

/**
 * Icon registry. Data files reference icons by name so they stay plain, serialisable objects.
 * Add an entry here to make a new icon available to services, technologies or content.
 */
const icons = {
  book: BookOpen,
  brain: BrainCircuit,
  bug: Bug,
  code: CodeXml,
  compass: Compass,
  cpu: Cpu,
  database: Database,
  flask: FlaskConical,
  branch: GitBranch,
  globe: Globe,
  graduation: GraduationCap,
  hammer: Hammer,
  layers: Layers,
  lightbulb: Lightbulb,
  messages: MessagesSquare,
  microscope: Microscope,
  network: Network,
  presentation: Presentation,
  puzzle: Puzzle,
  refresh: RefreshCw,
  rocket: Rocket,
  server: Server,
  shield: ShieldCheck,
  smartphone: Smartphone,
  target: Target,
  test: TestTubeDiagonal,
  workflow: Workflow,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.6} {...props} />;
}
