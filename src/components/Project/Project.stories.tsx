import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { Project } from "./Project";
import { Provider } from "react-redux";
import { usePreloadedState } from "../../reducers/store";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme";
import { testProject } from "../../utils/testProject";

const meta: Meta<typeof Project> = {
	title: "Project",
	component: Project,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: {
							...testProject,
							blocks: [testProject.blocks[1], testProject.blocks[0], testProject.blocks[1]],
						},
					})}
				>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Project>;

export const Primary: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("blocks are displayed", async () => {
			const blocks = canvas.getAllByText(/panel/i);
			expect(blocks).toHaveLength(3);
		});

		await step("blocks have directions displayed", async () => {
			const directions = canvas.getAllByText(/row/i);
			expect(directions).toHaveLength(3);
		});

		await step("knitting direction is displayed", async () => {
			const direction = canvas.getByText(/rs/i);
			expect(direction).toBeTruthy();
		});
	},
};
