---
title: 'Tạo global state cho ứng dụng React bằng useContext và useReducer'
categories: ["React hooks in action"]
tags: ["react", "javascript"]
published: true
date: '2020-02-15'
---

Nhu cầu tạo một global state luôn luôn tồn tại cùng quá trình phát triển ứng dụng, chúng ta thường sẽ sử dụng **Redux** để tạo lên một kho chứa state cho toàn bộ app. Tuy nhiên, đối với những ứng dụng nhỏ thì việc sử dụng Redux lại quá thừa thãi, chả khác nào đem giao mổ trâu giết gà vậy.

Một cách khác để tạo một kho state mà hoàn toàn không cần phải thêm một thư viện bên ngoài, đó là sử dụng api **createContext** và **useContext** mới được ***React*** team bổ sung gần đây.

### React Context 

Ví dụ chúng ta có 3 set dữ liệu:
```javascript
const teamMembersNames = ['John', 'Mary', 'Jason', 'David']

const [sharing, setSharing] = React.useState([])
const [help, setHelp] = React.useState([])
const [pairing, setPairing] = React.useState(teamMembersNames)
```

Để tạo ra một kho chứa 3 set dữ liệu trên, chúng ta sẽ sử dung api **createContext** như sau:
```jsx
// ./src/utils/store.js
export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const teamMembersNames = ["John", "Mary", "Jason", "David"];

  const [sharing, setSharing] = React.useState([]);
  const [help, setHelp] = React.useState([]);
  const [pairing, setPairing] = React.useState(teamMembersNames);

  const store = {
    sharing: [sharing, setSharing],
    help: [help, setHelp],
    pairing: [pairing, setPairing]
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
```

Khi sử dụng **React.createContext** chúng ta sẽ nhận về 2 component là *Provider* và *Consumer*. Để các component bên trong **\<App/>** đều dùng được **\<Consumer/>**, chúng ta bọc **\<Provider/>** bên ngoài **\<App/>**:
```jsx
// ./index.js
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import StoreProvider from "./utils/store";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
```
Giờ đây, với mỗi component nào muốn lấy được dữ liệu trong store, chúng ta sẽ sử dụng **useContext**:

```jsx
import React from "react";
import { StoreContext } from "../utils/store";

const SomeComponent = () => {
  // dữ liệu dùng chung
  const { sharing } = React.useContext(StoreContext);
};
```
### Ứng dụng
Trong thực tế, một trường hợp phải đưa dữ liệu vào kho chung là thông tin user đang đăng nhập. Để xử lý phần thông tin này chúng ta sẽ cần đến 3 phần:
  1. Khai báo một store chung
  2. Một bộ reducer làm nhiệm vụ cập nhật state
  3. Một custom hook useAuth cung cấp các API cần thiết để tương tác với store chung đã khai báo

#### 1. Khai báo Store chung
```jsx
// AuthProvider.js
import authReducer from "authReducer";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  // khởi tạo
  const [state, dispatch] = useReducer(authReducer, {});
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### 2. Reducer
Về cách sử dụng **useReducer** hook mình đã có một bài riêng, chi tiết các bạn có thể xem ở đây [Link](https://vitcaosu.com/usereducer-hook/)
```jsx
// authReducer.js
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      const { authResult, user } = action;
      const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
      localStorage.setItem("expires_at", JSON.stringify(expiresAt));
      localStorage.setItem("user", JSON.stringify(user));
      return { user, expiresAt };
    case "logout":
      localStorage.removeItem("expires_at");
      localStorage.removeItem("user");
      return { user: {}, expiresAt: null };
    default:
      return state;
  }
}
```

#### 3. Custom hook useAuth
```jsx
// useAuth.js
import { AuthProvider } from "AuthProvider";

export const useAuth = () => {
    const { state, dispatch } = useContext(AuthContext);
    const login = () => {
        // làm gì đó ở đây
    }
    const logout = () => {
        // làm gì đó ở đây
        dispatch({ type: "logout" })
    }
    // ...  còn một số thứ khác
    const isAuthenticated = () => {
        return state.expiresAt && new Date().getTime() < state.expiresAt;
    };
    // ...  còn một số thứ khác
    return {
        isAuthenticated,
        user: state.user,
        userId: state.user ? state.user : null;
        login,
        logout,
        handleAuthentication
    }
}
```

Với mỗi component muốn truy xuất đến một kho dữ liệu chung, ta sẽ sử dụng useAuth như sau:
```jsx
import useAuth from "useAuth";

const MyCom = () => {
  const {
    /* Vân vân mây mây, tá lả các thứ */
  } = useAuth();
  //...
};
```
### Kết
Như vậy là mình đã hoàn thành series [React hooks in action](https://vitcaosu.com/category/react%20hooks%20in%20action/), có thể sẽ vẫn có những thiếu sót nhưng mình hi vọng với những kiến thức mình tổng hợp các bạn sẽ không còn cảm thấy ***React hooks*** là một cái gì đó quá khó để tiếp cận và dần làm chủ nó. Hẹn gặp lại các bạn vào những bái viết sắp tới.
Stay safe and have fun!

Bài viết liên quan: [Hướng dẫn sử dụng useReducer hook](https://vitcaosu.com/usereducer-hook/)

