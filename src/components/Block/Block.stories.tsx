import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { Block } from "./Block";
import { Provider } from "react-redux";
import { testProject } from "../../utils/testProject";
import { usePreloadedState } from "../../reducers/store";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme";

const meta: Meta<typeof Block> = {
	title: "Block",
	component: Block,
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
type Story = StoryObj<typeof Block>;

export const ChartMode: Story = {
	// this block is not being edited
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Block 1/i);
		expect(element).toBeTruthy();

		await step("block is not being edited", async () => {
			const editButton = canvas.queryByTestId(/block1AddRowBtn/i);
			expect(editButton).toBeFalsy();
		});

		await step("first row is highlighted", async () => {
			const row = canvas.getByTestId(/row0/i);
			expect(row).toHaveStyle("background-color: rgb(148, 168, 179)");
		});

		await step("block name is visible", async () => {
			const blockName = canvas.getByText(/Block 1/i);
			expect(blockName).toBeTruthy();
		});
	},
	args: {
		index: 1,
		currentBlockRow: 1,
		stitches: testProject.blocks[1].stitches,
		blockName: "Block 1",
		tallestBlockIndex: 1,
		draftBlockIndex: null,
		setDraftBlockIndex: () => {},
	},
};

export const EditProjectMode: Story = {
	// app is in edit mode, this specific block is not being edited
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Block 1/i);
		expect(element).toBeTruthy();

		await step("edit buttons are visible", async () => {
			const editButton = canvas.getByTestId(/block1EditBtn/i);
			expect(editButton).toBeTruthy();

			const deleteButton = canvas.getByTestId(/block1DeleteBtn/i);
			expect(deleteButton).toBeTruthy();
		});

		await step("no row is highlighted", async () => {
			const rows = canvas.getAllByTestId(/row/i);
			rows.forEach(row => {
				expect(row).not.toHaveStyle("background-color: rgb(148, 168, 179)");
			});
		});

		await step("block name is visible", async () => {
			const blockName = canvas.getByText(/Block 1/i);
			expect(blockName).toBeTruthy();
		});

		await step("edit button triggers edit mode", async () => {
			const editButton = canvas.getByTestId(/block1EditBtn/i);
			expect(editButton).toBeTruthy();

			await userEvent.click(editButton);
			const addButton = canvas.getByTestId(/block1AddRowBtn/i);
			expect(addButton).toBeTruthy();

			const saveButton = canvas.getByTestId(/block1SaveBtn/i);
			expect(saveButton).toBeTruthy();
			await userEvent.click(saveButton);
		});
	},
	args: {
		index: 1,
		currentBlockRow: 1,
		stitches: testProject.blocks[1].stitches,
		blockName: "Block 1",
		tallestBlockIndex: 1,
		draftBlockIndex: 1,
		setDraftBlockIndex: () => {},
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

export const EditingBlock: Story = {
	// app is in edit mode, this specific block is being edited
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/block1EditBlock/i);
		expect(element).toBeTruthy();

		await step("block is being edited", async () => {
			const editButton = canvas.getByTestId(/block1SaveBtn/i);
			expect(editButton).toBeTruthy();
		});

		await step("a row can be added", async () => {
			const addRowButton = canvas.getByTestId(/block1AddRowBtn/i);
			expect(addRowButton).toBeTruthy();

			await userEvent.click(addRowButton);
		});
	},
	args: {
		index: 1,
		currentBlockRow: 1,
		stitches: testProject.blocks[1].stitches,
		blockName: "Block 1",
		tallestBlockIndex: 1,
		draftBlockIndex: 1,
		setDraftBlockIndex: () => {},
	},
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: {
							...testProject,
							mode: "editBlock",
						},
					})}
				>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};

export const Preview: Story = {
	// used to preview a block before adding it to the project
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Block 1/i);
		expect(element).toBeTruthy();
	},
	args: {
		index: 1,
		currentBlockRow: null,
		stitches: testProject.blocks[1].stitches,
		blockName: "Block 1",
		tallestBlockIndex: 1,
		draftBlockIndex: 1,
		setDraftBlockIndex: () => {},
	},
};
