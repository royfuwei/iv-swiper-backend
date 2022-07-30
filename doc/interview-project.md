面試專案題目
===

### 題目一、用下面的 spec 設計資料庫結構,且請列出下面需取得資料以及建立資料庫的 SQL (SQL 及 NoSQL 皆可)
spec
1. 使用者可以在 app 中貼文(post)
1. 使用者可以留言貼文,或是留言別個使用者的留言 (comment)

需取得資料
1. 取得貼文留言最多的 10 筆貼文

### 題目二、用上述資料結構撰寫一個小程式或 API ,並把你計畫會做的工程規劃也記錄下來( nestjs 佳

spec
#### 新增 / 修改 / 刪除貼文
- `POST`: `/post`
- `PATCH`: `/post/:id`
- `GET`: `/post`
- `GET`: `/post/:id`
- `DELETE`: `/post/:id`

#### 新增 / 修改 / 刪除回覆
- `POST`: `/post/:postId/comment`
- `PATCH`: `/comment/:id`
- `GET`: `/comment`
- `GET`: `/comment/:id`
- `DELETE`: `/comment/:id`

### 題目三、如果上述應用程式反應過慢,你會如何找到問題所在並且優化

### 題目四 [應徵 Full stack 需填寫]、將題目二作品用網頁實做( vue 佳)

加分題、用 docker 封裝您的作品