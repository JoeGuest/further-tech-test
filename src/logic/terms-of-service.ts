import { isBefore } from "date-fns";

function termsOfService({
  signupDate,
  timezone,
}: {
  signupDate: string;
  timezone: string;
}) {
  const isUsCustomer = timezone.includes("US (");
  const dateToCompare = isUsCustomer ? "1/2/2020" : "2/1/2020";

  return isBefore(signupDate, dateToCompare) ? "old" : "new";
}

export default termsOfService;
