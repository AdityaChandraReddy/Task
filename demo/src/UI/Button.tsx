import styled from "styled-components"

type Props = {
    children: React.ReactNode,

    onClick: () => void

}
const ButtonIcon = styled.button`
        padding: 0.5em;
        background: cornflowerblue;
        border: 1px solid;
        border-radius: 5px;
        &:hover{
            cursor:pointer;
        }

    `;


const Button = (props: Props) => {
    return (
        <ButtonIcon onClick={() => props.onClick()}>{props.children}</ButtonIcon>
    )
}
export default Button