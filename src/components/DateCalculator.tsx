import {
  CalendarDate,
  DateRangePicker,
  Divider, RangeValue,
  TimeInput, TimeInputValue
} from "@nextui-org/react";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useSelector } from "react-redux";
import { IRootState } from "../store.ts";

const DateCalculator = () => {
  const settings = useSelector((state: IRootState) => state.settings);

  useEffect(() => {
    getCurrentWindow().setSize(new LogicalSize(280, 470));
  }, []);

  const [dateRange, setDateRange] = useState<RangeValue<CalendarDate>>();
  const [startTime, setStartTime] = useState<TimeInputValue>();
  const [endTime, setEndTime] = useState<TimeInputValue>();
  const [output, setOutput] = useState("");

  const handleDateChange = (value: RangeValue<CalendarDate>) => {
    setDateRange(value);
    if (value.start && value.end) {
      calculateDifference("subtract_dates", value.start, value.end, " days");
    }
  };

  const handleTimeChange = (value: TimeInputValue, setter: (value: TimeInputValue) => void, otherTime: TimeInputValue | undefined, isStart: boolean) => {
    setter(value);

    if (!value || !otherTime) {
      setOutput("");
      return;
    }

    if (value && otherTime) {
      calculateDifference(
        "subtract_time",
        isStart ? value : otherTime,
        isStart ? otherTime : value,
        " minutes"
      );
    }
  };

  const calculateDifference = async (
    method: string,
    start: CalendarDate | TimeInputValue,
    end: CalendarDate | TimeInputValue,
    unit: string
  ) => {
    const result: number = await invoke(method, {
      start: start.toString(),
      end: end.toString()
    });
    setOutput(result > 0 ? `${result}${unit}` : "");
  };

  return (
    <div className="flex w-full flex-wrap flex-col md:flex-nowrap gap-4 mt-4">
      <DateRangePicker
        color={settings.buttonColor}
        className="dark"
        variant="underlined"
        label="Date range"
        value={dateRange}
        onChange={handleDateChange}
      />
      <Divider />
      <div className="flex gap-4">
        <TimeInput
          color={settings.buttonColor}
          label="Start Time"
          variant="bordered"
          value={startTime}
          onChange={(value) => handleTimeChange(value, setStartTime, endTime, true)}
        />
        <TimeInput
          color={settings.buttonColor}
          label="End Time"
          variant="bordered"
          value={endTime}
          onChange={(value) => handleTimeChange(value, setEndTime, startTime, false)}
        />
      </div>
      <h1 className="overflow-x-auto whitespace-nowrap text-center text-2xl max-w-full">
        {output}
      </h1>
    </div>
  );
};

export default DateCalculator;
