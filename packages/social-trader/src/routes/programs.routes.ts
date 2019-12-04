export const PROGRAMS_FAVORITES_TAB_NAME = "favorites";
export const PROGRAMS_EXPLORE_TAB_NAME = "";
export const PROGRAM_SLUG_URL_PARAM_NAME = "programSlugUrl";

export const PROGRAMS_ROUTE = "/invest/programs";
export const PROGRAM_DETAILS_ROUTE = `${PROGRAMS_ROUTE}/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
export const PROGRAM_DETAILS_FOLDER_ROUTE = `${PROGRAMS_ROUTE}/[id]`;
export const PROGRAM_SETTINGS = `settings`;
export const PROGRAM_SETTINGS_FOLDER_ROUTE = `${PROGRAMS_ROUTE}/[id]/${PROGRAM_SETTINGS}`;

export const FACETS = "facets";
export const PROGRAMS_FACET_ROUTE = `${PROGRAMS_ROUTE}/${FACETS}/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
export const PROGRAMS_FACET_FOLDER_ROUTE = `${PROGRAMS_ROUTE}/${FACETS}/[id]`;
export const PROGRAMS_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab`;
