import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchBusinessHoursRequest } from "../store/businessHours/slice";
import { selectBusinessHours } from "../store/businessHours/selectors";

const Container = styled.div`
  padding: 24px 32px;
  background: #f5f7fb;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  width: 600px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
`;

const Day = styled.div`
  width: 120px;
  font-weight: 500;
`;

const SlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Slot = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TimeInput = styled.input`
  padding: 6px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
`;

const Dash = styled.span``;

const Closed = styled.div`
  color: #9ca3af;
`;

const Toggle = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const AddSlotBtn = styled.button`
  border: none;
  background: #eef2ff;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 10px;
  background: #4f8cff;
  color: white;
  border: none;
  border-radius: 8px;
`;

const BusinessHours = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBusinessHoursRequest());
  }, [dispatch]);

  const [data, setData] = useState<any[]>(
    useSelector(selectBusinessHours) || [],
  );

  const toggleClosed = (index: number) => {
    const updated = [...data];
    updated[index].isClosed = !updated[index].isClosed;
    if (updated[index].isClosed) updated[index].slots = [];
    else updated[index].slots = [{ startTime: "09:00", endTime: "17:00" }];
    setData(updated);
  };

  const handleTimeChange = (
    dayIndex: number,
    slotIndex: number,
    field: string,
    value: string,
  ) => {
    const updated = [...data];
    updated[dayIndex].slots[slotIndex][field] = value;
    setData(updated);
  };

  const addSlot = (index: number) => {
    const updated = [...data];
    updated[index].slots.push({ startTime: "", endTime: "" });
    setData(updated);
  };

  const validate = () => {
    for (let day of data) {
      for (let slot of day.slots) {
        if (slot.startTime >= slot.endTime) {
          alert("Invalid time range");
          return false;
        }
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    console.log("Saving:", data);
  };

  return (
    <Container>
      <Title>Business Hours</Title>

      <Card>
        {data.map((item, i) => (
          <Row key={item.day}>
            <Day>{item.day}</Day>

            {item.isClosed ? (
              <Closed>Closed</Closed>
            ) : (
              <SlotContainer>
                {item.slots.map((slot: any, j: number) => (
                  <Slot key={j}>
                    <TimeInput
                      type="time"
                      value={slot.startTime}
                      onChange={(e) =>
                        handleTimeChange(i, j, "startTime", e.target.value)
                      }
                    />
                    <Dash>-</Dash>
                    <TimeInput
                      type="time"
                      value={slot.endTime}
                      onChange={(e) =>
                        handleTimeChange(i, j, "endTime", e.target.value)
                      }
                    />
                  </Slot>
                ))}
                <AddSlotBtn onClick={() => addSlot(i)}>+</AddSlotBtn>
              </SlotContainer>
            )}

            <Toggle onClick={() => toggleClosed(i)}>
              {item.isClosed ? "🔒" : "🕒"}
            </Toggle>
          </Row>
        ))}

        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </Card>
    </Container>
  );
};

export default BusinessHours;
