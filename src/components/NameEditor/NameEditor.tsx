import { EditOutlined, SaveOutlined } from "@mui/icons-material";
import { ClickAwayListener, IconButton, TextField, Tooltip, useTheme } from "@mui/material";
import { FC, useState } from "react";

interface NameEditorProps {
	name: string;
	onSave: (name: string) => void;
	type?: "block" | "project";
}

export const NameEditor: FC<NameEditorProps> = ({ name, onSave, type }) => {
	const [editing, setEditing] = useState(false);
	const [nameDraft, setNameDraft] = useState(name);

	const theme = useTheme();

	const checkInput = () => {
		if (nameDraft.length === 0) {
			return "name must be at least 1 character long";
		} else if (nameDraft.length > 50) {
			return "name must be less than 50 characters long";
		} else {
			return "";
		}
	};

	const handleSave = () => {
		if (checkInput().length > 0) {
			console.log("NameEditor: handleSave: invalid input");
			// add warning box
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
						color: type === "block" ? "default" : theme.palette.text.secondary,
					},
				}}
				InputProps={{
					endAdornment: (
						<Tooltip
							title={`${editing ? "save" : "edit"} ${type} name`}
							placement={type === "block" ? "right" : "top"}
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
											offset: type === "block" ? [0, 8] : [0, 0],
										},
									},
								],
							}}
						>
							<IconButton
								onClick={() => (editing ? handleSave() : setEditing(true))}
								size="large"
								sx={{
									transform: "scale(1.5)",
									color:
										type === "project" ? theme.palette.text.secondary : theme.palette.primary.main,
								}}
							>
								{editing ? <SaveOutlined /> : <EditOutlined />}
							</IconButton>
						</Tooltip>
					),
					readOnly: !editing,
					disableUnderline: true,
					style: {
						fontSize: type === "project" ? "40px" : "18px",
						border: "none",
						borderBottom: type !== "project" ? `2px solid ${theme.palette.primary.main}` : null,
					},
				}}
				FormHelperTextProps={{ sx: { color: theme.palette.text.primary } }}
			/>
		</ClickAwayListener>
	);
};
