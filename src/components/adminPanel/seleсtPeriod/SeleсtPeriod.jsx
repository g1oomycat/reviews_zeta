import React from "react";
import Select from "react-select";
import { selectMonth } from "../../../anyList/month";
import { customStyles } from "../../../anyList/customSelect";

const options = [
  { value: { lastDays: 7 }, label: "Последние 7 дней" },
  { value: { lastDays: 30 }, label: "Последние 30 дней" },
  { value: { month: new Date().getMonth() }, label: "Этот месяц" },
  {
    label: "Год",
    options: Array.from(
      { length: new Date().getFullYear() - 2024 + 1 },
      (_, index) => ({ value: { year: 2024 + index }, label: 2024 + index })
    ),
  },
  {
    label: "Месяц",
    options: selectMonth.filter(
      (el) => el.value.month <= new Date().getMonth()
    ),
  },
];

const SeleсtPeriod = ({ selectedPeriod, setSelectedPeriod }) => {
  return (
    <Select
      defaultValue={selectedPeriod}
      onChange={setSelectedPeriod}
      options={options}
      styles={customStyles}
    />
  );
};

export default SeleсtPeriod;
