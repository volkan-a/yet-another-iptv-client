import { useEffect, useRef, useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Text, Button, Group, Stack } from "@mantine/core";

const Player = () => {
  const ref = useRef(null);
  // set player as type Plyr
  // let player: Plyr = ref.current.plyr;

  return (
    <Stack p="xs">
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
            },
          ],
        }}
      />
    </Stack>
  );
};

export default Player;
