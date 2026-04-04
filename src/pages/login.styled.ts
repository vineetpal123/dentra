import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fb;
`;

export const Card = styled.div`
  width: 380px;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: #4f8cff;
  }
`;

export const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  background: ${({ disabled }) => (disabled ? "#cbd5e1" : "#4f8cff")};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) => (disabled ? "#cbd5e1" : "#3b6fd8")};
  }
`;

export const OtpContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

export const OtpInput = styled.input`
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

export const LinkText = styled.p`
  margin-top: 10px;
  color: #4f8cff;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 13px;
  margin-bottom: 10px;
`;
