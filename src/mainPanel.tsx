import { Grid, ScrollArea, Skeleton, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useHotkeys } from "@mantine/hooks";
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
  useHotkeys([
    ["arrowUp", () => changeChannel("up"), { preventDefault: false }],
  ]);
  useHotkeys([["arrowDown", () => changeChannel("down")]]);
  const { parent } = props;
  const snap = useSnapshot(store);
  const [categories, setCategories] = useState<Category[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);

  const changeChannel = (direction: "up" | "down") => {
    if (streams.length === 0) return;
    const index = streams.findIndex(
      (stream) => stream.stream_id === selectedStream?.stream_id
    );
    if (direction === "up") {
      if (index === 0) {
        setSelectedStream(streams[streams.length - 1]);
      } else {
        setSelectedStream(streams[index - 1]);
      }
    } else {
      if (index === streams.length - 1) {
        setSelectedStream(streams[0]);
      } else {
        setSelectedStream(streams[index + 1]);
      }
    }
  };

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

  // useEffect(() => {
  //   console.log("channel changed");
  //   notifications.show({
  //     // title: "Loading...",
  //     // message: "Loading streams...",
  //     // color: "blue",
  //     // icon: <Skeleton radius="xl" />,
  //     title: selectedStream?.name,
  //     message: selectedStream?.stream_type,
  //     color: "blue",
  //     icon: <Skeleton radius="xl" />,
  //   });
  // }, [selectedStream]);

  useEffect(() => {
    if (categories.length === 0) return;
    handleCategoryChange(categories[0].category_id);
    setSelectedStream(streams[0]);
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
          <StreamList
            parent={parent}
            streams={streams}
            onStreamChange={(stream_id) =>
              setSelectedStream(
                streams.reduce((prev, curr) =>
                  curr.stream_id === stream_id ? curr : prev
                )
              )
            }
          />
        </ScrollArea>
      </Grid.Col>
      <Grid.Col span={6}>
        <Stack>
          <Player streamId={selectedStream?.stream_id!} />
          <Skeleton animate height={300} />
        </Stack>
      </Grid.Col>
    </Grid>
  ) : (
    <Text>Herhangi bir bağlantı bulunamadı</Text>
  );
};

export default MainPanel;
