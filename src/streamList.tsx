import {
  AspectRatio,
  Avatar,
  BackgroundImage,
  Box,
  Group,
  Image,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";

import TVIcon from "./assets/tv.png";
import { useEffect, useState } from "react";
import { Stream } from "./Interfaces";
import useStyles from "./styles";

interface StreamListProps {
  parent: "Live TV" | "Movies" | "Series";
  streams: Stream[];
}

const StreamList = (props: StreamListProps) => {
  const { parent, streams } = props;
  const { classes, theme } = useStyles();
  const [avatar, setAvatar] = useState("");

  return (
    <Stack spacing={0}>
      {streams.map((stream) => (
        <UnstyledButton
          key={stream.stream_id}
          className={classes.button}
          onClick={() => {}}
          pt={1}
          pb={1}
        >
          <Group noWrap>
            <Image
              src={stream.stream_icon !== "" ? stream.stream_icon : TVIcon}
              height={80}
              width={100}
              fit="scale-down"
            />

            <Text fz="sm" fw={600}>
              {stream.name}
            </Text>
          </Group>
        </UnstyledButton>
      ))}
    </Stack>
  );
};

export default StreamList;
