import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { Stitch } from "./Stitch";
import { Provider } from "react-redux";
import { stitches } from "../../utils/stitches";
import { usePreloadedState } from "../../reducers/store";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme";
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
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: testProject,
					})}
				>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Stitch>;

export const SingleWidthStitch: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/stitch1k/i);
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
		const element = canvas.getByTestId("stitch11/1lc");
		expect(element).toBeTruthy();
	},
	args: {
		...stitches._1x1lc,
		index: 1,
	},
};
