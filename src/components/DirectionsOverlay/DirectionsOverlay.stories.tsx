import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { DirectionsOverlay } from "./DirectionsOverlay";
import { usePreloadedState } from "../../reducers/store";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme";
import { Provider } from "react-redux";
import { testProject } from "../../utils/testProject";
import { Row } from "../Row";

const meta: Meta<typeof DirectionsOverlay> = {
	title: "DirectionsOverlay",
	component: DirectionsOverlay,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: {
							...testProject,
							blocks: [testProject.blocks[0]],
						},
					})}
				>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof DirectionsOverlay>;

export const WithRightSideMarker: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/DirectionsOverlay/i);
		expect(element).toBeTruthy();
	},
	args: {
		blockIndex: 0,
		rowIndex: 0,
		children: <Row blockIndex={0} rowIndex={0} stitches={testProject.blocks[0].stitches[0]} editingBlock={false} />,
	},
};

export const WithWrongSideMarker: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/DirectionsOverlay/i);
		expect(element).toBeTruthy();
	},
	args: {
		blockIndex: 0,
		rowIndex: 1,
		children: <Row blockIndex={0} rowIndex={0} stitches={testProject.blocks[0].stitches[1]} editingBlock={false} />,
	},
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: {
							...testProject,
							currentProjectRow: 2,
						},
					})}
				>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};
