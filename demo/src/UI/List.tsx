import React from "react"
import styled from "styled-components";

const ListItem = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
       & div {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        & hr{
            width: 100%;
            border: 1px dotted gray;
          }
    `

const List = (props: { title: string, value: number | string | undefined, units?: string }) => {
    return (
        <ListItem>
            <div>
                <h5>{props.title}</h5>
                <p>{props.value ? props.value : '-'} <span>{props.units}</span></p>
            </div>
            <hr />
        </ListItem>
    )
}
export default List;
