// import logo from "./logo.svg";
import { Box, Grid } from "@mui/material";
import "./App.css";
import { Workspace } from "./components/Workspace";
import { testProject } from "./utils/testProject";

function App() {
	return (
		<Box
			sx={{
				// backgroundColor: "yellow",
				position: "fixed",
				height: "100%",
				width: "100%",
				display: "flex",
				alignItems: "center",
			}}
		>
			<Workspace project={testProject} />
		</Box>
	);
}

export default App;
