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
    window.MediaSource = window.MediaSource || window.WebKitMediaSource;
    MediaSource.
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
              // src: "http://iptvuniversal.eu:80/movie/volkana122/volkana125346233/186675.mkv",
              src: "http://iptvuniversal.eu:80/volkana122/volkana125346233/84",
              type: "application/x-mpegURL",
              // type: 'application/x-mpegURL; codecs="avc1.4d001e, mp4a.40.2"',
              // type: "application/x-matroska",
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
