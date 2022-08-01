面試專案題目
===

## 題目一、用下面的 spec 設計資料庫結構,且請列出下面需取得資料以及建立資料庫的 SQL (SQL 及 NoSQL 皆可)
spec
1. 使用者可以在 app 中貼文(post)
1. 使用者可以留言貼文,或是留言別個使用者的留言 (comment)

需取得資料
1. 取得貼文留言最多的 10 筆貼文

[專案設定MongoDB 相關資訊](./mongodb/README.md)

## 題目二、用上述資料結構撰寫一個小程式或 API ,並把你計畫會做的工程規劃也記錄下來( nestjs 佳

spec

### 新增 / 修改 / 刪除貼文

- **GET**: `/post`
取得貼文留言最多的 10 筆貼文，使用`Aggregations`取得貼文留言數量。
    - 對`comments`使用`Aggregations`，統計貼文留言數量，並排序。
    - 取得貼文留言排序，搜尋未被刪除的貼文。
    - 如果貼文少於limit 數量，補上未留言的貼文。
    - 合併貼文的巢狀留言資訊。

- **POST**: `/post`
新增貼文

- **PATCH**: `/post/:id`
更新貼文內容

- **DELETE**: `/post/:id`
刪除貼文(不物理刪除)，更新狀態為`archived: true`


---

### 新增 / 修改 / 刪除回覆
- **GET**: `/comment/:id`
取得某貼文的留言與其子留言。

- **POST**: `/post/:postId/comment`
貼文建立根留言。

- **POST**: `/comment/:id`
回覆留言的留言

- **PATCH**: `/comment/:id`
更新留言

- **DELETE**: `/comment/:id`
刪除留言(不物理刪除)，更新狀態為`archived: true`


## 題目三、如果上述應用程式反應過慢,你會如何找到問題所在並且優化

- **DB:**
    - 對搜尋條件建立index增加搜尋速度。
    - 優化`Aggregations`的部分。
- **API:**
    - API 加設搜尋條件與回傳數量。ex 將GET: `/post`的功能拆分。

## 題目四 [應徵 Full stack 需填寫]、將題目二作品用網頁實做( vue 佳)

## 加分題、用 docker 封裝您的作品