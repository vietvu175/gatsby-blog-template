---
title: 'Hướng dẫn sử dụng useReducer hook'
categories: ["React hooks in action"]
tags: ["react", "javascript"]
published: true
date: '2020-02-13'
---

Nghe đến **reducer** có lẽ bạn sẽ liên tưởng ngay đến **Redux**, tuy nhiên bạn hoàn toàn không cần phải biết trước **Redux** hoặc đã từng sử dụng **useReducer** hook để đọc bài này.

Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu xem **reducer** thực sự là gì và cách sử dụng **useReducer** hook để quản lý các state phức tạp trong component, điều mà **useState** hook vẫn chưa đáp ứng được.

### Reducer là gì?
Tạm hiểu một reducer dùng để thực thi một hàm lên từng phần tử của mảng (từ trái qua phải) với một biến tích lũy (accumulator) để thu về một giá trị duy nhất.
Ví dụ bạn có một mảng như sau, và bạn muốn tính tổng của các phần tử của mảng. Bạn có thể viết một reducer để làm việc này: 

```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```
Có thể sẽ hơi khó hiểu một chút, phương thức reduce của mảng sẽ nhận vào 2 tham số:
- Tham số thứ nhất là một callback(reducer) dùng để thực thi với từng phần tử, callback này cũng có 2 tham số gồm một biến tích lũy (accumulator) lưu giá trị trả về của mỗi lần gọi callback và currentValue - phần tử trong mảng hiện tại đang được xử lý.
- Tham số thứ 2: Giá trị được gán cho tham số thứ nhất (accumulator) của hàm callback trong lần gọi đầu tiên. Nếu giá trị ban đầu này không được cung cấp, phần tử đầu tiên của mảng sẽ được dùng.

Trong ví dụ trên, hàm reducer sẽ được gọi 4 lần:
- Lần gọi với (5, 1), trả về 6.
- Lần gọi với (6, 2), trả về 8.
- Lần gọi với (8, 3), trả về 11.
- Lần gọi với (11, 4), trả về 15.

### Vậy còn useReducer thì sao?
Mình đã dùng cả nửa trang để giải thích phương thức reduce của Array, tất cả đều có lý do của nó, nhân vật chính của chúng ta - **useReducer** cũng nhận vào các tham số và có cơ chế hoạt động cũng tương tự. Bạn cũng phải truyền vào một hàm reducer và một giá trị khởi tạo (initial state). Hàm reducer sẽ nhận state hiện tại cùng một action và sau đó trả ra state mới:
```javascript
useReducer((state, action) => {
  return state + action;
}, 0);
```
Giống như **useState** hook , **useReducer** cũng trả ra một mảng gồm 2 phần tử. Phần tử thứ nhất là state hiện tại, phần tử thứ 2 là một hàm **dispatch**:
```javascript
const [sum, dispatch] = useReducer((state, action) => {
  return state + action;
}, 0);
```
Chú ý rằng "state" của chúng ta không bắt buộc phải là một Object, nó có thể là một số, một mảng hoặc bất kì một giá trị nào.
Dưới đây là một ví dụ hoàn chỉnh về **useReducer** trong **component**:
```jsx
import React, { useReducer } from 'react';

function Counter() {
  const [sum, dispatch] = useReducer((state, action) => {
    return state + action;
  }, 0);

  return (
    <>
      {sum}

      <button onClick={() => dispatch(1)}>
        Add 1
      </button>
    </>
  );
}
```
Bạn có thể thấy mỗi lần chúng ta click button sẽ **dispatch** một action với giá trị là 1, action này sẽ được cộng vào state hiện tại và sau đó component sẽ rerender với state mới (lớn hơn state cũ!).

Mình cố tình đưa ra một ví dụ trong đó action không có dạng {type: "INCREMENT_BY", value: 1} hoặc gì đó tương tự, bởi vì các reducer bạn tạo không cần phải tuân theo các pattern từ Redux. Thế giới của **React Hook** là một thế giới mới: bạn nên xem xét liệu rằng các pattern cũ có còn giá trị và muốn giữ chúng hay không, hay bạn sẽ thay đổi mọi thứ.

### Một ví dụ phức tạp hơn
Ví dụ này nhìn khá giống với một **Redux reducer**. Chúng ta sẽ tạo ra một **component** để quản lý một shopping list. Ở đây mình có dùng thêm một hook khác là: **useRef**
Đầu tiên chúng ta import 2 hook:
```jsx
import React, { useReducer, useRef } from 'react';
```
Sau đó tạo một component và thiết lập một ref và một reducer. Ref sẽ giữ một tham chiếu đến input, để chúng ta có thể trích xuất giá trị của nó. (Chúng ta cũng có thể quản lý input bằng state, chuyển value và onChange như bình thường, nhưng đây là cơ hội tốt để sử dụng hook **useRef**!)
```jsx
function ShoppingList() {
  const inputRef = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      // do something with the action
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}
```
Chú ý rằng trong trường hợp này state của chúng ta là một array. Chúng ta khởi tạo state với một mảng rỗng, và cũng sẽ trả ra một mảng từ hàm **reducer**.

