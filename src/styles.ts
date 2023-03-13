import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.dark[8],
    color: theme.colors.dark[0],
    padding: theme.spacing.xs,
    borderColor: theme.colors.dark[6],
    ":hover": {
      backgroundColor: theme.colors.dark[6],
    },
    ":active": {
      backgroundColor: theme.colors.dark[8],
      transition: "background-color 150ms ease",
    },
  },
  channelText: {},
  infoText: {
    color: theme.colors.dark[3],
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  avatar: {
    background: theme.colors.blue[6],
  },

  circleImage: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    overflow: "hidden",
  },

  circleImageContainer: {
    objectFit: "cover",
  },
}));

export default useStyles;
