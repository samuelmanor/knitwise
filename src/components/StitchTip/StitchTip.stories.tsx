import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { StitchTip } from "./StitchTip";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme";
import store from "./../../reducers/store";
import { Provider } from "react-redux";
import { stitches } from "../../utils/stitches";
import { usePreloadedState } from "../../reducers/store";

const meta: Meta<typeof StitchTip> = {
	title: "StitchTip",
	component: StitchTip,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider store={store}>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof StitchTip>;

export const onHover: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("appears when hovering over stitch", async () => {
			const stitch = canvas.getByText("\\*");
			expect(stitch).toBeTruthy();

			await userEvent.hover(stitch);

			const tip = canvas.getByTestId("stitch-tip");
			expect(tip).toBeTruthy();

			await userEvent.unhover(stitch);

			expect(tip).not.toBeInTheDocument();
		});
	},
	args: {
		name: stitches._1x1lpc.name,
		description: stitches._1x1lpc.description,
		children: <>\*</>,
	},
};

export const onClick: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);

		await step("appears when clicking on stitch", async () => {
			const stitch = canvas.getByText("\\*");
			expect(stitch).toBeTruthy();

			await userEvent.click(stitch);

			const tip = canvas.getByTestId("stitch-tip");
			expect(tip).toBeTruthy();

			await userEvent.unhover(stitch);

			expect(tip).not.toBeInTheDocument();
		});
	},
	args: {
		name: stitches._1x1lpc.name,
		description: stitches._1x1lpc.description,
		children: <>\*</>,
	},
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: {
							settings: {
								stitchTipMode: "click",
							},
						},
					})}
				>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};
