import "./App.css";
import { reversalRequestsRawData } from "./data/reversal-requests";

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
              <tr key={request.name}>
                <td>{request.name}</td>
                <td>{request.timezone}</td>
                <td>{request.signupDate}</td>
                <td>{request.requestSource}</td>
                <td>{request.investmentDate}</td>
                <td>{request.investmentTime}</td>
                <td>{request.refundRequestDate}</td>
                <td>{request.refundRequestTime}</td>
                <td>✅</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
