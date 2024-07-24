import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Stitch } from "./Stitch";
import { Provider } from "react-redux";
import store from "./../../reducers/store";
import { stitches } from "../../utils/stitches";

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

export const SingleWidthStitch: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/stitch1knit/i);
		expect(element).toBeTruthy();
	},
	args: {
		...stitches.k,
		index: 1,
	},
};

export const MultiWidthStitch: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/stitch1knit/i);
		expect(element).toBeTruthy();
	},
	args: {
		...stitches._1x1lc,
		index: 1,
	},
};
