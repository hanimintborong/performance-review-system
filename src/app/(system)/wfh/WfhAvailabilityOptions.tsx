import { Checkbox, Flex, Icon } from "@chakra-ui/react";
import { FiMail, FiMessageCircle, FiMoreHorizontal, FiPhone } from "react-icons/fi";

import { WFH_AVAILABILITY_OPTIONS, type WfhAvailability } from "@/types/wfh";

const OPTION_ICON: Record<WfhAvailability, typeof FiMail> = {
  Email: FiMail,
  Phone: FiPhone,
  Lark: FiMessageCircle,
  Other: FiMoreHorizontal,
};

type WfhAvailabilityOptionsProps = {
  selected: WfhAvailability[];
  onToggle: (option: WfhAvailability) => void;
};

export function WfhAvailabilityOptions({ selected, onToggle }: WfhAvailabilityOptionsProps) {
  return (
    <Flex gap="8px" wrap="wrap">
      {WFH_AVAILABILITY_OPTIONS.map((option) => {
        const checked = selected.includes(option);
        return (
          <Checkbox.Root
            key={option}
            checked={checked}
            onCheckedChange={() => onToggle(option)}
            display="flex"
            alignItems="center"
            gap="6px"
            px="10px"
            h="34px"
            borderWidth="1px"
            borderRadius="8px"
            borderColor={checked ? "brand.50" : "grey.20"}
            bg={checked ? "brand.10" : "white"}
            cursor="pointer"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
            <Icon as={OPTION_ICON[option]} boxSize="14px" color={checked ? "brand.60" : "grey.50"} />
            <Checkbox.Label fontSize="12px" fontWeight={checked ? "700" : "500"} color={checked ? "brand.70" : "grey.70"}>
              {option}
            </Checkbox.Label>
          </Checkbox.Root>
        );
      })}
    </Flex>
  );
}
