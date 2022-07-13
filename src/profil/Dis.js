import React from 'react'

const Disconnected = () => {
    return (
        <>
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border spinner-border-lg "
            role="status"
            style={{
              width: "25px",
              height: "25px",
              fontSize: "5px",
              marginTop: "40px",
              marginBottom: "40px",
              color:'#19A8D9'
            }}
          ></div>
        </div>
      </>
    )
}

export default Disconnected;