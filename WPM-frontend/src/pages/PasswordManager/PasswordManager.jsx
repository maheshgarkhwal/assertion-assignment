import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import "../PasswordGenerator/PasswordGenerator";
const container = {
  width: "85%",
  marginInline: "auto",
};
const actionBtn = {
  backgroundColor: "transparent",
  textDecoration: "underline",
  color: "blue",
  border: "none",
  outline: "none",
};
const link = {
  color: "blue",
  marginLeft: "auto",
};
const table = {
  borderCollapse: "collapse",
  width: "100%",
  border: "2px solid #E0E0E0",
  marginBlock: "1rem",
};
const tHead = {
  border: "1px solid #BDBDBD",
  textAlign: "left",
  padding: "8px",
  backgroundColor: "#E0E0E0",
};
const tData = {
  border: "1px solid #BDBDBD",
  textAlign: "left",
  padding: "8px",
};

function PasswordManager(props) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const arr = [];
  useEffect(() => {
    async function findAll() {
      try {
        const res = await axiosInstance.get("/password");
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    findAll();
  }, []);

  const removeElement = async () => {
    try {
      await axiosInstance.delete("/password", { data: { id: arr } });
      alert("Deleted sucessfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div style={container}>
        <h3 style={{ textAlign: "center" }}>Web Based Password Manager</h3>
        <div className="flex">
          <button
            style={actionBtn}
            onClick={() => {
              setShow(!show);
            }}
          >
            Edit
          </button>
          <button
            style={actionBtn}
            onClick={() => {
              removeElement();
            }}
          >
            Delete
          </button>
          <Link to="passwordGenerator" style={link}>
            Generate New Password
          </Link>
        </div>
        <table style={table}>
          <tr>
            {
              <th style={tHead}>
                <li></li>
              </th>
            }
            <th style={tHead}> website Name </th>
            <th style={tHead}> Password </th>
          </tr>
          {data.map((val, index) => (
            <tr>
              {show ? (
                <td style={tData}>
                  <input
                    type="checkbox"
                    value={val.id}
                    onClick={(e) => {
                      arr.push(e.target.value);
                    }}
                  ></input>
                </td>
              ) : (
                <td style={tData}>
                  <li></li>
                </td>
              )}
              <td style={tData}>{val.website}</td>
              <td style={tData}>{val.password}</td>
            </tr>
          ))}
        </table>
        <div className="flex">
          <Link to="/passwordGenerator" style={link}>
            Generate New Password
          </Link>
        </div>
      </div>
    </div>
  );
}
export default PasswordManager;
