import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { RowMarker } from "./RowMarker";
import { Row } from "../Row/Row";
import { testArgs } from "../Project/Project.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof RowMarker> = {
	title: "RowMarker",
	component: RowMarker,
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
type Story = StoryObj<typeof RowMarker>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const RSRow: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/rowmarkerright/i);
		expect(element).toBeTruthy();
	},
	args: {
		position: "right",
	},
};

export const WSRow: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/rowmarkerleft/i);
		expect(element).toBeTruthy();
	},
	args: {
		position: "left",
	},
};
