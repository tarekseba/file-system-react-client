import { useState } from "react";

const File = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className="folder__header"
      onClick={() => setIsExpanded((state) => !state)}
    >
      <div className="clickable__container clickable">
        <i className="fa-solid fa-file"></i>
        <span>{props.name}</span>
      </div>
      <i
        className="fa-solid fa-trash clickable displayable"
        style={{ marginLeft: "auto" }}
        onClick={() => {
          props.onDelete(props.index);
        }}
      ></i>
    </div>
  );
};

export default File;
