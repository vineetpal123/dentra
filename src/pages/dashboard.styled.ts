import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background: #f5f7fb;
  min-height: 100%;
  width: 100%;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

export const AddBtn = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #2563eb;
  }
`;

export const Cards = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Card = styled.div`
  background: white;
  padding: 16px;
  border-radius: 10px;
  flex: 1;
  border: 1px solid #eef1f6;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #dbeafe;
    transform: translateY(-2px);
  }
`;

export const CardTitle = styled.p`
  font-size: 13px;
  color: #6b7280;
`;

export const CardValue = styled.h2`
  margin-top: 6px;
  font-size: 20px;
  font-weight: 600;
`;

export const Section = styled.div``;

export const SectionTitle = styled.h4`
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
`;

export const ContentRow = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

export const CalendarWrapper = styled.div`
  flex: 2;
  background: white;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #eef1f6; /* 🔥 replaced shadow */
`;

export const AppointmentsBox = styled.div`
  flex: 1;
  background: white;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #eef1f6; /* 🔥 replaced shadow */
`;

export const AppointmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #f1f5f9;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e0e7ff;
`;

export const SubText = styled.p`
  font-size: 11px;
  color: #9ca3af;
`;

export const Badge = styled.span`
  background: #e0edff;
  color: #3b82f6;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
`;

export const ViewAll = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #3b82f6;
  cursor: pointer;
`;

export const TableSection = styled.div`
  margin-top: 16px;
  background: white;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #eef1f6; /* 🔥 replaced shadow */
`;

export const TableTitle = styled.h4`
  margin-bottom: 12px;
  font-size: 14px;
`;

export const TimeRow = styled.div`
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
`;

export const Time = styled.div`
  width: 90px;
  font-size: 13px;
  font-weight: 500;
`;

export const TimeContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionBtn = styled.button`
  background: ${(props: any) => (props.danger ? "#ef4444" : "#3b82f6")};
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;
