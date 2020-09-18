import React, { useState } from 'react';
import { Button } from 'antd';
function Buttontest()
{
    const [state, setState] = useState("선택해주세요")
    // const change1 = () => {        
    //     setState("바나나")
    // }
    // const change2 = () => {
    //     setState("사과")
    // }
    // const change3 = () => {
    //     setState("딸기")        
    // }
    const change = (e) => {
        console.dir(e.target)
        console.log(e.target.innerHTML)
        console.log(e.target.getAttribute("data"))
        console.log(e.target.getAttribute("name"))
        console.log(e.target.name)
        setState(e.target.innerHTML)
    }
    return (        
        <>
            <div>{state}</div>
            <div>
                <button data="바나나" name="바나나" onClick={change}>바나나</button>
                <button data="사과" name="사과" onClick={change}>사과</button>
                <button data="딸기" name="딸기" onClick={change}>딸기</button>
            </div>
        </>
    )
}
export default Buttontest