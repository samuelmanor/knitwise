import { FC, useState } from "react";
import { BlockProps } from "../Block/Block";
import { Box, Grid, IconButton, useTheme } from "@mui/material";
import { SortableList } from "../Sortable/SortableList";
import { Row } from "../Row";
import { EditOutlined, SwapVertOutlined } from "@mui/icons-material";

interface BlockEditorProps {
	block: BlockProps;
	blockIndex: number;
	finishEditing: (index: number | null) => void; // null closes editor, number saves changes to block of that index
}

export const BlockEditor: FC<BlockEditorProps> = ({ block, blockIndex, finishEditing }) => {
	const [draftRow, setDraftRow] = useState<number | null>(null);
	const theme = useTheme();

	return (
		<Grid container sx={{ flexDirection: "column" }}>
			<Grid item>{block.blockName}</Grid>
			<Grid
				item
				sx={{
					display: "flex",
					flexDirection: "column-reverse",
					gap: 1,
				}}
			>
				{draftRow === null ? (
					<SortableList
						items={block.stitches.map((item, i) => ({
							id: i + 1,
							item: (
								<Row
									stitches={item}
									editingBlock={true}
									rowIndex={i}
									blockIndex={blockIndex}
									draftRow={draftRow}
									setDraftRow={setDraftRow}
								/>
							),
						}))}
						direction="vertical"
					/>
				) : (
					block.stitches.map((row, i) => {
						return (
							<Row
								stitches={row}
								editingBlock={true}
								rowIndex={i}
								blockIndex={blockIndex}
								draftRow={draftRow}
								setDraftRow={setDraftRow}
								key={`row${block.blockName}${i}`}
							/>
						);
					})
				)}
			</Grid>
			{/* disable this if any kind of editing is happening */}
			<Grid item onClick={() => finishEditing(null)}>
				close
			</Grid>
		</Grid>
	);
};

/*

	// this block is being edited
	if (mode === "editBlock" && draftBlockIndex === index) {
		// move name field editor to here?
		return (
			<Grid
				container
				sx={{
					flexDirection: "row",
					flexWrap: "nowrap",
					gap: 8,
				}}
			>
				<Grid item>
					<BlockContainer>
						<SortableList
							items={stitches.map((item, i) => ({
								id: i + 1,
								item: (
									<Row
										key={`row${blockName}${i}`}
										stitches={item}
										highlightRow={currentBlockRow - 1 === i}
										editingBlock={draftBlockIndex === index}
										rowIndex={i}
										blockIndex={index}
										draftRow={draftRow}
										setDraftRow={setDraftRow}
									/>
								),
							}))}
							direction="vertical"
						/>
					</BlockContainer>
				</Grid>
				<Grid container sx={{ border: "2px solid blue", flexDirection: "column", flexWrap: "nowrap" }}>
					<Grid
						container
						sx={{ border: "2px solid red", height: "fit-content", justifyContent: "space-between", gap: 3 }}
					>
						<Grid item>
							<Typography variant="h5">
								{draftRow === null ? blockName : `${blockName}, row ${draftRow + 1}`}
							</Typography>
						</Grid>
						<Grid item>
							{handleEditBlock !== null && draftRow === null ? (
								<IconButton onClick={() => handleEditBlock(null)}>
									<CloseOutlined />
								</IconButton>
							) : null}
						</Grid>
					</Grid>
					<Grid container sx={{ border: "2px solid green", height: "100%" }}>
						<Search content="stitches" select={() => console.log("stitch select")} />
					</Grid>
				</Grid>
			</Grid>
		);
	}
  */
