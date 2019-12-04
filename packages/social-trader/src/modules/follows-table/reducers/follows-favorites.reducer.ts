import { ItemsViewModelProgramDetailsList } from "gv-api-web";
import { SET_FAVORITE_PROGRAM } from "modules/favorite-asset/actions/favorite-program.actions";
import {
  FAILURE_SUFFIX,
  IApiState,
  REQUEST_SUFFIX
} from "reducers/reducer-creators/api-reducer";
import { FavoriteActionType } from "utils/types";

const updateFavoriteLocal = (
  state: IApiState<ItemsViewModelProgramDetailsList>,
  id: string,
  isFavorite: boolean
): IApiState<ItemsViewModelProgramDetailsList> => {
  if (!state.data) return state;
  return {
    ...state,
    data: {
      ...state.data,
      items: state.data.items.map(program =>
        program.id === id
          ? {
              ...program,
              personalDetails: {
                ...program.personalDetails,
                isFavorite
              }
            }
          : program
      )
    }
  };
};

const favoritesReducer = (
  state: IApiState<ItemsViewModelProgramDetailsList>,
  action: FavoriteActionType
): IApiState<ItemsViewModelProgramDetailsList> => {
  switch (action.type) {
    case `${SET_FAVORITE_PROGRAM}_${REQUEST_SUFFIX}`:
      return updateFavoriteLocal(state, action.meta.id, action.meta.isFavorite);
    case `${SET_FAVORITE_PROGRAM}_${FAILURE_SUFFIX}`: {
      return updateFavoriteLocal(
        state,
        action.meta.id,
        !action.meta.isFavorite
      );
    }
    default:
      return state;
  }
};

export default favoritesReducer;
