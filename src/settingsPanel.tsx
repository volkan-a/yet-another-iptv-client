import {
  Button,
  Center,
  FileButton,
  Group,
  Modal,
  Paper,
  PasswordInput,
  PinInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { store } from "./store";
import axios from "axios";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

const SettingsPanel = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [authenticationMessage, setAuthenticationMessage] = useState("");
  const [messageColor, setMessageColor] = useState<"red.5" | "green.5">(
    "red.5"
  );
  const form = useForm({
    initialValues: {
      username: store.authentication?.username || "",
      password: store.authentication?.password || "",
      url: store.authentication?.url || "",
    },

    validate: {
      username: (value) => {
        if (!value) return "Kullanıcı adı boş olamaz";
      },
      password: (value) => {
        if (!value) return "Şifre boş olamaz";
      },
      url: (value) => {
        if (!value) return "URL boş olamaz";
      },
    },
  });

  const onSubmit = async (values: any) => {
    let data: any;
    const url = `${values.url}/player_api.php?username=${values.username}&password=${values.password}`;
    axios
      .get(url)
      .then((res) => {
        data = res.data;
        if (data.user_info.status === "Active") {
          var date = new Date(data.user_info.exp_date * 1000);
          store.authentication = { ...values, expires: date.toUTCString() };
          setAuthenticationMessage("Giriş başarılı");
          setMessageColor("green.5");
          open();
        } else {
          setAuthenticationMessage(
            "Giriş başarısız: Kullanıcı adı şifre ve parolayı kontrol edin"
          );
          setMessageColor("red.5");
          open();
        }
      })
      .catch(() => {
        setAuthenticationMessage("Giriş başarısız: Bağlantı problemi");
        setMessageColor("red.5");
        open();
      });
  };

  const resetSettings = () => {
    localStorage.removeItem("authentication");
    store.authentication = null;
    form.setValues({
      username: "",
      password: "",
      url: "",
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Giriş sonucu"
        centered
        size="xs"
        overlayProps={{ color: "dark.9", opacity: 0.55, blur: 3 }}
      >
        <Center>
          <Text size="sm" fw={600} color={messageColor}>
            {authenticationMessage}
          </Text>
        </Center>
      </Modal>
      <Center>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Paper shadow="xl" p="sm" withBorder w={400}>
            <Stack>
              <Text mb="lg" fz="xl" fw="700">
                Ayarlar
              </Text>
              <TextInput
                withAsterisk
                label="Kullanıcı Adı"
                {...form.getInputProps("username")}
                mb="sm"
              />
              <PasswordInput
                withAsterisk
                label="Parola"
                {...form.getInputProps("password")}
                mb="sm"
              />
              <TextInput
                withAsterisk
                label="URL"
                {...form.getInputProps("url")}
                mb="sm"
              />
              <Center mb="sm">
                <PinInput
                  size="xl"
                  type="alphanumeric"
                  mask
                  {...form.getInputProps("pin")}
                />
              </Center>
              <Group position="right">
                <Button
                  type="reset"
                  variant="outline"
                  onClick={resetSettings}
                  c="t"
                >
                  Sıfırla
                </Button>
                <Button type="submit" variant="outline" c="t">
                  Kaydet
                </Button>
              </Group>
            </Stack>
          </Paper>
        </form>
      </Center>
    </>
  );
};

export default SettingsPanel;
