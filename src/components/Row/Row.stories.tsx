import { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { Row } from "./Row";
import { Provider } from "react-redux";
import { testProject } from "../../utils/testProject";
import { usePreloadedState } from "../../reducers/store";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "../../theme";
import { createTheme } from "@mui/material";

const meta: Meta<typeof Row> = {
	title: "Row",
	component: Row,
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
type Story = StoryObj<typeof Row>;

export const Primary: Story = {
	// this row is not being worked or edited
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/row0/i);
		expect(element).toBeTruthy();

		await step("row is not highlighted", async () => {
			expect(element).not.toHaveStyle("background-color: rgb(148, 168, 179)");
		});

		await step("directions overlay is not visible", async () => {
			const directionsOverlay = canvas.queryByTestId(/directionsOverlay0/i);
			expect(directionsOverlay).toBeNull();
		});

		await step("edit buttons are not visible", async () => {
			const editButton = canvas.queryByTestId(/editBtn0/i);
			expect(editButton).toBeNull();

			const sortButton = canvas.queryByTestId(/sortBtn0/i);
			expect(sortButton).toBeNull();
		});
	},
	args: {
		stitches: testProject.blocks[0].stitches[0],
		highlightRow: false,
		rowIndex: 0,
		blockIndex: 0,
		editingBlock: false,
		draftRow: null,
		setDraftRow: () => {},
	},
};

export const BeingWorked: Story = {
	// when the user is working the row (in chart mode)
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/row0/i);
		expect(element).toBeTruthy();

		await step("row is highlighted", async () => {
			expect(element).toHaveStyle("background-color: rgb(148, 168, 179)");
		});

		await step("stitch tips are visible", async () => {
			const purlStitch = canvas.getByTestId(/stitch0p/i);
			expect(purlStitch).toBeTruthy();

			await userEvent.hover(purlStitch);
			const purlTip = canvas.getByText(/purl/i);
			expect(purlTip).toBeVisible();
		});
	},
	args: {
		stitches: testProject.blocks[0].stitches[0],
		highlightRow: true,
		rowIndex: 0,
		blockIndex: 0,
		editingBlock: false,
		draftRow: null,
		setDraftRow: () => {},
	},
};

export const EditingBlock: Story = {
	// when the user is editing the block that contains the row, but not the row itself
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/row0/i);
		expect(element).toBeTruthy();

		await step("edit button is visible", async () => {
			const editButton = canvas.getByTestId(/editBtn0/i);
			expect(editButton).toBeTruthy();
		});

		await step("stitch tips are not visible", async () => {
			const purlStitch = canvas.getByTestId(/stitch0p/i);
			expect(purlStitch).toBeTruthy();

			await userEvent.hover(purlStitch);
			const purlTip = canvas.queryByText(/purl/i);
			expect(purlTip).toBeNull();
		});
	},
	args: {
		stitches: testProject.blocks[0].stitches[0],
		highlightRow: false,
		rowIndex: 0,
		blockIndex: 0,
		editingBlock: true,
		draftRow: null,
		setDraftRow: () => {},
	},
};

export const EditingRow: Story = {
	// when the user is editing the row
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const element = canvas.getByTestId(/editingRow0/i);
		expect(element).toBeTruthy();

		await step("stitch menu can be opened", async () => {
			const addButton = canvas.getByTestId(/addBtn0/i);
			expect(addButton).toBeVisible();

			await userEvent.click(addButton);
			const stitchMenu = canvas.getByTestId(/stitchSelect0/i);
			expect(stitchMenu).toBeVisible();
		});

		await step("a stitch can be added", async () => {
			const knitStitch = canvas.getByText("*");
			await userEvent.click(knitStitch);

			// stitch menu should close after a stitch is selected
			const stitchMenu = canvas.queryByTestId(/stitchSelect0/i);
			expect(stitchMenu).toBeNull();
		});
	},
	args: {
		stitches: testProject.blocks[0].stitches[0],
		highlightRow: false,
		rowIndex: 0,
		blockIndex: 0,
		editingBlock: true,
		draftRow: 0,
		setDraftRow: () => {},
	},
};
