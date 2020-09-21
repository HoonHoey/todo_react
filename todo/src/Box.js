import React, {useState} from 'react';

export default function Box(){

    const style = {
        width: '100px',
        height: '100px',
        fontSize: '20px',
        backgroundColor:'yellow',
        textAlign:'center',
        lineHeight:'100px'
    }

    const[m, setM] = React.useState(0)

    //이벤트
    const onMouseOver = (e) => {
        setM(1)
    }
    const onMouseOut = (e) => {
        setM(0)
    }

    return(
        <>
            <div style={style} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>{m}</div>
        </>
    )
}
