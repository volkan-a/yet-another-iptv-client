import {
  Container,
  Flex,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import CategoryMembersCardView from "./CategoyMembersCardView";
import { Actions, Category } from "./Interfaces";
import { store } from "./store";

const LiveTVPanel = () => {
  const snap = useSnapshot(store);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (snap.authentication === null) return;
    const fetchData = async () => {
      const { username, password, url, ...rest } = snap.authentication!;
      const response = await axios.get(
        `${url}/player_api.php?username=${username}&password=${password}&action=${Actions.getLiveCategories}`
      );
      setCategories(response.data);
    };
    fetchData();
  }, []);

  if (!snap.authentication)
    return <Text>Herhangi bir bağlantı bulunamadı</Text>;
  return (
    <SimpleGrid cols={2} spacing="xs">
      <SimpleGrid cols={2}>
        <ScrollArea h="100vh">
          <CategoryMembersCardView parent="LiveTV" category={categories} />
        </ScrollArea>
        <Skeleton animate height={150} />
      </SimpleGrid>
      <Skeleton animate height={300} />
    </SimpleGrid>
  );
};

export default LiveTVPanel;
