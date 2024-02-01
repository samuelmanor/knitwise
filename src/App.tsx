// import logo from "./logo.svg";
import { Box } from "@mui/material";
import "./App.css";
import { Workspace } from "./components/Workspace";

function App() {
	return (
		<Box
			sx={
				{
					// backgroundColor: "yellow",
					// position: "fixed",
					// height: "100%",
					// width: "100%",
					// display: "flex",
					// alignItems: "center",
				}
			}
		>
			<Workspace />
		</Box>
	);
}

export default App;
