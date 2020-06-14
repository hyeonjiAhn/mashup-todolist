import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  { id: 1, text: "프로젝트 생성하기", done: true },
  { id: 2, text: "컴포넌트 스타일링 하기", done: true },
  { id: 3, text: "컨텍스트 만들기", done: true },
  { id: 4, text: "기능 구현하기", done: false },
];

// create, toggle, remove
function todoReducer(state, action) {
  // state 와 action으로 return 값 (변환) 반환
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// STATE 전용 CONTEXT
const TodoStateContext = createContext();
// DISPATCH 전용 CONTEXT
const TodoDispatchContext = createContext();
// NEXT ID 전용 CONTEXT
const TodoNextIdContext = createContext();
//  context 내부에 provider 존재
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// context 가 없을 때, 에러처리
// hook 생성 STATE
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) throw new Error("Can Not TodoProvider(state)");
  return context;
}

// hook 생성 DISPATCH
export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) throw new Error("Can Not TodoProvider(dispatch)");
  return context;
}
// hook 생성 nextId return
export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) throw new Error("Can Not TodoProvider(nextId)");
  return context;
}
