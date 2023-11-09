import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { StitchIcon } from "./StitchIcon";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof StitchIcon> = {
	title: "StitchIcon",
	component: StitchIcon,
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
type Story = StoryObj<typeof StitchIcon>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Knit: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/knit/i);
		expect(element).toBeTruthy();
	},
	args: {
		stitchName: "k",
		color: "red",
	},
};

export const Purl: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/purl/i);
		expect(element).toBeTruthy();
	},
	args: {
		stitchName: "p",
		color: "blue",
	},
};
