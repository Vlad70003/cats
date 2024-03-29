import {WrapperSizesEnum} from "../../../services/emun/wrapperSizes";
import React from "react";

export interface CenterWrapperInterfaces {
    children: React.ReactNode,
    size: WrapperSizesEnum,
    margin?: string,
    centerWidth?: boolean,
    fullHeight?: boolean,
    centerHeight?: boolean,
}