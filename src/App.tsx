import "./App.css";
import { parse, differenceInMinutes, isBefore } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import {
  RawRequestData,
  reversalRequestsRawData,
} from "./data/reversal-requests";

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

function termsOfService(signupDate: string, timezone: string) {
  const isUsCustomer = timezone.includes("US (");
  const dateToCompare = isUsCustomer ? "1/2/2020" : "2/1/2020";

  return isBefore(signupDate, dateToCompare) ? "old" : "new";
}

function webEligible(tos: "new" | "old", minutesBetween: number) {
  if (tos === "new") {
    return minutesBetween / 60 < 16;
  }

  return minutesBetween / 60 < 8;
}

function TableRow({ request }: { request: RawRequestData }) {
  const investmentUtcDateTime = convertToUtc({
    timezone: request.timezone,
    date: request.investmentDate,
    time: request.investmentTime,
  });
  const reversalRequestUtcDateTime = convertToUtc({
    timezone: request.timezone,
    date: request.refundRequestDate,
    time: request.refundRequestTime,
  });

  const minutesBetween = differenceInMinutes(
    reversalRequestUtcDateTime,
    investmentUtcDateTime
  );

  const tos = termsOfService(request.signupDate, request.timezone);
  const eligible = webEligible(tos, minutesBetween);

  // console.log("Name: ", `${request.name}`);
  // console.log("investmentUtcDateTime: ", `${investmentUtcDateTime}`);
  // console.log("reversalRequestUtcDateTime: ", `${reversalRequestUtcDateTime}`);
  // console.log("minutesBetween: ", `${minutesBetween}`);
  // console.log("tos: ", `${tos}`);
  // console.log("eligible: ", `${eligible}`);

  return (
    <tr>
      <td>{request.name}</td>
      <td>{request.timezone}</td>
      <td>{request.signupDate}</td>
      <td>{request.requestSource}</td>
      <td>{request.investmentDate}</td>
      <td>{request.investmentTime}</td>
      <td>{request.refundRequestDate}</td>
      <td>{request.refundRequestTime}</td>
      <td>{eligible ? "✅" : "❌"}</td>
    </tr>
  );
}

function App() {
  return (
    <>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Timezone</th>
              <th>Signup Date</th>
              <th>Request Source</th>
              <th>Investment Date</th>
              <th>Investment Time</th>
              <th>Refund Request Date</th>
              <th>Refund Request Time</th>
              <th>Eligible for Refund</th>
            </tr>
          </thead>
          <tbody>
            {reversalRequestsRawData.map((request) => (
              <TableRow request={request} key={request.name} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
