// import { useState } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { format } from 'date-fns';
// import { Box } from '@mui/material';

// export const CustomCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

//   const handleDateChange = (newDate: Date | null) => {
//     setSelectedDate(newDate);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box className="p-4 flex flex-col items-center">
//         <StaticDatePicker
//           displayStaticWrapperAs="desktop"
//           value={selectedDate}
//           onChange={handleDateChange}
//           renderDay={(day, selectedDates, pickersDayProps) => (
//             <div
//               className={`${
//                 pickersDayProps.today ? 'text-red-600' : ''
//               } ${pickersDayProps.selected ? 'bg-green-500 text-white' : ''} ${
//                 !pickersDayProps.outsideCurrentMonth ? 'font-bold' : 'text-gray-400'
//               } w-10 h-10 flex items-center justify-center cursor-pointer`}
//               {...pickersDayProps}
//             >
//               {format(day, 'd')}
//             </div>
//           )}
//           renderInput={() => null}
//         />
//         <Box className="mt-4 text-lg font-bold">
//           {selectedDate ? format(selectedDate, 'MMMM yyyy') : ''}
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };


// import { useState } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { Box } from '@mui/material';

// export const CustomCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

//   const handleDateChange = (newDate: Date | null) => {
//     setSelectedDate(newDate);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box className="p-4 flex flex-col items-center">
//         <StaticDatePicker
//           displayStaticWrapperAs="desktop"
//           value={selectedDate}
//           onChange={handleDateChange}
//           renderDay={(day:any, selectedDates:any, pickersDayProps:any) => (
//             <div
//               className={`${
//                 pickersDayProps.today ? 'text-red-600' : ''
//               } ${pickersDayProps.selected ? 'bg-green-500 text-white' : ''} ${
//                 !pickersDayProps.outsideCurrentMonth ? 'font-bold' : 'text-gray-400'
//               } w-10 h-10 flex items-center justify-center cursor-pointer`}
//               {...pickersDayProps}
//             >
//               {day.getDate()}
//             </div>
//           )}
//           renderInput={() => null}
//         />
//         <Box className="mt-4 text-lg font-bold">
//           {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };



import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Grid } from '@mui/material';

export const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const currentDate = selectedDate || new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const days = daysInMonth(month, year);
    const dayComponents = [];

    for (let day = 1; day <= days; day++) {
      dayComponents.push(
        <Grid item xs={3} key={day}>
          <div className="w-10 h-10 flex items-center justify-center border border-gray-300 cursor-pointer">
            {day}
          </div>
        </Grid>
      );
    }
    return dayComponents;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="p-4 flex flex-col items-center">
        <Grid container spacing={1}>
          {renderDays()}
        </Grid>
        <Box className="mt-4 text-lg font-bold">
          {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
