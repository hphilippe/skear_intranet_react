import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
//import './style.css';
import logo from '../../assets/img/SkearLogoPetit.png';

// constante
const { Sider } = Layout;

class HeaderIndex extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {

    return (

      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        style={{ overflow: 'hidden' }}
      >

        <Link to="/app">
          <div style={{ textAlign: 'center', position: 'fixed' }} className="logo">
            <img style={{ width: '140px', margin: '3px 0px 0px 15px' }} alt="logo" src={logo} />
          </div>
        </Link>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ marginTop: '70px', position: 'fixed' }}
        >
          <Menu.Item key="1">
            <NavLink to="/app">
              <Icon type="home" />
              <span>Acceuil</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink to="/post">
              <Icon type="audit" />
              <span>Documentations</span>
            </NavLink>
          </Menu.Item>
          
          <Menu.Item key="6">
            <NavLink to="/digital">
              <Icon type="global" />
              <span>Skear Digital</span>
            </NavLink>
          </Menu.Item>
          
          <Menu.Item key="7">
            <NavLink to="/games">
              <Icon type="qq" />
              <span>Skear Games</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="3">
            <NavLink exact to='/about'>
              <Icon type="team" />
              <span>Équipes</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="4">
            <NavLink exact to='/profil'>
              <Icon type="user" />
              <span>Profil</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="5" onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ position: 'fixed', bottom: '47px' }}>
            <Icon type="poweroff" />
            <span>Déconnecté</span>
          </Menu.Item>

        </Menu>
      </Sider>
    );

  }
}

export default HeaderIndex;