import React, { useState, useEffect, useContext } from "react";
import "../../styles/userprofile.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import CreateCar from "../component/createCar";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { store, actions } = useContext(Context);

  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(store.token);
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    fetch(process.env.BACKEND_URL + "/api/user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="userprofile">
      <aside class="sidebar">
        <nav class="nav">
          <ul>
            <li class="active">
              <a href="#holaagos">Welcome {user && user.name}</a>
            </li>
            <a href="/cars">My Cars</a>
            <li>

              <a href="#holadani">Parking</a>

              <a href="#">My Cars</a>
            </li>
            <li>
              <a href="/parking">Parking</a>

            </li>
            <li>
              <a href="#">Bills</a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                Log Out
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <div id="wrapper">
        <div id="holaagos" className="white">
          {" "}
          HOLA AGOS
        </div>
        <div id="holadani"> HOLA DANI</div>
      </div>

      {/* <div className="dashboard">
        <CreateCar />
      </div> */}
    </div>
  );
};

export default UserProfile;
