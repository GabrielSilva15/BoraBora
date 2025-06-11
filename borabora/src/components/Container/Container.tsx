import { ReactNode } from "react";
import { ContainerWrapper } from "./styled";


export const Container = ({children}:{children:ReactNode}) =>{
    return (
        <ContainerWrapper>
            {children}
        </ContainerWrapper>
    )
}