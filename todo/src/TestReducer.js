import React, {useReducer}from "react"

const reducer = (prev, action) => {
    if (action.type==="CHANGE") {
        console(prev)
        return action.value;
    }
}

export default function testreduser() {

const [name, dispatch] = useReducer(reducer, "홍길동")
const click = () => {
    dispatch({
        type: "CHANGE"
    })
    
}


return(
<>
{name}
<div>
    <button onClick={click}>변경</button>
</div>
</>
)
}