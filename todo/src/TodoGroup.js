import React from 'react';
import { Modal, Button } from 'antd';
import Axios from 'axios';
import { DeleteFilled, FileAddFilled, EditFilled } from '@ant-design/icons';

function State({ state, setState, setTodoGroupList }) {

    const [todogroup, setTodoGroup] = React.useState({
        name: '',
        end_date: '',
    });

    const handleOk = e => {

        Axios.post("http://127.0.0.1:8000/api/todo/todogroup/", todogroup)

            .then(res => {

                Axios.get("http://127.0.0.1:8000/api/todo/todogroup/")
                    .then(res => {
                        const { data } = res;

                        setTodoGroupList(prev => data)
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

        // const value = e.target.value;
        // const name = e.target.name;

        const { value, name } = e.target;

        setTodoGroup({
            ...todogroup,
            [name]: e.target.value
        })
    }

    React.useEffect(() => {
        Axios.get("http://127.0.0.1:8000/api/todo/todogroup/")
            .then(res => {
                console.dir(res)
                //const data = res.data;
                const { data } = res;
                setTodoGroup(data);
            }).catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <>
            <Modal
                title="Add"
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {todogroup.name} {todogroup.end_date}
                <div>이름
          <input type="text" value={todogroup.name} name="name" onChange={change} /></div>
                <div>종료일
          <input type="date" value={todogroup.end_date} name="end_date" onChange={change} /></div>
            </Modal>
        </>
    );
}

function EditState({ state, setState, setTodoGroupList, setEditState, editstate }) {

    const [todogroup, setTodoGroup] = React.useState({
        name: '',
        end_date: '',
    });

    const input = e => {
        setTodoGroup([])
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


        Axios.put("http://127.0.0.1:8000/api/todo/todogroup/" + editstate.seq + "/", todogroup)
            .then(res => {

                Axios.get("http://127.0.0.1:8000/api/todo/todogroup?status=" + todogroup.status)
                    .then(res => {
                        const { data } = res;

                        setTodoGroupList(prev => ({
                            ...prev,
                            [todogroup.status]: data
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

        setTodoGroup({
            ...todogroup,
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
                {todogroup.name}, {todogroup.end_date}   {editstate.seq}
                <div>이름
            <input type="text" value={todogroup.name} name="name" onChange={change} /></div>
                <div>종료일
            <input type="date" value={todogroup.end_date} name="end_date" onChange={change} /></div>
            </Modal>
        </>
    );
}


export default function TodoGroup({ history, location, match }) {

    const [todogroup, setTodoGroup] = React.useState([]);

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


    React.useEffect(() => {
        Axios.get("http://127.0.0.1:8000/api/todo/todogroup/",{
            headers: {
              Authorization: "JWT " + window.localStorage.getItem("token")
            }
          })
            .then(res => {
                console.dir(res)
                //const data = res.data;
                const { data } = res;
                setTodoGroup(data);
            }).catch(error => {
                console.log(error);
            })
    }, [])

    const click = () => {
        history.push('/')
    }

    const [select, setSelect] = React.useState({
        seq: -1,
        status: "",
    })



    const changeDel = e => {

        const { value, name } = e.target;

        setTodoGroup({
            ...todogroup,
            [name]: ''
        })
    }

    const handleCancel = e => {
        console.log(e);
        setState({
            visible: false,
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

    const handleOk = e => {

        console.log(select.seq);
        console.log(select.status);

        Axios.delete("http://127.0.0.1:8000/api/todo/todogroup/" + select.seq)
            .then(res => {

                return Axios.get("http://127.0.0.1:8000/api/todo/todogroup?status=" + select.status)

            }).catch(error => {
                console.log(error);
            }).then(res => {

                const { data } = res;

                setTodoGroup(prev => data)

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
            <div><FileAddFilled id="button" ghost onClick={showModal} /></div>

            <div id="ListBox">
                <div className="detail2">
                    {
                        todogroup.map((v, i) => {
                            return (
                                <div className="List">
                                    <div><h3>{v.name}</h3>
                                        <div>{v.end_date}
                                            <DeleteFilled id="button2" onClick={() => { showModalDelete(v.seq, v.status) }} />
                                            <EditFilled id="button3" onClick={() => { showModalEdit(v.seq) }} />
                                        </div></div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <State state={state} setState={setState} setTodoGroupList={setTodoGroup} />
            <EditState editstate={editstate} setEditState={setEditState} setTodoGroupList={setTodoGroup} />
        </>
    )
}