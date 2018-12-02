import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./HomeConnector";
class Home extends Component {
  render() {
    return <div>This is the home page template</div>;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
