留言
===

## 建立的索引

### 貼文ID
索引名稱: `postIdIdx`

**目的:** 建立貼文Id索引，加速用貼文搜尋留言


## 功能

簡易紀錄使用者貼文留言，需要能夠巢狀留言，先用`content`紀錄貼文內容。

## Document
```ts
{
    _id: "$mongoId",
    uid: "使用者Id",
    postId: "貼文Id",
    parentId: "上層留言Id",
    content: "留言內容",
    archived: false,
    creationTime: ISODate("2022-07-30 09:01:14.896Z"),
    modiTime: ISODate("2022-07-31 09:01:14.896Z"),
}

```

- **_id**: 由 mongo 產生唯一Id。
- **uid:** userId。
- **postId**: 貼文Id。
- **parentId**: 上層留言Id。
- **content**: 留言內容。
- **archived:** 是否封存
- **creationTime:** 建立的時間
- **modiTime:** 最後被修改的時間