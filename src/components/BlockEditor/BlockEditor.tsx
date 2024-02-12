import { FC, useState } from "react";
import { Block } from "../Block/Block";
import { Button, ClickAwayListener, Grid, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "../Row";
import { AddOutlined, Close, DeleteOutlined, EditOutlined, SaveOutlined } from "@mui/icons-material";
import { updateRow } from "../../reducers/projectReducer";

interface BlockEditorProps {
	blockIndex: number;
	closeEditor: () => void;
}

export const BlockEditor: FC<BlockEditorProps> = ({ blockIndex, closeEditor }) => {
	const block = useSelector((state: any) => state.projects.project.blocks[blockIndex]);
	const [draftRow, setDraftRow] = useState(-1);

	const dispatch = useDispatch();

	const handleRowEdit = (rowIndex: number) => {
		setDraftRow(-1);
		dispatch(updateRow({ blockIndex, rowIndex, stitches: [] })); // todo: add stitches to editor
	};

	const deleteRow = (rowIndex: number) => {
		setDraftRow(-1);
		dispatch(updateRow({ blockIndex, rowIndex, stitches: [] }));
	};

	const addRowButton = (
		<IconButton onClick={() => console.log("add ")}>
			<AddOutlined />
		</IconButton>
	);

	const rows = block.stitches.map((row, i) => {
		return (
			<Grid container key={i}>
				<Grid item>
					<Typography>{i + 1}</Typography>
				</Grid>
				<Grid item onClick={() => console.log("kasdjf;sakd", row)}>
					{draftRow === i ? (
						<ClickAwayListener onClickAway={() => setDraftRow(-1)}>
							<div>draft row</div>
						</ClickAwayListener>
					) : (
						<Row row={row} />
					)}
				</Grid>
				{draftRow === i ? (
					<Grid container>
						<IconButton onClick={() => handleRowEdit(i)}>
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
								<IconButton onClick={() => deleteRow(i)}>
									<DeleteOutlined />
								</IconButton>
							</Grid>
							{draftRow === -1 ? <Grid container>{addRowButton}</Grid> : null}
						</Grid>
					</Grid>
				)}
			</Grid>
		);
	});

	return (
		<Grid container onClick={() => console.log(block)}>
			<Grid item>{rows}</Grid>
			<Grid item>
				<Button onClick={closeEditor}>close</Button>
			</Grid>
		</Grid>
	);
};
