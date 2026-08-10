import { Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { FiPlus, FiX } from "react-icons/fi";

type OptionsListEditorProps = {
  options: string[];
  onChange: (options: string[]) => void;
};

export function OptionsListEditor({ options, onChange }: OptionsListEditorProps) {
  const list = options.length > 0 ? options : [""];

  function updateAt(index: number, value: string) {
    onChange(list.map((o, i) => (i === index ? value : o)));
  }

  function removeAt(index: number) {
    const next = list.filter((_, i) => i !== index);
    onChange(next.length > 0 ? next : [""]);
  }

  return (
    <Flex direction="column" gap="10px" flex="1" minW="220px">
      <Text fontSize="11px" color="grey.60">Options</Text>

      {list.map((option, i) => (
        <Flex key={i} align="center" gap="10px">
          <Text fontSize="11px" color="grey.50" w="14px" flexShrink="0" textAlign="right">{i + 1}.</Text>
          <Input
            value={option}
            onChange={(e) => updateAt(i, e.target.value)}
            placeholder={`Option ${i + 1}`}
            bg="white"
            size="xs"
            px="10px"
          />
          <IconButton aria-label="Remove option" size="xs" variant="ghost" color="grey.50" onClick={() => removeAt(i)}>
            <FiX />
          </IconButton>
        </Flex>
      ))}

      <Flex
        as="button"
        align="center"
        gap="6px"
        color="brand.50"
        fontSize="11px"
        fontWeight="700"
        cursor="pointer"
        w="fit-content"
        pl="20px"
        onClick={() => onChange([...list, ""])}
      >
        <FiPlus size={12} /> Add option
      </Flex>
    </Flex>
  );
}
