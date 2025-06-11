import { HtmlHTMLAttributes, InputHTMLAttributes } from "react";
import { Button } from "../Button/Button";
import { Input,Label} from "./styles";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {label?:string};

export const InputField = ({type, name, ...props}:InputFieldProps)=>{
    return (
      <>
            <Label htmlFor={name} >{props.label}</Label>
            <Input type={type} name={name} {...props} />
      </>
    )
}