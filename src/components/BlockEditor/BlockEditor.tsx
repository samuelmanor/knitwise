import { FC, useState } from "react";
import { Block } from "../Block/Block";
import { Button, ClickAwayListener, Grid, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "../Row";
import { AddOutlined, Close, DeleteOutlined, EditOutlined, SaveOutlined } from "@mui/icons-material";
import { updateRow, addBlockRow } from "../../reducers/projectReducer";
import { RowEditor } from "../RowEditor";

interface BlockEditorProps {
	blockIndex: number;
	closeEditor: () => void;
}

export const BlockEditor: FC<BlockEditorProps> = ({ blockIndex, closeEditor }) => {
	const block = useSelector((state: any) => state.projects.project.blocks[blockIndex]);
	const [draftRow, setDraftRow] = useState(-1);

	const dispatch = useDispatch();

	// todo: write func to double check the stitch widths add up correctly row by row before the user closes block edit

	const handleAddRow = (rowIndex: number) => {
		dispatch(addBlockRow({ blockIndex, rowIndex }));
	};

	const handleDeleteRow = (rowIndex: number) => {
		setDraftRow(-1);
		dispatch(updateRow({ blockIndex, rowIndex, stitches: [] }));
	};

	const rows = block.stitches.map((row, i) => {
		return (
			<Grid container key={i}>
				<Grid item>
					<Typography>{i + 1}</Typography>
				</Grid>
				<Grid item>
					{draftRow === i ? (
						<ClickAwayListener onClickAway={() => setDraftRow(-1)}>
							<RowEditor row={block.stitches[draftRow]} blockIndex={blockIndex} rowIndex={i} />
						</ClickAwayListener>
					) : (
						<Row row={row} />
					)}
				</Grid>
				{draftRow === i ? (
					<Grid container>
						<IconButton onClick={() => setDraftRow(-1)}>
							<SaveOutlined />
						</IconButton>
						<IconButton onClick={() => setDraftRow(-1)}>
							<Close />
						</IconButton>
					</Grid>
				) : (
					<Grid container>
						<Grid container>
							<Grid item>
								<IconButton onClick={() => setDraftRow(i)}>
									<EditOutlined />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton onClick={() => handleDeleteRow(i)}>
									<DeleteOutlined />
								</IconButton>
							</Grid>
							{draftRow === -1 ? (
								<Grid container>
									<IconButton onClick={() => handleAddRow(i)}>
										<AddOutlined />
									</IconButton>
								</Grid>
							) : null}
						</Grid>
					</Grid>
				)}
			</Grid>
		);
	});

	return (
		<Grid container>
			<Grid item>{rows}</Grid>
			{block.stitches.length === 0 ? (
				<Grid container sx={{ flexDirection: "column" }}>
					<Grid item>
						<Typography>this block doesn't have any rows added yet. click below to add one!</Typography>
					</Grid>
					<Grid item>
						<IconButton onClick={() => handleAddRow(0)}>
							<AddOutlined />
						</IconButton>
					</Grid>
				</Grid>
			) : null}
			<Grid item>
				<Button onClick={closeEditor}>close</Button>
			</Grid>
		</Grid>
	);
};
