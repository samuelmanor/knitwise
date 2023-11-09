import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { StitchTip } from "./StitchTip";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof StitchTip> = {
	title: "StitchTip",
	component: StitchTip,
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
type Story = StoryObj<typeof StitchTip>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/StitchTip/i);
		expect(element).toBeTruthy();
	},
	args: {
		// label: 'StitchTip',
		name: "test name",
		abbreviation: "test abbreviation",
		description: "test description",
		children: <div>test</div>,
	},
};
