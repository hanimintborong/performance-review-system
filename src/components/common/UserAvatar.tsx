import { Flex } from "@chakra-ui/react";

type UserAvatarProps = {
  initials: string;
  size?: string;
  bg?: string;
  color?: string;
};

export function UserAvatar({
  initials,
  size = "30px",
  bg = "brand.10",
  color = "brand.70",
}: UserAvatarProps) {
  return (
    <Flex
      w={size}
      h={size}
      align="center"
      justify="center"
      borderRadius="full"
      bg={bg}
      color={color}
      fontSize="11px"
      fontWeight="700"
      flexShrink="0"
    >
      {initials}
    </Flex>
  );
}
