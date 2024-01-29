import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Stitch } from "./Stitch";
import { Provider } from "react-redux";
import store from "./../../reducers/store";
import { testProject } from "../../utils/testProject";

const meta: Meta<typeof Stitch> = {
	title: "Stitch",
	component: Stitch,
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
type Story = StoryObj<typeof Stitch>;

const knitStitch = testProject.blocks[0].stitches[0][0];
const purlStitch = testProject.blocks[0].stitches[0][1];

export const Knit: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/stitch1knit/i);
		expect(element).toBeTruthy();
	},
	args: {
		...knitStitch,
		index: 1,
	},
};

export const Purl: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/stitch1purl/i);
		expect(element).toBeTruthy();
	},
	args: {
		...purlStitch,
		index: 1,
	},
};
