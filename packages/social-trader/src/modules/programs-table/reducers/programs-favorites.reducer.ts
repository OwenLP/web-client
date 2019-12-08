import { ItemsViewModelProgramDetailsList } from "gv-api-web";
import { SET_FAVORITE_PROGRAM } from "modules/toggle-asset-favorite-button/actions/favorite-program.actions";
import { updateFavoriteLocal } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.service";
import { FavoriteActionType } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.types";
import { IApiState } from "reducers/reducer-creators/api-reducer";

const favoritesReducer = (
  state: IApiState<ItemsViewModelProgramDetailsList>,
  action: FavoriteActionType
): IApiState<ItemsViewModelProgramDetailsList> => {
  switch (action.type) {
    case SET_FAVORITE_PROGRAM:
      return updateFavoriteLocal(
        state,
        action.meta.id,
        action.meta.isFavorite
      ) as IApiState<ItemsViewModelProgramDetailsList>;
    default:
      return state;
  }
};

export default favoritesReducer;
