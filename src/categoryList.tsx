import { Text, Group, Avatar, UnstyledButton, Stack } from "@mantine/core";
import { useState } from "react";
import { Category } from "./Interfaces";
import useStyles from "./styles";

interface CategoryMemberListProps {
  categories: Category[];
  onCategoryChange: (category_id: number) => void;
}

const CategoryList = (props: CategoryMemberListProps) => {
  const { categories, onCategoryChange } = props;
  const [avatar, setAvatar] = useState("");
  const { classes, theme } = useStyles();
  return (
    <Stack spacing={1}>
      {categories.map((cat) => (
        <UnstyledButton
          key={cat.category_id}
          className={classes.button}
          onClick={() => onCategoryChange(cat.category_id)}
        >
          <Group align="center" noWrap spacing="xs">
            {/* <Avatar size={30} radius={15} bg="blue.8">
              {avatar}
            </Avatar> */}

            <Text fz="sm" fw={700}>
              {cat.category_name}
            </Text>
          </Group>
        </UnstyledButton>
      ))}
    </Stack>
  );
};

export default CategoryList;
