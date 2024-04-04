// handles things just within a single project like the current row and all the blocks
import { createSlice, current } from "@reduxjs/toolkit";
import { testProject } from "../utils/testProject";
import { stitches } from "../utils/stitches";

const projectSlice = createSlice({
	name: "project",
	initialState: {
		project: testProject,
		currentRow: 1,
	},
	reducers: {
		editBlockName(state, action) {
			return {
				...state,
				project: {
					...state.project,
					blocks: state.project.blocks.map((block, index) => {
						if (index === action.payload.blockIndex) {
							const newBlock = {
								...block,
								blockName: action.payload.blockName,
							};
							return newBlock;
						} else {
							return block;
						}
					}),
				},
			};
		},
		addBlock(state, action) {
			const newBlock = {
				blockName: action.payload.blockName,
				stitches: action.payload.stitches,
				currentBlockRow: 1,
			};

			const newState = {
				...state,
				project: {
					...state.project,
					blocks:
						action.payload.blockIndex === 0
							? [newBlock, ...state.project.blocks]
							: [...state.project.blocks, newBlock],
				},
			};
			return newState;
		},
		deleteBlock(state, action) {
			return {
				...state,
				project: {
					...state.project,
					blocks: state.project.blocks.filter((block, index) => index !== action.payload.blockIndex),
				},
			};
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
						return {
							...block,
							currentBlockRow: calculateNextPosition(block.stitches.length, block.currentBlockRow),
						};
					}),
				},
			};
		},
		updateBlockRowStitches(state, action) {
			return {
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
		},
		addBlockRow(state, action) {
			return {
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
		},
		removeBlockRow(state, action) {
			return {
				...state,
				project: {
					...state.project,
					blocks: state.project.blocks.map((block, index) => {
						if (index === action.payload.blockIndex) {
							return {
								...block,
								stitches: block.stitches.filter(
									(row, rowIndex) => rowIndex !== action.payload.rowIndex,
								),
							};
						} else {
							return block;
						}
					}),
				},
			};
		},
		resetRows(state) {
			state.project.blocks.forEach(block => {
				block.currentBlockRow = 1;
			});
			state.currentRow = 1;
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
	editBlockName,
	addBlock,
	deleteBlock,
	updateBlockRowPosition,
	updateBlockRowStitches,
	addBlockRow,
	removeBlockRow,
	toNextRow,
	toPrevRow,
	resetRows,
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

export const updateRow = rowInfo => {
	return dispatch => {
		if (rowInfo.stitches.length === 0) {
			dispatch(removeBlockRow(rowInfo));
		} else {
			dispatch(updateBlockRowStitches(rowInfo));
		}
	};
};

export default projectSlice.reducer;
