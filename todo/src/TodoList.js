import React from "react"

export default function TodoList() {
    const [input, setInput] = React.useState()
    const [todos, setTodos] = React.useState([])

    const change = (e) => {
        console.log(e)
        setInput(e.target.value)
    } 
    const click = (event) => {
        console.log(event)
        setTodos([...todos, input]) //내용지움
        setInput('')
    }
    const keypress = (press) => {

        console.log(press.key)
        if (press.key === 'Enter'){
            console.log(press)
            setTodos([...todos, input]) //내용지움
            setInput('')
        }
    }   

    

return(
<>
<div> <input value={input} onChange={change} onKeyPress={keypress} onClick={click}/>{input}</div>
<button onClick={click} >추가</button>
{todos.map((v, i) => {
      return <div><ListPrint 
                v = {v}
      /></div>
    })} 

</>
)
}

function ListPrint({v}) {
    return (<>
                <div>{v}</div>
            </>)
}
