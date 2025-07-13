import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { format, fromUnixTime } from 'date-fns'; // Or your preferred date library
/**
 * DateSlider component allows users to select a date range using a slider.
 * It accepts minDate and maxDate as props, which should be in a format recognized by Date.parse.
 * The onDateChange callback is called with the selected date range when the slider value changes.
 */
const DateSlider = ({ minDate, maxDate, onDateChange, fromDate, toDate }) => {
  const minTimestamp = Date.parse(minDate);
  const maxTimestamp = Date.parse(maxDate);
  const fromTimestamp = Date.parse(fromDate);
  const toTimestamp = Date.parse(toDate);
  
  const [value, setValue] = useState([fromTimestamp, toTimestamp]);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onDateChange) {
      onDateChange(newValue.map(timestamp => fromUnixTime(timestamp / 1000))); // Convert back to date objects for callback
    }
  };

  return (
    <div>
      <Slider
        range
        min={minTimestamp}
        max={maxTimestamp}
        defaultValue={value}
        value={value}
        onChange={handleChange}
        step={86400000} // One day in milliseconds for date-based increments
        // Optional: customize the slider's appearance
        handleStyle={{
          borderColor: 'blue',
          height: 20,
          width: 20,
          marginLeft: -10,
          marginTop: -8,
          backgroundColor: 'white',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
        }}
        trackStyle={{ backgroundColor: 'blue', height: 5 }}
        railStyle={{ backgroundColor: 'lightgrey', height: 5 }}
      />
      <div>
        {value.map(timestamp => format(fromUnixTime(timestamp / 1000), 'MMMM dd, yyyy'))
          .join(' - ')}
      </div>
    </div>
  );
};

export default DateSlider;