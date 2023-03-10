import { Card, Text, Group, Button, Avatar, Box, Center } from "@mantine/core";
import axios from "axios";
import { useSnapshot } from "valtio";
import { Actions, Category } from "./Interfaces";
import { Authentication, store } from "./store";

const CategoryMembersCardView = (props: {
  parent: "LiveTV" | "Movies";
  category: Category[];
}) => {
  const { parent, category } = props;
  const snap = useSnapshot(store);

  const getStreams = async (id: number) => {
    const { username, password, url, ...rest } = snap.authentication!;
    const response = await axios.get(
      `${url}/player_api.php?username=${username}&password=${password}&action=${action}&category_id=${id}`
    );
  };

  let action: Actions;
  switch (parent) {
    case "LiveTV":
      action = Actions.getLiveStreams;
      break;
    case "Movies":
      action = Actions.getVodStreams;
      break;
  }

  return (
    <>
      {category.map((cat) => (
        <Card
          key={cat.category_id}
          shadow="sm"
          m="xs"
          radius="xs"
          withBorder
          miw={100}
        >
          {/* <Card.Section>
            <Center>
              <Text>{cat.category_name}</Text>
            </Center>
          </Card.Section> */}
          <Center>
            <Button
              size="xs"
              variant="subtle"
              onClick={() => getStreams(parseInt(cat.category_id))}
            >
              {cat.category_name}
            </Button>
          </Center>
        </Card>
      ))}
    </>
  );
};

export default CategoryMembersCardView;
