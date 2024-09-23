import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { Workspace } from "./Workspace";
import { createTheme, ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme";
import { Provider } from "react-redux";
import { usePreloadedState } from "../../reducers/store";
import { testProject } from "../../utils/testProject";

const meta: Meta<typeof Workspace> = {
	title: "Workspace",
	component: Workspace,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider store={usePreloadedState(testProject)}>
					<Story />
				</Provider>
			</ThemeProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Workspace>;

export const Chart: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Workspace/i);
		expect(element).toBeTruthy();
	},
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: {
							...testProject,
							settings: {
								showWelcome: false,
								showTutorial: false,
								...testProject.settings,
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

export const Welcome: Story = {
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: {
							...testProject,
							settings: {
								showWelcome: true,
								showTutorial: false,
								...testProject.settings,
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

export const Tutorial: Story = {
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(lightTheme)}>
				<Provider
					store={usePreloadedState({
						project: {
							...testProject,
							settings: {
								showWelcome: false,
								showTutorial: true,
								...testProject.settings,
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
