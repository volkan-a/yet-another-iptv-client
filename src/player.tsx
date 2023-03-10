import { useEffect, useRef, useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Text, Button, Group, Stack } from "@mantine/core";

const Player = () => {
  const ref = useRef();
  const [bufferText, setBufferText] = useState("Buffering...");
  // set buffertext is playing

  const playOrPause = () => {
    // if (ref.current.plyr.playing) {
    //   ref.current.plyr.pause();
    // } else {
    //   ref.current.plyr.play();
    // }
    let player: Plyr = ref.current.plyr;
    player.fullscreen.enter();
    player.playing ? player.pause() : player.play();
  };
  return (
    <Stack p="xs">
      <Group>
        <Button onClick={playOrPause}>Pause</Button>
        <Text>{bufferText}</Text>
      </Group>
      <Plyr
        ref={ref}
        autoPlay
        source={{
          type: "video",
          sources: [
            {
              src: "http://iptvuniversal.eu:80/volkana122/volkana125346233/89",
              type: "application/x-mpegURL",
              provider: "html5",
              size: 240,
            },
          ],
        }}
      />
    </Stack>
  );
};

export default Player;
