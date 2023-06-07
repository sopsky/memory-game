import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const Register = () => {
  const [userRegister, setUserRegister] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Perform registration logic here
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      username: userRegister,
      password: password,
    };

    // Check if username already exists in the database
    fetch("http://localhost:8800/usersid?username=" + userRegister)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Username already exists
          alert("Username already exists. Please choose a different username.");
          setUserRegister("");
          setPassword("");
          setConfirmPassword("");
          return;
        }

        // Register the user
        fetch("http://localhost:8800/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response data
            console.log(data);

            // Clear form fields
            setUserRegister("");
            setPassword("");
            setConfirmPassword("");

            navigate("/");
          })
          .catch((error) => {
            // Handle any error that occurred during the API call
            console.error("Error:", error);
          });
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
            Please Register
          </h1>
          <div className="mt-1">
            <form
              className="d-flex flex-column align-items-center"
              onSubmit={handleRegister}
            >
              <input
                type="text"
                className="form-control mb-1 mb-md-1 w-100 w-md-50"
                placeholder="Choose a username"
                value={userRegister}
                onChange={(e) => setUserRegister(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mb-1 mb-md-1 w-100 w-md-50"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mb-1 mb-md-1 w-100 w-md-50"
                placeholder="Enter password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="primary"
                className="w-50"
                style={{ fontSize: "0.875rem" }}
              >
                Register
              </Button>
              <Button
              type="submit"
              variant="info"
              className="w-50 mt-1"
              style={{ fontSize: "0.875rem" }}
              onClick={() => navigate("/")}
            >
              Back to login
            </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
