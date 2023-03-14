import {
  Button,
  Center,
  FileButton,
  FileInput,
  Group,
  Paper,
  PinInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { store } from "./store";
import axios from "axios";
import { useState } from "react";

const SettingsPanel = () => {
  const [file, setFile] = useState<File | null>();
  const form = useForm({
    initialValues: {
      username: store.authentication?.username || "",
      password: store.authentication?.password || "",
      url: store.authentication?.url || "",
      vlcPath: store.vlcPath || "",
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
    console.log(form.values);
    const url = `${values.url}/player_api.php?username=${values.username}&password=${values.password}`;
    const res = await axios.get(url);
    const data = res.data;
    if (data.user_info.status === "Active") {
      var date = new Date(data.user_info.exp_date * 1000);

      store.authentication = { ...values, expires: date.toUTCString() };
      store.vlcPath = values.vlcPath;
    } else {
      alert("Kullanıcı adı şifre veya url hatalı");
    }
  };

  const resetSettings = () => {
    localStorage.removeItem("authentication");
    store.authentication = null;
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Paper shadow="xl" p="xl" withBorder w={400}>
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
          <TextInput
            withAsterisk
            label="Şifre"
            type="password"
            {...form.getInputProps("password")}
            mb="sm"
          />
          <TextInput
            withAsterisk
            label="URL"
            {...form.getInputProps("url")}
            mb="sm"
          />
          <FileButton onChange={setFile}>
            {(props) => (
              <TextInput
                label="VLC yolu"
                mb="sm"
                readOnly
                value={file?.name || ""}
                {...props}
              />
            )}
          </FileButton>

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
  );
};

export default SettingsPanel;
