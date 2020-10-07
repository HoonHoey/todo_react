import React from 'react';
import { Modal, Button } from 'antd';
import Axios from 'axios';
import { DeleteFilled, FileAddFilled, EditFilled } from '@ant-design/icons';


function State({ state, setState, setTodoList }) {

  const [todo, setTodo] = React.useState({
    name: '',
    reg_date: '',
    end_date: '',
    status: 'pending'
  });

  const input = e => {
    setTodo([])
  }

  const [group, setGroup] = React.useState([])

  React.useEffect(() => {

    Axios.get("http://127.0.0.1:8000/api/todo/todogroup/")
      .then(res => {

        const { data } = res;

        setGroup(prev => data)

      }).catch(error => {
        console.log(error);
      })


  }, []);

  const handleOk = e => {

    Axios.post("http://127.0.0.1:8000/api/todo/todo/", todo)
      .then(res => {

        Axios.get("http://127.0.0.1:8000/api/todo/todo?status=" + todo.status)
          .then(res => {
            const { data } = res;

            setTodoList(prev => ({
              ...prev,
              [todo.status]: data
            }))
          }).catch(error => {
            console.log(error);
          })

      }).catch(error => {
        console.log(error);
      });

    setState({
      visible: false,
    });
  };

  const handleCancel = e => {
    console.log(e);
    setState({
      visible: false,
    });
  };

  const change = e => {
    const { value, name } = e.target;

    setTodo({
      ...todo,
      [name]: e.target.value
    })
  }

  return (
    <>

      <Modal
        title="Add"
        visible={state.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {todo.name}, {todo.reg_date}, {todo.end_date}
        <div>이름
          <input type="text" value={todo.name} name="name" onChange={change} /></div>
        <div>스테이터스
          <select type="text" value={todo.status} name="status" onChange={change}>
            <option value="pending">해야 할 일</option>
            <option value="inprograss">진행중</option>
            <option value="end">완료</option>
          </select></div>
        <div>종료일
          <input type="date" value={todo.end_date} name="end_date" onChange={change} /></div>
        <div>구분
          <select type="text" value={todo.group} name="group" onChange={change}>
            {
              group.map((v) => {
                return <option value={v.seq}>{v.name}</option>
              })
            }
          </select>
        </div>
      </Modal>
    </>
  );
}


function EditState({ state, setState, setTodoList, setEditState, editstate }) {

  const [todo, setTodo] = React.useState({
    name: '',
    reg_date: '',
    end_date: '',
    status: 'pending'
  });

  const input = e => {
    setTodo([])
  }

  const [group, setGroup] = React.useState([])

  React.useEffect(() => {

    Axios.get("http://127.0.0.1:8000/api/todo/todogroup/")
      .then(res => {

        const { data } = res;

        setGroup(prev => data)

      }).catch(error => {
        console.log(error);
      })


  }, []);

  const handleOk2 = e => {


    Axios.put("http://127.0.0.1:8000/api/todo/todo/" + editstate.seq + "/", todo)
      .then(res => {

        Axios.get("http://127.0.0.1:8000/api/todo/todo?status=" + todo.status)
          .then(res => {
            const { data } = res;

            setTodoList(prev => ({
              ...prev,
              [todo.status]: data
            }))
          }).catch(error => {
            console.log(error);
          })

      }).catch(error => {
        console.log(error);
      });

    setEditState({
      visible: false,
    });
  };

  const handleCancel = e => {
    console.log(e);
    setEditState({
      visible: false,
    });
  };

  const change = e => {
    const { value, name } = e.target;

    setTodo({
      ...todo,
      [name]: e.target.value
    })
  }

  return (
    <>

      <Modal
        title="Edit"
        visible={editstate.visible}
        onOk={handleOk2}
        onCancel={handleCancel}
      >
        {todo.name}, {todo.reg_date}, {todo.end_date}   {editstate.seq}
        <div>이름
          <input type="text" value={todo.name} name="name" onChange={change} /></div>
        <div>스테이터스
          <select type="text" value={todo.status} name="status" onChange={change}>
            <option value="pending">해야 할 일</option>
            <option value="inprograss">진행중</option>
            <option value="end">완료</option>
          </select></div>
        <div>종료일
          <input type="date" value={todo.end_date} name="end_date" onChange={change} /></div>
        <div>구분
          <select type="text" value={todo.group} name="group" onChange={change}>
            {
              group.map((v) => {
                return <option value={v.seq}>{v.name}</option>
              })
            }
          </select>
        </div>
      </Modal>
    </>
  );
}



export default function Todo({ history, location, match }) {

  const [select, setSelect] = React.useState({
    seq: -1,
    status: "",
  })

  const [todo, setTodo] = React.useState({
    pending: [],
    inprograss: [],
    end: []
  });


  const [state, setState] = React.useState({
    visible: false
  });

  const [editstate, setEditState] = React.useState({
    visible: false
  });

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const showModalEdit = (seq) => {


    setEditState({
      visible: true,
      seq: seq
    });
  };


  const showModalDelete = (seq, status) => {

    setSelect({
      seq,
      status
    });

    setState({
      deletevisible: true,
    });

  };

  React.useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/todo/todo?status=pending",{
      headers: {
        Authorization: "JWT " + window.localStorage.getItem("token")
      }
    })
      .then(res => {

        const { data } = res;

        setTodo(prev => ({
          ...prev,
          pending: data
        }))

      }).catch(error => {
        console.log(error);
      })

    Axios.get("http://127.0.0.1:8000/api/todo/todo?status=inprograss",{
      headers: {
        Authorization: "JWT " + window.localStorage.getItem("token")
      }
    })
      .then(res => {
        const { data } = res;

        setTodo(prev => ({
          ...prev,
          inprograss: data
        }))
      }).catch(error => {
        console.log(error);
      })

    Axios.get("http://127.0.0.1:8000/api/todo/todo?status=end",{
      headers: {
        Authorization: "JWT " + window.localStorage.getItem("token")
      }
    })
      .then(res => {
        const { data } = res;

        setTodo(prev => ({
          ...prev,
          end: data
        }))
      }).catch(error => {
        console.log(error);
      })
  }, [])

  const click = () => {
    history.push('/')
  }

  const changeDel = e => {

    const { value, name } = e.target;

    setTodo({
      ...todo,
      [name]: ''
    })
  }

  const handleCancel = e => {
    console.log(e);
    setState({
      visible: false,
    });
  };


  const handleOk = e => {

    console.log(select.seq);
    console.log(select.status);

    Axios.delete("http://127.0.0.1:8000/api/todo/todo/" + select.seq)
      .then(res => {

        return Axios.get("http://127.0.0.1:8000/api/todo/todo?status=" + select.status)

      }).catch(error => {
        console.log(error);
      }).then(res => {

        const { data } = res;

        setTodo(prev => ({
          ...prev,
          [select.status]: data
        }))

        setSelect({
          seq: -1,
          status: "",
        });

        setState({
          visible: false,
        });

      });
  };

  return (
    <>
      <Modal
        title="Delete"
        visible={state.deletevisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>삭제 후 복구가 불가능 합니다.</div>

      </Modal>

      <div><FileAddFilled id="button" onClick={showModal} /></div>
      <div id="ListBox">
        <div className="detail">
          <div><h3>할 일</h3></div>
          {todo.pending.map((v, i) => {
            return (
              <div className="List">
                <div>{v.name}</div>
                <div>{v.end_date}
                  <DeleteFilled id="button2" onClick={() => { showModalDelete(v.seq, v.status) }} />
                  <EditFilled id="button3" onClick={() => { showModalEdit(v.seq) }} />
                </div>
              </div>
            )
          })}
        </div>
        <div className="detail">
          <div><h3>진행중</h3></div>
          {todo.inprograss.map((v, i) => {
            return (
              <div className="List">

                <div>{v.name} </div>
                <div>{v.end_date}
                  <DeleteFilled id="button2" onClick={() => { showModalDelete(v.seq, v.status) }} />
                  <EditFilled id="button3" onClick={() => { showModalEdit(v.seq) }} />
                </div>
              </div>
            )
          })}
        </div>
        <div className="detail">
          <div><h3>완료</h3></div>
          {todo.end.map((v, i) => {
            return (
              <div className="List">
                <div>{v.name}</div>
                <div>{v.end_date}
                  <DeleteFilled id="button2" onClick={() => { showModalDelete(v.seq, v.status) }} />
                  <EditFilled id="button3" onClick={() => { showModalEdit(v.seq) }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <State state={state} setState={setState} setTodoList={setTodo} />
      <EditState state={state} setTodoList={setTodo} setEditState={setEditState} editstate={editstate} />
    </>
  )
}