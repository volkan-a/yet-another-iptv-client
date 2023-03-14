import { Grid, ScrollArea, Skeleton, Stack, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import CategoryList from "./categoryList";
import { Actions, Category, Stream } from "./Interfaces";
import Player from "./player";
import { store } from "./store";
import StreamList from "./streamList";

interface CategoryPanelProps {
  parent: "Live TV" | "Movies" | "Series";
}

const MainPanel = (props: CategoryPanelProps) => {
  const { parent } = props;
  const snap = useSnapshot(store);
  const [categories, setCategories] = useState<Category[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    // if (snap.authentication === null) return;
    let action: Actions;
    switch (parent) {
      case "Live TV":
        action = Actions.getLiveCategories;
        break;
      case "Movies":
        action = Actions.getVodCategories;
        break;
      case "Series":
        action = Actions.getSeriesCategories;
        break;
    }
    const fetchCategories = async () => {
      if (snap.authentication === null) return;
      const username = snap.authentication.username;
      const password = snap.authentication.password;
      const url = snap.authentication.url;
      const response = await axios.get(
        `${url}/player_api.php?username=${username}&password=${password}&action=${action}`
      );
      setCategories(response.data);
    };
    fetchCategories();
  }, [parent]);

  useEffect(() => {
    if (categories.length === 0) return;
    handleCategoryChange(categories[0].category_id);
  }, [categories]);

  const handleCategoryChange = (category_id: number) => {
    let action: Actions;
    switch (parent) {
      case "Live TV":
        action = Actions.getLiveStreams;
        break;
      case "Movies":
        action = Actions.getVodStreams;
        break;
      case "Series":
        action = Actions.getSeriesStreams;
        break;
    }
    const fetchStreams = async () => {
      if (snap.authentication === null) return;
      const username = snap.authentication.username;
      const password = snap.authentication.password;
      const url = snap.authentication.url;
      const response = await axios.get(
        `${url}/player_api.php?username=${username}&password=${password}&action=${action}&category_id=${category_id}`
      );
      setStreams([]);
      response.data.map((strm: any) => {
        setStreams((prev) => [...prev, strm as Stream]);
      });
    };
    fetchStreams();
  };

  return snap.authentication ? (
    <Grid gutter="xs" justify="flex-start" align="stretch">
      <Grid.Col span={2}>
        <ScrollArea h="100vh" offsetScrollbars>
          <CategoryList
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />
        </ScrollArea>
      </Grid.Col>
      <Grid.Col span={4}>
        <ScrollArea h="100vh" offsetScrollbars>
          <StreamList parent={parent} streams={streams} />
        </ScrollArea>
      </Grid.Col>
      <Grid.Col span={6}>
        <Stack>
          <Player />
          <Skeleton animate height={300} />
        </Stack>
      </Grid.Col>
    </Grid>
  ) : (
    <Text>Herhangi bir bağlantı bulunamadı</Text>
  );
};

export default MainPanel;
