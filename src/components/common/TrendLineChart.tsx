import { Flex, Text } from "@chakra-ui/react";
import type { TrendPoint } from "@/lib/completionTrend";

type TrendLineChartProps = {
  points: TrendPoint[];
  color?: string;
};

export function TrendLineChart({ points, color = "#524583" }: TrendLineChartProps) {
  if (points.length === 0) {
    return <Text fontSize="12px" color="grey.50">No finalised reviews yet to chart.</Text>;
  }

  const width = 480;
  const height = 160;
  const maxValue = Math.max(...points.map((p) => p.value), 1);
  const stepX = points.length > 1 ? width / (points.length - 1) : 0;
  const coords = points.map((p, i) => ({ x: i * stepX, y: height - 16 - (p.value / maxValue) * (height - 32) }));
  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height} L 0 ${height} Z`;
  const last = coords[coords.length - 1];

  return (
    <Flex direction="column" gap="4px">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <path d={areaPath} fill={color} opacity="0.08" />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2" />
        {coords.map((c, i) => <circle key={points[i].label} cx={c.x} cy={c.y} r="3.5" fill={color} />)}
        <text x={last.x} y={last.y - 10} fontSize="11" fontWeight="700" fill={color} textAnchor="end">
          {points[points.length - 1].value}
        </text>
      </svg>
      <Flex justify="space-between">
        <Text fontSize="10px" color="grey.40">{points[0].label}</Text>
        <Text fontSize="10px" color="grey.40">{points[points.length - 1].label}</Text>
      </Flex>
    </Flex>
  );
}
