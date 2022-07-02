// pages/rank/rank.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listdata:[
            {"openid":"0",
            "score":0}
        ]
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 数据池，获取进入其他页面上次的数据（存储在数据池中）
        var developer = (wx.getStorageSync('developer') || [])
        wx.cloud.callFunction({
            name:'bubblesort',
            data:{
                message:'bubblesort'
            }
        }).then(res=>{
            // for(i=0;i<res.data.length;i++)
            // {
            //     this.data.listdata[i].openid = res.data[i].openid
            //     this.data.listdata[i].score = res.data[i].score
            // }
            console.log(res)
            this.setData({
                listdata:[{"openid":'res.openid',"score":developer.score}] 
            })
        })
        
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

    }
})