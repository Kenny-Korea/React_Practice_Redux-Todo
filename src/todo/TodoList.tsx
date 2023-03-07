import React, { FormEvent, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "./store";

type TodoType = {
  id: number;
  text: string;
  done: boolean;
};

type TodoListType = TodoType[];
type TodoActionType =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof removeTodo>;

// action 타입 정의
const ADD_TODO = "todo/ADD_TODO" as const;
const TOGGLE_TODO = "todo/TOGGLE_TODO" as const;
const REMOVE_TODO = "todo/REMOVE_TODO" as const;

// 액션 함수 생성
const addTodo = (text: string) => ({ type: ADD_TODO, payload: text });
const toggleTodo = (id: number) => ({ type: TOGGLE_TODO, payload: id });
const removeTodo = (id: number) => ({ type: REMOVE_TODO, payload: id });

// reducer 생성
const initialState: TodoListType = [
  { id: 1, text: "node.js 공부하기", done: false },
  { id: 2, text: "react.js 공부하기", done: true },
  { id: 3, text: "vue.js 공부하기", done: false },
];
export const todoReducer = (
  state: TodoListType = initialState,
  action: TodoActionType
) => {
  switch (action.type) {
    case "todo/ADD_TODO":
      return [
        ...state,
        {
          id: Math.max(...state.map((todo) => todo.id)) + 1,
          text: action.payload,
          done: false,
        },
      ];
    case "todo/TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case "todo/REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoList = () => {
  // const inputRef = useRef<HTMLInputElement>("");
  const dispatch = useDispatch();
  const todos = useSelector((state: RootStateType) => state.todos);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = e.currentTarget.childNodes[0].value;
    dispatch(addTodo(value));
  };
  const onToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };
  const onRemove = (id: number) => {
    dispatch(removeTodo(id));
  };
  return (
    <>
      <h2>Todo List</h2>
      <hr />
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="할 일을 입력하세요" />
        <button>등록</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => {
                onToggle(todo.id);
              }}
            >
              {todo.text}
            </span>
            <span
              onClick={() => {
                onRemove(todo.id);
              }}
            >
              {" "}
              (X){" "}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
