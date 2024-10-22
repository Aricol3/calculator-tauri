import {
  DateRangePicker,
} from "@nextui-org/react";

const DateCalculator = () => {

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4">
      <DateRangePicker className="dark" variant="bordered" color="secondary" />
    </div>
  );
};

export default DateCalculator;