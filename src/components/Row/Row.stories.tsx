import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Row } from "./Row";
import { Provider } from "react-redux";
import store from "./../../reducers/store";
import { testProject } from "../../utils/testProject";

const meta: Meta<typeof Row> = {
	title: "Row",
	component: Row,
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
type Story = StoryObj<typeof Row>;

export const Primary: Story = {
	// this row is not being worked or edited
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/row0/i);
		expect(element).toBeTruthy();
	},
	args: {
		stitches: testProject.blocks[0].stitches[0],
		highlightRow: false,
		rowIndex: 0,
		blockIndex: 0,
		editingBlock: false,
		draftRow: null,
		setDraftRow: () => {},
	},
};

export const BeingWorked: Story = {
	// when the user is working the row (in chart mode)
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/row0/i);
		expect(element).toBeTruthy();
		const directionsOverlay = canvas.getByTestId(/directionsOverlay0/i);
		expect(directionsOverlay).toBeTruthy();
	},
	args: {
		stitches: testProject.blocks[0].stitches[0],
		highlightRow: true,
		rowIndex: 0,
		blockIndex: 0,
		editingBlock: false,
		draftRow: null,
		setDraftRow: () => {},
	},
};

export const EditingBlock: Story = {
	// when the user is editing the block that contains the row, but not the row itself
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/row0/i);
		expect(element).toBeTruthy();
	},
	args: {
		stitches: testProject.blocks[0].stitches[0],
		highlightRow: false,
		rowIndex: 0,
		blockIndex: 0,
		editingBlock: true,
		draftRow: null,
		setDraftRow: () => {},
	},
};

export const EditingRow: Story = {
	// when the user is editing the row
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/editingRow0/i);
		expect(element).toBeTruthy();

		const saveButton = canvas.getByTestId(/saveRow0/i);
		expect(saveButton).toBeTruthy();
	},
	args: {
		stitches: testProject.blocks[0].stitches[0],
		highlightRow: false,
		rowIndex: 0,
		blockIndex: 0,
		editingBlock: true,
		draftRow: 0,
		setDraftRow: () => {},
	},
};
