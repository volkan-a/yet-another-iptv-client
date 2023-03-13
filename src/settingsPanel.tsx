import {
  Button,
  Center,
  Group,
  Paper,
  PinInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { store } from "./store";
import axios from "axios";

const SettingsPanel = () => {
  const form = useForm({
    initialValues: { ...JSON.parse(localStorage.getItem("authentication")!) },

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
    const url = `${values.url}/player_api.php?username=${values.username}&password=${values.password}`;
    const res = await axios.get(url);
    const data = res.data;
    if (data.user_info.status === "Active") {
      var date = new Date(data.user_info.exp_date * 1000);

      store.authentication = { ...values, expires: date.toUTCString() };
    } else {
      alert("Kullanıcı adı şifre veya url hatalı");
    }
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
          <Center mb="sm">
            <PinInput
              size="xl"
              type="alphanumeric"
              mask
              {...form.getInputProps("pin")}
            />
          </Center>
          <Group position="right">
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
