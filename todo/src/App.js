import React from 'react';
import 'App.css';
import 'antd/dist/antd.css';
import Welcome from 'Welcome';
import Message from 'Message';
import TestState from 'TestState';
import Box from 'Box';
import TodoList from 'TodoList';
// import TestReduser from 'testreduser';
import TimeList from 'TimeList';
import RouterTest from 'RouterTest';


function Add({x, y})
{
  console.log(x)
  console.log(y)
  
  return (
    <>
    <div>{x + y}</div>
    </>
  )
}

function Gugudan({x}) {
  const [z, setZ] = React.useState([2, 3, 4, 5, 6, 7, 8, 9])
  const [h, setH] = React.useState(x)

  const change = (e) => {
    console.log(e)
    setH(e.target.value)
    // console.log(e.target.getAttribute("value"))
  }

  console.log(x)
  return (
    <>
    {h}
    <input value={h} onChange={change}/>
    {z.map((v, i) => {
      return <div>{h} X {v} = {h * v}</div>
    })}
    </>
  )
}

function App() {
 
  return (
    <div>
      
      {/* <TestState/> */}
      {/* <Gugudan x={2}/>
      <Add x={1} y={2}/> */}
      {/* <Message/>
      <Welcome/> */}
      {/* <Box/>
      <TodoList/> */}
      {/* <TimeList/> */}


      <RouterTest/>
    </div>
  );
}
// function Child({changeNumber, color, number, student})
// {
//   // const x = {name:"홍길동", age:35};
//   // const {name, age} = x;  
//   console.log(number)
//   console.log(color)
//   console.log(student)
//   const click = () => {
//     changeNumber(10)
//   }
//   return(
//     <>
//     <button onClick={click}>클릭</button>
//     </>
//   )
// }




function Parents()
{
  const [num, setNum] = React.useState(50)
  const changeNumber = (number) => {
    setNum(number);
  }
  return (
    <>
      {num}
      <Child changeNumber={changeNumber} 
             color={"red"}
             number={10}
             student={{name:'홍길동', age:35, address:'인천'}}
      />
    </>
  )
}
function Child({changeNumber, color, number, student})
{
  // const x = {name:"홍길동", age:35};
  // const {name, age} = x;  
  console.log(number)
  console.log(color)
  console.log(student)
  const click = () => {
    changeNumber(10)
  }
  return(
    <>
    <button onClick={click}>클릭</button>
    </>
  )
}

export default App;


