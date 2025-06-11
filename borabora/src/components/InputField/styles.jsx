import {styled} from "styled-components";


export const Label = styled.label`
    font-weight: bold;
`

export const Input = styled.input`
    width: 100%;
    height: 40px;
    background-color: #f0efef;
    border: none;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
    padding: 5px;
    border-radius: 8px;

    &:focus{
        border-color: #ffffff;
        outline: 1px solid #9e9e9e;
    }
`


