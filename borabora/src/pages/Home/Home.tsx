import { NavBar } from "../../components/NavBar/NavBar";
import { InputField } from "../../components/InputField/InputField"
import { Container } from "../../components/Container/Container";

export const Home = ()=>{
    return(
            <Container>
                <NavBar/>
                <label >Input</label>
                <InputField  placeholder="Digite..."  type="text"/>
            </Container>
       
    )
}