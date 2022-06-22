// // pages/search_gamerules/search_gamerules.js
// Page({

//     /**
//      * 页面的初始数据
//      */
//     data: {

//     },

//     /**
//      * 生命周期函数--监听页面加载
//      */
//     onLoad: function (options) {

//     },

//     /**
//      * 生命周期函数--监听页面初次渲染完成
//      */
//     onReady: function () {

//     },

//     /**
//      * 生命周期函数--监听页面显示
//      */
//     onShow: function () {

//     },

//     /**
//      * 生命周期函数--监听页面隐藏
//      */
//     onHide: function () {

//     },

//     /**
//      * 生命周期函数--监听页面卸载
//      */
//     onUnload: function () {

//     },

//     /**
//      * 页面相关事件处理函数--监听用户下拉动作
//      */
//     onPullDownRefresh: function () {

//     },

//     /**
//      * 页面上拉触底事件的处理函数
//      */
//     onReachBottom: function () {

//     },

//     /**
//      * 用户点击右上角分享
//      */
//     onShareAppMessage: function () {

//     }
// })
Page({
        /**
         * 页面的初始数据
         */
        data: {
            newArr: [{
                    id: 1,
                    showA: 'block',
                    showB: 'none',
                },
                {
                    id: 2,
                    showA: 'block',
                    showB: 'none',
                },
                {
                    id: 3,
                    showA: 'block',
                    showB: 'none',
                }, {
                    id: 4,
                    showA: 'block',
                    showB: 'none',
                }
            ],
            firstClickId: 0
        },
        //点击切换卡片
        change: function(e) {
            var id = e.currentTarget.dataset.id;
            this.data.firstClickId = id;
            var newArr = this.data.newArr;
            //得到当前的卡片
            var currentData = newArr[id - 1];
            if (currentData.showA == 'block') {
                currentData.showA = 'none';
                currentData.showB = 'block';
                newArr[id - 1] = currentData;
                this.setData({
                    newArr: newArr
                })
            } else {
                currentData.showA = 'block';
                currentData.showB = 'none';
                newArr[id - 1] = currentData;
                this.setData({
                    newArr: newArr
                })
    
            }
        },
    })