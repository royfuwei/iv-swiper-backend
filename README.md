Swiper Backend Engineer 題目實作
===

## Document
- [面試專案題目](./doc/interview-project.md)
- [開發文件](./doc/development/README.md)
- [MongoDB 相關資訊](./doc/mongodb/README.md)

---

## 環境變數
- `PORT`: server port`3000`
- `MONGO_ADDR`: mongodb 的連線位址, 預設為`mongodb:27017`

### docker-compose
```sh
vim docker-compose.yml
    ports:
      - 3000:3000
```

```sh
docker-compose up --build
```

---
## How to start 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## License

Nest is [MIT licensed](LICENSE).
