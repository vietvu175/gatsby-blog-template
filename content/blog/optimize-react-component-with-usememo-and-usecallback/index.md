---
title: 'Cải thiện hiệu năng cho Reac app với useMemo và useCallback'
categories: ["React hooks in action"]
tags: ["react", "javascript"]
published: true
date: '2020-01-29'
---

### Đặt vấn đề
React là một thư viện rất mạnh, bản thân React đã làm rất nhiều việc để hỗ trợ chúng ta xử lý hiệu năng lúc render component nên hiệu năng của các ứng dụng không phải là vấn đề quá nghiệm trọng nữa. Nhờ vậy các lập trình viên sẽ "rảnh tay" hơn và dành sự tập trung của mình vào các logic nghiệp vụ. Tuy nhiên cũng có vài trường hợp các component của chúng ta render nhiều hơn mức cần thiết và làm ảnh hưởng đến hiệu năng chung. Và với những lập trình viên khó tính thì một sự thừa thãi cũng là điều khó có thể chập nhận được.
```javascript
const ListPage = ({ data, title }) => (
  <div>
    <Header title={title} />
    <List listItems={data} />
  </div>
)
```
Trong ví dụ trên chúng ta có thể thấy, khi giá trị của props ***data*** thay đổi sẽ làm cho component ***ListPage*** render lại bao gồm cả component ***Header***, mặc cho ***Header*** vốn dĩ đã không quan tâm đến giá trị của ***data***.
Trước đây khi viết component bằng class component, chúng ta thường xử lý vấn đề trên bằng React.memo. Tuy nhiên từ khi [***React Hooks***](https://vitcaosu.com/why-react-hook/) được ra mắt thì mình đã dần chuyển sang viết các component của mình bằng function component. Vậy chúng ta sẽ xử lý việc render thừa thãi bên trên như thế nào, tất nhiên là React Team đã cho chúng ta công cụ để giải quyết vấn đề này bằng 2 hook: useMemo và useCallback.

### useMemo
***useMemo*** Hook cho phép bạn cache lại kết quả tính toán giữa các lần render của component bằng cách "ghi nhớ" lại giá trị của lần render trước.
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
***useMemo*** giúp ta kiểm soát việc được render dư thừa của các component con, nó khá giống với hàm ***shouldComponentUpdate*** trong LifeCycle. Bằng cách truyền vào 1 tham số thứ 2 là một mảng các dependencies, thì chỉ khi các dependencies này thay đổi thì ***useMemo*** mới thực thi hàm được truyền vào tham số thứ nhất. Trong trường hợp giá trị của các dependencies không thay đổi, userMemo sẽ bỏ qua việc gọi lại hàm, và sử dụng lại giá trị của lần trước đó được hàm này trả ra.

Bây giờ chúng ta refactor lại ví dụ đầu tiên bằng cách sử dụng useMemo:
```javascript
const ListPage = ({ a, b }) => {
  // Only re-rendered if `title` changes:
  const header = useMemo(() => <Header title={title} />, [title]);
  // Only re-rendered if `data` changes:
  const list = useMemo(() => <List listItems={data} />, [data]);
  return (
    <>
      {header}
      {list}
    </>
  )
}
```
### useCallback
***useCallback*** hoạt động khá giống như ***useMemo*** nhưng khác ở chỗ function truyền vào ***useMemo*** bắt buộc phải thực thi ở trong quá trình render trong khi đối với ***useCallbac***k đó lại là function callback của 1 event nào đó như là onClick chẳng hạn.
Xét ví dụ sau: 
```javascript
const Parent = () => {
    const [showExtraDetails, setShowExtraDetails] = useState(false);
    return (
        [...]
        <Child onClick={() => {showData(showExtraDetails)}/>
        [...]
    );
}
```
Component Child sẽ luôn re-render khi Parent render, thậm chí Child là một **PureComponent** hoặc được bọc trong **React.memo**, bởi **onClick** luôn khác nhau ở mỗi lần render. Chúng ta sẽ dùng useCallback trong trường hợp này như sau:
```javascript
const Parent = () => {
    const [showExtraDetails, setShowExtraDetails] = useState(false);
    const handleClick = useCallback(
      () => {
        showData(showExtraDetails);
      },
      [showExtraDetails],
    );
    return (
        [...]
        <Child onClick={handleClick}/>
        [...]
    );
}
```
Bây giờ ***handleClick*** có cùng một giá trị cho đến khi ***showExtraDetails*** thay đổi, điều này đồng nghĩa với việc số lần render không cần thiết của component ***Child*** đã được hạn chế lại.

### Kết
Trên đây là hai cách mình thường áp dụng để cải thiện hiệu năng cho ***React app***. Hi vọng mọi người sẽ cảm thấy thích thú hơn khi làm việc với Hooks. Trong bài viết tới mình sẽ nói về cách sử dụng 2 hook tiếp theo là ***useContext*** và ***useReducer*** để tạo ra một store global.

Bài viết liên quan: [Tại sao lại là React Hook?](https://vitcaosu.com/why-react-hook/)


