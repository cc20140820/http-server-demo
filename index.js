import * as http from "http"
import * as url from "url"
import * as path from "path"
import * as fs from "fs"

const PORT = 3000

const resData = [
  {
    id: 1,
    name: "小明",
    age: 18,
  },
  {
    id: 2,
    name: "小红",
    age: 19,
  },
]

const server = http.createServer((req, res) => {
  // url.parse 可以将url解析成一个对象
  const urlObject = url.parse(req.url)
  const { pathname } = urlObject

  if (pathname.startsWith("/api")) {
    if (pathname === "/api/users") {
      if (req.method === "GET") {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(resData))
        return
      } else if (req.method === "POST") {
        let postData = ""
        req.on("data", (chunk) => {
          postData += chunk
        })
        req.on("end", () => {
          // 数据传完后往db.txt写入内容
          fs.appendFile(path.join(__dirname, "db.txt"), postData, () => {
            res.end(postData)
          })
        })
      }
    }
  } else {
    const extName = path.extname(pathname)
    if (extName === ".png") {
      console.log("pathname:", pathname)
      fs.readFile(path.join(".", pathname), (err, data) => {
        res.setHeader("Content-Type", "image/png")
        res.write(data)
        res.end()
      })
    }
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}/`)
})

/**
 * 距离一个基础的web服务还差得远，比如:
 * 1. 不支持http动词，比如get、post等
 * 2. 不支持路由
 * 3. 没有静态资源托管
 * 4. 不能持久化数据
 * 下面就把上面的缺陷一一补上
 */
