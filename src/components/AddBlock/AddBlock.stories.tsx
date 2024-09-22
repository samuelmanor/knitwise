import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
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
};

export default meta;
type Story = StoryObj<typeof AddBlock>;

export const Primary: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/addBlockButton/i);
		expect(element).toBeTruthy();

		await step("clicking the button opens the dialog", async () => {
			await userEvent.click(element);
			const addEmptyBlockButton = canvas.getByTestId(/addEmptyBlockButton/i);
			expect(addEmptyBlockButton).toBeTruthy();
		});
	},
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: {
							...testProject,
							mode: "edit",
						},
					})}
				>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};
