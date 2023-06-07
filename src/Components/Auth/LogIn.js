import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const Login = ({setUsername}) => {
  const [userLogin, setUserLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Perform login logic here
    const userData = {
      username: userLogin,
      password: password,
    };
  
    fetch("http://localhost:8800/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid username or password'); // Throw an error if the response is not OK
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
        console.log(data);
  
        setUsername(userLogin)
        // Clear form fields
        setUserLogin("");
        setPassword("");
  
        // Navigate to the home page or any other authenticated route
        navigate("/startscreen");
      })
      .catch((error) => {
        // Handle any error that occurred during the API call
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="position-relative">
        <img
          className="img-fluid"
          src="https://wallpapers.com/images/featured/va6139eg5csznzmw.jpg"
          alt="pokemon"
          style={{ maxWidth: "80%", maxHeight: "80%", margin: "auto" }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h1
            className="fs-3 fs-lg-5 rounded p-2"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            Please Login
          </h1>
          <div className="mt-1">
            <form
              className="d-flex flex-column align-items-center"
              onSubmit={handleLogin}
            >
              <input
                type="text"
                className="form-control mb-1 mb-md-1 w-75 w-md-50"
                placeholder="Enter username"
                value={userLogin}
                onChange={(e) => setUserLogin(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mb-1 mb-md-1 w-75 w-md-50"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span>
                <Button
                  type="submit"
                  variant="success"
                  className="w-100 "
                  style={{ fontSize: "0.875rem" }}
                >
                  Login
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mt-1 "
                  style={{ fontSize: "0.875rem" }}
                  onClick={() => navigate("/register")}
                >
                  Register 
                </Button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
