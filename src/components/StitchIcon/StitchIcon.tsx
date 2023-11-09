import { FC } from "react";

export interface StitchIconProps {
	stitchName: string;
	color?: string;
}

export const StitchIcon: FC<StitchIconProps> = ({ stitchName, color }) => {
	const stitchMainColor = color ?? "#D9D9D9";
	const stitchBackgroundColor = "#ABABAB"; // todo: util func?
	// const stitchForegroundColor = "" // if needed?

	if (stitchName === "k") {
		return (
			<svg width="44" height="40" viewBox="0 0 44 40" fill="none">
				<ellipse
					cx="9.93357"
					cy="17.1914"
					rx="9.93357"
					ry="17.1914"
					transform="matrix(-0.912991 -0.407979 -0.407979 0.912991 44.0085 8.59143)"
					fill={stitchMainColor}
				/>
				<ellipse
					cx="16.9254"
					cy="20.2344"
					rx="9.93357"
					ry="17.1914"
					transform="rotate(-24.078 16.9254 20.2344)"
					fill={stitchMainColor}
				/>
			</svg>
		);
	}

	if (stitchName === "p") {
		return (
			<svg width="35" height="21" viewBox="0 0 35 21" fill="none" data-testId="purl">
				<ellipse
					cx="17.2895"
					cy="10.7047"
					rx="9.93357"
					ry="17.1914"
					transform="rotate(90 17.2895 10.7047)"
					fill={stitchMainColor}
				/>
			</svg>
		);
	}

	if (stitchName === "c2f") {
		<svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
			<ellipse
				cx="12.0809"
				cy="18.3353"
				rx="9.93357"
				ry="17.1914"
				transform="rotate(-7.45771 12.0809 18.3353)"
				fill={stitchBackgroundColor}
			/>
			<ellipse
				cx="9.93357"
				cy="17.1914"
				rx="9.93357"
				ry="17.1914"
				transform="matrix(-0.635439 -0.772151 -0.772151 0.635439 40.876 18.4508)"
				fill={stitchMainColor}
			/>
		</svg>;
	}
};
