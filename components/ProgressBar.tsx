import React from "react";

export const ProgressBar = () => {
  return (
    <progress
      css={`
        display: block;
        height: 0.5rem;
        appearance: none;
        width: 100%;

        &[value] {
          color: red;
          background-color: #343a40;
        }
        &[value]::-webkit-progress-bar,
        &[value]::-moz-progress-bar {
          background-color: #343a40;
        }

        &[value]::-webkit-progress-value,
        &[value]::-moz-progress-value {
          background-color: red;
        }
      `}
      max="100"
      value="80"
    ></progress>
  );
};
