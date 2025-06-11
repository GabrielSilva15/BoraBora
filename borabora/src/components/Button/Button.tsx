import { ButtonHTMLAttributes } from "react"
import { ButtonPage } from "./styles"

interface ButtonProps{
    name:string,

}

export function Button ({name}:ButtonProps){
    return (
        <ButtonPage>{name}</ButtonPage>
    )
}