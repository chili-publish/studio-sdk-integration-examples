import { SyntheticEvent } from "react";

const preventDefault = (
  event: SyntheticEvent,
  callback: void
) => {
  event.preventDefault();
  event.stopPropagation();

  return callback;
};

export default preventDefault;
