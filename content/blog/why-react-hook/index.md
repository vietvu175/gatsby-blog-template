---
title: 'Tại sao lại là React Hook?'
categories: ["React hooks in action"]
tags: ["react", "javascript"]
published: true
date: '2020-01-22'
---

### Lịch sử
Nếu đã từng tiếp cận với React thì chắc hẳn các bạn đã quen với cách viết React component kiểu như thế này:
```javascript
class ReposGrid extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      repos: [],
      loading: true
    }

    this.updateRepos = this.updateRepos.bind(this)
  }
  componentDidMount () {
  }
  componentDidUpdate (prevProps) {
  }

  updateRepos(id) {
      //do somthing with id
  }

  render() {
    return (<div />)
  }
}
```
Quay lại khoảng thời gian tháng 1-2015, chuẩn EcmaScript 2015 được tổ chức Ecma công bố với cộng đồng, còn gọi với tên thân thương ES6. class chính thức có mặt trong javascript. Đội ngũ phát triển của React lúc đó kết luận, chúng ta không cần phát minh lại cái bánh xe (don't reinvent the wheel), cứ xài theo chuẩn đã có.

Khi khai báo component bằng class, chúng ta khởi tạo giá trị của state bên trong phương thức constructor và nó sẽ được nhét vào trong this. Tuy nhiên, với cách khai báo đã quốc tế hóa của class, nếu chúng ta extends từ một class, chúng ta phải gọi super() trước khi có thể sử dụng this. Và riêng với React, chúng ta còn phải truyền thêm props vào trong super. Ngày đầu làm quen với React mình đã khóc thét khi thấy đoạn code này:

```javascript
constructor (props) {
    super(props)

    this.state = {
      repos: [],
      loading: true
    }
}
```
và cả đoạn này nữa: 
```javascript
this.updateRepos = this.updateRepos.bind(this)
```
Thật may là sau đấy Class Field và arrow function được thêm vào trong class, chúng ta có thể khai báo một biến bên trong class mà không cần dùng constructor và .bind function vào class, đoạn code trên sẽ được viết lại thành:
```javascript
class ReposGrid extends React.Component {
    state = {
      repos: [],
      loading: true
    }
    updateRepos = (id) => {
        //do somthing with id
    }
}
```
Nhìn cũng đỡ đau "team" hơn nhiều rồi. Tuy nhiên vẫn tồn đọng rất nhiều vấn đề.

### Các vấn đề tồn đọng

Có lẽ ngay chính React team cũng đã cảm thấy chưa hài lòng với phiên bản React trước khi công bố phiên bản đi kèm Hook.
Ý tưởng làm nên tên tuổi của React và khiến React được cộng đồng lập trình viên chào đón chính là chia nhỏ ứng dụng thành các component rồi kết hợp lại với nhau. Việc chia nhỏ component như vậy cũng giúp cho lập trình viên tái sử dụng các component ở những nơi khác nhau trong ứng dụng. Như vậy có nghĩa là điều gì cản trở việc này cũng chính là vấn đề React.

#### Logic trùng lặp

Trước đây chúng ta thiết kế component dựa rất nhiều vào component lifecycle. Chúng ta đặt logic vào trong các từng lifecycle này, ví dụ như chúng ta cần phải gọi cùng một hàm bên trong cả 2 phương thức lifecycle componentDidMount, componentDidUpdate:
 ```javascript
 componentDidMount () {
  this.updateRepos(this.props.id)
}
componentDidUpdate (prevProps) {
  if (prevProps.id !== this.props.id) {
    this.updateRepos(this.props.id)
  }
}
updateRepos = (id) => {
  this.setState({ loading: true })

  fetchRepos(id)
    .then((repos) => this.setState({
      repos,
      loading: false
    }))
}
```
Trong ví dụ trên, chúng ta nhận thấy rằng việc sử dụng các lifecycle để đảm bảo cho state ***"repos"*** được đồng bộ mỗi khi props ***"id"*** có thay đổi, và nó dẫn đến việc các đoạn code của chúng ta bị lặp đi lặp lại. Rõ ràng là chúng ta cần một cách tiếp cận khác để xử lý các side effect thay vì dùng lifecycle.

#### Chia sẻ logic

Trong thực tế, viết một ứng dụng không phải chỉ bao gồm tầng UI, rất nhiều trường hợp chúng ta cần tái sử dụng logic, kết hợp các logic lại với nhau. Trước đây React chưa hề có cách nào đáp ứng được nhu cầu này.

Trường hợp giả định thế này, nếu chúng ta có một component khác và component này cũng cần dùng state ***"repos"*** và các logic bên liên quan nằm trong component ***"ReposGrid"***. Bạn sẽ xử lý vấn đề này thế nào? Đơn giản nhất là copy paste logic của component ReposGrid sang component mới. Nhưng sẽ ra sao nếu có nhiều hơn một component cũng có nhu cầu như vậy, sẽ là ngần ấy lần chúng ta copy paste? Không ổn đúng không, chúng ta là lập trình viên mà, có phải thợ copy paste đâu.

Một cách mình hay làm đấy là sử dụng Higher Order Component (HOC):
```javascript
function withRepos (Component) {
  return class WithRepos extends React.Component {
    state = {
      repos: [],
      loading: true
    }
    componentDidMount () {
      this.updateRepos(this.props.id)
    }
    componentDidUpdate (prevProps) {
      if (prevProps.id !== this.props.id) {
        this.updateRepos(this.props.id)
      }
    }
    updateRepos = (id) => {
      this.setState({ loading: true })

      fetchRepos(id)
        .then((repos) => this.setState({
          repos,
          loading: false
        }))
    }
    render () {
      return (
        <Component
          {...this.props}
          {...this.state}
        />
      )
    }
  }
}
```

Rồi giờ có bất kỳ component nào muốn dùng repos thì cứ làm như thế này

```javascript
// ReposGrid.js
function ReposGrid ({ loading, repos }) {
  ...
}

export default withRepos(ReposGrid)

// Profile.js
function Profile ({ loading, repos }) {
  ...
}

export default withRepos(Profile)
```

Tuy nhiên cách dùng này có những hạn chế đó là khá khó tiếp cận đối với người mới, và một ngày đẹp trời nào đó chúng ta sẽ thấy thứ gọi là wrapper hell như thế này:

```javascript
export default withHover(
  withTheme(
    withAuth(
      withRepos(Profile)
    )
  )
)
```
Đoạn code trên sẽ chạy như thế này:

```html
<WithHover>
  <WithTheme hovering={false}>
    <WithAuth hovering={false} theme='dark'>
      <WithRepos hovering={false} theme='dark' authed={true}>
        <Profile 
          id='JavaScript'
          loading={true} 
          repos={[]}
          authed={true}
          theme='dark'
          hovering={false}
        />
      </WithRepos>
    </WithAuth>
  <WithTheme>
</WithHover>
```
Ngoài việc sử dụng HOC thì dùng Render Props cũng cho kết quả tương tự, mình sẽ không viết ví dụ cho cách này nữa, các bạn chịu khó Google thần chưởng nhé.

Lan man một lúc, túm váy lại là các vấn đề cần giải quyết của các phiên bản React trước đây là:
1. gọi super(props) là quá bất cập.
2. this là thứ mơ hồ mà không dễ biết cách nó hoạt động, việc phải tìm câu trả lời cho câu hỏi "what this is this?" tiêu tốn của chúng ta quá nhiều năng lượng.
3. Dùng lifecycle để tổ chức logic cho component càng ngày càng bộc lộ những bất cập.
4. Việc tái sử dụng logic bằng HOC cũng ổn đấy nhưng đó là một partern "không chính chủ" của React team, dù sao thì được dùng hàng chính chủ nó vẫn hơn chứ đúng không?

### Giải quyết

> Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. - Reacjs.org

Thế là giờ đây, với phiên bản React 16.8 trở đi, các component của chúng ta hoàn toàn có thể viết bằng function component kể cả với stateful component. Nghe hấp dẫn quá đúng không? Điều này cũng đồng nghĩa với việc chúng ta sẽ nói lời chia tay với super(props) và this, những thứ đã làm chúng ta khốn khổ cả một thời gian dài.

Vấn đề bây giờ được rút gọn lại là chúng ta sẽ xử lý state và lifecycle như thế nào. React cung cấp cho cũng ta 2 hook để thực hiện điều này, đó là ***"useState"*** và ***"useEffect"***.

Component ReposGrid sẽ được viết lại như sau:
```javascript
function ReposGrid () {
    const [repos, setRepos] = React.useState([])
    const [loading, setLoading] = React.useState(false)
}
```
Trước khi đến với phần xử lý lifecycle, mình khuyên các bạn nên quên những gì bạn biết về lifecycle của component đi bởi chúng sẽ chỉ làm bạn cảm thấy bối rối khi lần đầu tiếp xúc với React hook, chúng ta sẽ tiếp cận vần đề này với một tư duy khác: ***Tư duy đồng bộ hoá***.

Thử nghĩ những gì bạn làm ở một sự kiện của lifecycle, có thể là đổi state, fetch dữ liệu, cập nhập DOM, tất cả đều gom về một mục đích duy nhất Đồng bộ hóa. Những gì chúng ta cần đồng bộ thường là những thứ nằm ngoài React (gọi API, DOM, đại loại như thế) với những thứ bên trong React (state) hoặc ngược lại

Khi tiếp cận theo hướng đồng bộ hóa thay vì lifecycle event, nó cho phép chúng ta gom các logic liên quan lại với nhau. Để làm việc đó React cho chúng ta một Hook gọi là ***"React.useEffect"***

Theo định nghĩa, useEffect cho phép chúng ta thực hiện side effect bên trong function component. Hàm này sẽ dùng để re-sync (thực hiện đồng bộ hóa các giá trị)

```javascript
React.useEffect(() => {
  document.title = `Hello, ${username}`
}, [username])
```
Đoạn code trên sẽ chạy lại bất cứ khi nào giá trị state username có thay đổi

Để gọi lại fetchRepos khi có thay đổi từ props id ở ví dụ trên

```javascript
function ReposGrid ({ id }) {
  const [ repos, setRepos ] = React.useState([])
  const [ loading, setLoading ] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)

    fetchRepos(id)
      .then((repos) => {
        setRepos(repos)
        setLoading(false)
      })
  }, [id])

  if (loading === true) {
    return <Loading />
  }

  return (<div />)
}
```

Và việc cuối cùng chúng ta phải làm bây giờ là thay thế partern HOC bằng hàng chính chủ 100% con bò sữa. Tất nhiên là React sẽ không cung cấp cho chúng ta một công cụ ăn sẵn, nhưng cho ta đủ những thứ cần thiết để ta tự viết lên những custom hook của mình.

Giờ chúng ta sẽ viết một custom hook useRepos, nó sẽ nhận một id và trả ra dữ liệu tương ứng.

```javascript
function useRepos (id) {
  const [ repos, setRepos ] = React.useState([])
  const [ loading, setLoading ] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)

    fetchRepos(id)
      .then((repos) => {
        setRepos(repos)
        setLoading(false)
      })
  }, [id])

  return [ loading, repos ]
}
```

Điều ngon lành ở đây là tất cả những gì liên quan đến repos điều gói gọn trong hook, ở đây mình muốn nói đến loading, repos

Sử dụng custom hook này trên các component khác nhau:
```javascript
function ReposGrid ({ id }) {
  const [ loading, repos ] = useRepos(id)

  ...
}
function Profile ({ user }) {
  const [ loading, repos ] = useRepos(user.id)

  ...
}
```
### Kết luận
Sau nhưng ví dụ trên, chúng ta đã nhận ra nhưng tính năng mới đã giúp cho React trở lên mạnh mẽ hơn với các đặc tính:
- Đơn giản hóa
- Đóng gói
- Linh động
- Mở rộng

Ban đầu khi tiếp xúc với React hook, mình cũng đã hoài nghi rất nhiều về việc function component sẽ thay thế hoàn toàn class component, hay đây chỉ là cơn hype của cộng đồng trước một thứ mới mẻ, và mình tin chắc sẽ có nhiều bạn cũng như mình. Nhưng sau một thời gian áp dụng cho các dự án mà mình tham gia thì mình đã nhận ra không chỉ đơn giản là: sử dụng Hook để có state bên trong function component. Thật ra nó còn mang tới những giá trị to lớn khác như là tăng khả năng tái sử dụng và kết hợp logic.

Những bài viết sau mình sẽ đi sâu vào phân tích cơ chế và cách sử dụng các additional hooks. Cảm ơn các bạn đã đọc :D

Bài viết được mình tham khảo từ:
[Why React Hooks?](https://www.youtube.com/watch?v=eX_L39UvZes)


Bài viết liên quan: [Sử dụng useMemo và useCallback để cải thiện hiệu năng cho React app](https://vitcaosu.com/optimize-react-component-with-usememo-and-usecallback/)

