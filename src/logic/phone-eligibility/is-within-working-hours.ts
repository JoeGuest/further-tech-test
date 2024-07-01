import { getDay, getHours } from "date-fns";

function isWithinWorkingHours(date: Date) {
  const day = getDay(date);
  const hours = getHours(date);

  const isWorkingDay = day >= 1 && day <= 5; // Monday to Friday
  const isWorkingHour = hours >= 9 && hours < 17; // 9am to 5pm

  return isWorkingDay && isWorkingHour;
}

export default isWithinWorkingHours;
