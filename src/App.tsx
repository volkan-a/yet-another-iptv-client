import { ReactNode, useEffect, useState } from "react";
import {
  AppShell,
  Footer,
  Group,
  Header,
  NavLink,
  Text,
  Title,
} from "@mantine/core";
import {
  IconDeviceTv,
  IconMovie,
  IconBrandNetflix,
  IconSettings,
} from "@tabler/icons-react";
import SettingsPanel from "./settingsPanel";
import { store } from "./store";
import { useSnapshot } from "valtio";
import MainPanel from "./mainPanel";

function App() {
  const [selectedPanel, setSelectedPanel] = useState<ReactNode>(
    <MainPanel parent="Live TV" />
  );
  const snap = useSnapshot(store);

  return (
    <AppShell
      padding="xs"
      header={
        <Header height={70} withBorder>
          <Group spacing="xs" position="left" p="xs" noWrap>
            <Title
              style={{ whiteSpace: "nowrap" }}
              order={2}
              variant="gradient"
              gradient={{ from: "blue.2", to: "blue.6", deg: 180 }}
            >
              Yet another IPTV Client
            </Title>

            <NavLink
              noWrap
              w="auto"
              variant="subtle"
              active
              label="Canlı TV"
              icon={<IconDeviceTv stroke="1.5" />}
              onClick={() => setSelectedPanel(<MainPanel parent="Live TV" />)}
            />
            <NavLink
              w="auto"
              variant="subtle"
              active
              label="Filmler"
              icon={<IconMovie stroke="1.5" />}
              onClick={() => setSelectedPanel(<MainPanel parent="Movies" />)}
            />
            <NavLink
              w="auto"
              variant="subtle"
              active
              label="Diziler"
              icon={<IconBrandNetflix stroke="1.5" />}
              onClick={() => setSelectedPanel(<MainPanel parent="Series" />)}
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
    >
      <>{selectedPanel}</>
    </AppShell>
  );
}

export default App;
