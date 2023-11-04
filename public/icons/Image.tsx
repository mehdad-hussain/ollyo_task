
import { SVGProps } from "react";

const ImageSVG = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 -1 20 20"
        {...props}
    >
        <title>{"image / 39 - image, landscape, picture, image icon"}</title>
        <g fill="none" fillRule="evenodd" transform="translate(-2 -3)">
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
            />
            <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m3 15.75 4.72-4.72a.75.75 0 0 1 1.06 0l4.19 4.19a.75.75 0 0 0 1.06 0l1.94-1.94a.75.75 0 0 1 1.06 0L21 17.25"
            />
            <circle cx={16.5} cy={8.5} r={1.5} fill="#000" />
        </g>
    </svg>
);
export default ImageSVG;
