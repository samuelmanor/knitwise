import { FC, useState } from "react";
import { Block } from "../Block/Block";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "../Row";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@mui/icons-material";
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

	const rows = block.stitches.map((row, i) => {
		return (
			<Grid container key={i}>
				<Grid item>
					<Typography>{i + 1}</Typography>
				</Grid>
				<Grid item onClick={() => console.log("kasdjf;sakd", row)}>
					{draftRow === i ? <div>draft row</div> : <Row row={row} />}
				</Grid>
				{draftRow === i ? (
					<IconButton onClick={() => handleRowEdit(i)}>
						<SaveOutlined />
					</IconButton>
				) : (
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
					</Grid>
				)}
			</Grid>
		);
	});

	return (
		<Grid container onClick={() => console.log(block)}>
			<Grid item>
				{/* <Block index={blockIndex} {...block} /> */}
				{rows}
				{block.stitches.length < 10 ? <Button>add row</Button> : null}
			</Grid>
			<Grid item>
				<Button onClick={closeEditor}>close</Button>
			</Grid>
		</Grid>
	);
};
