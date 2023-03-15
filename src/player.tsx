import { useEffect, useRef } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Stack } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";

const Player = (props: { streamId: string }) => {
  const { streamId } = props;
  const ref = useRef<any>(null);
  useHotkeys([
    [
      "f",
      () => {
        ref.current?.plyr.fullscreen.toggle();
      },
    ],
  ]);

  useEffect(() => {
    if (ref.current === null) return;
  }, [streamId]);

  return (
    <Stack p="xs">
      <Plyr
        style={{ zIndex: 1000 }}
        controls
        ref={ref}
        source={{
          type: "video",

          sources: [
            {
              src: `http://iptvuniversal.eu:80/volkana122/volkana125346233/${streamId}`,
              type: "application/x-mpegURL",
              provider: "html5",
            },
          ],
        }}
        options={{
          autoplay: true,
          // fullscreen: { enabled: true },
          controls: ["play-large", "fullscreen", "mute", "volume"],
        }}
      />
    </Stack>
  );
};

export default Player;
