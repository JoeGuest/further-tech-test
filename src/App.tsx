import "./App.css";
import { reversalRequestsRawData } from "./data/reversal-requests";

function App() {
  return (
    <>
      <div className="card">
        <table>
          <tr className="table-header">
            <td>Name</td>
            <td>Timezone</td>
            <td>Signup Date</td>
            <td>Request Source</td>
            <td>Investment Date</td>
            <td>Investment Time</td>
            <td>Refund Request Date</td>
            <td>Refund Request Time</td>
            <td>Eligible for Refund</td>
          </tr>
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
        </table>
      </div>
    </>
  );
}

export default App;
