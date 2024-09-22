import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { SettingsMenu } from "./SettingsMenu";
import { Provider } from "react-redux";
import store from "./../../reducers/store";
import { ThemeProvider, createTheme } from "@mui/material";
import { lightTheme } from "../../theme";

const meta: Meta<typeof SettingsMenu> = {
	title: "SettingsMenu",
	component: SettingsMenu,
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
type Story = StoryObj<typeof SettingsMenu>;

export const Primary: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByText(/Settings/i);
		expect(element).toBeTruthy();

		await step("resetting row/project", async () => {
			const resetRowCountButton = canvas.getByTestId(/reset-row-count-btn/i);
			expect(resetRowCountButton).toBeTruthy();

			await userEvent.click(resetRowCountButton);

			await step("warning dialog appears", async () => {
				const warningDialog = canvas.getByTestId(/reset-warning-dialog/i);
				expect(warningDialog).toBeTruthy();
			});

			await step("all settings buttons are disabled", async () => {
				const themeControl = canvas.getAllByRole("radiogroup");
				themeControl.forEach(control => {
					control.childNodes.forEach(child => {
						expect(child).toHaveClass("Mui-disabled");
					});
				});
			});

			await step("canceling warning dialog", async () => {
				const cancelButton = canvas.getByText(/no, cancel/i);
				expect(cancelButton).toBeTruthy();

				await userEvent.click(cancelButton);

				const warningDialog = canvas.queryByTestId(/reset-warning-dialog/i);
				expect(warningDialog).toBeNull();
			});
		});
	},
};
