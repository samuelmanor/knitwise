// import logo from "./logo.svg";
import { Box, Grid } from "@mui/material";
import "./App.css";
import { Workspace } from "./components/Workspace";

export const testProject = {
	// projectName: "test project",
	currentProjectRow: 1,
	blocks: [
		{
			currentBlockRow: 1,
			stitches: [
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
			],
		},
		{
			currentBlockRow: 1,
			stitches: [
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
			],
		},
		{
			currentBlockRow: 1,
			stitches: [
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
			],
		},
		{
			currentBlockRow: 1,
			stitches: [
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
			],
		},
		{
			currentBlockRow: 1,
			stitches: [
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
			],
		},
	],
};

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
