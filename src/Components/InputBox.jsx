/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import "../ComponentsCSS/InputBox.css";

const InputBox = (props) => {


    return (
        <>
            <input
                placeholder={props.placeholder}
                className={`inputField ${props.className}`}
                value={props.value}
                onChange={props.onChange}
            />
        </>
    );
};

export default InputBox;
