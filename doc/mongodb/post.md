貼文
===

## 功能

簡易紀錄使用者貼文，先用`content`紀錄貼文內容。

## Document
```ts
{
    _id: "$mongoId",
    uid: "使用者Id",
    content: "貼文內容",
    archived: false,
    creationTime: ISODate("2022-07-30 09:01:14.896Z"),
    modiTime: ISODate("2022-07-31 09:01:14.896Z"),
}

```

- **_id**: 由 mongo 產生唯一Id。
- **uid:** userId。
- **content**: 貼文內容。
- **archived:** 是否封存
- **creationTime:** 建立的時間
- **modiTime:** 最後被修改的時間