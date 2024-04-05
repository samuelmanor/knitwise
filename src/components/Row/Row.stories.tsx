import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Row } from "./Row";
import { Provider } from "react-redux";
import store from "./../../reducers/store";
import { testProject } from "../../utils/testProject";

const meta: Meta<typeof Row> = {
	title: "Row",
	component: Row,
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
type Story = StoryObj<typeof Row>;

export const Primary: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/row1/i);
		expect(element).toBeTruthy();
	},
	args: {
		stitches: [
			testProject.blocks[0].stitches[0][0],
			testProject.blocks[0].stitches[0][1],
			testProject.blocks[0].stitches[0][0],
		],
		highlightRow: true,
		rowIndex: 1,
	},
};
