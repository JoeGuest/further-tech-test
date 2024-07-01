function webEligible({
  tos,
  minutesBetween,
}: {
  tos: "new" | "old";
  minutesBetween: number;
}) {
  if (tos === "new") {
    return minutesBetween / 60 < 16;
  }

  return minutesBetween / 60 < 8;
}

export default webEligible;
