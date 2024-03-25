import React from "react";
import data from "../../data";
import TimeCapsule from "../TimeCapsule";

const TimeLine = () => {
  return (
    <div>
      {data.timeline.map((item) => (
        <TimeCapsule key={item.title} {...item} />
      ))}
    </div>
  );
};

export default TimeLine;
