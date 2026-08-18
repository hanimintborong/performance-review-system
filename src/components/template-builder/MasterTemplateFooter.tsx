"use client";

import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SaveAsTemplateDialog } from "@/components/template-builder/SaveAsTemplateDialog";

type MasterTemplateFooterProps = {
  onSaveAsNew: (title: string) => void;
  onUpdateDirectly: () => void;
  saving?: boolean;
};

export function MasterTemplateFooter({ onSaveAsNew, onUpdateDirectly, saving }: MasterTemplateFooterProps) {
  const [showSaveAs, setShowSaveAs] = useState(false);
  const [showConfirmDirect, setShowConfirmDirect] = useState(false);

  return (
    <Flex align="center" justify="flex-end" gap="16px">
      <Text as="button" fontSize="12px" color="grey.50" textDecoration="underline" onClick={() => setShowConfirmDirect(true)}>
        Update master template directly
      </Text>
      <PrimaryButton onClick={() => setShowSaveAs(true)} loading={saving}>Save as new template</PrimaryButton>

      <SaveAsTemplateDialog
        open={showSaveAs}
        onOpenChange={setShowSaveAs}
        saving={saving}
        onConfirm={(title) => { setShowSaveAs(false); onSaveAsNew(title); }}
      />

      <ConfirmationDialog
        open={showConfirmDirect}
        onOpenChange={setShowConfirmDirect}
        title="Update master template directly?"
        description="This changes the reusable master template itself, not a copy. Every future “Save as new template” will start from this edit."
        confirmLabel="Update master"
        onConfirm={onUpdateDirectly}
      />
    </Flex>
  );
}
