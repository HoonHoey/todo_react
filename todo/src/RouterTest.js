import React from 'react';
import Axios from 'axios';
import queryString from 'query-string';
import {BrowserRouter, Route, Link, NavLink, Switch} from 'react-router-dom';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, HomeOutlined  } from '@ant-design/icons';
import 'RouterTest.css'
import IMG from 'img/logo.PNG'
import { Modal, Button } from 'antd';
import Todo from 'Todo'
import TodoGroup from 'TodoGroup'
import Favorite from 'Favorite'
import FavoriteGroup from 'FavoriteGroup'



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
                <Route component={Nopage}/>
            </Switch>
            </div>
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
