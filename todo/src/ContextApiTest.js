import React from 'react';
const CntContext = React.createContext(0);
export default function ContextApiText() {
    const [cnt, setCnt] = React.useState(100);
    return (
        <>
            {cnt}
            <div>
                <CntContext.Provider value={cnt}>
                    <Child1/>
                </CntContext.Provider>
            </div>
        </>
    )
}
function Child1(){
    return(
        <div>
            Child1
            <Child2/>
        </div>
    )
}
function Child2(){
    return(
        <div>
            Child2
            <Child3/>
        </div>
    )
}
function Child3(){
    return(
        <CntContext.Consumer>
        {
            (cnt) => (
                <>
                    <div>부모에서 보낸 숫자는?</div>
                    <div>{cnt}</div>
                </>
            )
        }
        </CntContext.Consumer>
    )
}