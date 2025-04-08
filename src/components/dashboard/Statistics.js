"use client";

import { useState } from "react";
import StatsNav from "./StatsNav";

function Statistics() {
  const [tabNumber, setTabNumber] = useState(1);
  console.log(tabNumber);

  return (
    <div>
      <StatsNav tabNumber={tabNumber} setTabNumber={setTabNumber} />
    </div>
  );
}

export default Statistics;
