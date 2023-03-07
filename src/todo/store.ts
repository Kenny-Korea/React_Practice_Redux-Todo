// npm i redux react-redux @types/react-redux
// redux는 ts와 완벽히 호환되지만, react-redux는 아니므로 @types를 붙여 install 해줌
import { createStore } from "redux";
import { combineReducers } from "redux";
import { todoReducer } from "./TodoList";

const rootReducer = combineReducers({ todos: todoReducer });

export type RootStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
