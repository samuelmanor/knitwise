import { FC } from "react";

export interface StitchProps {
    name: string;
    description: string;
    icon: SVGElement;
    // userGenerated?: boolean; -> future feature
}

export const Stitch: FC<StitchProps> = () => {
    return <>hiiiii</>;
};
