import { useMemo, useState } from "react";
import File from "./File";
import Link from "./Link";
import Modal from "./Modal/Modal";

const Folder = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const [uploadErr, setUploadErr] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081" + props.path + props.name,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setItems([...data.result.folders, ...data.result.files, ...data.result.links]);
      } else {
        console.log("FILES NOT FOUND");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const size = useMemo(
    () =>
      isExpanded
        ? items.reduce((sum, item) => {
            return sum + item.size;
          }, 0)
        : props.size,
    [isExpanded, items, props]
  );

  const uploadEntity = async (data) => {
    setUploadErr(false);
    try {
      const response = await fetch(
        "http://localhost:8081" + props.path + props.name,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status !== 200) throw new Error("Failed to upload file");
      setItems((state) => {
        state.push({
          name: data.name,
          type: data.type,
          size: data.type === "FILE" ? data.content.length : 0,
        });
        return [...state];
      });
      setModal(false);
    } catch (err) {
      console.log(err);
      setUploadErr(true);
    }
  };

  const deleteEntity = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8081" + props.path + props.name,
        { method: "DELETE" }
      );
      if (response.status !== 200) {
        throw new Error("Deletion failed");
      }
      props.onDelete(props.index);
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteHandler = () => {
    deleteEntity();
  };

  const deleteHandler = (index) => {
    let newItems = [...items];
    newItems.splice(index, 1);
    setItems([...newItems]);
  };

  const linkSubmitHandler = (data) => {
    let body = {
      name: data.name,
      content: null,
      type: "LINK",
      path: data.path,
    };
    console.log(body);
    uploadEntity(body);
  };

  const folderSubmitHandler = (data) => {
    let body = {
      name: data.name,
      content: null,
      type: "FOLDER",
      path: null,
    };
    console.log(body);
    uploadEntity(body);
  };

  const fileSubmitHandler = (file) => {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file.files[0]);
    fr.onload = (e) => {
      let data = {
        name: file.files[0].name,
        type: "FILE",
        content: new Int8Array(e.target.result),
        path: null,
      };
      console.log(data);
      uploadEntity(data);
    };
    // console.log(file.files[0]);
    // console.log(file.files[0].name);
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
          err={uploadErr}
        ></Modal>
      )}
      <div>
        <div
          className="folder__header"
          onClick={() => {
            fetchItems();
            setIsExpanded((state) => !state);
          }}
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
            <span
              style={{ fontSize: "10px", marginLeft: ".6rem", color: "gray" }}
              className="displayable"
            >
              {size} BYTE
            </span>
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
            onClick={(event) => {
              event.stopPropagation();
              onDeleteHandler();
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
                    content={item.content}
                    path={`${props.path}${props.name}/`}
                    index={index}
                    key={`${props.path}${props.name}/${item.name}`}
                    size={item.size}
                    onDelete={deleteHandler}
                  ></File>
                );
              if (item.type === "LINK")
                return (
                  <Link
                    name={item.name}
                    content={item.content}
                    path={`${props.path}${props.name}/`}
                    index={index}
                    key={`${props.path}${props.name}/${item.name}`}
                    size={item.size}
                    onDelete={deleteHandler}
                  ></Link>
                );
              return (
                <Folder
                  name={item.name}
                  path={`${props.path}${props.name}/`}
                  index={index}
                  key={`${props.path}${props.name}/${item.name}`}
                  size={item.size}
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
