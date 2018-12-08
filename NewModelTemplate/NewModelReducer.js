import NewModelModel from "./NewModelModel";
import NewModelConsts from "./NewModelConsts";
export default (state = NewModelModel, action) => {
  switch (action.type) {
    case NewModelConsts.SET_NewModel:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
