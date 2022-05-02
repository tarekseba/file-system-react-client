import { useEffect, useState } from "react";
import "./elements.css";
import File from "./File";
import Folder from "./Folder";

const elements = [
  { type: "FILE", name: "tarekFile" },
  { type: "FOLDER", name: "tarekFolder" },
  { type: "FOLDER", name: "tarekFolder2" },
];

const Root = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState([]);
  const deleteHandler = (index) => {
    let newItems = [...items];
    newItems.splice(index, 1);
    setItems([...newItems]);
  };
  useEffect(() => {
    setItems([
      { type: "FILE", name: "tarekFile" },
      { type: "FOLDER", name: "tarekFolder" },
      { type: "FOLDER", name: "tarekFolder2" },
    ]);
  }, []);
  return (
    <div>
      <div
        className="folder__header"
        onClick={() => setIsExpanded((state) => !state)}
      >
        <div className="clickable__container clickable">
          {!isExpanded && <i className="fa-solid fa-folder"></i>}
          {isExpanded && (
            <i
              class="fa-solid fa-folder-open"
              style={{ color: "rgba(76, 76, 228, 0.904)" }}
            ></i>
          )}
          <span>/</span>
        </div>
        <i
          className="fa-solid fa-file-circle-plus clickable displayable"
          style={{ marginLeft: "auto" }}
          onClick={(event) => event.stopPropagation()}
        ></i>
        <i className="fa-solid fa-folder-plus clickable space displayable"></i>
      </div>
      {isExpanded && (
        <ul>
          {items.map((item, index) => {
            if (item.type === "FILE")
              return (
                <File
                  key={`/${item.name}`}
                  name={item.name}
                  path={"/"}
                  index={index}
                  onDelete={deleteHandler}
                ></File>
              );
            return (
              <Folder
                key={`/${item.name}`}
                name={item.name}
                path={"/"}
                index={index}
                onDelete={deleteHandler}
              ></Folder>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Root;
