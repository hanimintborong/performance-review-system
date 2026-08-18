import { Text } from "@chakra-ui/react";

import { AppCard } from "@/components/common/AppCard";
import type { FinalOutcome } from "@/types/review";

type FinalOutcomeBannerProps = {
  outcome: FinalOutcome;
  finalizedAt?: string | null;
  notes: string | null;
  incrementPercentage: number | null;
  incrementEffectiveDate: string | null;
};

export function FinalOutcomeBanner({ outcome, finalizedAt, notes, incrementPercentage, incrementEffectiveDate }: FinalOutcomeBannerProps) {
  const dateSuffix = finalizedAt ? ` · ${finalizedAt.slice(0, 10)}` : "";

  return (
    <AppCard p="16px 20px" bg="success.10" borderColor="success.50">
      <Text fontSize="12px" fontWeight="700" color="success.70" mb="4px">
        Finalised · {outcome}{dateSuffix}
      </Text>
      {outcome === "Increment" && incrementPercentage !== null && (
        <Text fontSize="13px" color="grey.70" mb="2px">
          {incrementPercentage}% increment, effective {incrementEffectiveDate ?? "date to be confirmed"}
        </Text>
      )}
      {notes && <Text fontSize="13px" color="grey.70">{notes}</Text>}
    </AppCard>
  );
}
