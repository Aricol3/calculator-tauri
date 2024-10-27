import {
  DateRangePicker, Divider, TimeInput
} from "@nextui-org/react";

const DateCalculator = () => {

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4">
      <DateRangePicker className="dark" variant="underlined" label="Date range" />
      <Divider />
      <div className="flex flex-wrap gap-4">
        <TimeInput label="Start Time" variant="bordered" />
        <TimeInput label="End Time" variant="bordered" />
      </div>
    </div>
  );
};

export default DateCalculator;