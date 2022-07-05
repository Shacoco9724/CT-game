// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    // const wxContext = cloud.getWXContext()
    // return {
    //     event,
    //     openid: wxContext.OPENID,
    //     appid: wxContext.APPID,
    //     unionid: wxContext.UNIONID,
    // }
    let openid = cloud.getWXContent()
    return  openid
    // return await db.collection('users').add({
    //     data:{
    //         description: event.description,
    //         due: event.due,
           
    //     }
    // })
}