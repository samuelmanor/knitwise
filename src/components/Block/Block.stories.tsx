import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import { Block } from "./Block";
import { Provider } from "react-redux";
import store from "./../../reducers/store";
import { testProject } from "../../utils/testProject";
import { usePreloadedState } from "../../reducers/store";

const meta: Meta<typeof Block> = {
	title: "Block",
	component: Block,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		Story => (
			<Provider store={store}>
				<Story />
			</Provider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Block>;

export const Primary: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Block 1/i);
		expect(element).toBeTruthy();

		await step("block overlay is visible", async () => {
			const overlay = canvas.getByText(/row 1/i);
			expect(overlay).toBeTruthy();
		});

		await step("block is not being edited", async () => {
			const editButton = canvas.queryByTestId(/block1AddRowBtn/i);
			expect(editButton).toBeFalsy();
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

export const EditMode: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Block 1/i);
		expect(element).toBeTruthy();

		await step("block can be edited", async () => {
			const editButton = canvas.getByTestId(/block1EditBtn/i);
			expect(editButton).toBeTruthy();
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
			<Provider
				store={usePreloadedState({
					workspace: {
						mode: "edit",
						settings: {
							theme: "light",
							stitchDisplay: "symbol",
							stitchTipMode: "hover",
							directionsOverlayMode: "simple",
						},
					},
				})}
			>
				<Story />
			</Provider>
		),
	],
};

export const EditingBlock: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Block 1/i);
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
			<Provider
				store={usePreloadedState({
					workspace: {
						mode: "editBlock",
						settings: {
							theme: "light",
							stitchDisplay: "symbol",
							stitchTipMode: "hover",
							directionsOverlayMode: "simple",
						},
					},
				})}
			>
				<Story />
			</Provider>
		),
	],
};
