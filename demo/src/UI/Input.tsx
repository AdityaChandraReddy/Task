import { useState } from "react"
import styled from "styled-components"
import Button from "./Button"

type InputOption = {
    id: number
    value: string
}

type InputProps = {
    options: InputOption[]
    value?: InputOption
    onChange: (value: InputOption | undefined) => void
}
const InputField = styled.div`
    position:relative;
    border-bottom: .2em dotted #777;
    display:flex;
    align-items:center;
    gap:.5em;
    paddin:.5em;
    border-radius:.25em;
    outline:none
    &:focus{
        border-color : hs1(200,100%,50%)
    }
    & span{
        flex-grow: 1;
    }
    margin-bottom:3em;
    & input{
        border:none;
    }
`
const CloseBtn = styled.button`
    background : none;
    color: #777;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    font-size: 1.25em;
    &:hover{
        color :#333;
    }
`


const Caret = styled.div`
    border: .25em solid transparent;
    border-top-color: #777;
    translate: 0 25%;
    &:hover{
        cursor:pointer;
    }
`



const Options = styled.ul<{ open: boolean }>`
position:absolute;
margin : 0;
padding:0;
list-style:none;
display:${props => props.open ? 'block' : "none"};
max-height:15em;
overflow-y:auto;
border : .05em solid #777;
border-radius : .25em;
width:100%;
left:0;
top:calc(100% + .25em);
background-color: white;
z-index:100;
`
const OptionItem = styled.li<{ isselected: string }>`
    padding : .25em .5em;
    cursor: pointer;
    &:hover{
        background-color:lightgray;
    }
    background-color : ${props => props.isselected === 'true' ? 'darkgray' : "none"};

`
const Input = ({ value, onChange, options }: InputProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<InputOption>();
    const [enteredvalue, setEnteredValue] = useState<string>("")


    const selectOption = (option: InputOption | undefined) => {
        onChange(option)

    }



    return (
        <>
            <InputField onBlur={() => setIsOpen(false)}>
                <input placeholder="Search City"
                    type="text"
                    onClick={() => setIsOpen(prev => !prev)}
                    value={enteredvalue}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => { setEnteredValue(e.currentTarget.value) }}

                />
                <CloseBtn onClick={(e) => {
                    e.stopPropagation();
                    setEnteredValue('')
                }}>&times;
                </CloseBtn>
                <Caret onClick={() => setIsOpen((prev) => !prev)}></Caret>
                <Options open={isOpen}>
                    {
                        options.filter(option => option.value.toLowerCase().includes(enteredvalue.toLowerCase())).map(option => (
                            <OptionItem onMouseDown={(e) => {
                                e.stopPropagation()
                                selectOption(option);
                                setEnteredValue(option.value)
                                setSelectedItem(option)
                                setIsOpen(false)
                            }} key={option.id} isselected={`${selectedItem?.id === option.id ? 'true' : 'false'}`}>{option.value}</OptionItem>
                        ))
                    }
                </Options>
            </InputField>
        </>
    )

}
export default Input;