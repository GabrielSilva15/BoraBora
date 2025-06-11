import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    a{
        text-decoration: none;
    }

    body{
    padding: 2rem;
    height: 100vh;
    width: 100%;
    background-color: #d4d4d4;
    }

    input{
    padding: 2px;
    border-radius: 4px;
    border: 1px solid #555555;
    }

    p{
    text-align: center;
    }

`