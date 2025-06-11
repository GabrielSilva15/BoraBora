import {styled} from "styled-components";


export const NavBarWrapper = styled.nav`
    
        display: flex;
        justify-content: center;
        gap: 10px;
        width: 100%;

`;

export const NavBarList = styled.ul`

    list-style: none;
    display: flex;
    gap: 10px;



`;

export const ItemList = styled.li`
    color: black;
    
    a{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 40px;
        text-decoration: none;
        background-color: #555555;
        border-radius: 10px;
        color: white;
    }

    #rota-logout{
        width: 45px;
        position: absolute;
        left:96%;
    }

`;


