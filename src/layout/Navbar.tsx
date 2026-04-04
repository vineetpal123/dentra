import styled from "styled-components";
import { Bell } from "lucide-react";

const Search = styled.input`
  width: 320px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #2563eb;
    background: white;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: #e2e8f0;
  }
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  background: #2563eb;
  border-radius: 50%;
`;

const Navbar = () => {
  return (
    <>
      <Search placeholder="Search patients or appointments..." />

      <RightSection>
        <IconWrapper>
          <Bell size={18} />
        </IconWrapper>
        <Avatar />
      </RightSection>
    </>
  );
};

export default Navbar;
