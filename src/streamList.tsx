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
  onStreamChange: (stream_id: string) => void;
}

const StreamList = (props: StreamListProps) => {
  const { parent, streams, onStreamChange } = props;
  const { classes, theme } = useStyles();
  const [avatar, setAvatar] = useState("");

  return (
    <Stack spacing={4}>
      {streams.map((stream) => (
        <UnstyledButton
          h={80}
          key={stream.stream_id}
          className={classes.button}
          onClick={() => onStreamChange(stream.stream_id)}
          pt={4}
          pb={4}
        >
          <Group noWrap>
            <Image
              src={
                stream.stream_icon && stream.stream_icon !== ""
                  ? stream.stream_icon
                  : TVIcon
              }
              height={72}
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
