import NewModelConsts from "./NewModelConsts";
export const setNewModel = newModel => dispatch => {
  dispatch(_setNewModel(newModel));
};
const _setNewModel = newModel => ({
  payload: newModel,
  type: NewModelConsts.SET_NewModel
});
export default {
  setNewModel
};
