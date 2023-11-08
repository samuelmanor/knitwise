import { FC } from "react";

export interface StitchIconProps {
	stitchName: string;
	color?: string;
}

export const StitchIcon: FC<StitchIconProps> = ({ stitchName, color }) => {
	const stitchColor = color ?? "#D9D9D9";

	if (stitchName === "knit") {
		return (
			<svg width="53" height="40" viewBox="0 0 53 40" fill="none" data-testid="knit">
				<ellipse
					cx="18.9254"
					cy="20.2344"
					rx="9.93357"
					ry="17.1914"
					transform="rotate(-37.075 18.9254 20.2344)"
					fill={stitchColor}
				/>
				<ellipse
					cx="9.93357"
					cy="17.1914"
					rx="9.93357"
					ry="17.1914"
					transform="matrix(-0.797847 -0.60286 -0.60286 0.797847 52.2149 12.5068)"
					fill={stitchColor}
				/>
			</svg>
		);
	}

	if (stitchName === "purl") {
		return (
			<svg width="35" height="21" viewBox="0 0 35 21" fill="none" data-testId="purl">
				<ellipse
					cx="17.2895"
					cy="10.7047"
					rx="9.93357"
					ry="17.1914"
					transform="rotate(90 17.2895 10.7047)"
					fill={stitchColor}
				/>
			</svg>
		);
	}
};
