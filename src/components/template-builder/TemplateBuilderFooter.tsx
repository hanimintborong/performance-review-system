import { Flex } from "@chakra-ui/react";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";

type TemplateBuilderFooterProps = {
  onSaveDraft: () => void;
  onActivate: () => void;
  savingDraft?: boolean;
  activating?: boolean;
};

export function TemplateBuilderFooter({ onSaveDraft, onActivate, savingDraft, activating }: TemplateBuilderFooterProps) {
  return (
    <Flex justify="flex-end" gap="10px">
      <SecondaryButton onClick={onSaveDraft} loading={savingDraft} disabled={activating}>Save draft</SecondaryButton>
      <PrimaryButton onClick={onActivate} loading={activating} disabled={savingDraft}>Activate template</PrimaryButton>
    </Flex>
  );
}
