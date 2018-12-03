import NewModelModel from "./NewModelModel";
import NewModelConsts from "./NewModelConsts";
export default (state = NewModelModel, action) => {
  switch (action.payload) {
    case NewModelConsts.SET_NewModel:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
