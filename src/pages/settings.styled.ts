import styled from "styled-components";

export const Container = styled.div`
  padding: 24px 32px;
  background: #f5f7fb;
  min-height: 100vh;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background: #fff;
  padding: 24px 32px;
  border-radius: 12px;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const Section = styled.div`
  margin-bottom: 24px;
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    color: #555;
  }
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4f8cff;
  }
`;

export const ImageUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const ToggleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  label {
    font-size: 14px;
  }
`;

export const SaveButton = styled.button`
  margin-top: 16px;
  padding: 12px;
  background: #4f8cff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #3b6fd8;
  }
`;
