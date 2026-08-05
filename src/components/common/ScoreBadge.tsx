import { Flex } from "@chakra-ui/react";

type ScoreBadgeProps = {
  score: number | null;
  max?: number;
};

function toneOf(score: number, max: number) {
  const ratio = score / max;
  if (ratio >= 0.8) return { bg: "success.10", fg: "success.70" };
  if (ratio >= 0.6) return { bg: "warning.10", fg: "warning.70" };
  return { bg: "error.10", fg: "error.70" };
}

export function ScoreBadge({ score, max = 5 }: ScoreBadgeProps) {
  const tone = score === null ? { bg: "grey.10", fg: "grey.40" } : toneOf(score, max);

  return (
    <Flex
      align="center"
      justify="center"
      minW="52px"
      h="30px"
      px="10px"
      borderRadius="8px"
      bg={tone.bg}
      color={tone.fg}
      fontSize="14px"
      fontWeight="700"
    >
      {score === null ? "—" : `${score.toFixed(1)} / ${max}`}
    </Flex>
  );
}
