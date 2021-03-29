import { combineReducers } from '@reduxjs/toolkit'
import issuesReducer from './issuesSlice';

const rootReducer = combineReducers({
	issues: issuesReducer,
})

export default rootReducer;