import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  overflow: auto;
`;

const Main = styled.div`
  padding: 24px;
  overflow-y: auto;
`;

const MainLayout = () => {
  return (
    <Layout>
      <Sidebar />
      <Content>
        <Navbar />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </Layout>
  );
};

export default MainLayout;
