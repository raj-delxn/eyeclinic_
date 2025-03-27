import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function CalendarComponent() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(new Date());
  }, []);

  return (
    <div className="custom-calendar">
      {value && (
        <Calendar
          onChange={setValue}
          value={value}
          tileClassName={({ date, view }) =>
            view === 'month' && date.toDateString() === new Date().toDateString()
              ? 'highlight-today'
              : null
          }
        />
      )}
    </div>
  );
}

