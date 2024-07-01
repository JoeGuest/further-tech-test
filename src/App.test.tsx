import "@testing-library/jest-dom/vitest";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Calculate the result manually to test the logic
const userRefundRequest = [
  { name: "Emma Smith", eligible: false }, // phone, refund requested 3 hours after investment, placed on 2pm Sat UK time, ineligible
  { name: "Benjamin Johnson", eligible: false }, // web, refund requested over 24 hours after, ineligible
  { name: "Olivia Davis", eligible: true }, // web, refund requested 7 hours after, eligible
  { name: "Ethan Anderson", eligible: false }, // web, refund requested over 24 hours after, ineligible
  { name: "Sophia Wilson", eligible: true }, // phone, new TOS, 7 hours between + 4 for UK office open, less than 24 hours,eligible
  { name: "Liam Martinez", eligible: false }, // web, refund requested 10 days after, ineligible
  { name: "Jonathan Giles", eligible: false }, // phone, refund requested 11 days after, ineligible
  { name: "Priya Sharp", eligible: false }, // phone, new TOS, 20.5 hours between + 10.5 for UK office open, greater than 24 hours, not eligible
  { name: "Raja Ortiz", eligible: true }, // phone, new TOS, 9.5 hours between + 7.5 for UK office open, less than 24 hours, eligible
  { name: "Livia Burns", eligible: false }, // phone, new TOS, 21.5 hours between + 4.5 for UK office open, greater than 24 hours, not eligible
  { name: "Lacey Gates", eligible: true }, // web, new TOS, less than 16 hours after, eligible
];

describe("loads and displays user data", async () => {
  userRefundRequest.forEach((user) => {
    test(`renders ${user.name}'s eligibility`, async () => {
      render(<App />);
      const name = screen.getByText(user.name);
      expect(name).toHaveTextContent(user.name);

      const row = name.closest("tr");
      const rowCells = row!.querySelectorAll("td");
      const eligibility = rowCells[rowCells.length - 1];

      user.eligible
        ? expect(eligibility).toHaveTextContent("✅")
        : expect(eligibility).toHaveTextContent("❌");
    });
  });
});
