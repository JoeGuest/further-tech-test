import {
  getDay,
  getHours,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  addDays,
} from "date-fns";

function getNextWorkingDayAt9am(date: Date) {
  const day = getDay(date);
  const hours = getHours(date);

  // Set up 9am for next working day
  let newDate = date;
  newDate = setHours(newDate, 9);
  newDate = setMinutes(newDate, 0);
  newDate = setSeconds(newDate, 0);
  newDate = setMilliseconds(newDate, 0);

  // If it's before 9am on a weekday, use 9am on the same day
  if (hours < 9 && day >= 1 && day <= 5) {
    return newDate;
  }

  // If it's after 5pm or a weekend, move to the next day
  newDate = addDays(newDate, 1);

  // Move to the next weekday if it's a weekend
  while (getDay(newDate) === 0 || getDay(newDate) === 6) {
    newDate = addDays(newDate, 1);
  }

  return newDate;
}

export default getNextWorkingDayAt9am;
