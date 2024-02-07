// handles things just within a single project like the current row and all the blocks
import { createSlice } from "@reduxjs/toolkit";
import { testProject } from "../utils/testProject";

const projectSlice = createSlice({
	name: "project",
	initialState: {
		project: testProject,
		currentRow: 1,
	},
	reducers: {
		updateBlockRow(state, action) {
			const calculateNextPosition = (blockLength, previousPosition) => {
				if (action.payload.direction === "next") {
					if (previousPosition < blockLength) {
						return previousPosition + 1;
					} else if (previousPosition === blockLength) {
						return 1;
					} else if (previousPosition > blockLength) {
						return previousPosition;
					}
				} else if (action.payload.direction === "previous") {
					if (previousPosition > 1) {
						return previousPosition - 1;
					} else if (previousPosition === 1) {
						return blockLength;
					} else if (previousPosition < 1) {
						return previousPosition;
					}
				}
			};

			return {
				...state,
				project: {
					...state.project,
					blocks: state.project.blocks.map(block => {
						const newBlock = {
							...block,
							currentBlockRow: calculateNextPosition(block.stitches.length, block.currentBlockRow),
						};
						return newBlock;
					}),
				},
			};
		},
		resetProject(state) {
			state.project.blocks.forEach(block => {
				block.currentBlockRow = 1;
			});
		},
		toNextRow(state) {
			state.currentRow++;
		},
		toPrevRow(state) {
			state.currentRow--;
		},
	},
});

export const { updateBlockRow, toNextRow, toPrevRow, resetProject } = projectSlice.actions;

export const nextRow = () => {
	return dispatch => {
		dispatch(updateBlockRow({ direction: "next" }));
		dispatch(toNextRow());
	};
};

export const prevRow = () => {
	return dispatch => {
		dispatch(updateBlockRow({ direction: "previous" }));
		dispatch(toPrevRow());
	};
};

export const reset = () => {
	return dispatch => {
		dispatch(resetProject());
	};
};

export default projectSlice.reducer;
