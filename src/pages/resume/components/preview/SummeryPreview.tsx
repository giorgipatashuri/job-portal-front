import React from "react";

function SummeryPreview({ resumeInfo }: any) {
  return <div className=" break-words mb-8">{resumeInfo?.summary}</div>;
}

export default SummeryPreview;
