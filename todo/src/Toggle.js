import React, { useState } from 'react';
function Toggle() {
    //const state = true;
    const [state, setState] = useState(true);
    const click_1 = function(e) {
        if (state == true) {
            setState(false);
        }else {
            setState(true);
        }
    }
    const click = (e) => {
        if (state == true) {
            setState(false);
        }else {
            setState(true);
        }
    }
    return (
        <>
            {state ? <div>True 입니다</div>: <div>False 입니다</div>}
            <button onClick={click}>버튼</button>
        </>
    )
}
export default Toggle;