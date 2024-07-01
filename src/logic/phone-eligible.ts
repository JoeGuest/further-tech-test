import { differenceInMinutes } from "date-fns";
import {
  isWithinWorkingHours,
  getNextWorkingDayAt9am,
} from "./phone-eligibility";

function phoneEligible({
  tos,
  reversalRequestUtcDateTime,
  investmentUtcDateTime,
}: {
  tos: "new" | "old";
  reversalRequestUtcDateTime: Date;
  investmentUtcDateTime: Date;
}) {
  if (isWithinWorkingHours(reversalRequestUtcDateTime)) {
    const minutesBetween = differenceInMinutes(
      reversalRequestUtcDateTime,
      investmentUtcDateTime
    );

    return tos === "new" ? minutesBetween / 60 < 24 : minutesBetween / 60 < 4;
  }

  const nextWorkingDay = getNextWorkingDayAt9am(reversalRequestUtcDateTime);

  const minutesBetween = differenceInMinutes(
    nextWorkingDay,
    investmentUtcDateTime
  );

  return tos === "new" ? minutesBetween / 60 < 24 : minutesBetween / 60 < 4;
}

export default phoneEligible;
