import React, { useRef, useState } from "react";
import { axiosInstance } from "../../config";
import "./passwordGenerator.css";

function PasswordGenerator(props) {
  const [password, setPassword] = useState("");
  const website = useRef();

  const generatePwd = async () => {
    try {
      const res = await axiosInstance.get("/generate");
      setPassword(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const save = async () => {
    console.log(password);
    if (website.current.value === "" || password === "") {
      alert("you haven't entered website name or haven't generated password.");
    } else {
      try {
        await axiosInstance.post("/password", {
          website: website.current.value,
          password: password,
        });
        alert("you Password saved sucessfully");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="sheet">
        <div className="heading">Generate New Password</div>
        <label className="label">Enter Website Name</label>

        <div className="flex">
          <input type="text" id="name" name="user_name" ref={website}></input>
          <button
            className="button"
            type="submit"
            onClick={() => {
              generatePwd();
            }}
          >
            Generate Password
          </button>
        </div>
        <div className="shown__pass">
          {password ? password : "Generated password will be shown here"}
        </div>
        <div className="flex">
          <button
            className="btn--save"
            onClick={() => {
              save();
            }}
          >
            Save
          </button>
          <button
            className="btn--cancel"
            onClick={() => {
              window.location.reload();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
