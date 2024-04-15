import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Block } from "./Block";
import { Provider } from "react-redux";
import store from "./../../reducers/store";
import { testProject } from "../../utils/testProject";

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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/block1/i);
		expect(element).toBeTruthy();
	},
	args: {
		// stitches: [
		// 	testProject.blocks[0].stitches[0],
		// 	testProject.blocks[0].stitches[1],
		// 	testProject.blocks[0].stitches[0],
		// ],
		index: 1,
		// blockName: "block1",
		tallestBlockIndex: 1,
	},
};
