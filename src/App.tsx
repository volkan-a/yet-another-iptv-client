import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import {
  AppShell,
  Center,
  Container,
  Flex,
  Footer,
  Grid,
  Group,
  Header,
  NavLink,
  Text,
} from "@mantine/core";
import {
  IconDeviceTv,
  IconMovie,
  IconBrandNetflix,
  IconSettings,
} from "@tabler/icons-react";
import Player from "./player";
import SettingsPanel from "./settingsPanel";
import { Authentication, store } from "./store";
import { useSnapshot } from "valtio";
import { Actions, Category } from "./Interfaces";
import CategoryMembersCardView from "./CategoyMembersCardView";
import LiveTVPanel from "./liveTVPanel";
import { render } from "react-dom";

const getCategory = async (login: Authentication, action: Actions) => {
  const { username, password, url } = login;
  const response = await axios.get(
    `${url}/player_api.php?username=${username}&password=${password}&action=${action}`
  );
  return response.data;
};

function App() {
  const [selectedPanel, setSelectedPanel] = useState<ReactNode>(<></>);
  const snap = useSnapshot(store);
  const [categories, setCategories] = useState<{
    LiveTv: Category[];
    Movies: Category[];
    Series: Category[];
  }>({ LiveTv: [], Movies: [], Series: [] });

  useEffect(() => {
    const fetchData = async () => {
      if (!snap.authentication) return;
      const cattv = await getCategory(
        snap.authentication,
        Actions.getLiveCategories
      );
      const catmovie = await getCategory(
        snap.authentication,
        Actions.getVodCategories
      );
      const catseries = await getCategory(
        snap.authentication,
        Actions.getSeriesCategories
      );
      setCategories({
        LiveTv: cattv,
        Movies: catmovie,
        Series: catseries,
      });
    };
    fetchData();
    console.log(snap.authentication);
  }, [snap.authentication]);

  return (
    <AppShell
      padding="xs"
      header={
        <Header height={70} withBorder>
          <Group spacing="xs" position="left" p="xs" noWrap>
            <Center miw={125}>
              <div>
                <Text
                  variant="gradient"
                  gradient={{ from: "blue.5", to: "indigo.5", deg: 90 }}
                  fz="lg"
                  fw={700}
                >
                  Yet another
                </Text>
                <Text
                  variant="gradient"
                  gradient={{ from: "indigo.5", to: "blue.5", deg: 90 }}
                  fz="lg"
                  fw={700}
                >
                  IPTV Client
                </Text>
              </div>
            </Center>
            <NavLink
              noWrap
              w="auto"
              variant="subtle"
              active
              label="Canlı TV"
              icon={<IconDeviceTv stroke="1.5" />}
              onClick={() => setSelectedPanel(<LiveTVPanel />)}
            />
            <NavLink
              w="auto"
              variant="subtle"
              active
              label="Filmler"
              icon={<IconMovie stroke="1.5" />}
            />
            <NavLink
              w="auto"
              variant="subtle"
              active
              label="Diziler"
              icon={<IconBrandNetflix stroke="1.5" />}
            />
            <NavLink
              w="auto"
              variant="subtle"
              active
              label="Ayarlar"
              icon={<IconSettings stroke="1.5" />}
              onClick={() => setSelectedPanel(<SettingsPanel />)}
            />
          </Group>
        </Header>
      }
      footer={
        <Footer height={20}>
          <Group position="right" spacing="sm" px="sm" align="center">
            {!snap.authentication ? (
              <Text fz="xs" fw={700}>
                Bağlantı yok
              </Text>
            ) : (
              <>
                <Text fz="xs" fw={700}>
                  Kullanıcı: {snap.authentication.username}
                </Text>
                <Text fz="xs" fw={700}>
                  Son kullanma tarihi: {snap.authentication.expires}
                </Text>
              </>
            )}
          </Group>
        </Footer>
      }
      layout="default"
    >
      <Container fluid>{selectedPanel}</Container>
    </AppShell>
  );
}

export default App;
