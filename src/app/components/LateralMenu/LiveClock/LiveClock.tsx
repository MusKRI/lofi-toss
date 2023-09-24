
import { useState, useEffect } from "react";
import { format } from "date-fns";

const LiveClock = () => {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return <p className="text-[14px] font-semibold">{format(date, "p")}</p>;
};

export default LiveClock;
