import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Workspace } from "./Workspace";
import { Project } from "../Project";
import { testArgs } from "../Project/Project.stories";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Workspace> = {
	title: "Workspace",
	component: Workspace,
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

const testProject = [
	// the project
	[
		// the blocks
		[
			// the rows
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 }, // block 1 row 1 stitch 1
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 }, // block 1 row 1 stitch 2
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 }, // block 1 row 1 stitch 3
		],
		[
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 }, // block 1 row 2 stitch 1
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 }, // block 1 row 2 stitch 2
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 }, // block 1 row 2 stitch 3
		],
		[
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 }, // block 1 row 3 stitch 1
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 },
		],
	],
	[
		[
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 }, // block 2 row 1 stitch 1
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 },
		],
		[
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 },
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
		],
		[
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 },
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 },
		],

		[
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 },
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
		],
	],
	[
		[
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 }, // block 3 row 1 stitch 1
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 },
		],
		[
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 },
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
		],
		[
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 },
			{ name: "purl", abbreviation: "p", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", description: "knit 1", width: 1 },
		],
	],
];

export default meta;
type Story = StoryObj<typeof Workspace>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Workspace/i);
		expect(element).toBeTruthy();
	},
	args: {
		// project: <Project blocks={[testArgs.blocks.block1, testArgs.blocks.block2, testArgs.blocks.block1]} />,
		// project: [testArgs.blocks.block1, testArgs.blocks.block2, testArgs.blocks.block1],
		project: testProject,
	},
};
