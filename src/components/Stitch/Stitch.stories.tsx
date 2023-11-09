import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Stitch } from "./Stitch";
import { StitchIcon } from "../StitchIcon/StitchIcon";

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

{
	/* <svg width="53" height="40" viewBox="0 0 53 40" fill="none">
  <ellipse cx="18.9254" cy="20.2344" rx="9.93357" ry="17.1914" transform="rotate(-37.075 18.9254 20.2344)" fill="#D9D9D9"/>
  <ellipse cx="9.93357" cy="17.1914" rx="9.93357" ry="17.1914" transform="matrix(-0.797847 -0.60286 -0.60286 0.797847 52.2149 12.5068)" fill="#D9D9D9"/>
</svg> */
}

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
		name: stitches.knit.name,
		abbreviation: stitches.knit.abbreviation,
		description: stitches.knit.description,
		icon: <StitchIcon stitchName="knit" />,
		width: stitches.knit.width,
	},
};

export const Purl: Story = {
	args: {
		name: stitches.purl.name,
		abbreviation: stitches.purl.abbreviation,
		description: stitches.purl.description,
		icon: <StitchIcon stitchName="purl" />,
		width: stitches.purl.width,
	},
};
