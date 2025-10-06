import React from "react";

type SummaryProps = {
  dayLow: number;
  dayHigh: number;
  prevLow: number;
  prevHigh: number;
  current: number;
};

const Summary: React.FC<SummaryProps> = ({
  dayLow,
  dayHigh,
  prevLow,
  prevHigh,
  current,
}) => {
  const [animatedPrice, setAnimatedPrice] = React.useState(0);
  const [dayMarkerPosition, setDayMarkerPosition] = React.useState(0);
  const [prevMarkerPosition, setPrevMarkerPosition] = React.useState(0);

  React.useEffect(() => {
    const start = 0;
    const duration = 3000;
    const stepTime = 10;
    const steps = duration / stepTime;
    const increment = (current - start) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newPrice = start + increment * currentStep;
      setAnimatedPrice(Number(newPrice.toFixed(2)));

      // Day range position
      const dayRange = dayHigh - dayLow;
      const dayClamped = Math.min(Math.max(newPrice, dayLow), dayHigh);
      const dayRelative = ((dayClamped - dayLow) / dayRange) * 100;
      setDayMarkerPosition(dayRelative);

      // Previous range position
      const prevRange = prevHigh - prevLow;
      const prevClamped = Math.min(Math.max(newPrice, prevLow), prevHigh);
      const prevRelative = ((prevClamped - prevLow) / prevRange) * 100;
      setPrevMarkerPosition(prevRelative);

      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [current, dayLow, dayHigh, prevLow, prevHigh]);


  const timeStats = [
    { label: "Summary Time", value: "05:16 PM" },
    { label: "Summary Date", value: "01/27/23" },
  ];
  return (
    <div className="font-sans">
      <div className="p-3 py-4 border-t-[1px] border-b-[1px] h-[220px] border-[#E8E9FF]">
        {/* Day */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span>
              <h2>{dayLow.toFixed(2)}</h2>
              <p className="text-[13px] text-[#838383] font-normal">Day Low</p>
            </span>
            <span>
              <h2>{dayHigh.toFixed(2)}</h2>
              <p className="text-[13px] text-[#838383] font-normal">Day High</p>
            </span>
          </div>
          <div className="h-[4px] w-full bg-[#FFBB5B] rounded-[1px] relative">
            <div
              className="absolute h-[17px] w-[2.95px] bg-[#2C2C2C] rounded-[2px] -top-[9px] transition-all duration-1000 ease-in-out"
              style={{
                left: `${dayMarkerPosition}%`,
                transform: "translateX(-50%)",
              }}
            >
              <span className="relative top-[13px] -left-[30px] text-[20px] text-[#2C2C2C] font-semibold">
                {animatedPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Previous */}
        <div className="mt-[3rem]">
          <div className="flex justify-between items-center mb-2">
            <span>
              <h2>{prevLow.toFixed(2)}</h2>
              <p className="text-[13px] text-[#838383] font-normal">
                Previous Low
              </p>
            </span>
            <span>
              <h2>{prevHigh.toFixed(2)}</h2>
              <p className="text-[13px] text-[#838383] font-normal">
                Previous High
              </p>
            </span>
          </div>
          <div className="h-[4px] w-full bg-[#FFBB5B] rounded-[1px] relative">
            <div
              className="absolute h-[17px] w-[2.95px] bg-[#2C2C2C] rounded-[2px] -top-[9px] transition-all duration-1000 ease-in-out"
              style={{
                left: `${prevMarkerPosition}%`,
                transform: "translateX(-50%)",
              }}
            >
              <span className="relative top-[13px] -left-[30px] text-[20px] text-[#2C2C2C] font-semibold">
                {animatedPrice}
              </span>
            </div>
          </div>
        </div>

      </div>
        <div className="px-3 mt-4 ms-2">
          <div className="grid grid-cols-2 gap-y-6 gap-x-6">
            {timeStats.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="text-[14px] text-[#838383] font-sans">
                  {label}
                </span>
                <span className="text-[20px] text-[#2C2C2C] font-semibold font-sans">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Summary;
