import { useEffect, useState } from "react";
import "./elements.css";
import File from "./File";
import Folder from "./Folder";
import Modal from "./Modal/Modal";

const Root = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const deleteHandler = (index) => {
    let newItems = [...items];
    newItems.splice(index, 1);
    setItems([...newItems]);
  };
  useEffect(() => {
    // setItems([
    //   { type: "FILE", name: "tarekFile" },
    //   { type: "FOLDER", name: "tarekFolder" },
    //   { type: "FOLDER", name: "tarekFolder2" },
    // ]);
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:8080/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        // setItems([...data.result]);
      } else {
        console.log("FILES NOT FOUND");
      }
    } catch (err) {
      console.log(err);
    }
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
    </>
  );
};

export default Root;
