import { combineReducers } from 'redux';
import libraryReducer from './libraryReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
    libraries: libraryReducer,
    selectedLibrarayId: SelectionReducer
});