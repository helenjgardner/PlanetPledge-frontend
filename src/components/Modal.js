import React from "react";

class Modal extends React.Component {
  render() {
    if (!this.props.isOpen) {
      return null;
    }

    const BackgroundStyle = {
      backgroundColor: "rgba(220,220,220,0.5)",
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };

    const ModalStyle = {
      maxWidth: 325,
      minHeight: 200,
      backgroundColor: "#fff",
      margin: "auto",
      padding: 12
    };

    const CloseBtnStyle = {
      float: "right",
      cursor: "pointer",
      display: "block"
    };

    return (
      <div style={BackgroundStyle}>
        <div style={ModalStyle}>
          <div>
            <span style={CloseBtnStyle} onClick={this.props.onClose}>
              <p>X</p>
            </span>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
