// pages/About/About.js
const util = require('../../utils/util.js')
const app = getApp();
//连接云数据库
const db = wx.cloud.database();
//获取云数据库中数据集合的引用
const feedback_db = db.collection('feedback_db');
//数据库操作符
const _ = db.command;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sex:'',
        name:'',
        content:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    btnsub(res){
        wx.showLoading({
          title: '数据提交中。。',
        })
        let db = wx.cloud.database()
        var {sex,name,content}=res.detail.value;
        db.collection("feedback_db").add({
            data:{
                // 从全局变量中获取用户信息
                nickName: app.globalData.hasUserInfo ? app.globalData.userInfo.nickName : '',
                sex:sex,
                name:name,
                content:content,
                time:util.formatTime(new Date()),
            }
        }).then(res=>{
            wx.hideLoading({
              success: (res) => {
                  wx.showToast({
                    title: '提交成功',
                  })
              },
            })
        })
    },
    delType:function(e){

        
       
       }
})