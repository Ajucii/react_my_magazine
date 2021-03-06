import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Text from "./Text";

const Input = (props) => {

    const { multiLine, label, placeholder, _onChange, type, value, is_submit, onSubmit } = props;

    if (multiLine) {
        return (

            <Grid>
                {label && <Text margin="0px">{label}</Text>}
                <ElTextarea
                    rows={10}
                    value={value}
                    placeholder={placeholder}
                    onChange={_onChange}
                ></ElTextarea>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Grid>
                {label && <Text margin="0px">{label}</Text>}
                {is_submit ? (
                    <ElInput
                        type={type}
                        placeholder={placeholder}
                        onChange={_onChange}
                        value={value}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                onSubmit(e);
                            }
                        }}
                    ></ElInput>) : (
                    <ElInput type={type} placeholder={placeholder} onChange={_onChange} ></ElInput>
                )}
            </Grid>
        </React.Fragment>
    )
}


Input.defaultProps = {
    multiLine: false,
    label: false,
    placeholder: '텍스트를 입력해주세요.',
    type: "text",
    value: "",
    is_submit: false,
    onSubmit: () => { },
    _onChange: () => { },

}

const ElTextarea = styled.textarea`
    border:1px solid #212121;
    width : 100%;
    padding : 12px 4px;
    box-sizing : border-box;


    resize: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    
    &:focus{
    outline: none !important;
    border: 2px tomato solid ;
  }

`;

const ElInput = styled.input`
    border:1px solid #212121;
    width : 97%;
    padding : 12px 4px;
    box-sizing : border-box;

    &:focus{
    outline: none !important;
    border: 2px tomato solid ;
  }

`;

export default Input;