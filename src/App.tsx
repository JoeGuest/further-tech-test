import "./App.css";
import { differenceInMinutes } from "date-fns";
import {
  RawRequestData,
  reversalRequestsRawData,
} from "./data/reversal-requests";
import { termsOfService, webEligible, convertToUtc } from "./logic";

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
  const eligible = webEligible(tos, minutesBetween); // TODO: add phone eligibility

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
  // could fetch the data here or have it as a prop, but for now just use the hardcoded data

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
