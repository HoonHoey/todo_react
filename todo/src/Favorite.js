import React from 'react';
import { Modal, Button } from 'antd';
import Axios from 'axios';

function State({ state, setState, setFavoriteList }) {

    const [favorite, setFavorite] = React.useState({
        name: '',
        url: '',
        memo: '',
        reg_date: '',
        group: 0
    });

    const [group, setGroup] = React.useState([])

    const input = e => {
        setFavorite([])
      }

    React.useEffect(()=>{

        Axios.get("http://127.0.0.1:8000/api/todo/favoritegroup/")
        .then(res => {
    
          const { data } = res;
    
          setGroup(prev => data)
        //   setFavorite(prev=> ({
        //       ...prev,
        //       group: data[0].seq
        //   }))
    
        }).catch(error => {
          console.log(error);
        })
    
      
      },[]);

    const handleOk = e => {
        Axios.post("http://127.0.0.1:8000/api/todo/favorite/", favorite)

            .then(res => {

                Axios.get("http://127.0.0.1:8000/api/todo/favorite/")
                    .then(res => {
                        const { data } = res;

                        setFavoriteList(prev => data)
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

        setFavorite({
            ...favorite,
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
                {favorite.name}
                <div>이름
          <input type="text" value={favorite.name} name="name" onChange={change} /></div>
                <div>주소
          <input type="text" value={favorite.url} name="url" onChange={change} /></div>
                <div>메모
          <input type="text" value={favorite.memo} name="memo" onChange={change} /></div>
                <div>종료
          <input type="date" value={favorite.reg_date} name="reg_date" onChange={change} /></div>
                <div>구분
          <select type="text" value={favorite.group} name="group" onChange={change}>
              <option value="">선택</option>
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

export default function Favorite({ history, location, match }) {

    const [favorite, setFavorite] = React.useState([])

    const [state, setState] = React.useState({
        visible: false
    });

    const showModal = () => {
        setState({
            visible: true,
        });
    };


    React.useEffect(() => {
        Axios.get("http://127.0.0.1:8000/api/todo/favorite/")
            .then(res => {
                console.dir(res)
                //const data = res.data;
                const { data } = res;
                setFavorite(data);
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

        setFavorite({
            ...favorite,
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

        Axios.delete("http://127.0.0.1:8000/api/todo/favorite/" + select.seq)
            .then(res => {

                return Axios.get("http://127.0.0.1:8000/api/todo/favorite?status=" + select.status)

            }).catch(error => {
                console.log(error);
            }).then(res => {

                const { data } = res;

                setFavorite(prev => data)

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

            <div><Button id="button" type="primary" ghost onClick={showModal}>+ 추가</Button></div>
            <div className="detail2">
                {
                    favorite.map((v, i) => {
                        return (
                            <div className="List">
                                <div><h3>{v.name}</h3>{v.memo}  {v.url}{v.reg_date}
                                    <Button id="button2" type="primary" danger ghost onClick={() => { showModalDelete(v.seq, v.status) }} class="button" >삭제</Button></div>
                            </div>
                        )
                    })
                }
            </div>
            <State state={state} setState={setState} setFavoriteList={setFavorite} />
        </>
    )
}