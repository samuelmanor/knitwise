import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { SettingsMenu } from "./SettingsMenu";
import { Provider } from "react-redux";
import store from "./../../reducers/store";
import { ThemeProvider, createTheme } from "@mui/material";
import { lightTheme } from "../../theme";

const meta: Meta<typeof SettingsMenu> = {
	title: "SettingsMenu",
	component: SettingsMenu,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider store={store}>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SettingsMenu>;

export const Primary: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Settings/i);
		expect(element).toBeTruthy();
	},
};
