import styled, { StyledComponent, StyledFunction, css } from 'styled-components';
import { Menu, Button, Layout } from 'antd';
const { Sider } = Layout;
import { get } from 'lodash';

const SubMenu = Menu.SubMenu;
export const ClientInfo = styled.div.attrs({
  className: 'client-Info',
})``;

export const SiderCollapsible = styled(Sider).attrs({
  className: 'client-side-collapsible',
})`
  &.ant-layout-sider-collapsed {
    .btn-sidebar {
      border-radius: 100%;
      width: 60px;
      height: 60px;
      transition: all ease 200ms;
      span {
        display: none;
      }
    }
  }
`;
// ant-menu-submenu-open ant-menu-submenu-active
// aria-owns="sub"
export const FullName = styled.span.attrs({
  className: 'client-full-name',
})`
  font-size: 18px;
  color: #515c83;
  margin-left: 15px;
`;
export const ClientSide = styled(Menu).attrs({
  className: 'client-side-modify',
})`
  height: calc(100vh - 90px);
  overflow-y: overlay;
  overflow-x: hidden;
  border-right: none !important;
  &.ant-menu-inline-collapsed {
    & > .ant-menu-submenu {
      & > .ant-menu-submenu-title {
        padding: 0px 5px !important;
        .client-Info {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70px;
        }
        .client-full-name {
          display: none;
        }
      }
    }
  }
`;

export const ClientItem = styled(SubMenu).attrs({
  className: 'client-item-modify',
})`
  .ant-menu-submenu-title {
    height: 70px !important;
    line-height: 68px !important;
    width: calc(100% - 10px) !important;
    margin: 0 auto !important;
    border-radius: 5px;
    /* background: #E0E3E8; */
    position: relative;
    &:hover {
      background-color: #e0e3e8;
    }
  }
  .ant-menu-sub {
    border-top: 1px solid #d8d8d8 !important;
    border-bottom: 1px solid #d8d8d8 !important;
    padding-top: 5px !important;
    margin-top: 5px !important;
  }
`;

export const StatusList = styled(Menu.Item).attrs({
  className: 'status-list-modify',
})`
  /* overflow: hidden; */
  /* width: 100%!important; */
  margin: 0px !important;
`;

export const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const DateItem = styled.span`
  font-size: 12px;
  position: relative;
  padding-left: 20px;
  color: #515c83;
  &:after {
    content: '';
    width: 10px;
    height: 10px;
    background: #d8d8d8;
    display: inline-block;
    border-radius: 100%;
    position: absolute;
    left: 0px;
    top: calc(50% - 5px);
  }
`;

interface StatusTags {
  readonly tagName: string;
}

export const StatusTags = styled.span<StatusTags>`
  font-size: 10px;
  width: 96px;
  display: inline-block;
  height: 17px;
  border-radius: 8px;
  text-align: center;
  line-height: 17px;
  color: ${({ tagName, theme }) => get(theme, `colors.text-${tagName}`)};
  background-color: ${({ tagName, theme }) => get(theme, `colors.bg-${tagName}`)};
`;
export const ButtonSideBar = styled(Button).attrs({
  className: 'btn-sidebar',
})`
  width: 212px;
  height: 52px;
  border-radius: 26px;
  font-size: 18px;
  display: block;
  margin: 15px auto;
`;
