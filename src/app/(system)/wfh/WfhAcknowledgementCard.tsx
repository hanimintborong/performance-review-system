import { Checkbox, Flex, Text } from "@chakra-ui/react";

type WfhAcknowledgementCardProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function WfhAcknowledgementCard({ checked, onChange }: WfhAcknowledgementCardProps) {
  return (
    <Flex bg="grey.10" borderRadius="8px" p="12px 14px" gap="10px" align="flex-start">
      <Checkbox.Root checked={checked} onCheckedChange={(e) => onChange(Boolean(e.checked))} mt="2px">
        <Checkbox.HiddenInput />
        <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
      </Checkbox.Root>
      <Flex direction="column" gap="2px" flex="1">
        <Flex justify="space-between" align="center" gap="8px">
          <Text fontSize="12px" fontWeight="700" color="grey.80">
            WFH acknowledgement <Text as="span" color="error.60">*</Text>
          </Text>
        </Flex>
        <Text fontSize="11px" color="grey.60" lineHeight="1.5">
          I acknowledge and agree to comply with all terms and conditions stated in this WFH arrangement, including adherence to my assigned WFH day, maintaining availability during working hours, fulfilling my responsibilities, and complying with all company policies.
        </Text>
      </Flex>
    </Flex>
  );
}
