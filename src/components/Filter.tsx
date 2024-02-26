import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { User } from "../models/User";

interface Props {
  type: string;
  dummyUsers: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
const Filter = ({ type, dummyUsers, setUsers }: Props) => {
  const [drop, setDrop] = useState(false);
  const [col, setCol] = useState(type);
  const [search, setSearch] = useState<any>("");

  const handleSearch = () => {
    const arr = dummyUsers.filter(
      (item: User) => item.First_Name.substring(0, search.length) === search
    );
    setUsers(arr);
  };

  const handleSearchLastName = () => {
    const arr = dummyUsers.filter(
      (item: User) => item.Last_Name.substring(0, search.length) === search
    );
    setUsers(arr);
  };
  const handleSearchFullName = () => {
    const arr = dummyUsers.filter(
      (item: User) => item.Full_Name.substring(0, search.length) === search
    );
    setUsers(arr);
  };

  const handleSearchId = () => {
    if (search !== "") {
      const arr = dummyUsers.filter((item: User) => item.id === search);
      setUsers(arr);
    }else{
        setUsers(dummyUsers)
    }
  };

  const handleSearchAge = () => {
    if (search !== "") {
      const arr = dummyUsers.filter((item: User) => item.age === search);
      setUsers(arr);
    }else{
        setUsers(dummyUsers)
    }
  };
  useEffect(() => {
    if (col === "First Name") {
      handleSearch();
    } else if (col === "Last Name") {
      handleSearchLastName();
    } else if (col === "Full Name") {
      handleSearchFullName();
    } else if (col === "Id") {
      handleSearchId();
    } else {
      handleSearchAge();
    }
  }, [search]);
  const handleDrop = () => {
    setDrop(!drop);
  };
  return (
    <div
      style={{ display: "flex", position: "absolute" }}
      className="container"
    >
      <div>
        <div>Columns</div>
        <div onClick={handleDrop}>
          {col} <ArrowDropDownIcon />{" "}
        </div>
        {drop && (
          <div>
            <hr></hr>
            <div
              role="button"
              onClick={() => {
                setCol("Id");
              }}
            >
              Id
            </div>
            <hr></hr>
            <div
              role="button"
              onClick={() => {
                setCol("First Name");
              }}
            >
              First Name
            </div>
            <hr></hr>
            <div
              role="button"
              onClick={() => {
                setCol("Last Name");
              }}
            >
              Last Name
            </div>
            <hr></hr>
            <div
              role="button"
              onClick={() => {
                setCol("Age");
              }}
            >
              Age
            </div>
            <hr></hr>
            <div
              role="button"
              onClick={() => {
                setCol("Full Name");
              }}
            >
              Full Name
            </div>
            <hr></hr>
          </div>
        )}
      </div>
      <div>
        <div>Value</div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        ></input>
      </div>
    </div>
  );
};

export default Filter;
