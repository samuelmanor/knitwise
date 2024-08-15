import { EditOutlined, SaveOutlined } from "@mui/icons-material";
import { ClickAwayListener, Grid, IconButton, TextField, Tooltip, useTheme } from "@mui/material";
import { FC, useState } from "react";

interface NameEditorProps {
	name: string;
	onSave: (name: string) => void;
	type?: "block" | "project";
	disabled?: boolean;
}

export const NameEditor: FC<NameEditorProps> = ({ name, onSave, type, disabled }) => {
	const [editing, setEditing] = useState(false);
	const [nameDraft, setNameDraft] = useState(name);

	const theme = useTheme();

	const checkInput = () => {
		if (nameDraft.length === 0) {
			return "name must be at least 1 character long";
		} else if (nameDraft.length > 30) {
			return "name must be less than 30 characters long";
		} else {
			return "";
		}
	};

	const handleSave = () => {
		if (checkInput().length > 0) {
			console.log("NameEditor: handleSave: invalid input");
			// todo: add warning box
			return;
		}
		onSave(nameDraft);
		setEditing(false);
	};

	const handleEditName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNameDraft(e.target.value);
	};

	const handleClickAway = () => {
		if (name === nameDraft) {
			setEditing(false);
		} else {
			handleSave();
		}
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Grid
				container
				sx={{
					alignItems: type === "project" ? "center" : "flex-end",
					flexWrap: "nowrap",
					justifyContent: "space-between",
					maxWidth: "500px",
					width: type === "project" ? "50vw" : "70%",
				}}
			>
				<Grid item>
					<TextField
						data-testid={`name-editor-${type === undefined ? "block" : type}`}
						inputRef={input => input && editing && input.focus()}
						value={nameDraft}
						onChange={handleEditName}
						variant="standard"
						helperText={checkInput()}
						sx={{
							input: {
								cursor: editing ? "text" : "default",
								height: "fit-content",
								p: 0,
								textOverflow: "ellipsis",
								fontSize: type === "project" ? "3.8rem" : "1.5rem",
								color: type === "project" ? theme.palette.text.secondary : theme.palette.text.primary,
								fontWeight: type === "project" ? "light" : "default",
								mb: type === "project" ? "-14px" : 0,
							},
						}}
						InputProps={{
							readOnly: !editing,
							disableUnderline: true,
							style: {
								border: "none",
								borderBottom: type !== "project" ? `2px solid ${theme.palette.primary.main}` : null,
							},
						}}
						FormHelperTextProps={{ sx: { color: theme.palette.text.primary, letterSpacing: "1px" } }}
					/>
				</Grid>
				<Grid item>
					<Tooltip
						title={`${editing ? "save" : "edit"} ${type !== "project" ? "block" : type} name`}
						placement={type === "project" ? "top" : "right"}
						componentsProps={{
							tooltip: {
								sx: {
									color: theme.palette.primary.main,
									fontSize: "1.2rem",
								},
							},
						}}
						PopperProps={{
							modifiers: [
								{
									name: "offset",
									options: {
										offset: type === "project" ? [0, 0] : [0, -15],
									},
								},
							],
							disablePortal: true,
							popperOptions: {
								modifiers: [
									{
										name: "preventOverflow",
										options: {
											altAxis: true,
											rootBoundary: "window",
										},
									},
									{
										name: "flip",
										enabled: false,
									},
								],
							},
						}}
					>
						<IconButton
							onClick={() => (editing ? handleSave() : setEditing(true))}
							sx={{
								color: type === "project" ? theme.palette.text.secondary : theme.palette.primary.main,
							}}
							disabled={disabled}
						>
							{editing ? <SaveOutlined fontSize="large" /> : <EditOutlined fontSize="large" />}
						</IconButton>
					</Tooltip>
				</Grid>
			</Grid>
		</ClickAwayListener>
	);
};
