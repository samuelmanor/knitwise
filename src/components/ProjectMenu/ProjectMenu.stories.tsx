import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { usePreloadedState } from "../../reducers/store";

import { ProjectMenu } from "./ProjectMenu";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme";
import { Provider } from "react-redux";
import { testProject } from "../../utils/testProject";

const meta: Meta<typeof ProjectMenu> = {
	title: "ProjectMenu",
	component: ProjectMenu,
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
type Story = StoryObj<typeof ProjectMenu>;

export const Primary: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/project-menu/i);
		expect(element).toBeTruthy();

		await step("edit button changes mode to edit", async () => {
			const rowControls = canvas.getByTestId(/row-controls/i);
			expect(rowControls).toBeTruthy();

			const editButton = canvas.getByTestId(/edit-save-btn/i);
			expect(editButton).toBeTruthy();

			await userEvent.click(editButton);

			expect(rowControls).not.toBeInTheDocument();

			const addBlockButton = canvas.getByTestId(/add-block-btn/i);
			expect(addBlockButton).toBeTruthy();

			const rearrangeBlocksButton = canvas.getByTestId(/rearrange-blocks-btn/i);
			expect(rearrangeBlocksButton).toBeTruthy();
		});

		await step("save button changes mode to chart", async () => {
			const editButton = canvas.getByTestId(/edit-save-btn/i);
			expect(editButton).toBeTruthy();

			await userEvent.click(editButton);

			const rowControls = canvas.getByTestId(/row-controls/i);
			expect(rowControls).toBeTruthy();
		});
	},
};
