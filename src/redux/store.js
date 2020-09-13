import {createStore, compose, applyMiddleware} from 'redux';
import personsReducer from '../redux/reducer/persons';
import thunk from 'redux-thunk';

const store = createStore(personsReducer, compose(
  applyMiddleware(thunk)
));

export default store;
