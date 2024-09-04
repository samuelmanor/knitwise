// handles things just within a single project like the current row and all the blocks
import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
	name: "project",
	initialState: {
		// projectName: "test project 1",
		// currentProjectRow: 1,
		// blocks: testProject.blocks,
		// mode: "chart", // "edit" | "editBlock"
		// settings: {
		// 	theme: "system", // | "light" | "dark"
		// 	stitchDisplay: "symbol", // | "abbreviation"
		// 	stitchTipMode: "hover", // | "click"
		// 	directionsOverlayMode: "simple", // | "detailed" | "none"
		// 	showDeleteRowConfirmation: true,
		// 	showDeleteBlockConfirmation: true,
		// 	autoCloseStitchMenu: true,
		// },
		projectName: "",
		currentProjectRow: 1,
		blocks: [],
		mode: "chart", // "edit" | "editBlock"
		settings: {
			theme: "system", // | "light" | "dark"
			stitchDisplay: "symbol", // | "abbreviation"
			stitchTipMode: "hover", // | "click"
			directionsOverlayMode: "simple", // | "detailed" | "none"
			showDeleteRowConfirmation: true,
			showDeleteBlockConfirmation: true,
			autoCloseStitchMenu: true,
			showTutorial: false,
			showWelcome: true,
		},
	},
	reducers: {
		initializeProject(state, action) {
			return {
				...state,
				projectName: action.payload.projectName,
				blocks: action.payload.blocks,
				currentProjectRow: action.payload.currentProjectRow,
				mode: action.payload.mode,
				settings: action.payload.settings,
			};
		},
		setMode(state, action) {
			state.mode = action.payload;
		},
		changeSetting(state, action) {
			state.settings[action.payload.setting] = action.payload.value;
		},
		// save to browser storage
		editProjectName(state, action) {
			return {
				...state,
				projectName: action.payload,
			};
		},
		editBlockName(state, action) {
			return {
				...state,
				blocks: state.blocks.map((block, index) => {
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
			};
		},
		reorderBlocks(state, action) {
			return {
				...state,
				blocks: action.payload,
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
				blocks: [...state.blocks, newBlock],
			};
			return newState;
		},
		deleteBlock(state, action) {
			return {
				...state,
				blocks: state.blocks.filter((block, index) => index !== action.payload.blockIndex),
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
				blocks: state.blocks.map(block => {
					return {
						...block,
						currentBlockRow: calculateNextPosition(block.stitches.length, block.currentBlockRow),
					};
				}),
			};
		},
		updateBlockRowStitches(state, action) {
			return {
				...state,
				blocks: state.blocks.map((block, index) => {
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
			};
		},
		removeEmptyBlockRows(state, action) {
			return {
				...state,
				blocks: state.blocks.map((block, index) => {
					if (index === action.payload.blockIndex) {
						return {
							...block,
							stitches: block.stitches.filter(row => row.length > 0),
						};
					} else {
						return block;
					}
				}),
			};
		},
		addBlockRow(state, action) {
			return {
				...state,
				blocks: state.blocks.map((block, index) => {
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
			};
		},
		removeBlockRow(state, action) {
			return {
				...state,
				blocks: state.blocks.map((block, index) => {
					if (index === action.payload.blockIndex) {
						return {
							...block,
							stitches: block.stitches.filter((row, rowIndex) => rowIndex !== action.payload.rowIndex),
						};
					} else {
						return block;
					}
				}),
			};
		},
		reorderRows(state, action) {
			return {
				...state,
				blocks: state.blocks.map((block, index) => {
					if (index === action.payload.blockIndex) {
						return {
							...block,
							stitches: action.payload.stitches,
						};
					} else {
						return block;
					}
				}),
			};
		},
		resetRows(state) {
			state.blocks.forEach(block => {
				block.currentBlockRow = 1;
			});
			state.currentRow = 1;
			console.log("test");
		},
		resetProject(state) {
			state.blocks = [];
			state.currentProjectRow = 1;
			state.projectName = "new project";
		},
		toNextRow(state) {
			state.currentProjectRow++;
		},
		toPrevRow(state) {
			state.currentProjectRow--;
		},
	},
});

export const {
	initializeProject,
	setMode,
	changeSetting,
	editProjectName,
	editBlockName,
	reorderBlocks,
	addBlock,
	deleteBlock,
	updateBlockRowPosition,
	updateBlockRowStitches,
	removeEmptyBlockRows,
	addBlockRow,
	removeBlockRow,
	reorderRows,
	toNextRow,
	toPrevRow,
	resetRows,
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
