const http = require("http")
const PORT = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end("hello world")
})

server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${port}/`)
})

/**
 * 距离一个基础的web服务还差得远，比如:
 * 1. 不支持http动词，比如get、post等
 * 2. 不支持路由
 * 3. 没有静态资源托管
 * 4. 不能持久化数据
 * 下面就把上面的缺陷一一补上
 */
