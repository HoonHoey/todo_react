import React from 'react'

function TestState()
{
    const [a, setA] = React.useState([1, 2, 3, 4, 5, 6, 7])
    const [b, setB] = React.useState({'name':'홍길동', age:30, address:'서울시'})
    const [c, setC] = React.useState(0)
    const [d, setD] = React.useState({'name': '홍길동', math:80, science:50, english:70})
    const [f, setF] = React.useState(0)
    

    const click = () => {
        setA([...a.slice(0,3),0,0,...a.slice(5,7)]);
        setB({...b,age:35})
        setD({...d,math:0,science:0,english:0})
    }

    const change = (e) => {
        console.log(e.target.value)
        setC(e.target.value)
    }
    const change2 = (g) => {
        console.log(g.target.value)
        setF(g.target.value)
    }
    // const change3 = (j) =>{
    //     console.log(j.target.{c}+{j})
    //     setH({c}+{f})
    // }
    

    return (
        <div>
            {/* {
            a.map((v, i) => {
                return <div>{v}</div>
            })
            } */}
        <div>
            <tabble>
                <tr>
                    <td><input value={c} onChange={change}/></td>
                    <td>+</td>
                    <td><input value={f} onChange={change2}/></td>
                    <td>=</td>
                    <td><input value={Number(c) + Number(f)} /></td>

                </tr>
            </tabble>
        </div>
        <div>{JSON.stringify(a)}</div>
        <div>{JSON.stringify(b)}</div>
        <div>{JSON.stringify(d)}</div>
        <button onClick={click}>버튼</button>
        </div>
    )
}
export default TestState;