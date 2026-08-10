import { Flex, Text } from "@chakra-ui/react";

type RingProgressProps = {
  percent: number;
  size?: number;
  color?: string;
  trackColor?: string;
};

export function RingProgress({ percent, size = 76, color = "#524583", trackColor = "#E6E6E6" }: RingProgressProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <Flex position="relative" w={`${size}px`} h={`${size}px`} align="center" justify="center" flexShrink="0">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <Text position="absolute" fontSize="15px" fontWeight="800" color="grey.80">{Math.round(percent)}%</Text>
    </Flex>
  );
}
