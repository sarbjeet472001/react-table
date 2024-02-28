import React, { useState } from "react";
import Table from "./Table";
import { useForm } from "react-hook-form";
import { getValue } from "@testing-library/user-event/dist/utils";
import { User } from "../models/User";

interface FormValues {
  firstName: string;
  lastName: string;
  age: number;
}
const Form = () => {
  const [tog, setTog] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const users = await fetch("http://localhost:8000/users");
    const d = await users.json();
    let id = Number(d[d.length - 1].id) + 1;
    const res = await fetch("http://localhost:8000/users", {
      method: "Post",
      body: JSON.stringify({
        id: id.toString(),
        First_Name: data.firstName,
        Last_Name: data.lastName,
        age: data.age,
        Full_Name: data.firstName + " " + data.lastName,
      }),
    });
    const d1 = await res.json();
    console.log(d1);
    setTog(!tog);

    alert("User Added Successfully");
  };
  return (
    <div>
      <form className="container mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            aria-describedby="emailHelp"
            placeholder="Enter First Name"
            {...register("firstName", {
              required: "First Name is required",
            })}
          />
          <p style={{ color: "red" }}>{errors.firstName?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            aria-describedby="emailHelp"
            placeholder="Enter Last Name"
            {...register("lastName", {
              required: "last Name is required",
            })}
          />
          <p style={{ color: "red" }}>{errors.lastName?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            placeholder="Enter Age"
            {...register("age", {
              required: "Age is required",
            })}
          />
          <p style={{ color: "red" }}>{errors.age?.message}</p>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
      <Table tog={tog} />
    </div>
  );
};

export default Form;
