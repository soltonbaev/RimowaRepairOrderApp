import React, { Component } from "react";
import template from "../../templates/handlebar-template";
import "./OrderPreview.css";

export default class OrderPreview extends Component {
  render() {
    const { order } = this.props;
    return (
      <div
        className="container"
        dangerouslySetInnerHTML={{ __html: template(order) }}
      />
    );
  }
}
