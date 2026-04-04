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
  padding: 20px;
  overflow-y: auto;
  min-height: 100%;
  width: 100%;
  max-width: 1200px; /* 🔥 key fix */
`;

const HeaderContainer = styled.div`
  height: 120px;
`;

const Header = styled.div`
  height: 64px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid #e2e8f0;
`;

const MainLayout = () => {
  return (
    <Layout>
      <Sidebar />
      <Content>
        <HeaderContainer>
          <Header>
            <Navbar />
          </Header>
        </HeaderContainer>

        <Main>
          <Outlet />
        </Main>
      </Content>
    </Layout>
  );
};

export default MainLayout;
