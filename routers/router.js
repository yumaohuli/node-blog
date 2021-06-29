const Router = require('koa-router')
// 拿到操作 user 表的逻辑对象
const user = require('../control/user')
const router = new Router

// 设计主页
router.get("/",async(ctx) => {

    // 需要 title 
    await ctx.render("index",{
        title:"华仔天地-博客"
    })
})

// 主要用来处理返回  用户登录 用户注册
router.get(/^\/user\/(?=reg|login)/, async (ctx) => {

  // show 为 true 则显示注册  false 显示登录，匹配到 reg 是 true
  const show = /reg$/.test(ctx.path) 

  await ctx.render("register", {
      show,
      title:"登录-注册"
    })
})

// 注册用户 路由
router.post("/user/reg", user.reg)

// 用户登录 路由
router.post("/user/login", user.login)



module.exports = router