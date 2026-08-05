import { Flex } from "@chakra-ui/react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";

type TemplateBuilderFooterProps = {
  onSaveDraft: () => void;
  onActivate: () => void;
  loading?: boolean;
};

export function TemplateBuilderFooter({ onSaveDraft, onActivate, loading }: TemplateBuilderFooterProps) {
  return (
    <Flex justify="flex-end" gap="10px">
      <SecondaryButton onClick={onSaveDraft} loading={loading}>Save draft</SecondaryButton>
      <PrimaryButton onClick={onActivate} loading={loading}>Activate template</PrimaryButton>
    </Flex>
  );
}
