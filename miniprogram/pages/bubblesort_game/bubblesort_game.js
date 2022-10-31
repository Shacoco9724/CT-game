// const { endianness } = require('os');
const util = require('../../utils/util.js')
const app = getApp();
//连接云数据库
const db = wx.cloud.database();
//获取云数据库中数据集合的引用
const bubblesort_score = db.collection('bubblesort_score');
//数据库操作符
const _ = db.command;
let changefalse = 1;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        init_data: [{
                index: 6
            },
            {
                index: 8
            },
            {
                index: 5
            },
            {
                index: 1
            },
            {
                index: 7
            },
            {
                index: 4
            },
            {
                index: 2
            }
        ],
        again:0,
        startTime: new Date(),
        timecount: 0,
        // firstWin: 0,
        // secondWin: 0,
        // thirdWin: 0,
        // forthWin: 0,
        // fifthWin: 0,
        // sixthWin: 0,
        // seventhWin: 0,
        firstwin:0,
        secondwin:0,
        thirdwin:0,
        textcolor: 'rgb(255,255,255)',
        isWin: 0,
        touch: -1,
        checked: false,
        begin: 0,
        end: 0,
        hidden: true,
        flag: false,
        x: 0,
        y: 0,
        maopaotimes: 0,
        changetimes: 0,
        changetimesok: 0,
        textarea: '',
        score: 7,
        userInfo: {
            nickName: '',
            avataUrl: '',
        },
        // 进入页面开始显示的数字：以随机数显示
        data: [{
                index: Math.round(Math.random() * 100),
                bgcolor: 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);',
                textcolor: 'rgb(255,255,255)',
            },
            {
                index: Math.round(Math.random() * 100),
                bgcolor: 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);',
                textcolor: 'rgb(255,255,255)',
            },
            {
                index: Math.round(Math.random() * 100),
                bgcolor: 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);',
                textcolor: 'rgb(255,255,255)',
            },
            {
                index: Math.round(Math.random() * 100),
                bgcolor: 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);',
                textcolor: 'rgb(255,255,255)',
            },
            {
                index: Math.round(Math.random() * 100),
                bgcolor: 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);',
                textcolor: 'rgb(255,255,255)',
            },
            {
                index: Math.round(Math.random() * 100),
                bgcolor: 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);',
                textcolor: 'rgb(255,255,255)',
            },
            {
                index: Math.round(Math.random() * 100),
                // bgcolor: 'red',
                bgcolor: 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);',
                textcolor: 'rgb(255,255,255)',
            },
        ],
        arr: [{
                index: 6
            },
            {
                index: 8
            },
            {
                index: 5
            },
            {
                index: 1
            },
            {
                index: 7
            },
            {
                index: 4
            },
            {
                index: 2
            }
        ],
        disabled: true,
        elements: []
    },
    // 产生随机数事件
    changeNumber: function (e) {
        let data = this.data.data;
        for (var i = 0; i < 7; i++) {
            data[i].index = Math.round(Math.random() * 100);
        }
        this.setData({
            data: data
        })
    },
    bubble_storage() {
        if (this.data.changetimes != 0) {
            // 如果用户没有点击提交排序结果按钮 并且 移动次数不为0，直接返回到首页时，这里返回后可以把数据存储到数据库
            let sortResult = {
                // 从全局变量中获取用户信息
                nickName: app.globalData.hasUserInfo ? app.globalData.userInfo.nickName : '',
                // avatarUrl:app.globalData.hasUserInfo?app.globalData.userInfo.avatarUrl:''
                // 最初的排序数字
                init_data: this.data.init_data,
                score: this.data.score,
                changeTimes: this.data.changetimes,
                changeTimesok: this.data.changetimesok,
                isWin: this.data.isWin,
                // firstWin: this.data.firstWin,
                // secondWin: this.data.secondWin,
                // thirdWin: this.data.thirdWin,
                // forthWin: this.data.forthWin,
                // fifthWin: this.data.fifthWin,
                // sixthWin: this.data.sixthWin,
                // seventhWin: this.data.seventhWin,
                firstwin:this.data.firstwin,
                secondwin: this.data.secondwin,
                thirdwin: this.data.thirdwin,
                timecount: this.data.timecount,
            };
            bubblesort_score.add({
                data: {
                    ...sortResult,
                    // 创建当前时间
                    // createDate:db.serverDate()
                    time: util.formatTime(new Date())
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    // 在进入冒泡排序页面后进行的操作都会执行
    onLoad: function (options) {
        var query = wx.createSelectorQuery();
        var nodesRef = query.selectAll(".item");
        nodesRef.fields({
            dataset: true,
            rect: true
        }, (result) => {
            this.setData({
                elements: result,
            })
        }).exec()
        // 随机生成7个数字
        this.rand_number();
        this.arrsort(this.data.arr);
        console.log('排好的数据', this.data.arr);
        // 进入冒泡排序页面就加1
        this.setData({
            touch:-1,
            maopaotimes: 1,
            isWin: 0,
            score: 7,
            firstWin: 0,
            secondWin: 0,
            thirdWin: 0,
            forthWin: 0,
            fifthWin: 0,
            sixthWin: 0,
            seventhWin: 0,
            textarea: '',
            startTime:new Date(),
            again:0,
        })
        //返回首页进行提示
        // wx.enableAlertBeforeUnload({
        //     message: '要返回吗',
        //     success: function (res) {
        //         console.log("chenggong", res);
        //     },
        //     fail: function (err) {
        //         console.log("shibai", err);
        //     }
        // })
    },
    onButtonTap() {
        if (this.data.isWin == 1 || this.data.again == 1) {
            this.onLoad();
        } else {
            wx.showModal({
                content: "还没有完成哦",
                cancelColor: '还没有完成哦',
            })
        }

    },
    rand_number() {
        var data = this.data.data;
        var arr = this.data.arr;
        for (var i = 0; i < 7; i++) {
            data[i].index = Math.floor(Math.random() * 100);
            data[i].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);'
            arr[i].index = data[i].index
            for (var j = 0; j < i; j++) {
                if (data[j].index == data[i].index) {
                    data[i].index = Math.floor(Math.random() * 100);
                    arr[i].index = data[i].index
                }
            }
        }
        // data[6].bgcolor = 'red'
        console.log('原始数据', this.data.data)
        for (var i = 0; i < 7; i++) {
            this.data.init_data[i].index = data[i].index
        }
        this.setData({
            data: data,
            arr: arr,

        })
    },
    arrsort(arr) {
        for (var i = 0; i < 7; i++) {
            for (var j = i; j < 7; j++) {
                if (arr[i].index > arr[j].index) {
                    let temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                }
            }
        }
        console.log('在排序里面的原始数据', this.data.data)
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
        //    this.player(wx.getBackgroundAudioManager())
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // 小程序隐藏时候暂停播放（不加页面将一直播放）
        //    wx.getBackgroundAudioManager().stop();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    // 在退出冒泡排序页面后的数据就是在这个监听页面卸载执行
    onUnload: function () {
        if (this.data.isWin == 0) {
            this.bubble_storage();
        }


        // 页面卸载时候暂停播放（不加页面将一直播放）
        // wx.getBackgroundAudioManager().stop();
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

    //长按
    _longtap: function (e) {
        const detail = e.detail;
        this.setData({
            x: e.currentTarget.offsetLeft,
            y: e.currentTarget.offsetTop
        })
        this.setData({
            hidden: false,
            flag: true
        })
    },
    //触摸开始
    touchs: function (e) {
        this.setData({
            beginIndex: e.currentTarget.dataset.index
        })
        // 首先确定从最前面开始还是从最后面开始，并且确定按升序还是降序
        // 这里默认从后面开始，按升序排序
        const list = this.data.elements;
        // if(this.data.beginIndex!=list.length-1){
        //     wx.showToast({
        //       title: '再想想...',
        //       icon:'none',
        //       duration:1500
        //     })
        // }
    },
    //触摸结束（完成数字交换）
    touchend: function (e) {
        if (this.data.score == 0) {
            wx.showToast({
                title: '游戏失败',
                icon: 'none',
                image: "../../images/failed.jpg",
            })
            this.setData({
                again:1,
                textarea: "点击下方再来一次"
            })
        } 
        else if(this.data.isWin == 1){
            this.setData({
                again:1,
                textarea: "点击下方再来一次"
            })
        }
        else {
            if (!this.data.flag) {
                return;
            }
            const x = e.changedTouches[0].pageX
            const y = e.changedTouches[0].pageY
            const list = this.data.elements;
            let data = this.data.data //数字

            for (var j = 0; j < list.length; j++) {
                const item = list[j];
                if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
                    const endIndex = item.dataset.index;
                    const beginIndex = this.data.beginIndex;
                    //向后移动
                    // if (beginIndex < endIndex) {
                    //     if (data[beginIndex].index < data[endIndex].index) {
                    //         let tem = data[beginIndex];
                    //         for (let i = beginIndex; i < endIndex; i++) {
                    //             data[i] = data[i + 1]
                    //         }
                    //         data[endIndex] = tem;
                    //     }
                    // }
                    console.log('当前移动的数字', data[beginIndex].index, data[endIndex].index);
                    if (Math.abs(beginIndex - endIndex) == 1) {
                        // 从最开始判断touch=0的时候
                        if (this.data.touch == 0) {
                            // 当touch=0时，先判断是不是所有都排好序
                            if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                var title1 = '所有都排好啦!' + '\n' + '共计' + this.data.timecount + '秒'
                                wx.showToast({
                                    title: title1,
                                    duration: 2000,
                                    image: "../../images/winer.png"
                                })
                                if(this.data.score>0 && this.data.score<=2){
                                    this.setData({
                                        firstwin:1,
                                    })
                                }
                                else if(this.data.score>2 && this.data.score<=5){
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                    })
                                }
                                else{
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                        thirdwin:1,
                                    })
                                }
                                this.setData({
                                    touch: -1,
                                    isWin: 1,
                                    firstWin: 1,
                                    secondWin: 1,
                                    thirdWin: 1,
                                    forthWin: 1,
                                    fifthWin: 1,
                                    sixthWin: 1,
                                    seventhWin: 1,
                                    textarea: "恭喜你完成此次排序游戏！",
                                    again:1,
                                    timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                })
                                this.bubble_storage();
                            }
                            // 不管之前哪个没排好，touch=0时，表示又从最后一位开始进行比较
                            else {
                                // 如果要进行交换,再来判断要移动的是不是这个数字
                                if (beginIndex == 6) {
                                    // 先判断 要比较的两个数字是否进行交换
                                    if (data[6].index < data[5].index) {
                                        let tem = data[beginIndex];
                                        for (let i = beginIndex; i > endIndex; i--) {
                                            data[i] = data[i - 1]
                                        }
                                        data[endIndex] = tem;
                                        data[endIndex].bgcolor = 'red;';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        // 交换之后把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                        // 交换之后也要判断是否排好序
                                        if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                            this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            var title1 = '所有都排好啦!' + '\n' + '共计' + this.data.timecount + '秒'
                                            wx.showToast({
                                                title: title1,
                                                duration: 2000,
                                                image: "../../images/winer.png"
                                            })
                                            for (var i = 0; i < 7; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            if(this.data.score>0 && this.data.score<=2){
                                                this.setData({
                                                    firstwin:1,
                                                })
                                            }
                                            else if(this.data.score>2 && this.data.score<=5){
                                                this.setData({
                                                    firstwin:1,
                                                    secondwin:1,
                                                })
                                            }
                                            else{
                                                this.setData({
                                                    firstwin:1,
                                                    secondwin:1,
                                                    thirdwin:1,
                                                })
                                            }
                                            this.setData({
                                                again:1,
                                                touch: -1,
                                                isWin: 1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                                sixthWin: 1,
                                                seventhWin: 1,
                                                textarea: "恭喜你完成此次排序游戏！",
                                                timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                            })
                                            this.bubble_storage();
                                        }
                                    }
                                    // 如果要比较的两个数字是有序的// 又从前面开始
                                    else {
                                        data[endIndex].bgcolor = 'red';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        // 比较了,仍然把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                    }
                                    this.setData({
                                        // score:this.data.score+1
                                    })
                                }
                                // 移动的不是这个数字,进行提示
                                else {
                                    this.setData({
                                        score: this.data.score - 1,
                                        textarea: "从最后一位开始哦"
                                    })
                                }
                            }
                        }
                        // 当touch=1的时候，从最后一位已经开始，此时向前点击
                        else if (this.data.touch == 1) {
                            //交换一次之后，判断前面6个数字是否排好序，如果6个数字都排好了，所有都排好了，最后一个肯定是有序的
                            //判断前面6个数字和最后一个数字是不是排好序
                            if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                var title1 = '所有都排好啦!' + '\n' + '共计' + this.data.timecount + '秒'
                                wx.showToast({
                                    title: title1,
                                    duration: 2000,
                                    image: "../../images/winer.png"
                                })
                                for (var i = 0; i < 7; i++) {
                                    data[i].bgcolor = 'yellow'
                                }
                                if(this.data.score>0 && this.data.score<=2){
                                    this.setData({
                                        firstwin:1,
                                    })
                                }
                                else if(this.data.score>2 && this.data.score<=5){
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                    })
                                }
                                else{
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                        thirdwin:1,
                                    })
                                }
                                this.setData({
                                    again:1,
                                    touch: -1,
                                    isWin: 1,
                                    firstWin: 1,
                                    secondWin: 1,
                                    thirdWin: 1,
                                    forthWin: 1,
                                    fifthWin: 1,
                                    sixthWin: 1,
                                    seventhWin: 1,
                                    textarea: "恭喜你完成此次排序游戏！",
                                    timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                })
                                this.bubble_storage();
                            }
                            // 之前哪个没排好
                            else {
                                // 先判断 要比较的两个数字是否进行交换
                                // 如果要进行交换,再来判断要移动的是不是这个数字
                                if (beginIndex == 5) {
                                    if (data[5].index < data[4].index) {
                                        let tem = data[beginIndex];
                                        for (let i = beginIndex; i > endIndex; i--) {
                                            data[i] = data[i - 1]
                                        }
                                        data[endIndex] = tem;
                                        data[endIndex].bgcolor = 'red';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        // 交换之后把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                        // 交换之后也要判断在这之前是否排好序,以及所有是否排好序
                                        if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                            this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            var title1 = '所有都排好啦!' + '\n' + '共计' + this.data.timecount + '秒'
                                            wx.showToast({
                                                title: title1,
                                                duration: 2000,
                                                image: "../../images/winer.png"
                                            })
                                            for (var i = 0; i < 7; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            if(this.data.score>0 && this.data.score<=2){
                                                this.setData({
                                                    firstwin:1,
                                                })
                                            }
                                            else if(this.data.score>2 && this.data.score<=5){
                                                this.setData({
                                                    firstwin:1,
                                                    secondwin:1,
                                                })
                                            }
                                            else{
                                                this.setData({
                                                    firstwin:1,
                                                    secondwin:1,
                                                    thirdwin:1,
                                                })
                                            }
                                            this.setData({
                                                again:1,
                                                touch: -1,
                                                isWin: 1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                                sixthWin: 1,
                                                seventhWin: 1,
                                                textarea: '恭喜你完成游戏！',
                                                timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                            })
                                            this.bubble_storage();
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index) {
                                            for (var i = 0; i < 5; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red'
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                                textarea: "已经有五颗星点亮啦，还剩两颗星哦。",
                                            })
                                        }
                                    }
                                    // 如果要比较的两个数字是有序的// 又从前面开始
                                    else {
                                        data[endIndex].bgcolor = 'red';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        // 比较了,仍然把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                    }
                                    this.setData({
                                        // score:this.data.score+=1
                                    })
                                }
                                // 移动的不是这个数字,进行提示
                                else {
                                    this.setData({
                                        textarea: "从第6位开始哦",
                                        score: this.data.score - 1,
                                    })
                                }
                            }
                        } else if (this.data.touch == 2) {
                            if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                var title1 = '所有都排好啦!' + '\n' + '共计' + this.data.timecount + '秒'
                                wx.showToast({
                                    title: title1,
                                    duration: 2000,
                                    image: "../../images/winer.png"
                                })
                                for (var i = 0; i < 7; i++) {
                                    data[i].bgcolor = 'yellow'
                                }
                                if(this.data.score>0 && this.data.score<=2){
                                    this.setData({
                                        firstwin:1,
                                    })
                                }
                                else if(this.data.score>2 && this.data.score<=5){
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                    })
                                }
                                else{
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                        thirdwin:1,
                                    })
                                }
                                this.setData
                                ({
                                    again:1,
                                    touch: -1,
                                    isWin: 1,
                                    firstWin: 1,
                                    secondWin: 1,
                                    thirdWin: 1,
                                    forthWin: 1,
                                    fifthWin: 1,
                                    sixthWin: 1,
                                    seventhWin: 1,
                                    textarea: "恭喜你完成游戏！",
                                    timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                })
                                this.bubble_storage();
                            }
                            // 之前哪个没排好
                            else {
                                // 如果要进行交换,再来判断要移动的是不是这个数字
                                if (beginIndex == 4) {
                                    // 先判断 要比较的两个数字是否进行交换
                                    if (data[4].index < data[3].index) {
                                        let tem = data[beginIndex];
                                        for (let i = beginIndex; i > endIndex; i--) {
                                            data[i] = data[i - 1]
                                        }
                                        data[endIndex] = tem;
                                        data[endIndex].bgcolor = 'red';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        // 交换之后把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                        // 交换之后也要判断在这之前是否排好序,以及所有是否排好序
                                        if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                            var title1 = '所有都排好啦!' + '\n' + '共计' + this.data.timecount + '秒'
                                            wx.showToast({
                                                title: title1,
                                                duration: 2000,
                                                image: "../../images/winer.png"
                                            })
                                            this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            for (var i = 0; i < 7; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            if(this.data.score>0 && this.data.score<=2){
                                                this.setData({
                                                    firstwin:1,
                                                })
                                            }
                                            else if(this.data.score>2 && this.data.score<=5){
                                                this.setData({
                                                    firstwin:1,
                                                    secondwin:1,
                                                })
                                            }
                                            else{
                                                this.setData({
                                                    firstwin:1,
                                                    secondwin:1,
                                                    thirdwin:1,
                                                })
                                            }
                                            this.setData({
                                                again:1,
                                                touch: -1,
                                                isWin: 1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                                sixthWin: 1,
                                                seventhWin: 1,
                                                textarea: "恭喜你完成了排序游戏！",
                                                timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                            })
                                            this.bubble_storage();
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index) {
                                            for (var i = 0; i < 5; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                            })
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index) {
                                            for (var i = 0; i < 4; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                            })
                                        }
                                    }
                                    // 如果要比较的两个数字是有序的// 又从前面开始
                                    else {
                                        data[endIndex].bgcolor = 'red';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        // 比较了,仍然把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                    }
                                    this.setData({
                                        // score:this.data.score+=1
                                    })
                                } // 移动的不是这个数字,进行提示 
                                else {
                                    this.setData({
                                        textarea: "从第5位开始哦",
                                        score: this.data.score - 1,
                                    })
                                }
                            }
                        } else if (this.data.touch == 3) {
                            if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                var title1 = '所有都排好啦!' + '\n' + '共计' + this.data.timecount + '秒'
                                wx.showToast({
                                    title: title1,
                                    duration: 2000,
                                    image: "../../images/winer.png"
                                })
                                this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                for (var i = 0; i < 7; i++) {
                                    data[i].bgcolor = 'yellow'
                                }
                                if(this.data.score>0 && this.data.score<=2){
                                    this.setData({
                                        firstwin:1,
                                    })
                                }
                                else if(this.data.score>2 && this.data.score<=5){
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                    })
                                }
                                else{
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                        thirdwin:1,
                                    })
                                }
                                this.setData({
                                    again:1,
                                    touch: -1,
                                    isWin: 1,
                                    firstWin: 1,
                                    secondWin: 1,
                                    thirdWin: 1,
                                    forthWin: 1,
                                    fifthWin: 1,
                                    sixthWin: 1,
                                    seventhWin: 1,
                                    textarea: "恭喜你点亮了所有星星！",
                                    timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                })
                                this.bubble_storage();
                            }
                            // 之前哪个没排好
                            else {
                                // 如果要进行交换,再来判断要移动的是不是这个数字
                                if (beginIndex == 3) {
                                    // 先判断 要比较的两个数字是否进行交换
                                    if (data[3].index < data[2].index) {
                                        let tem = data[beginIndex];
                                        for (let i = beginIndex; i > endIndex; i--) {
                                            data[i] = data[i - 1]
                                        }
                                        data[endIndex] = tem;
                                        data[endIndex].bgcolor = 'red';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        // 交换之后把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                        // 交换之后也要判断在这之前是否排好序,以及所有是否排好序
                                        if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                            var title1 = '所有都排好啦!' + '\n' + '共计' + this.data.timecount + '秒'
                                            wx.showToast({
                                                title: title1,
                                                duration: 2000,
                                                image: "../../images/winer.png"
                                            })
                                            this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            for (var i = 0; i < 7; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            this.setData({
                                                again:1,
                                                touch: -1,
                                                isWin: 1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                                sixthWin: 1,
                                                seventhWin: 1,
                                            })
                                            this.bubble_storage();
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index) {
                                            for (var i = 0; i < 5; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                            })
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index) {
                                            for (var i = 0; i < 4; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                            })
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index) {
                                            for (var i = 0; i < 3; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                            })
                                        }
                                    }
                                    // 如果要比较的两个数字是有序的// 又从前面开始
                                    else {
                                        data[endIndex].bgcolor = 'red';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        // 比较了,仍然把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                    }
                                    this.setData({
                                        // score:this.data.score+=1
                                    })
                                }
                                // 移动的不是这个数字,进行提示
                                else {
                                    this.setData({
                                        textarea: "从第四位开始哦",
                                        score: this.data.score - 1,
                                    })
                                }
                            }
                        } else if (this.data.touch == 4) {
                            if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                var title1 = '所有都排好啦!' +'\n' + '共计' + this.data.timecount + '秒'
                                wx.showToast({
                                    title: title1,
                                    duration: 2000,
                                    image: "../../images/winer.png"
                                })
                                this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                for (var i = 0; i < 7; i++) {
                                    data[i].bgcolor = 'yellow'
                                }
                                if(this.data.score>0 && this.data.score<=2){
                                    this.setData({
                                        firstwin:1,
                                    })
                                }
                                else if(this.data.score>2 && this.data.score<=5){
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                    })
                                }
                                else{
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                        thirdwin:1,
                                    })
                                }
                                this.setData({
                                    again:1,
                                    touch: -1,
                                    isWin: 1,
                                    firstWin: 1,
                                    secondWin: 1,
                                    thirdWin: 1,
                                    forthWin: 1,
                                    fifthWin: 1,
                                    sixthWin: 1,
                                    seventhWin: 1,
                                    textarea: "恭喜你完成了排序游戏！",
                                    timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                })
                                this.bubble_storage();
                            }
                            // 之前哪个没排好
                            else {
                                // 如果要进行交换,再来判断要移动的是不是这个数字
                                if (beginIndex == 2) {
                                    // 先判断 要比较的两个数字是否进行交换
                                    if (data[2].index < data[1].index) {
                                        let tem = data[beginIndex];
                                        for (let i = beginIndex; i > endIndex; i--) {
                                            data[i] = data[i - 1]
                                        }
                                        data[endIndex] = tem;
                                        data[endIndex].bgcolor = 'red';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        // 交换之后把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                        // 交换之后也要判断在这之前是否排好序,以及所有是否排好序
                                        if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                            var title1 = '所有都排好啦!' +'\n' + '共计' + this.data.timecount + '秒'
                                            wx.showToast({
                                                title: title1,
                                                duration: 2000,
                                                image: "../../images/winer.png"
                                            })
                                            this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            for (var i = 0; i < 7; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            if(this.data.score>0 && this.data.score<=2){
                                                this.setData({
                                                    firstwin:1,
                                                })
                                            }
                                            else if(this.data.score>2 && this.data.score<=5){
                                                this.setData({
                                                    firstwin:1,
                                                    secondwin:1,
                                                })
                                            }
                                            else{
                                                this.setData({
                                                    firstwin:1,
                                                    secondwin:1,
                                                    thirdwin:1,
                                                })
                                            }
                                            this.setData({
                                                again:1,
                                                touch: -1,
                                                isWin: 1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                                sixthWin: 1,
                                                seventhWin: 1,
                                                textarea: "恭喜你完成所有排序！",
                                                timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                            })
                                            this.bubble_storage();
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index) {
                                            for (var i = 0; i < 5; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                            })
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index) {
                                            for (var i = 0; i < 4; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                            })
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index) {
                                            for (var i = 0; i < 3; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                            })
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index) {
                                            for (var i = 0; i < 2; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                            })
                                        }
                                    }
                                    // 如果要比较的两个数字是有序的// 又从前面开始
                                    else {
                                        data[endIndex].bgcolor = 'red';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        // 比较了,仍然把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                    }
                                    this.setData({
                                        // score:this.data.score+=1
                                    })
                                }
                                // 移动的不是这个数字,进行提示
                                else {
                                    this.setData({
                                        textarea: "从第三位开始哦",
                                        score: this.data.score - 1,
                                    })
                                }
                            }
                        } else if (this.data.touch == 5) {
                            if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                var title1 = '所有都排好啦!' +'\n' + '共计' + this.data.timecount + '秒'
                                wx.showToast({
                                    title: title1,
                                    duration: 2000,
                                    image: "../../images/winer.png"
                                })
                                this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                for (var i = 0; i < 7; i++) {
                                    data[i].bgcolor = 'yellow'
                                }
                                if(this.data.score>0 && this.data.score<=2){
                                    this.setData({
                                        firstwin:1,
                                    })
                                }
                                else if(this.data.score>2 && this.data.score<=5){
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                    })
                                }
                                else{
                                    this.setData({
                                        firstwin:1,
                                        secondwin:1,
                                        thirdwin:1,
                                    })
                                }
                                this.setData({
                                    again:1,
                                    touch: -1,
                                    isWin: 1,
                                    firstWin: 1,
                                    secondWin: 1,
                                    thirdWin: 1,
                                    forthWin: 1,
                                    fifthWin: 1,
                                    sixthWin: 1,
                                    seventhWin: 1,
                                    textarea: "恭喜你完成所有排序！",
                                    timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                })
                                this.bubble_storage();
                            }
                            // 之前哪个没排好
                            else {
                                // 如果要进行交换,再来判断要移动的是不是这个数字
                                if (beginIndex == 1) {
                                    // 先判断 要比较的两个数字是否进行交换
                                    if (data[1].index < data[0].index) {
                                        let tem = data[beginIndex];
                                        for (let i = beginIndex; i > endIndex; i--) {
                                            data[i] = data[i - 1]
                                        }
                                        data[endIndex] = tem;
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);'
                                        data[endIndex].bgcolor = 'red';
                                        // 交换之后把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                        // 交换之后也要判断在这之前是否排好序,以及所有是否排好序
                                        if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index && data[5].index == this.data.arr[5].index && data[6].index == this.data.arr[6].index) {
                                            var title1 = '所有都排好啦!' +'\n' + '共计' + this.data.timecount + '秒'
                                            wx.showToast({
                                                title: title1,
                                                duration: 2000,
                                                image: "../../images/winer.png"
                                            })
                                            this.data.timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            for (var i = 0; i < 7; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            if(this.data.score>0 && this.data.score<=2){
                                                this.setData({
                                                    firstwin:1,
                                                })
                                            }
                                            else if(this.data.score>2 && this.data.score<=5){
                                                this.setData({
                                                    firstwin:1,
                                                    secondwin:1,
                                                })
                                            }
                                            else{
                                                this.setData({
                                                    firstwin:1,
                                                    secondwin:1,
                                                    thirdwin:1,
                                                })
                                            }
                                            this.setData({
                                                again:1,
                                                touch: -1,
                                                isWin: 1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                                sixthWin: 1,
                                                seventhWin: 1,
                                                textarea: '恭喜你！完成游戏！',
                                                timecount:((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3),
                                            })
                                            this.bubble_storage();
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index && data[4].index == this.data.arr[4].index) {
                                            for (var i = 0; i < 5; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                                fifthWin: 1,
                                                textarea: '五颗星星点亮啦，还剩最后两颗哦',
                                            })
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index && data[3].index == this.data.arr[3].index) {
                                            for (var i = 0; i < 4; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                                forthWin: 1,
                                            })
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index && data[2].index == this.data.arr[2].index) {
                                            for (var i = 0; i < 3; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red'
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                                thirdWin: 1,
                                            })
                                        } else if (data[0].index == this.data.arr[0].index && data[1].index == this.data.arr[1].index) {
                                            for (var i = 0; i < 2; i++) {
                                                data[i].bgcolor = 'yellow'
                                            }
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                                secondWin: 1,
                                            })
                                        } else if (data[0].index == this.data.arr[0].index) {
                                            data[0].bgcolor = 'yellow';
                                            // data[6].bgcolor = 'red';
                                            this.setData({
                                                touch: -1,
                                                firstWin: 1,
                                            })
                                        }
                                    }
                                    // 如果要比较的两个数字是有序的
                                    else {
                                        data[endIndex].bgcolor = 'red';
                                        data[beginIndex].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);';
                                        this.setData({
                                            textarea: '下一趟排序啦',
                                            score: this.data.score - 1,
                                        })
                                        // 比较了,仍然把touch加1
                                        this.data.touch++;
                                        if (changefalse == 0) {
                                            changefalse = 1
                                            this.setData({
                                                textarea: "对了，继续加油！"
                                            })
                                        }
                                    }
                                    this.setData({
                                        // score:this.data.score+=1
                                    })
                                }
                                // 移动的不是这个数字,进行提示
                                else {
                                    this.setData({
                                        textarea: '从第2个数字开始哦',
                                        score: this.data.score - 1,
                                    })
                                }
                            }
                        }
                        this.setData({
                            data: data,
                            // textarea: '做的好，继续加油！',
                            // score: this.data.score += 10
                        })
                        // 每成功交换一次就把交换成功次数加1
                        this.data.changetimesok += 1;

                    } else if (Math.abs(beginIndex - endIndex) == 0) {
                        changefalse = 0;
                        if ((this.data.touch == -1 && beginIndex == 6)) {
                            data[beginIndex].bgcolor = 'red';
                            this.setData({
                                touch: this.data.touch += 1,
                                textarea: '对了，继续加油哦'
                            })
                        }
                        // 如果遇到不交换的数字，需要点击前面一张卡牌，并且touch加1
                        else if (this.data.touch != -1 && data[beginIndex + 1].index > data[beginIndex].index && beginIndex != 6) {

                            for (var i = 0; i < 7; i++) {
                                if (data[i].bgcolor == 'red') {
                                    console.log('此时的i为', i)
                                    if (beginIndex == i - 1) {
                                        this.setData({
                                            touch: this.data.touch += 1,
                                        })
                                        data[beginIndex].bgcolor = 'red';
                                        data[beginIndex + 1].bgcolor = 'linear-gradient(90deg, #ffa96f 0%, #ffc5b4 52%, #ffe4ce 100%);'
                                        console.log('点击其他的不把touch加1')
                                    } else {
                                        this.setData({
                                            textarea: '选择错误啦'
                                        })
                                    }

                                }
                            }
                        } else {
                            this.setData({
                                textarea: '选择正确的数字哦',
                            })
                        }
                        this.setData({
                            data: data
                        })

                    } else {
                        changefalse = 0
                        this.setData({
                            textarea: '交换错误，你的分数减1分',
                            score: this.data.score - 1,
                        })
                    }
                    console.log('此时的touch为', this.data.touch)
                    this.data.begin = data[beginIndex];
                    this.data.end = data[endIndex]
                }
                this.setData({
                    hidden: true,
                    flag: false

                })
            }
            // 每移动卡牌数字一次就把次数加1
            this.data.changetimes += 1;
        }

    },
    //滑动
    touchm: function (e) {
        if (this.data.flag) {
            const x = e.touches[0].pageX
            const y = e.touches[0].pageY
            this.setData({
                x: x - 35,
                y: y - 45
            })
        }
    },

})