import React from 'react';
import { Modal, Button } from 'antd';
import Axios from 'axios';
import { DeleteFilled, FileAddFilled, EditFilled } from '@ant-design/icons';

function State({ state, setState, setFavoriteGroupList }) {

    const [favoritegroup, setFavoriteGroup] = React.useState({
        name: '',
    });

    const handleOk = e => {
        Axios.post("http://127.0.0.1:8000/api/todo/favoritegroup/", favoritegroup)
        
      .then(res => {

          Axios.get("http://127.0.0.1:8000/api/todo/favoritegroup/")
          .then(res => {
            const { data } = res;

            setFavoriteGroupList(prev => data)
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

        setFavoriteGroup({
            ...favoritegroup,
            [name]: e.target.value
        })
    }

    React.useEffect(() => {
        Axios.get("http://127.0.0.1:8000/api/todo/favoritegroup/")
            .then(res => {
                console.dir(res)
                //const data = res.data;
                const { data } = res;
                setFavoriteGroup(data);
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
                {favoritegroup.name}
                <div>이름
          <input type="text" value={favoritegroup.name} name="name" onChange={change} /></div>
            </Modal>
        </>
    );
}


function EditState({ state, setState, setFavoriteGroupList, setEditState, editstate }) {

    const [favoritegroup, setFavoriteGroup] = React.useState({
        name: '',
        end_date: '',
    });

    const input = e => {
        setFavoriteGroup([])
    }

    const [group, setGroup] = React.useState([])

    React.useEffect(() => {

        Axios.get("http://127.0.0.1:8000/api/todo/favoritegroup/")
            .then(res => {

                const { data } = res;

                setGroup(prev => data)

            }).catch(error => {
                console.log(error);
            })


    }, []);

    const handleOk2 = e => {


        Axios.put("http://127.0.0.1:8000/api/todo/favoritegroup/" + editstate.seq + "/", favoritegroup)
            .then(res => {

                Axios.get("http://127.0.0.1:8000/api/todo/favoritegroup?status=" + favoritegroup.status)
                    .then(res => {
                        const { data } = res;

                        setFavoriteGroupList(prev => ({
                            ...prev,
                            [favoritegroup.status]: data
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

        setFavoriteGroup({
            ...favoritegroup,
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
                {favoritegroup.name}, {favoritegroup.end_date}   {editstate.seq}
                <div>이름
            <input type="text" value={favoritegroup.name} name="name" onChange={change} /></div>
                <div>종료일
            <input type="date" value={favoritegroup.end_date} name="end_date" onChange={change} /></div>
            </Modal>
        </>
    );
}

export default function FavoriteGroup({ history, location, match }) {

    const [favoritegroup, setFavoriteGroup] = React.useState([]);

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
        Axios.get("http://127.0.0.1:8000/api/todo/favoritegroup/",{
            headers: {
              Authorization: "JWT " + window.localStorage.getItem("token")
            }
          })
            .then(res => {
                console.dir(res)
                //const data = res.data;
                const { data } = res;
                setFavoriteGroup(data);
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

        setFavoriteGroup({
            ...favoritegroup,
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

        Axios.delete("http://127.0.0.1:8000/api/todo/favoritegroup/" + select.seq)
            .then(res => {

                return Axios.get("http://127.0.0.1:8000/api/todo/favoritegroup?status=" + select.status)

            }).catch(error => {
                console.log(error);
            }).then(res => {

                const { data } = res;

                setFavoriteGroup(prev => data)

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
            <div className="detail2">
                {
                    favoritegroup.map((v, i) => {
                        return (
                            <div className="List">
                                <div><h3>{v.name}</h3>{v.reg_date}
                                    <DeleteFilled id="button2" onClick={() => { showModalDelete(v.seq, v.status) }} />
                                    <EditFilled id="button3" onClick={() => { showModalEdit(v.seq) }} /></div>
                            </div>
                        )
                    })
                }
            </div>
            <State state={state} setState={setState} setFavoriteGroupList={setFavoriteGroup}/>
            <EditState editstate={editstate} setEditState={setEditState} setFavoriteGroupList={setFavoriteGroup} />

        </>
    )
}

