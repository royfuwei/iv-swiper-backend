開發文件
===

## Swaggewr Document

取得服務的Swagger文件API位置: `https://swiper-bbackend/docs`。

## src 目錄結構說明
```sh
src
├── constants.ts # env 等設定值
├── core
│   ├── app
│   ├── comment # 留言
│   └── post # 貼文
├── infrastructures
│   ├── mongodb # mongodb connect
│   └── server/di # core module
└── main.ts
```