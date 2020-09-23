import React, { useEffect } from "react"

export default function Timer(){
    const[timer,setTimer]=React.useState([]);
    const[cnt,setCnt]=React.useState(-1);

    // console.log('컴포넌트안')

    // React.useEffect(()=>{
    //     console.log("useEffect, 한번만 (만들어졌을때)")

    //     return () => {
    //         console.log("useEffect, 한번만 (지워졌을때)")
    //     }
    // },[])

    React.useEffect(()=>{
        setCnt(cnt + 1)
    },[timer])

    const click = (e) => {
        console.log(e)
        setTimer([...timer,new Date()])
        
    }
    return(
    <>
        <div>타이머 개수: {cnt}</div>
        <button onClick={click}>추가</button>
            {timer.map((v, i) => {
                return <div><Timecheck 
                    v = {v}
                /></div>
        })} 
    </>
    )
}


function Timecheck({v}){

    const [date, setDate] = React.useState( parseInt(((new Date()).getTime()-v.getTime())/1000   ))  ;

    useEffect(()=>{

        const timer = setInterval(()=>setDate(    parseInt(((new Date()).getTime()-v.getTime())/1000   ))     ,1000);
        return()=>clearInterval(timer);
        },[])

    return (<>
                <div>{v.toISOString()}</div>
                <div>{date}</div>
            </>)
}


