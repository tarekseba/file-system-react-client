import { useEffect, useState } from "react";
import File from "./File";

const Folder = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([
      { type: "FILE", name: "tarekFile" },
      { type: "FOLDER", name: "tarekFolder" },
    ]);
  }, []);

  const deleteHandler = (index) => {
    let newItems = [...items];
    newItems.splice(index, 1);
    setItems([...newItems]);
  };
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
          <span>{props.name}</span>
        </div>
        <i
          className="fa-solid fa-file-circle-plus clickable displayable"
          style={{ marginLeft: "auto" }}
        ></i>
        <i className="fa-solid fa-folder-plus clickable space displayable"></i>
        <i
          class="fa-solid fa-trash clickable space displayable"
          onClick={() => {
            props.onDelete(props.index);
          }}
        ></i>
      </div>
      {isExpanded && (
        <ul>
          {items.map((item, index) => {
            if (item.type === "FILE")
              return (
                <File
                  name={item.name}
                  path={`${props.path}${props.name}/`}
                  index={index}
                  key={`${props.path}${props.name}/${item.name}`}
                  onDelete={deleteHandler}
                ></File>
              );
            return (
              <Folder
                name={item.name}
                path={`${props.path}${props.name}/`}
                index={index}
                key={`${props.path}${props.name}/${item.name}`}
                onDelete={deleteHandler}
              ></Folder>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Folder;
