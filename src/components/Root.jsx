import { useEffect, useState } from "react";
import "./elements.css";
import File from "./File";
import Folder from "./Folder";
import Link from "./Link";
import Modal from "./Modal/Modal";

const Root = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const [uploadErr, setUploadErr] = useState(false);
  const deleteHandler = (index) => {
    let newItems = [...items];
    newItems.splice(index, 1);
    setItems([...newItems]);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:8081/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setItems([...data.result.folders, ...data.result.files, ...data.result.links]);
      } else {
        console.log("FILES NOT FOUND");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadEntity = async (data) => {
    setUploadErr(false);
    //data.content = null;
    try {
      const response = await fetch("http://localhost:8081/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status !== 200) throw new Error("Failed to upload file");
      setItems((state) => {
        state.push({
          name: data.name,
          type: data.type,
          size: data.type === "FILE" ? data.content.length : 0,
          content: data.type === "LINK" ? data.path : null,
        });
        return [...state];
      });
      setModal(false);
    } catch (err) {
      console.log(err);
      setUploadErr(true);
    }
  };

  const linkSubmitHandler = (data) => {
    let body = {
      name: data.name,
      content: null,
      type: "LINK",
      path: data.target,
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
          err={uploadErr}
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
            <span>/</span>
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
        </div>
        {isExpanded && (
          <ul>
            {items.map((item, index) => {
              if (item.type === "FILE")
                return (
                  <File
                    key={`/${item.name}`}
                    name={item.name}
                    content={item.content}
                    path={"/"}
                    index={index}
                    size={item.size}
                    onDelete={deleteHandler}
                  ></File>
                );
              if (item.type === "LINK")
                return (
                  <Link
                    name={item.name}
                    content={item.content}
                    path={"/"}
                    index={index}
                    key={`/${item.name}`}
                    size={item.size}
                    onDelete={deleteHandler}
                  ></Link>
                );
              return (
                <Folder
                  key={`/${item.name}`}
                  name={item.name}
                  path={"/"}
                  index={index}
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

export default Root;
