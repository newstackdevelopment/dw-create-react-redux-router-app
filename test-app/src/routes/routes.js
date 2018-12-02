import React, { lazy, Suspense, Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

const Home = lazy(() => import("./Home/Home"));
class WithSuspense extends Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {this.props.children}
      </Suspense>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    //getSettings: () => dispatch(AppActions.getSettings())
  };
};

class Routes extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path={`/`}
          render={props => (
            <WithSuspense>
              <Home {...this.props} {...props} />
            </WithSuspense>
          )}
        />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
