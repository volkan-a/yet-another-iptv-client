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
import { useForm } from "@mantine/form";
import { store } from "./store";
import axios from "axios";
const SettingsPanel = () => {
  const form = useForm({
    initialValues: {
      username: "volkana122",
      password: "volkana125346233",
      url: "http://iptvuniversal.eu:80",
      pin: "0822",
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
    console.log(values);
    const url = `${values.url}/player_api.php?username=${values.username}&password=${values.password}`;
    const res = await axios.get(url);
    const data = res.data;
    console.log(data);
    if (data.user_info.status === "Active") {
      var date = new Date(data.user_info.exp_date * 1000);

      store.authentication = { ...values, expires: date.toUTCString() };
    } else {
      alert("Kullanıcı adı veya şifre hatalı");
    }
    // store.login = values;
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
