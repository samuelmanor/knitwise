import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Stitch } from "./Stitch";

import stitches from "../../../stitches";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Stitch> = {
	title: "Stitch",
	component: Stitch,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		// backgroundColor: { control: 'color' },
	},
};

export default meta;
type Story = StoryObj<typeof Stitch>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Knit: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Stitch/i);
		expect(element).toBeTruthy();
	},
	args: {
		name: "knit",
		abbreviation: stitches.k.abbreviation,
		description: stitches.k.description,
		width: stitches.k.width,
	},
};

export const Purl: Story = {
	args: {
		name: "purl",
		abbreviation: stitches.p.abbreviation,
		description: stitches.p.description,
		width: stitches.p.width,
	},
};
