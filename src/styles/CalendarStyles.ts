import { createGlobalStyle } from "styled-components";

export const CalendarStyles = createGlobalStyle`

  .rbc-calendar {
    font-family: inherit;
  }

  .rbc-toolbar {
    margin-bottom: 10px;
  }

  .rbc-toolbar button {
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    padding: 4px 8px;
    font-size: 12px;
  }

  .rbc-toolbar button.rbc-active {
    background: #3b82f6;
    color: white;
  }

  .rbc-month-view {
    border: 1px solid #eef1f6;
    border-radius: 8px;
    overflow: hidden;
  }

  .rbc-date-cell {
    padding: 4px;
    font-size: 12px;
  }

  .rbc-today {
    background: #eff6ff !important;
  }

  .rbc-event {
    background: #3b82f6;
    border-radius: 6px;
    padding: 2px 4px;
    font-size: 11px;
  }

  .rbc-event:hover {
    background: #2563eb;
  }

`;
