import { differenceInMinutes } from "date-fns";
import webEligible from "./web-eligible";
import phoneEligible from "./phone-eligible";

function eligible({
  requestSource,
  tos,
  reversalRequestUtcDateTime,
  investmentUtcDateTime,
}: {
  requestSource: "phone" | "web app";
  tos: "new" | "old";
  reversalRequestUtcDateTime: Date;
  investmentUtcDateTime: Date;
}) {
  if (requestSource === "web app") {
    const minutesBetween = differenceInMinutes(
      reversalRequestUtcDateTime,
      investmentUtcDateTime
    );

    return webEligible({ tos, minutesBetween });
  }

  return phoneEligible({
    tos,
    reversalRequestUtcDateTime,
    investmentUtcDateTime,
  });
}

export default eligible;
