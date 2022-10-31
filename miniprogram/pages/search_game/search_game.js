const util = require('../../utils/util.js')
const app = getApp();
//连接云数据库
const db = wx.cloud.database();
//获取云数据库中数据集合的引用
const search_db = db.collection('search_db');
//数据库操作符
const _ = db.command;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        number1: '',
        isInput1: 0,
        number2: '',
        isInput2: 0,
        isInput3: 0,
        number3: '',
        textarea:'小提示：每猜对一个不一样的数字，就得到一颗星哦。',
        firstWin: 0,
        secondWin: 0,
        thirdWin: 0,
        score: 0,
        rand: 0,
        again: 0,
        isWin: 0,
        search_times: 0,
        search_timesok: 0,
        newArr: [{
                id: 1,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            },
            {
                id: 2,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            },
            {
                id: 3,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            },
            {
                id: 4,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            },
            {
                id: 5,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 6,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 7,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            },
            {
                id: 8,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 9,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 10,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 11,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 12,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 13,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 14,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 15,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 16,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 17,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            }, {
                id: 18,
                number: Math.round(Math.random() * 100),

                showA: 'block',
                showB: 'none',
                card_b: 'rgb(255, 246, 123)',
            },
        ],
        firstClickId: 0,

    },
    rand() { //生成随机数（1-18）
        var newArr = this.data.newArr;
        for (var i = 0; i < 18; i++) {
            newArr[i].number = Math.floor(Math.random() * 18);
            newArr[i].showA = 'block';
            newArr[i].showB = 'none';
            newArr[i].card_b = 'rgb(255, 246, 123)';
            for (var j = 0; j <= i; j++) {
                if (newArr[j].number == 0) {
                    newArr[j].number = Math.floor(Math.random() * 18);
                }
                // if (newArr[j].number == newArr[i].number) {
                //     newArr[i].number = Math.floor(Math.random() * 18);
                // }
            }
        }
        this.setData({
            newArr: newArr
        })
        console.log(newArr, "   ", this.data.newArr)
    },
    onLoad: function (options) {
        this.rand();
        var newarr = [2, 3, 4, 5, 6]
        var a = Math.floor(Math.random() * 5)
        console.log(a);
        this.setData({
            isWin:0,
            again:0,
            rand: newarr[a],
            firstWin: 0,
            secondWin: 0,
            thirdWin: 0,
            score: 0,
            number1:'',
            number2: '',
            number3: '',
        })

    },
    // 在退出冒泡排序页面后的数据就是在这个监听页面卸载执行
    onUnload: function () {
        if (this.data.search_times != 0 && this.data.search_times != this.data.search_timesok) {
            this.search_storage();
        }
    },
    onButtonTap: function () {
        if (this.data.again == 1) {
            this.onLoad();
        } else {
            wx.showToast({
                title: '还没完成哦',
                icon: 'none',
            })
        }

    },
    getInputnumber1: function (e) {
        this.setData({
            number1: e.detail.value,
        })
        console.log(this.data.number1)
        if (e) {
            this.data.isInput1 = 1
        }
    },
    getInputnumber2: function (e) {
        this.setData({
            number2: e.detail.value
        })
        console.log(this.data.number2)
        if (e) {
            this.data.isInput2 = 1
        }
    },
    getInputnumber3: function (e) {
        this.setData({
            number3: e.detail.value
        })
        console.log(this.data.number3)
        if (e) {
            this.data.isInput3 = 1
        }
        if(this.data.number1 == this.data.number2 || this.data.number1 == this.data.number3 || this.data.number3 == this.data.number2){
            this.setData({
                textarea:'输入一样的数字只能表示一颗星哦'
            })
        }
    },
    //点击切换卡片
    change: function (e) {
        if (this.data.isInput1 == 0 || this.data.isInput2 == 0 || this.data.isInput3 == 0) {
            wx.showToast({
                title: '输入满足条件的数字哦',
                icon: 'none',
                duration: 800,
            })
        } else {
            this.data.search_times++;
            var id = e.currentTarget.dataset.id;
            this.data.firstClickId = id;
            var newArr = this.data.newArr;
            //得到当前的卡片
            var currentData = newArr[id - 1];
            // 点击第一个数字时
            if (id == 1) {
                // this.data.search_times++;
                // 恰好第一个数字就是要找的
                if (((this.data.number1 == currentData.number) || (this.data.number2 == currentData.number) || (this.data.number3 == currentData.number)) &&
                    ((this.data.number1 % this.data.rand == 0) || (this.data.number2 % this.data.rand == 0) || (this.data.number3 % this.data.rand == 0))) {
                    console.log("n1,n2,n3,c:", this.data.number1, this.data.number2, this.data.number3, currentData.number)
                    // 把数字背景更换
                    currentData.showA = 'none';
                    currentData.showB = 'block';
                    newArr[id - 1] = currentData;
                    // 并换成找到的颜色
                    newArr[id - 1].card_b = 'rgb(255, 46, 46)'
                    // 更新数据，表明已找到
                    this.setData({
                        // isWin: 1,
                        newArr: newArr,
                        search_timesok: 1,
                        firstWin: 1,
                        score: this.data.score += 10
                    })
                    wx.showToast({
                        title: 'bingo!',
                        duration:600
                    })
                    // 找到之后其他数字不变颜色
                    // for(var i = id;i<=18;i++)
                    // {
                    //     newArr[i].showA = 'block';
                    //     newArr[i].showB = 'none';
                    // }
                    // this.setData({
                    //      newArr: newArr
                    // })
                    // 查找次数就是id的值
                    // this.data.search_times = id;
                    // 查找成功存入云数据库
                    this.search_storage()
                } else {
                    // 如果第一个不是要找的，换数字背景（并不是找到的背景颜色）
                    currentData.showA = 'none';
                    currentData.showB = 'block';
                    newArr[id - 1] = currentData;
                    this.setData({
                        newArr: newArr
                    })
                }

            }
            // 如果不在第一个数字中查找，点击其他的数字
            else if (id > 1 && id <= 18 && newArr[id - 2].showA == 'none' && currentData.showA == 'block') {
                //         if (currentData.showA == 'block') {
                // 找到了数字
                // this.data.search_times++;
                if ((this.data.number1 == currentData.number) || (this.data.number2 == currentData.number) || (this.data.number3 == currentData.number)) {
                    console.log("n1,n2,n3,c:", this.data.number1, this.data.number2, this.data.number3, currentData.number)
                    currentData.showA = 'none';
                    currentData.showB = 'block';
                    newArr[id - 1] = currentData;
                    newArr[id - 1].card_b = 'rgb(255, 46, 46)'
                    this.setData({
                        // isWin: 1,
                        newArr: newArr,
                        search_timesok: id,
                        score: this.data.score += 10,
                        textarea:'猜对的数字越多，分数也越高。'
                    })
                    // 找到数字之后把星星点亮
                    if (((this.data.number1 == currentData.number) || (this.data.number2 == currentData.number) || (this.data.number3 == currentData.number)) && (this.data.firstWin == 0) && ((this.data.number1 % this.data.rand == 0) || (this.data.number2 % this.data.rand == 0) || (this.data.number3 % this.data.rand == 0))) {
                        this.setData({
                            firstWin: 1,
                            isInput1: currentData.number,
                        })
                        console.log('isinput1,', this.data.isInput1)
                    } else if (((this.data.number1 == currentData.number) || (this.data.number2 == currentData.number) || (this.data.number3 == currentData.number)) &&
                        (this.data.isInput1 != currentData.number) && (this.data.firstWin == 1) && this.data.secondWin == 0 &&
                        ((this.data.number1 % this.data.rand == 0) || (this.data.number2 % this.data.rand == 0) || (this.data.number3 % this.data.rand == 0))) {
                        this.setData({
                            secondWin: 1,
                            isInput2: currentData.number,
                        })
                        console.log('isinput1,isinput2', this.data.isInput1, this.data.isInput2)
                    } else if (((this.data.number1 == currentData.number) || (this.data.number2 == currentData.number) || (this.data.number3 == currentData.number)) &&
                        (this.data.isInput2 != currentData.number) && (this.data.secondWin == 1) && (this.data.isInput1 != currentData.number) && (this.data.firstWin == 1) && this.data.thirdWin == 0 &&
                        ((this.data.number1 % this.data.rand == 0) || (this.data.number2 % this.data.rand == 0) || (this.data.number3 % this.data.rand == 0))
                    ) {
                        // else if(this.data.isInput1!=currentData.number && this.data.isInput2!=currentData.number && (this.number1 == currentData.number || this.number2 == currentData.number || this.number3 == currentData.number)){
                        console.log("点亮第三颗星")
                        this.setData({
                            thirdWin: 1,
                        })
                    }

                    // }
                    wx.showToast({
                        title: 'bingo!',
                        duration:600
                    })
                    // 找到之后把其他数字不变颜色
                    //     for(var i = id;i<=18;i++)
                    //     {
                    //         newArr[i].showA = 'block';
                    //         newArr[i].showB = 'none';
                    //     }
                    //     this.setData({
                    //        newArr: newArr
                    //    })
                    console.log('hello');
                    // 查找次数就是id的值
                    // this.data.search_times = id;
                    // 查找成功存入云数据库
                    this.search_storage();
                }
                // 没找到
                else {
                    currentData.showA = 'none';
                    currentData.showB = 'block';
                    newArr[id - 1] = currentData;
                    this.setData({
                        newArr: newArr
                    })
                }
                if (id == 18) {
                    wx.showToast({
                        title: '游戏结束啦！',
                        //   icon:'none',
                        image: "../../images/winer.png",
                        duration: 1500,
                    })
                    this.setData({
                        isWin:1,
                        again: 1,
                    })
                }
            } else {
                // this.data.search_times++;
                console.log('id为,iswin=',id,this.data.isWin)
                if (this.data.isWin == 1) {
                    wx.showToast({
                        title: '点击再来一次',
                        image: '../../images/winer.png',
                        duration: 1000
                    })
                } else {
                    wx.showToast({
                        title: '顺序点击查找哦',
                        icon:'none',
                        duration:1000
                    })
                }
            }
            
        }

    },
    search_storage() {
        let searchResult = {
            // 从全局变量中获取用户信息
            nickName: app.globalData.hasUserInfo ? app.globalData.userInfo.nickName : '',
            // avatarUrl:app.globalData.hasUserInfo?app.globalData.userInfo.avatarUrl:''
            search_times: this.data.search_times,
            search_timesok: this.data.search_timesok,
            score: this.data.score,
            firstWin: this.data.firstWin,
            secondWin: this.data.secondWin,
            thirdWin: this.data.thirdWin,
        };
        search_db.add({
            data: {
                ...searchResult,
                // 创建当前时间
                // createDate:db.serverDate()
                time: util.formatTime(new Date())
            }
        })
    }
})