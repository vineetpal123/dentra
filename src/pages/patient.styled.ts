import styled from "styled-components";

export const Container = styled.div`
  //padding: 24px 32px;
  background: #f5f7fb;
  min-height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px; /* 🔥 key fix */
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
`;

export const AddButton = styled.button`
  background: #4f8cff;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

export const ContentWrapper = styled.div`
  max-width: 900px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const AddBtn = styled.button`
  background: #4a90e2;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #357bd8;
  }
`;

export const SearchWrapper = styled.div`
  margin-bottom: 16px;
`;

export const SearchInput = styled.input`
  width: 300px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;

  background: #fff;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #cbd5e1;
  }
`;

export const TableCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 8px 0;
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px 20px;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
`;

export const Row = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #f1f5f9;
  }
`;

export const Td = styled.td`
  padding: 14px 20px;
  font-size: 14px;
  color: #111827;
`;

export const Search = styled.input`
  width: 260px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  margin-bottom: 16px;
  background: #fff;
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

export const TableContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
`;

export const TableWrapper = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;

  background: ${(p) => (p.status === "Active" ? "#e8f8f0" : "#fdecec")};
  color: ${(p) => (p.status === "Active" ? "#22c55e" : "#ef4444")};
`;

export const EditButton = styled.button`
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: #fff;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;
