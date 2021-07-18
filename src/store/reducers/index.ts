import template from './template';
import editor from './editor';
import { combineReducers } from 'redux';

let reducers = {
  template,
  editor,
};
type ReducersType = typeof reducers;

export type CombinedState = {
  [key in keyof ReducersType]: ReturnType<ReducersType[key]>;
};

let combinedReducer = combineReducers(reducers);
export default combinedReducer;