### useRef hook
Ngoài lề một chút, mình sẽ giải thích qua về cách useRef hoạt động, useRef hook cho phép bạn tạo một tham chiếu đến DOM node. Khi gọi useRef sẽ tạo ra một object, và object được trả ra này sẽ có một thuộc tính là **current**, như trong ví dụ trên chúng ta có thể truy cập đến DOM của input bằng cách gọi **inputRef.current**. Nếu bạn đã từng sử dụng React.createRef(), thì useRef cũng hoạt động tương tự như vậy.

Object được trả ra bởi **useRef** làm được nhiều thứ hơn là chỉ đơn thuần giữ một tham chiếu đến **DOM**. Nó có thể giữ một giá trị riêng cho component mà giá trị này được bảo toàn giữa các lần render. **useRef** có thể được dùng để tạo lên các *instance variables*, giống như việc bạn tạo một* instance variables* trong class component với *this.whatever = value*. Có một điều cần lưu ý, việc tạo biến như vậy được tính là **"side effect"** vì vậy bạn không thể thay đổi nó khi render mà chỉ có thể thay đổi trong **useEffect**. Các bạn có thể tham khảo thêm về cách tạo *instance variables* với **useRef** tại [official Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables).

### Quay trở lại với ví dụ useReducer
Input của chúng ta được bọc trong form, vì vậy một lần bầm enter sẽ làm kích hoạt hàm submit. Giờ chúng ta cần viết hàm **handleSubmit** để thêm một item vào list và xử lý các **action** trong **reducer**:
```jsx
function ShoppingList() {
  const inputRef = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return [
          ...state,
          {
            id: state.length,
            name: action.name
          }
        ];
      default:
        return state;
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'add',
      name: inputRef.current.value
    });
    inputRef.current.value = '';
  }

  return (
    // ... same ...
  );
}
```
Hàm **reducer** sẽ có 2 trường hợp, một là khi **action** có type === "add", và default. Khi **reducer** nhận **action** "add", nó sẽ trả ra một mảng mới bao gồm các phần tử cũ, và thêm phần tử mới vào cuối mảng.
Khi user bấm Enter hàm *handleSubmit* sẽ được gọi đến, chúng ta dùng e.preventDefault() để trang không bị reload mỗi khi form được submit. Sau đó **dispatch** với một **action** sẽ được gọi đến. Trong trường hợp này action là một object với thuộc tính *type* và thuộc tính name mang giá trị của input. Và cuối cùng sau khi giá trị được thêm vào list chúng ta clear dữ liệu trong input.

### Xóa một item trong list
Bây giờ ta sẽ thêm chức năng xóa một item ra khỏi shopping list.

Mình sẽ thêm một *button* delete bên cạnh mỗi item, *button* này có nhiệm vụ **dispatch** một **action** vơi type === "remove" và index của item cần xóa.

Sau đó mình cần phải xử lý **action** này trong **reducer**, bằng cách dùng phương thức filter của mảng chúng ta sẽ bỏ đi item cần xóa:
```jsx
function ShoppingList() {
  const inputRef = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        // ... Giống như bên trên ...
      case 'remove':
        // Giữ lại tất cả các phần tử trừ phần tử chúng ta muốn xóa
        return state.filter((_, index) => index != action.index);
      default:
        return state;
    }
  }, []);

  function handleSubmit(e) { /*...*/ }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {item.name}
            <button
              onClick={() => dispatch({ type: 'remove', index })}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```
### Vậy thì Redux sẽ chết?
Rất nhiều người đã nghĩ như vậy khi lần đầu nhìn thấy **useReducer** hook. Ừ thì **React** đã có được tích hợp sẵn **reducer**, và chúng ta cũng có thể truyền dữ liệu đi khắp nơi với **Context**, vậy thì **Redux** sẽ không còn đất diễn nữa?

Mình không nghĩ **Redux** sẽ chết đâu, việc thêm **useReducer** hook giúp mở rộng hơn nữa khả năng của **React** về mặt quản lý state, vì vậy những trường hợp bạn thực sự cần **Redux** nay có thể bị giảm bớt đi. Tuy nhiên Redux vẫn làm được nhiều thứ hơn cả **useReducer** và **Context** cộng lại. Với Redux chúng ta có **Redux Devtools** để debug,  có các **middleware** để tùy biến và còn có cả một hệ sinh thái các thư viện hỗ trợ. Thực sự thì **Redux** vẫn có sức hút riêng, đặc biệt là đối với các developer đã làm việc nhiều với nó.

**Redux** cung cấp một store global, nơi bạn có thể lưu dữ liệu ứng dụng tập trung còn **useReducer** hook hoạt động trong nội bộ của mỗi component. Mặc dù vậy, không có gì có thể ngăn bạn xây dựng Redux mini của riêng bạn với **useReducer** và **useContext**. Hãy thử đi xem sao :D

Bài viết liên quan: [Sử dụng useMemo và useCallback để cải thiện hiệu năng cho React app](https://vitcaosu.com/optimize-react-component-with-usememo-and-usecallback/)

