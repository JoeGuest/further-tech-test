import { parse } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

const timezoneLookup = new Map<string, string>([
  ["US (PST)", "America/Los_Angeles"],
  ["Europe (CET)", "Europe/Paris"],
  ["Europe (GMT)", "Europe/London"],
  ["US (EST)", "America/New_York"],
]);

function convertToUtc({
  timezone,
  date,
  time,
}: {
  timezone: string;
  date: string;
  time: string;
}) {
  const isUsCustomer = timezone.includes("US (");
  const dateFormat = isUsCustomer ? "M/d/yyyy" : "d/M/yyyy";

  const validTimezone = timezoneLookup.get(timezone);

  if (!validTimezone) {
    throw new Error(`Unknown timezone: ${timezone}`);
  }

  const investmentDateTimeStr = `${date} ${time}`;

  const parsedDate = parse(
    investmentDateTimeStr,
    `${dateFormat} HH:mm`,
    new Date()
  );

  const utcDateTime = fromZonedTime(parsedDate, validTimezone);

  return utcDateTime;
}

export default convertToUtc;
