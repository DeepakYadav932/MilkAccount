import React from "react";
import "./month-picker.css";
import { DropdownItem, DropdownMenu } from "../dropdown/dropdown";
import logger from "../../services/logger/logger";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { setDropdownItems } from "../../stores/sales/salesSlice";

// eslint-disable-next-line react-refresh/only-export-components
export const MONTH_OPTIONS: DropdownItem[] = [
  { value: "", label: "Select Month" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export const YEAR_OPTIONS: DropdownItem[] = [
  { value: "", label: "Select Year" },
  {
    value: "2025",
    label: "2025",
  },
  {
    value: "2026",
    label: "2026",
  },
];

/**
 * Month Picker dropdown
 * @returns {React.FC}
 */
export const MonthPicker: React.FC = () => {
  const dispatch = useAppDispatch()
  const salesStore = useAppSelector(state => state.sales)
  const onMonthChange = (selectedMonth: string) => {
    dispatch(setDropdownItems({ selectedMonth, selectedYear: salesStore.ddItems.selectedYear }))
  };

  const onYearChange = (selectedYear: string) => {
    dispatch(setDropdownItems({ selectedYear, selectedMonth: salesStore.ddItems.selectedMonth }))
  };

  try {
    return (
      <>
        <label className="label"> Choose month & year</label>
        <DropdownMenu ddData={MONTH_OPTIONS} onChange={onMonthChange} value={salesStore.ddItems.selectedMonth}/>
        <DropdownMenu ddData={YEAR_OPTIONS} onChange={onYearChange} value={salesStore.ddItems.selectedYear}/>
      </>
    )
  } catch (err) {
    logger.logError(`Error rendering month-picker => month-picker.tsx`, err);
  }
};
