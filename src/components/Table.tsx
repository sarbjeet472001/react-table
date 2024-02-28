import React, { useEffect, useState } from "react";
import { User } from "../models/User";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import RefreshIcon from "@mui/icons-material/Refresh";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filter from "./Filter";
import { Delete } from "@mui/icons-material";
import Pagination from "./Pagination";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Table = (props: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [dummyUsers, setDummyUsers] = useState<User[]>([]);
  const [down, setDown] = useState(false);
  const [fil, setFil] = useState(false);
  const [type, setType] = useState("");
  const [firstName, setFirstName] = useState<any>("");
  const [lastName, setLastName] = useState<any>("");
  const [age, setAge] = useState<any>(0);
  const [fullName, setFullName] = useState<any>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage);
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    const arr = data.map((item: User) => {
      return {
        ...item,
        isEditAble: false,
        isEditAbleLastName: false,
        isEditAbleAge: false,
        isEditAbleFullName: false,
      };
    });
    setUsers(arr);
    setDummyUsers(arr);
  };
  useEffect(() => {
    fetchUsers();
  }, [props.tog]);

  const sortByAge = () => {
    const arr = [...users];
    arr.sort((a: User, b: User) => {
      return a.age - b.age;
    });
    setUsers(arr);
    setDown(true);
  };
  const sortByAgeDes = () => {
    const arr = [...users];
    arr.sort((a: User, b: User) => {
      return b.age - a.age;
    });
    setUsers(arr);
    setDown(false);
  };

  const sortByLastNameDes = () => {
    const arr = [...users];
    arr.sort((a: User, b: User) => {
      return a.Last_Name.localeCompare(b.Last_Name);
    });
    arr.reverse();
    setUsers(arr);
    setDown(false);
  };
  const sortByLastName = () => {
    const arr = [...users];
    arr.sort((a: User, b: User) => {
      return a.Last_Name.localeCompare(b.Last_Name);
    });
    setUsers(arr);
    setDown(true);
  };

  const Refresh = () => {
    fetchUsers();
  };

  const sortByFirstName = () => {
    const arr = [...users];
    arr.sort((a: User, b: User) => {
      return a.First_Name.localeCompare(b.First_Name);
    });
    setUsers(arr);
    setDown(true);
  };

  const sortByFirstNameDes = () => {
    const arr = [...users];
    arr.sort((a: User, b: User) => {
      return a.First_Name.localeCompare(b.First_Name);
    });
    arr.reverse();
    setUsers(arr);
    setDown(false);
  };
  const sortById = () => {
    const arr = [...users];
    arr.sort((a: User, b: User) => {
      return a.id - b.id;
    });
    setUsers(arr);
    setDown(true);
  };
  const sortByIdDes = () => {
    const arr = [...users];
    arr.sort((a: User, b: User) => {
      return b.id - a.id;
    });
    setUsers(arr);
    setDown(false);
  };

  const filter = (type: string) => {
    setFil(!fil);
    setType(type);
  };
  const handleDoubleClick = (id: number, type: string) => {
    var find = users.find((item: User) => item.id === id);

    if (type === "firstName") {
      const arr = users.map((item: User) =>
        item.id === id ? { ...item, isEditAble: true } : item
      );
      setUsers(arr);
      setFirstName(find?.First_Name);
    } else if (type === "lastName") {
      const arr = users.map((item: User) =>
        item.id === id ? { ...item, isEditAbleLastName: true } : item
      );
      setUsers(arr);
      setLastName(find?.Last_Name);
    } else if (type === "age") {
      const arr = users.map((item: User) =>
        item.id === id ? { ...item, isEditAbleAge: true } : item
      );
      setUsers(arr);
      setAge(find?.age);
    } else {
      const arr = users.map((item: User) =>
        item.id === id ? { ...item, isEditAbleFullName: true } : item
      );
      setUsers(arr);
      setFullName(find?.Full_Name);
    }
  };

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      const arr = users.map((item: User) =>
        item.id === id
          ? { ...item, First_Name: firstName, isEditAble: false }
          : item
      );
      setUsers(arr);

      // const res = await fetch("http://localhost:8000/users/" + id, {
      //   method: "Patch",
      //   body: JSON.stringify({ First_Name: firstName }),
      // });

      // const data = await res.json();
      // console.log(data);
    }
  };

  const handleKeyDownLastName = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      const arr = users.map((item: User) =>
        item.id === id
          ? { ...item, Last_Name: lastName, isEditAbleLastName: false }
          : item
      );
      setUsers(arr);
    }
  };

  const handleKeyDownAge = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      const arr = users.map((item: User) =>
        item.id === id ? { ...item, age: age, isEditAbleAge: false } : item
      );
      setUsers(arr);
    }
  };

  const handleKeyDownFullName = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      const arr = users.map((item: User) =>
        item.id === id
          ? { ...item, Full_Name: fullName, isEditAbleFullName: false }
          : item
      );
      setUsers(arr);
    }
  };
  console.log(users);

  const handleDelete = async (id: number) => {
    const res = await fetch("http://localhost:8000/users/" + id, {
      method: "Delete",
    });
    const data = await res.json();
    console.log(data);
    fetchUsers();

    alert("User Deleted Successfully")
  };

  const handleDrag=(results:any)=>{
    console.log(results)
    let tempuser=[...users];
    let [selectedRow]=tempuser.splice(results.source.index,1);
    tempuser.splice(results.destination.index,0,selectedRow);
    setUsers(tempuser)
  }
  return (
    <div style={{ marginTop: "5rem" }}>
      <DragDropContext onDragEnd={(results)=>{handleDrag(results)}}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              Id{" "}
              {down ? (
                <Link to="#" onClick={sortByIdDes}>
                  <ArrowDownwardIcon />
                </Link>
              ) : (
                <Link to="#" onClick={sortById}>
                  <ArrowUpwardIcon />
                </Link>
              )}
              <Link to="#" onClick={() => filter("Id")}>
                <FilterAltIcon />
              </Link>
            </th>
            <th scope="col">
              First Name{" "}
              {down ? (
                <Link to="#" onClick={sortByFirstNameDes}>
                  <ArrowDownwardIcon />
                </Link>
              ) : (
                <Link to="#" onClick={sortByFirstName}>
                  <ArrowUpwardIcon />
                </Link>
              )}
              <Link to="#" onClick={() => filter("First Name")}>
                <FilterAltIcon />
              </Link>
            </th>
            <th scope="col">
              Last Name{" "}
              {down ? (
                <Link to="#" onClick={sortByLastNameDes}>
                  <ArrowDownwardIcon />
                </Link>
              ) : (
                <Link to="#" onClick={sortByLastName}>
                  <ArrowUpwardIcon />
                </Link>
              )}
              <Link to="#" onClick={() => filter("Last Name")}>
                <FilterAltIcon />
              </Link>
            </th>
            <th scope="col">
              Age{" "}
              {down ? (
                <Link to="#" onClick={sortByAgeDes}>
                  <ArrowDownwardIcon />
                </Link>
              ) : (
                <Link to="#" onClick={sortByAge}>
                  <ArrowUpwardIcon />
                </Link>
              )}
              <Link to="#" onClick={() => filter("Age")}>
                <FilterAltIcon />
              </Link>
            </th>
            <th scope="col">
              Full Name
              <Link to="#">
                <FilterAltIcon onClick={() => filter("Full Name")} />
              </Link>
            </th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {fil && (
          <Filter type={type} dummyUsers={dummyUsers} setUsers={setUsers} />
        )}
        <Droppable droppableId="tbody">
          {
            (provided)=>(
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
          {currentRecords.map((item: User,index:number) => {
            return (
              <Draggable draggableId={item.id.toString()} index={index}>
                {
                (provided)=>(
                  <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <th scope="row">{item.id}</th>
                
                {item.isEditAble ? (
                  <td>
                    <input
                      value={firstName}
                      onKeyDown={(e) => handleKeyDown(e, item.id)}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </td>
                ) : (
                  
                  <td {...provided.dragHandleProps}
                    onDoubleClick={() => {
                      handleDoubleClick(item.id, "firstName");
                    }}
                  >
                    {item.First_Name}
                  </td>
                )}
                {item.isEditAbleLastName ? (
                  <td>
                    <input
                      value={lastName}
                      onKeyDown={(e) => handleKeyDownLastName(e, item.id)}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </td>
                ) : (
                  <td
                    onDoubleClick={() => {
                      handleDoubleClick(item.id, "lastName");
                    }}
                  >
                    {item.Last_Name}
                  </td>
                )}
                {item.isEditAbleAge ? (
                  <td>
                    <input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      onKeyDown={(e) => handleKeyDownAge(e, item.id)}
                    />
                  </td>
                ) : (
                  <td
                    onDoubleClick={() => {
                      handleDoubleClick(item.id, "age");
                    }}
                  >
                    {item.age}
                  </td>
                )}
                {item.isEditAbleFullName ? (
                  <td>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onKeyDown={(e) => handleKeyDownFullName(e, item.id)}
                    />
                  </td>
                ) : (
                  <td
                    onDoubleClick={() => {
                      handleDoubleClick(item.id, "fullName");
                    }}
                  >
                    {item.Full_Name}
                  </td>
                )}
                <td role="button" onClick={() => handleDelete(item.id)}>
                  <Delete />
                </td>
              </tr>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </tbody>
            )
          }
        </Droppable>
      </table>
      </DragDropContext>
      <Pagination
        nPages={nPages}
        current={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div onClick={Refresh} style={{marginBottom:"2em"}}>
        <button>Refresh</button>
      </div>
    </div>
  );
};

export default Table;
