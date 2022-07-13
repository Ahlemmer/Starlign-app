import React from "react";

const Disconnected = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border spinner-border-lg "
          role="status"
          style={{
            width: "20px",
            height: "20px",
            fontSize: "10px",
            marginTop: "100px",
            color: "#19A8D9",
          }}
        ></div>
      </div>
    </>
  );
};

export default Disconnected;
