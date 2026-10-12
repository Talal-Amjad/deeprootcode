/**
 * Hero visual: a root system that doubles as a software architecture tree.
 * Branches grow in by depth, then signal pulses travel from the root to the leaves.
 * Pure SVG + CSS (see .root-* classes in globals.css); static when reduced motion is preferred.
 */

type Node = { id: string; x: number; y: number; label?: string; children?: Node[] };

const tree: Node = {
  id: "root",
  x: 280,
  y: 44,
  children: [
    {
      id: "stem",
      x: 280,
      y: 120,
      children: [
        {
          id: "web",
          x: 128,
          y: 214,
          label: "web",
          children: [
            { id: "ui", x: 66, y: 320, label: "ui" },
            {
              id: "app",
              x: 172,
              y: 322,
              children: [
                { id: "ssr", x: 138, y: 432, label: "ssr" },
                { id: "edge", x: 206, y: 440 },
              ],
            },
          ],
        },
        {
          id: "ai",
          x: 280,
          y: 232,
          label: "ai",
          children: [
            {
              id: "model",
              x: 250,
              y: 340,
              children: [
                { id: "rag", x: 226, y: 452, label: "rag" },
                { id: "eval", x: 284, y: 460 },
              ],
            },
            { id: "ml", x: 334, y: 334, label: "ml" },
          ],
        },
        {
          id: "api",
          x: 432,
          y: 210,
          label: "api",
          children: [
            { id: "svc", x: 396, y: 316, children: [{ id: "auth", x: 372, y: 426, label: "auth" }] },
            {
              id: "jobs",
              x: 490,
              y: 324,
              label: "jobs",
              children: [
                { id: "queue", x: 468, y: 436 },
                { id: "db", x: 526, y: 428, label: "db" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

type Segment = { id: string; d: string; depth: number };
type PlacedNode = Node & { depth: number; leaf: boolean };

function curve(a: Node, b: Node): string {
  const dy = b.y - a.y;
  return `C ${a.x} ${a.y + dy * 0.55}, ${b.x} ${b.y - dy * 0.5}, ${b.x} ${b.y}`;
}

function flatten(node: Node, depth = 0, segments: Segment[] = [], nodes: PlacedNode[] = []) {
  nodes.push({ ...node, depth, leaf: !node.children?.length });
  for (const child of node.children ?? []) {
    segments.push({ id: `${node.id}-${child.id}`, d: `M ${node.x} ${node.y} ${curve(node, child)}`, depth });
    flatten(child, depth + 1, segments, nodes);
  }
  return { segments, nodes };
}

/** Continuous root → leaf paths used by the travelling pulses. */
function routeTo(target: string): string {
  const walk = (node: Node, trail: Node[]): Node[] | null => {
    const next = [...trail, node];
    if (node.id === target) return next;
    for (const child of node.children ?? []) {
      const found = walk(child, next);
      if (found) return found;
    }
    return null;
  };
  const path = walk(tree, []) ?? [tree];
  return path.reduce((d, node, i) => (i === 0 ? `M ${node.x} ${node.y}` : `${d} ${curve(path[i - 1], node)}`), "");
}

const { segments, nodes } = flatten(tree);
const pulses = ["ssr", "rag", "auth", "db", "ui"].map((leaf, i) => ({ id: leaf, d: routeTo(leaf), delay: 2.6 + i * 1.1 }));

const layers = [
  { y: 120, label: "surface" },
  { y: 222, label: "logic" },
  { y: 330, label: "data" },
  { y: 440, label: "foundation" },
];

const GROW_STEP = 0.32; // seconds between depth levels

export function RootNetwork({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 560 500" fill="none" className="h-full w-full overflow-visible">
        {/* Architecture layers */}
        {layers.map((layer, i) => (
          <g key={layer.label} className="root-label" style={{ ["--delay" as string]: `${0.1 + i * 0.08}s` }}>
            <line
              x1="0"
              x2="560"
              y1={layer.y}
              y2={layer.y}
              stroke="var(--border-strong)"
              strokeDasharray="2 6"
              strokeWidth="1"
            />
            <text
              x="0"
              y={layer.y - 7}
              className="fill-fg-subtle font-mono"
              fontSize="10"
              letterSpacing="0.08em"
            >
              {`L${i} · ${layer.label.toUpperCase()}`}
            </text>
          </g>
        ))}

        {/* Branches */}
        {segments.map((segment) => (
          <path
            key={segment.id}
            d={segment.d}
            pathLength={1}
            className="root-path"
            stroke="var(--fg)"
            strokeOpacity={segment.depth < 2 ? 0.55 : 0.32}
            strokeWidth={segment.depth < 2 ? 1.6 : 1.2}
            strokeLinecap="round"
            style={{ ["--delay" as string]: `${0.2 + segment.depth * GROW_STEP}s` }}
          />
        ))}

        {/* Travelling signals */}
        {pulses.map((pulse) => (
          <path
            key={pulse.id}
            d={pulse.d}
            pathLength={1}
            className="root-pulse"
            stroke="var(--accent)"
            strokeWidth="2.4"
            strokeLinecap="round"
            style={{ ["--delay" as string]: `${pulse.delay}s` }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node) => {
          const delay = `${0.2 + node.depth * GROW_STEP + 0.25}s`;
          const isRoot = node.id === "root";
          return (
            <g key={node.id}>
              {isRoot && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="9"
                  fill="var(--accent)"
                  className="node-halo"
                  style={{ ["--delay" as string]: "1.2s" }}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={isRoot ? 9 : node.leaf ? 4 : 5.5}
                fill={isRoot ? "var(--accent)" : node.leaf ? "var(--signal)" : "var(--bg)"}
                stroke={isRoot || node.leaf ? "none" : "var(--fg)"}
                strokeOpacity={0.7}
                strokeWidth="1.5"
                className="root-node"
                style={{ ["--delay" as string]: isRoot ? "0.05s" : delay }}
              />
              {node.label && (
                <text
                  x={node.x + (node.leaf ? 9 : 12)}
                  y={node.y + 4}
                  className="root-label fill-fg-muted font-mono"
                  fontSize="11.5"
                  style={{ ["--delay" as string]: delay }}
                >
                  {node.leaf ? node.label : `${node.label}/`}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
