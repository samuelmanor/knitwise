import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { AddBlock } from "./AddBlock";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme";
import { Provider } from "react-redux";
import { testProject } from "../../utils/testProject";
import { usePreloadedState } from "../../reducers/store";

const meta: Meta<typeof AddBlock> = {
	title: "AddBlock",
	component: AddBlock,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: testProject,
					})}
				>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof AddBlock>;

export const Primary: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/AddBlock/i);
		expect(element).toBeTruthy();
	},
};
