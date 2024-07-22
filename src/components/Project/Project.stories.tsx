import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Project } from "./Project";
import { Stitch } from "../Stitch";
import { Provider } from "react-redux";

import store from "./../../reducers/store";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Project> = {
	title: "Project",
	component: Project,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	// argTypes: {
	// 	// backgroundColor: { control: 'color' },
	// },
	decorators: [
		Story => (
			<Provider store={store}>
				<Story />
			</Provider>
		),
	],
};

const testKnitStitch = <Stitch name="knit" abbreviation="k" description="knit" width={1} symbol={"*"} />;
const testPurlStitch = <Stitch name="purl" abbreviation="p" description="purl" width={1} symbol={"-"} />;

export const testArgs = {
	stitches: {
		knit: testKnitStitch,
		purl: testPurlStitch,
	},
	rows: {
		row1: [testKnitStitch, testPurlStitch, testKnitStitch],
		row2: [testPurlStitch, testKnitStitch, testPurlStitch],
	},
	blocks: {
		block1: [
			[testKnitStitch, testPurlStitch, testKnitStitch],
			[testPurlStitch, testKnitStitch, testPurlStitch],
			[testKnitStitch, testPurlStitch, testKnitStitch],
		],
		block2: [
			[testPurlStitch, testKnitStitch, testPurlStitch],
			[testKnitStitch, testPurlStitch, testKnitStitch],
			[testPurlStitch, testKnitStitch, testPurlStitch],
		],
	},
};

export default meta;
type Story = StoryObj<typeof Project>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Project/i);
		expect(element).toBeTruthy();
	},
	args: {
		// blocks: [testArgs.blocks.block1, testArgs.blocks.block2, testArgs.blocks.block1],
	},
};
