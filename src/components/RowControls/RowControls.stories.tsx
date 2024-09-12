import { Meta, StoryObj } from "@storybook/react";

import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { RowControls } from "./RowControls";
import { usePreloadedState } from "../../reducers/store";
import { createTheme, ThemeProvider } from "@mui/material";
import { darkTheme } from "../../theme";
import { Provider } from "react-redux";
import { testProject } from "../../utils/testProject";

const meta: Meta<typeof RowControls> = {
	title: "RowControls",
	component: RowControls,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		Story => (
			<ThemeProvider theme={createTheme(darkTheme)}>
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
type Story = StoryObj<typeof RowControls>;

export const Primary: Story = {
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/RowControls/i);
		expect(element).toBeTruthy();

		await step("next row button moves to next row", async () => {
			const currentRow = canvas.getByTestId(/currentRowNumber/i);
			expect(currentRow).toBeTruthy();
			expect(currentRow.textContent).toBe("1");

			const nextRowBtn = canvas.getByTestId(/nextRowButton/i);
			expect(nextRowBtn).toBeTruthy();
			await userEvent.click(nextRowBtn);

			expect(currentRow.textContent).toBe("2");
		});

		await step("previous row button moves to previous row", async () => {
			const currentRow = canvas.getByTestId(/currentRowNumber/i);
			expect(currentRow).toBeTruthy();
			expect(currentRow.textContent).toBe("2");

			const previousRowBtn = canvas.getByTestId(/previousRowButton/i);
			expect(previousRowBtn).toBeTruthy();
			await userEvent.click(previousRowBtn);

			expect(currentRow.textContent).toBe("1");
		});
	},
};
