import "./App.css";
import {
  RawRequestData,
  reversalRequestsRawData,
} from "./data/reversal-requests";
import { termsOfService, convertToUtc, eligible } from "./logic";

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

  const tos = termsOfService({
    signupDate: request.signupDate,
    timezone: request.timezone,
  });

  const requestEligible = eligible({
    requestSource: request.requestSource,
    tos,
    investmentUtcDateTime,
    reversalRequestUtcDateTime,
  });

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
      <td>{requestEligible ? "✅" : "❌"}</td>
    </tr>
  );
}

function App() {
  // could fetch the data here or have it as a prop, but for now just use the hardcoded data from import

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
