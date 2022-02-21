/* eslint-disable react/no-array-index-key */
import React from 'react';

import {
  MdAccountCircle,
  MdBorderAll,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdKeyboardArrowDown,
  MdTextFields,
  MdFileUpload,
  MdCloudUpload,
  MdCloudDownload,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../../utils/bemnames';
import SourceLink from '../SourceLink';
import sidebarBgImage from '../../assets/img/sidebar/sidebar-4.jpg';
import logo from '../../assets/img/logo/logo.png';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const docComponents = [
  {
    to: '/document-upload',
    name: 'upload',
    exact: false,
    Icon: MdCloudUpload,
  },
  {
    to: '/document-download',
    name: 'download',
    exact: false,
    Icon: MdCloudDownload,
  },
];

const navManageComponents = [
  {
    to: '/manage-verticals',
    name: 'verticals',
    exact: false,
    Icon: MdChromeReaderMode,
  },
  {
    to: '/manage-subverticals',
    name: 'subverticals',
    exact: false,
    Icon: MdAccountCircle,
  },
  {
    to: '/manage-vendors',
    name: 'vendors',
    exact: false,
    Icon: MdTextFields,
  },
  {
    to: '/manage-companies',
    name: 'company',
    exact: false,
    Icon: MdBorderAll,
  },
  {
    to: '/manage-client',
    name: 'clients',
    exact: false,
    Icon: MdAccountCircle,
  },
  {
    to: '/manage-transaction',
    name: 'transactions',
    exact: false,
    Icon: MdBorderAll,
  },
  {
    to: '/manage-aum',
    name: 'aum',
    exact: false,
    Icon: MdBorderAll,
  },
  {
    to: '/manage-expense',
    name: 'Expenses',
    exact: false,
    Icon: MdBorderAll,
  },
  {
    to: '/manage-insurancedetail',
    name: 'Insurance Details',
    exact: false,
    Icon: MdBorderAll,
  },
  {
    to: '/manage-termdeposits',
    name: 'Term Deposits',
    exact: false,
    Icon: MdBorderAll,
  },
];

const navItems = [
  { to: '/dashboard', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/file-upload', name: 'data upload', exact: true, Icon: MdFileUpload },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenDocuments: false,
    isOpenCategories: false,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img src={logo} width="60" height="60" className="pr-2" alt="" />
              <span className="text-white"></span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Categories')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Categories</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenCategories
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenCategories}>
              {navManageComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Documents')}>
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Documents</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenDocuments
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenDocuments}>
              {docComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}>
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
