import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div class="d-flex justify-content-center">
        <div
          className="spinner-grow "
          style={{
            width: "3rem",
            height: "3rem",
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Navbar;
