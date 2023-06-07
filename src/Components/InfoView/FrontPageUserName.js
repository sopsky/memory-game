import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const FrontPageUserName = ({ setUsername }) => {
  const [inputValue, setInputValue] = useState(""); // State for input value

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const navigate = useNavigate();

  const handleEnterClick = (event) => {
    event.preventDefault(); // Prevent form submission

    if (inputValue.trim() !== "") { // Check if input value is not empty after trimming whitespace
      setUsername(inputValue);
      navigate("/startscreen");
    }
  };

  return (
    <div className="position-relative">
    <img
      className="img-fluid"
      src="https://wallpapers.com/images/featured/va6139eg5csznzmw.jpg"
      alt="pokemon"
      style={{ maxWidth: "80%", maxHeight: "80%", margin: "auto" }}
    />
    <div className="position-absolute top-50 start-50 translate-middle text-center">
      <h1 className="fs-3 fs-md-5 rounded p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', fontSize: '1.5rem' }}>
        WELCOME TO THE POKEMON MEMORY GAME
      </h1>
      <div className="mt-3">
        <form onSubmit={handleEnterClick} className="d-flex flex-column align-items-center">
          <input
            type="text"
            className="form-control mb-2 mb-md-3 w-75 w-md-50"
            onChange={handleInputChange}
            placeholder="Enter username"
            required 
          />
          <Button type="submit" variant="success" className="w-50" style={{ fontSize: '0.875rem' }}>
            ENTER
          </Button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default FrontPageUserName;
