import React from "react";

const SVGIcon = ({
  style = {},
  width = "100%",
  className = "",
  height = "100%",
  iconClass = "",
  fill = "currentColor"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    className={className}
  >
    <use xlinkHref={"#icon-" + iconClass} fill={fill}/>
  </svg>
);

export default SVGIcon;