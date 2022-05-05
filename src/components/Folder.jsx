import { useEffect, useState } from "react";
import File from "./File";
import Modal from "./Modal/Modal";

const Folder = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
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

  const linkSubmitHandler = (data) => {
    let body = {
      name: data.name,
      content: data.path,
      type: "FOLDER",
    };
    console.log(body);
  };

  const folderSubmitHandler = (data) => {
    let body = {
      name: data.name,
      content: null,
      type: "FOLDER",
    };
    console.log(body);
  };

  const fileSubmitHandler = (file) => {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file.files[0]);
    fr.onload = (e) => {
      let data = {
        name: file.files[0].name,
        type: "FILE",
        content: new Int8Array(e.target.result),
      };
      console.log(data);
    };
    console.log(file.files[0]);
    console.log(file.files[0].name);
  };

  return (
    <>
      {modal && (
        <Modal
          type={type}
          close={setModal}
          onLinkSubmit={linkSubmitHandler}
          onFolderSubmit={folderSubmitHandler}
          onFileSubmit={fileSubmitHandler}
        ></Modal>
      )}
      <div>
        <div
          className="folder__header"
          onClick={() => setIsExpanded((state) => !state)}
        >
          <div className="clickable__container clickable">
            {!isExpanded && <i className="fa-solid fa-folder"></i>}
            {isExpanded && (
              <i
                className="fa-solid fa-folder-open"
                style={{ color: "rgba(76, 76, 228, 0.904)" }}
              ></i>
            )}
            <span>{props.name}</span>
          </div>
          <i
            className="fa-solid fa-file-circle-plus clickable displayable"
            style={{ marginLeft: "auto" }}
            onClick={(event) => {
              event.stopPropagation();
              setType("FILE");
              setModal(true);
            }}
          ></i>
          <i
            className="fa-solid fa-folder-plus clickable space displayable"
            onClick={(event) => {
              event.stopPropagation();
              setType("FOLDER");
              setModal(true);
            }}
          ></i>
          <i
            className="fas fa-link clickable space displayable"
            onClick={(event) => {
              event.stopPropagation();
              setType("LINK");
              setModal(true);
            }}
          ></i>
          <i
            className="fa-solid fa-trash clickable space displayable"
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
    </>
  );
};

export default Folder;
