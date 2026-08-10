export type DonutSegment = { label: string; value: number; color: string };

type StatusDonutProps = {
  segments: DonutSegment[];
  size?: number;
};

function withOffsets(segments: DonutSegment[]) {
  let cumulative = 0;
  return segments.filter((s) => s.value > 0).map((segment) => {
    const offset = cumulative;
    cumulative += segment.value;
    return { ...segment, offset };
  });
}

export function StatusDonut({ segments, size = 140 }: StatusDonutProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = 4;
  const positioned = withOffsets(segments);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {positioned.map((segment) => {
        const share = segment.value / total;
        const length = Math.max(share * circumference - gap, 0);
        const dashOffset = -(segment.offset / total) * circumference;

        return (
          <circle
            key={segment.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={segment.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${length} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}
    </svg>
  );
}
