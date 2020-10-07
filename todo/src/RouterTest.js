import React, { useState } from 'react';
import Axios from 'axios';
import queryString from 'query-string';
import {BrowserRouter, Route, Link, NavLink, Switch} from 'react-router-dom';
import { Menu, Form, Input, Button, Checkbox, message } from 'antd';
import { MailOutlined, AppstoreOutlined, HomeOutlined  } from '@ant-design/icons';
import 'RouterTest.css';
import IMG from 'img/logo.PNG';
import Todo from 'Todo';
import TodoGroup from 'TodoGroup';
import Favorite from 'Favorite';
import FavoriteGroup from 'FavoriteGroup';
import Log from 'Log';
import LoginContext from 'Utils'


export default function RouterTest(){

    const [islogin, setIsLogin] = React.useState(false)

    

    const login = React.useContext(LoginContext);

    React.useEffect(() => {

        const token = window.localStorage.getItem("token");
        console.log(token);
        if (token === null){
            setIsLogin(false)
        }
        else {
            setIsLogin(true)
        }

        // Axios.post("http://localhost:8000/api/account/api-jwt-auth", values)
        //     .then(res => {
        //         window.localStorage.getItem("token", res.data.token);
        //         login.setIsLogin(true)
        //     }).catch(error => {
        //         message.info('Please Check again');
        //     })
    }, [])

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
            
            <LoginContext.Provider value={{islogin, setIsLogin}}>
            {islogin? <button>로그아웃</button>:<><Button id="button" type="primary"><Link exact to="/login">LogIn</Link></Button></>}
            <div id="menu">
                
            <img src={IMG} id="logo"/>
            
            <Menu onClick={handleClick} style={{ width:256 }} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}  mode="inline">
                <SubMenu key="sub1" title={ 
                    <span>
                        <MailOutlined />
                        <span>Todo Project</span>
                    </span>
                    }>
                    
                    <Menu.ItemGroup key="g1" title="Todo">
                        
                            <Menu.Item key="1">
                                <Link exact to="/todo">할 일</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link exact to="/todogroup">관리</Link>
                            </Menu.Item>
                        
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key="g2" title="Favorite">
                        
                            <Menu.Item key="3">
                                <Link exact to="/favorite">좋아하는 것</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link exact to="/favoritegroup">관리</Link>
                            </Menu.Item>
                        
                    </Menu.ItemGroup>
                   
              
                </SubMenu>
            </Menu>
            </div>
            <div id="main">
            <div id="head"/>
            <Switch>
                <Route exact path="/" component={Home}/>
                {/* <Route path="/todo/:id" component={Detail}/> */}
                <Route path="/todo" component={Todo}/>
                <Route path="/todogroup" component={TodoGroup}/>
                <Route path="/favorite" component={Favorite}/>
                <Route path="/favoritegroup" component={FavoriteGroup}/>
                <Route path="/login" component={Log}/>
                <Route component={Nopage}/>
            </Switch>
            </div>
            </LoginContext.Provider>
        </>
    );
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


// function Detail({history, location, match})
// {
//     const qs = queryString.parse(location.serch);
//     console.dir(qs)

//     return(
//         <div>
//             {match.params.id}   
//             {qs.name}
//             {qs.age}         
//         </div>
//     )
// }



    /* // return (<BrowserRouter>
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
} */
