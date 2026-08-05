"use client";

import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

export type PipelineStage = {
  label: string;
  count: number;
};

type ReviewStatusPipelineProps = {
  stages: PipelineStage[];
};

export function ReviewStatusPipeline({ stages }: ReviewStatusPipelineProps) {
  return (
    <Flex align="center" gap="6px" overflowX="auto" py="4px">
      {stages.map((stage, index) => (
        <Flex key={stage.label} align="center" gap="6px" flexShrink="0">
          <Flex
            direction="column"
            align="center"
            justify="center"
            minW="120px"
            py="10px"
            px="12px"
            bg={stage.count > 0 ? "brand.10" : "grey.10"}
            borderRadius="8px"
          >
            <Text fontSize="18px" fontWeight="700" color={stage.count > 0 ? "brand.70" : "grey.40"}>
              {stage.count}
            </Text>
            <Text fontSize="11px" color="grey.60" textAlign="center">{stage.label}</Text>
          </Flex>

          {index < stages.length - 1 && <Icon as={FiChevronRight} color="grey.30" flexShrink="0" />}
        </Flex>
      ))}
    </Flex>
  );
}
