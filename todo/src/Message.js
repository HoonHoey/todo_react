import React from 'react'

function Message()
{
    const [a, setA] = React.useState(1)
    const [number, setNumber] = React.useState(1)

    const [c, setC] = React.useState(["사과","바나나","옥수수"])
    const [d, setD] = React.useState([{name:"홍길동", age:10},{name:"이몽룡", age:20}])
    const [e, setE] = React.useState([{name:"이수만", age:10, address: "인천"}, {name:"유희열", age:45, address: "서울"}, 
                                      {name:"방시혁", age:43, address: "부산"}, {name:"박진영", age:34, address: "광주"}])

    const [x, setX] = React.useState(true)
    let b = 1;
    
    // function click() {
    // }

    const click = () => {
        setA(a + 1)
        // a = a + 1
        b = 10
    }

    const click2 = () => {
        if (x == true) {
            setX(false)
            // x = false
        } 
        else if (x == false){
            setX(true)
            // x = true
        } 



    }

    function test(v, i) {
        return <div>{v}</div>
    }

    return(

        <div>
        <table>
            <tr>
                <th>이름</th>
                <th>나이</th>
                <th>지역</th>
            </tr>
                {
                    e.map((v, i) => {
                    return <tr><td>{v.name}</td> <td>{v.age}</td> <td>{v.address}</td></tr>
                    })
                }

        </table>
            <h3>({x ? <div>True 입니다..</div> : <div>False 입니다.</div>}) </h3>
        <button onClick={click2}>변경</button>
        {/* {
            d.map((v, i) => {
                return (
                    <div>{v.name} {v.age}</div>
                )
            })
        } */}

        <h2>{a} {b} 안녕하세요 환영합니다.</h2>
        <button onClick={click}>버튼</button>

        <h2>True 입니다.</h2>
        <button onClick={click}>버튼</button>
        </div>
    )
}

export default Message