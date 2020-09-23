import React from 'react';
import Axios from 'axios';
import queryString from 'query-string';
import {BrowserRouter, Route, Link, NavLink, Switch} from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, HomeOutlined  } from '@ant-design/icons';



export default function RouterTest(){
    
    const { SubMenu } = Menu;

    const active = {
        color:"red"
    }

    const [current,setCurrent] = React.useState("mail");
    
    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
      };

    return (
        <>

        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="app" icon={<HomeOutlined />}>
                <NavLink exact to="/"  activeStyle={active}>
            Home
                </NavLink>
          </Menu.Item>
          <Menu.Item key="app" icon={<AppstoreOutlined />}>
                <NavLink exact to="/students"  activeStyle={active}>
            Students
                </NavLink>
          </Menu.Item>
          <Menu.Item key="app" icon={<AppstoreOutlined />}>
                <NavLink exact to="/scores"  activeStyle={active}>
            Scores
                </NavLink>
          </Menu.Item> 


          
        </Menu>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/students/:id" component={Detail}/>
            <Route path="/students" component={Students}/>
            <Route path="/scores" component={Scores}/>
            <Route component={Nopage}/>
        </Switch>
    
        </>
    );
    
    
    // return (<BrowserRouter>
    //     <div>
    //         <BrowserRouter>
    //             <div id="menu">
    //                 <NavLink exact to="/"  activeStyle={active}>Home</NavLink>
    //                 <NavLink to="/students"  activeStyle={active}>students</NavLink>
    //             </div>
    //             <div id="content">
    //                 <Layout>
    //                     <Switch>
    //                         <Route exact path="/" component={Home}/>
    //                         <Route path="/students/:id" component={Detail}/>
    //                         <Route path="/students" component={Students}/>
    //                         <Route component={Nopage}/>
    //                     </Switch>
    //                 </Layout>
    //             </div>
    //         </BrowserRouter>
    //     </div>
    // )
}


function Layout({children}){
    return(
        <>
        <div>디자인</div>
        {children}
        </>
    )
}

function Home({history, location, match})
{
    return(
        <div>
            Home
        </div>
    )
}

function Nopage({history, location, match})
{
    
    return(
        <div>
            Nopage
        </div>
    )
}


function Students({history, location, match})
{

    const [students, setStudents] = React.useState([]);

    React.useEffect(()=>{
        Axios.get("http://127.0.0.1:8000/api/study/students/")
        .then(res=>{
            console.dir(res)
            //const data = res.data;
            const {data} = res;
            setStudents(data);
        }).catch(error=>{
            console.log(error);
        })
    },[])

    const click = () => {
        history.push('/')
    }

    return(
        <>
        <table>
        {
        students.map((v, i) => {
        return ( 
                <tr>
                    <td>{v.name}</td> 
                    <td>{v.email}</td> 
                    <td>{v.address}</td> 
                </tr>
        )
        })
        }
        </table>
        </>
    )
}

function Scores({history, location, match})
{

    const [scores, setScores] = React.useState([]);

    React.useEffect(()=>{
        Axios.get("http://127.0.0.1:8000/api/study/scores/")
        .then(res=>{
            console.dir(res)
            //const data = res.data;
            const {data} = res;
            setScores(data);
        }).catch(error=>{
            console.log(error);
        })
    },[])
    

    const click = () => {
        history.push('/')
    }

    
        return(
            <>
            <table>
            {
            scores.map((v, i) => {
            return ( 
                    <tr>
                        <td>{v.name}</td> 
                        <td>{v.math}</td> 
                        <td>{v.english}</td> 
                        <td>{v.science}</td>
                    </tr>
            )
            })
            }
            </table>
            </>
        )
}





function Detail({history, location, match})
{
    const qs = queryString.parse(location.serch);
    console.dir(qs)

    return(
        <div>
            {match.params.id}   
            {qs.name}
            {qs.age}         
        </div>
    )
}