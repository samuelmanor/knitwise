import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { usePreloadedState } from "../../reducers/store";

import { NameEditor } from "./NameEditor";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme";
import { Provider } from "react-redux";
import { testProject } from "../../utils/testProject";

const meta: Meta<typeof NameEditor> = {
	title: "NameEditor",
	component: NameEditor,
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
type Story = StoryObj<typeof NameEditor>;

export const Default: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/name-editor-block/i);
		expect(element).toBeTruthy();

		await step("name is not being edited in initial state", async () => {
			const editButton = canvas.getByTestId(/name-editor-edit-btn/i);
			expect(editButton).toBeTruthy();

			const saveButton = canvas.queryByTestId(/name-editor-save-btn/i);
			expect(saveButton).toBeFalsy();
		});

		await step("name can be edited", async () => {
			const editButton = canvas.getByTestId(/name-editor-edit-btn/i);
			expect(editButton).toBeTruthy();

			await userEvent.click(editButton);
			const input = canvas.getByRole("textbox");
			expect(input).toBeTruthy();

			await userEvent.type(input, "2");
			expect(input).toHaveValue("block 12");

			const saveButton = canvas.getByTestId(/name-editor-save-btn/i);
			expect(saveButton).toBeTruthy();
			await userEvent.click(saveButton);
		});
	},
	args: {
		name: "block 1",
		onSave: (name: string) => console.log(name),
		type: "block",
	},
};
