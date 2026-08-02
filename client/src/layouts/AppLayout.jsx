import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Toolbar from '../pages/Board/toolbar/ToolBar';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import AppHeader from './components/Header';
const { Header, Content } = Layout;
const AppLayout = ({ children }) => {
  return (
    <Layout className='h-screen'>
      <AppHeader />
      <Layout>
        <LeftSidebar />
        <Content className='bg-slate-500'>
          {children}
        </Content>
        <RightSidebar />
      </Layout>
    </Layout>
  )
}

export default AppLayout