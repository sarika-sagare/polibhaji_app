import { createStore, combineReducers ,applyMiddleware} from 'redux';
// import foodReducer from './reducers/foodReducer';
import AdReducer from './reducer/AdReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    AdReducer: AdReducer
})

const configureStore = () => createStore(rootReducer,applyMiddleware(thunk));

export default configureStore;