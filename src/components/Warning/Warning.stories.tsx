import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { Warning } from "./Warning";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme";
import { Provider } from "react-redux";
import store from "./../../reducers/store";

const meta: Meta<typeof Warning> = {
	title: "Warning",
	component: Warning,
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
type Story = StoryObj<typeof Warning>;

export const Primary: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/are you sure you want to continue?/i);
		expect(element).toBeTruthy();
	},
	args: {
		action: () => console.log("action"),
		close: () => console.log("close"),
	},
};

export const WithSettingUpdate: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/are you sure you want to continue?/i);
		expect(element).toBeTruthy();

		const checkbox = canvas.getByTestId("warning-checkbox");
		expect(checkbox).toBeTruthy();
	},
	args: {
		action: () => console.log("action"),
		close: () => console.log("close"),
		setting: true,
		updateSetting: () => console.log("changeSetting"),
	},
};
