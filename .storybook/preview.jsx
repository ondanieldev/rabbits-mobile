import { View } from "react-native";
import { colors } from "../src/shared/styles/globalStyles";

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story, { parameters }) => (
      <View
        style={{
          flex: 1,
          backgroundColor:
            parameters.backgroundColor || colors.background,
          padding: 8,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default preview;
