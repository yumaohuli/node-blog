const Koa = require('koa')
const static = require('koa-static')
const views = require('koa-views')
const router = require('./routers/router')
const logger = require('koa-logger')
const body = require('koa-body')
const { join } = require('path')

// 生成 Koa 实例
const app = new Koa

// 注册日志模块
app.use(logger())

// 配置 koa-body 处理 post 请求数据
app.use(body())

// 配置静态资源目录（images、css、js）
app.use(static(join(__dirname,"public")))

// 配置视图模板
app.use(views(join(__dirname,"views"),{
    extension:"pug"  // 使用的是 pug 模板
}))


// 注册路由信息
app.use(router.routes()).use(router.allowedMethods())

// 注册端口
app.listen(3000,()=>{
    console.log("项目启动成功，监听在3000端口")
})