import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Settings,
} from "lucide-react";

const SidebarWrapper = styled.div`
  width: 240px;
  background: #0f172a;
  color: #cbd5e1;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-bottom: 30px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #94a3b8;
  font-size: 14px;
  transition: all 0.2s;

  &.active {
    background: #2563eb;
    color: white;
  }

  &:hover {
    background: #1e293b;
    color: white;
  }
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Logo>Dentra</Logo>

      <Menu>
        <MenuItem to="/">
          <LayoutDashboard size={18} />
          Dashboard
        </MenuItem>

        <MenuItem to="/appointments">
          <Calendar size={18} />
          Appointments
        </MenuItem>

        <MenuItem to="/patients">
          <Users size={18} />
          Patients
        </MenuItem>

        <MenuItem to="/business-hours">
          <Clock size={18} />
          Schedule
        </MenuItem>

        <MenuItem to="/settings">
          <Settings size={18} />
          Settings
        </MenuItem>
      </Menu>
    </SidebarWrapper>
  );
};

export default Sidebar;
