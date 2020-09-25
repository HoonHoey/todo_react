import React from 'react';
import { Modal, Button } from 'antd';
import Axios from 'axios';

function State({state, setState}){
    
    const[favoritegroup, setFavoriteGroup] = React.useState({
        name:'',
        }); 
    
    const  handleOk = e => {
      console.log(e);
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

        setFavoriteGroup({
            ...favoritegroup,
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
          {favoritegroup.name}
          <div>이름
          <input type="text" value={favoritegroup.name} name="name" onChange={change}/></div>
      </Modal>
      </>
      );
    }


export default function FavoriteGroup({history, location, match})
    {
    
        const [favoritegroup, setFavoriteGroup] = React.useState([]);
        
        const[state, setState] = React.useState({
            visible:false
            });
    
        const showModal = () => {
        setState({
        visible: true,
        });
        };
    

        React.useEffect(()=>{
            Axios.get("http://127.0.0.1:8000/api/todo/favoritegroup/")
            .then(res=>{
                console.dir(res)
                //const data = res.data;
                const {data} = res;
                setFavoriteGroup(data);
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
                favoritegroup.map((v, i) => {
                return ( 
                        <ul id="List">
                            <li><h3>{v.name}</h3>{v.reg_date}</li>
                        </ul>
                )
                })
                }
                </ul>
                </>
            )
    }
    
    