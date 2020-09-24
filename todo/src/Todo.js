import React from 'react';
import { Modal, Button } from 'antd';
import Axios from 'axios';


function State({state, setState}){
    
    const[todo, setTodo] = React.useState({
        name:'',
        reg_date:'',
        end_date:''
        }); 
    
    const input = e => {
        setTodo([])
    }

    const  handleOk = e => {
    //   console.log(todo);

      Axios.post("http://127.0.0.1:8000/api/todo/todo/",todo)
      .then(res=>{
          console.dir(res)
          //const data = res.data;
          const {data} = res;
          setTodo (data);
      }).catch(error=>{
          console.log(error);
      })


      setState({
        visible: false,
      });
    };
  
    const  handleCancel = e => {
      console.log(e);
      setState({
        visible: false,
      });
    };

    const change = e => {

        // const value = e.target.value;
        // const name = e.target.name;

        const {value, name} = e.target;

        setTodo({
            ...todo,
            [name]:e.target.value
        })
    }

  return (
      <>

      <Modal
          title="Basic Modal"
          visible={state.visible}
          onOk={handleOk}
          onCancel={handleCancel}
      >
          {todo.name}, {todo.reg_date}, {todo.end_date}
          <div>이름
          <input type="text" value={todo.name} name="name" onChange={change}/></div>
          <div>스테이터스
          <input type="text" value={todo.status} name="status" onChange={change}/></div>
          <div>종료일
          <input type="date" value={todo.end_date} name="end_date" onChange={change}/></div>
          <div>구분
          <input type="text" value={todo.group} name="group" onChange={change}/></div>
      </Modal>
      </>
      );
    }

export default function Todo({history, location, match})
{


  const [todo, setTodo] = React.useState([]);
   
  const[state, setState] = React.useState({
                                          visible:false
                                          });

  const showModal = () => {
      setState({
        visible: true,
      });
    };

  React.useEffect(()=>{
      Axios.get("http://127.0.0.1:8000/api/todo/todo/")
      .then(res=>{
          console.dir(res)
          //const data = res.data;
          const {data} = res;
          setTodo (data);
      }).catch(error=>{
          console.log(error);
      })
  },[])

  const click = () => {
      history.push('/')
  }

  return(
      <>
      <div><button id="button" type="primary" ghost onClick={showModal}>+ 추가</button></div>
      <ul className="detail">
      {
      todo.map((v, i) => {
      return ( 

              <ul id="List">
                  <li><h3>{v.name}</h3> {v.status}  {v.end_date} {v.group}</li> 
              </ul>
      )
      })
      }
      </ul>
      <State state={state} setState={setState}/>
      </>
  )
}