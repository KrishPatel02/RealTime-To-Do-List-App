/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React from "react";

import "../ComponentsCSS/ControlBtn.css";
 
import Button from "@mui/material/Button";

import { Tooltip } from "@mui/material";

const ControlBtn = (props) => {
    return (
        <>
            <Tooltip title={props.hoverTitle}>
                <Button
                    variant="text"
                    className={`button ${props.className} `}
                    sx={props.sx}
                    onClick={props.onClick}
                > 
                    {props.btnTitle}
                </Button>
            </Tooltip>
        </>
    );
};

export default ControlBtn;
