// handles things just within a single project like the current row and all the blocks
import { createSlice, current } from "@reduxjs/toolkit";
import { testProject } from "../utils/testProject";

const projectSlice = createSlice({
	name: "project",
	initialState: {
		project: testProject,
		currentRow: 1,
	},
	reducers: {
		removeBlock(state, action) {
			const newState = {
				...state,
				project: {
					...state.project,
					blocks: state.project.blocks.filter((block, index) => index !== action.payload.blockIndex),
				},
			};
			return newState;
		},
		updateBlockRowPosition(state, action) {
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
		updateBlockRowStitches(state, action) {
			const newState = {
				...state,
				project: {
					...state.project,
					blocks: state.project.blocks.map((block, index) => {
						if (index === action.payload.blockIndex) {
							const newBlock = {
								...block,
								stitches: block.stitches.map((row, rowIndex) => {
									if (rowIndex === action.payload.rowIndex) {
										return action.payload.stitches;
									} else {
										return row;
									}
								}),
							};
							return newBlock;
						} else {
							return block;
						}
					}),
				},
			};
			return newState;
		},
		addBlockRow(state, action) {
			const newState = {
				...state,
				project: {
					...state.project,
					blocks: state.project.blocks.map((block, index) => {
						if (index === action.payload.blockIndex) {
							return {
								...block,
								stitches: [
									...block.stitches.slice(0, action.payload.rowIndex + 1),
									[],
									...block.stitches.slice(action.payload.rowIndex + 1),
								],
							};
						} else {
							return block;
						}
					}),
				},
			};
			return newState;
		},
		removeBlockRow(state, action) {
			const newState = {
				...state,
				project: {
					...state.project,
					blocks: state.project.blocks.map((block, index) => {
						if (index === action.payload.blockIndex) {
							const newBlock = {
								...block,
								stitches: block.stitches.filter(
									(row, rowIndex) => rowIndex !== action.payload.rowIndex,
								),
							};
							return newBlock;
						} else {
							return block;
						}
					}),
				},
			};
			return newState;
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

export const {
	removeBlock,
	updateBlockRowPosition,
	updateBlockRowStitches,
	addBlockRow,
	removeBlockRow,
	toNextRow,
	toPrevRow,
	resetProject,
} = projectSlice.actions;

export const nextRow = () => {
	return dispatch => {
		dispatch(updateBlockRowPosition({ direction: "next" }));
		dispatch(toNextRow());
	};
};

export const prevRow = () => {
	return dispatch => {
		dispatch(updateBlockRowPosition({ direction: "previous" }));
		dispatch(toPrevRow());
	};
};

export const reset = () => {
	return dispatch => {
		dispatch(resetProject());
	};
};

export const updateRow = rowInfo => {
	return dispatch => {
		if (rowInfo.stitches.length === 0) {
			dispatch(removeBlockRow(rowInfo));
		} else {
			dispatch(updateBlockRowStitches(rowInfo));
		}
	};
};

export const addRow = rowInfo => {
	return dispatch => {
		dispatch(addBlockRow(rowInfo));
	};
};

// export const addBlock = blockInfo => {
// 	return dispatch => {
// 		dispatch(newBlock(blockInfo));
// 	};
// };

export const deleteBlock = blockInfo => {
	return dispatch => {
		dispatch(removeBlock(blockInfo));
	};
};

export default projectSlice.reducer;
