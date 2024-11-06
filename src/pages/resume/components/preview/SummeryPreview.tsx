import React from "react";

function SummeryPreview({ resumeInfo }: any) {
  return <div className=" break-words">{resumeInfo?.summery}</div>;
}

export default SummeryPreview;
