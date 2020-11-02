//> Referencing type variables instead of explicitly typing type strings everywhere,
//> dramatically decreases difficulty of debugging issues caused by typos on action
//> types.
//> Type string typos won't raise error while referencing variable error will,
//> e.g. undefined variable...

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const FETCH_STREAMS = 'FETCH_STREAMS';
export const FETCH_STREAM = 'FETCH_STREAM';
export const CREATE_STREAM = 'CREATE_STREAM';
export const EDIT_STREAM = 'EDIT_STREAM';
export const DELETE_STREAM = 'DELETE_STREAM';
