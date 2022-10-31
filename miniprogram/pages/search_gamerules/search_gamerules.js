const util = require('../../utils/util.js');
var e = require("../../utils/request.js");
const app = getApp();
//连接云数据库
const db = wx.cloud.database();
//获取云数据库中数据集合的引用
const binarysearch_db = db.collection('binarysearch_db');
//数据库操作符
const _ = db.command;
Page({
    /** * 页面的初始数据 */
    data: {
        firstWin: 0,
        secondWin: 0,
        thirdWin: 0,
        // 剩余次数
        restcount: 5,
        timecount: -1,
        startTime: 0,
        isWin: 0,
        search_times: 0,
        search_timesok: 0,
        newArr: [{
            id: 1,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 2,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 3,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 4,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 5,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 6,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 7,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 8,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 9,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 10,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 11,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 12,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 13,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 14,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 15,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 16,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 17,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, {
            id: 18,
            number: Math.round(Math.random() * 100),
            showA: 'none',
            showA: 'block',
            card_b: 'rgb(255, 246, 123)',
        }, ],
        firstClickId: 0,
        rand: 0,
    },
    onLoad: function (options) {
        var a = Math.floor(Math.random() * 17);
        this.rand_number();
        this.setData({
            rand: this.data.newArr[a].number,
            startTime: new Date()
        })
        this.sort();

    },
    rand_number() {
        // var number = Math.floor(Math.random()*100);
        var newArr = this.data.newArr;
        for (var i = 0; i < 18; i++) {
            newArr[i].number = Math.floor(Math.random() * 100);
            for (var j = 0; j < i; j++) {
                if (newArr[j].number == newArr[i].number) {
                    newArr[i].number = Math.floor(Math.random() * 100);
                }
            }
        }
        this.setData({
            newArr: newArr
        })
    },
    // 在退出冒泡排序页面后的数据就是在这个监听页面卸载执行
    onUnload: function () {
        if (this.data.search_times != 0 && this.data.isWin == 0) {
            this.binarysearch_storage();
        }
    },
    onButtonTap: function (e) {
        var a = this;
        var newArr = a.data.newArr;
        switch (e.currentTarget.id) {
            case "btnOk":
                if (this.data.isWin == 0 && this.data.restcount != 0) {
                    wx.showToast({
                        title: '还没结束哦',
                    })
                } else {
                    this.again();
                    for (var i = 0; i < 18; i++) {
                        newArr[i].number = Math.round(Math.random() * 100);
                        newArr[i].showA = 'block';
                        newArr[i].showB = 'none';
                        newArr[i].card_b = 'rgb(255, 246, 123)';
                    };
                    this.setData({
                        newArr: newArr
                    });
                    a.onLoad();
                }
                break;
        }
    },
    sort() {
        var newArr = this.data.newArr;
        for (var i = 0; i < 17; i++) {
            newArr[i].showA = 'block';
            newArr[i].showB = 'none';
            for (var j = i + 1; j < 18; j++) {

                if (newArr[i].number > newArr[j].number) {
                    // console.log('hhhhh',newArr[i].number, newArr[j].number);
                    var t;
                    t = newArr[i].number;
                    newArr[i].number = newArr[j].number;
                    newArr[j].number = t;
                }
                newArr[j].showA = 'block';
                newArr[j].showB = 'none';
            }
            this.setData({
                newArr: newArr
            });
        }
    },
    /*
    提醒需要使用二分查找点击卡片
    首先最开始都有三颗星，0分数（可以在最开始设置点击错误的次数，比如5次），这里也可以不用使用分数
    点击正确的中间的数字，卡片翻转，会加星星，
    如果点击错误的中间的数字，卡片不会翻转，会扣星星，给予提示，要点击正确的中间的数字。错误会加分。错误会扣掉次数
    如果分数不超过了50，并且找到了（一个图案或者是设置的随机数），则完成游戏。
     如果在没找到之前分数超过了50，则游戏失败。
     根据最后得到的星星进行排名，剩余的次数或者是分数
    正确次数分别在1、2、3、4、5次
    错误次数有5次，一共三颗星
    错1次，减1星星，错2次，减2星星
    找到了（错一次，两颗星；错两次，一颗星）
    没找到，没有星
    */
    //点击切换卡片
    change: function (e) {
        if (this.data.restcount == 0) {
            wx.showToast({
                title: '没有剩余次数啦，游戏失败！',
                // icon: "none",
                image:'../../images/failed.jpg',
                duration: 1000,
            })
            this.setData({
                isWin:1,
            })
        } else {
            if(this.data.isWin == 1){
                wx.showToast({
                  title: '点击再来一次吧',
                })
            }
            var isWin = this.data.isWin;
            var timecount = this.data.timecount;
            this.data.search_times++;
            var id = e.currentTarget.dataset.id;
            this.data.firstClickId = id;
            var newArr = this.data.newArr;
            //得到当前的卡片
            var currentData = newArr[id - 1];
            if (id == 9 && (newArr[id - 1].showA = 'block')) {
                if (this.data.rand == newArr[id - 1].number) {
                    for (var i = 0; i < 18; i++) {
                        newArr[i].showA = 'none';
                        newArr[i].showB = 'block';
                        newArr[id - 1].card_b = 'red';
                    }
                    wx.showToast({
                        title: '一下找到啦',
                        image: '../../images/winer.png',
                        duration: 1000,
                    })
                    isWin = 1;
                    timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                    if (this.data.restcount == 5) {
                        this.setData({
                            firstWin: 1,
                            secondWin: 1,
                            thirdWin: 1,
                        })
                    } else if (this.data.restcount == 4) {
                        this.setData({
                            firstWin: 1,
                            secondWin: 1,
                        })
                    } else {
                        this.setData({
                            firstWin: 1,
                        })
                    }
                } else if (this.data.rand > newArr[id - 1].number) {
                    for (var i = 0; i < id; i++) {
                        newArr[i].showA = 'none';
                        newArr[i].showB = 'block'
                    }
                } else if (this.data.rand < newArr[id - 1].number) {
                    for (var i = id - 1; i < 18; i++) {
                        newArr[i].showA = 'none';
                        newArr[i].showB = 'block';
                    }
                }
                this.setData({
                    newArr: newArr,
                    timecount: timecount,
                    isWin: isWin,
                })
            } else if (id != 9 && newArr[id - 1].showA == 'block' && newArr[8].showA == 'none') {
                if (id > 9) {
                    if (id == 14) {
                        if (this.data.rand == newArr[id - 1].number) {
                            for (var i = 9; i < 18; i++) {
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block';
                                newArr[id - 1].card_b = 'red';
                            }
                            wx.showToast({
                                image: '../../images/winer.png',
                                duration: 1000,
                                title: '一下找到啦',
                            })
                            isWin = 1;
                            timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                            if (this.data.restcount == 5) {
                                this.setData({
                                    firstWin: 1,
                                    secondWin: 1,
                                    thirdWin: 1,
                                })
                            } else if (this.data.restcount == 4) {
                                this.setData({
                                    firstWin: 1,
                                    secondWin: 1,
                                })
                            } else {
                                this.setData({
                                    firstWin: 1,
                                })
                            }
                        } else if (this.data.rand > newArr[id - 1].number) {
                            for (var i = 9; i < id; i++) {
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block'
                            }
                        } else if (this.data.rand < newArr[id - 1].number) {
                            for (var i = id - 1; i < 18; i++) {
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block';
                            }
                        }
                        this.setData({
                            newArr: newArr,
                            timecount: timecount,
                            isWin: isWin,
                        })
                    } else if (id != 14 && newArr[id - 1].showA == 'block' && newArr[13].showA == 'none') {
                        if (id > 14) {
                            if (id == 16) {
                                if (this.data.rand == newArr[id - 1].number) {
                                    for (var i = 14; i < 18; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                        newArr[id - 1].card_b = 'red';
                                    }
                                    wx.showToast({
                                        title: '一下找到啦',
                                        image: '../../images/winer.png',
                                        duration: 1000,
                                    })
                                    isWin = 1;
                                    timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                    if (this.data.restcount == 5) {
                                        this.setData({
                                            firstWin: 1,
                                            secondWin: 1,
                                            thirdWin: 1,
                                        })
                                    } else if (this.data.restcount == 4) {
                                        this.setData({
                                            firstWin: 1,
                                            secondWin: 1,
                                        })
                                    } else {
                                        this.setData({
                                            firstWin: 1,
                                        })
                                    }
                                } else if (this.data.rand > newArr[id - 1].number) {
                                    for (var i = 14; i < id; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block'
                                    }
                                } else if (this.data.rand < newArr[id - 1].number) {
                                    for (var i = id - 1; i < 18; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                    }
                                }
                                this.setData({
                                    newArr: newArr,
                                    timecount: timecount,
                                    isWin: isWin,
                                })
                            } else if (id != 16 && newArr[id - 1].showA == 'block' && newArr[15].showA == 'none') {
                                if (id > 16) {
                                    if (id == 17) {
                                        if (this.data.rand == newArr[id - 1].number) {
                                            // newArr[id].showA = 'none';
                                            // newArr[id].showB = 'block';
                                            newArr[id - 1].showA = 'none';
                                            newArr[id - 1].showB = 'block';
                                            newArr[id - 1].card_b = 'red';
                                            wx.showToast({
                                                image: '../../images/winer.png',
                                                duration: 1000,
                                                title: '一下找到啦',
                                            })
                                            isWin = 1;
                                            timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            if (this.data.restcount == 5) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                    thirdWin: 1,
                                                })
                                            } else if (this.data.restcount == 4) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                })
                                            } else {
                                                this.setData({
                                                    firstWin: 1,
                                                })
                                            }
                                        } else if (this.data.rand > newArr[id - 1].number) {
                                            newArr[id - 1].showA = 'none';
                                            newArr[id - 1].showB = 'block'
                                        }
                                        this.setData({
                                            newArr: newArr,
                                            timecount: timecount,
                                            isWin: isWin,
                                        })
                                    } else if (id != 17 && newArr[16].showA == 'none' && newArr[id - 1].showA == 'block') {
                                        if (id == 18) {
                                            if (this.data.rand == newArr[id - 1].number) {
                                                newArr[id - 1].showA = 'none';
                                                newArr[id - 1].showB = 'block';
                                                newArr[id - 1].card_b = 'red';
                                                wx.showToast({
                                                    image: '../../images/winer.png',
                                                    duration: 1000,
                                                    title: '一下找到啦',
                                                })
                                                isWin = 1;
                                                timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                                if (this.data.restcount == 5) {
                                                    this.setData({
                                                        firstWin: 1,
                                                        secondWin: 1,
                                                        thirdWin: 1,
                                                    })
                                                } else if (this.data.restcount == 4) {
                                                    this.setData({
                                                        firstWin: 1,
                                                        secondWin: 1,
                                                    })
                                                } else {
                                                    this.setData({
                                                        firstWin: 1,
                                                    })
                                                }
                                            } else {
                                                wx.showToast({
                                                    title: '那就没有啦',
                                                    icon:'none',
                                                })
                                            }
                                            this.setData({
                                                newArr: newArr,
                                                timecount: timecount,
                                                isWin: isWin,
                                            })
                                        } else {
                                            wx.showToast({
                                                title: '错啦！',
                                            })
                                        }
                                    } else if (newArr[id - 1].showA == 'block' && newArr[16].showA == 'block') {
                                        if (this.data.restcount == 0) {
                                            // 如果没有剩余次数
                                            wx.showToast({
                                                title: '游戏失败！',
                                                icon: 'none',
                                                duration: 1000
                                            })
                                        } else {
                                            wx.showToast({
                                                icon: 'none',
                                                title: '先点击前面的哦！',
                                                duration: 1000,
                                            })
                                            // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                                            this.setData({
                                                restcount: this.data.restcount - 1
                                            })
                                            console.log("剩余次数：", this.data.restcount);
                                        }
                                    }
                                } else if (id < 16) {
                                    if (id == 15) {
                                        if (this.data.rand == newArr[id - 1].number) {
                                            newArr[id - 1].showA = 'none';
                                            newArr[id - 1].showB = 'block';
                                            newArr[id - 1].card_b = 'red';
                                            wx.showToast({
                                                image: '../../images/winer.png',
                                                duration: 1000,
                                                title: '一下找到啦',
                                            })
                                            isWin = 1;
                                            timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            if (this.data.restcount == 5) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                    thirdWin: 1,
                                                })
                                            } else if (this.data.restcount == 4) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                })
                                            } else {
                                                this.setData({
                                                    firstWin: 1,
                                                })
                                            }
                                        } else {
                                            wx.showToast({
                                                title: '那就没有啦',
                                                icon:'none',
                                            })
                                        }
                                        this.setData({
                                            newArr: newArr,
                                            timecount: timecount,
                                            isWin: isWin,
                                        })
                                    } else {
                                        wx.showToast({
                                            title: '错啦！',
                                        })
                                    }
                                }
                            } else if (newArr[id - 1].showA == 'block' && newArr[15].showA == 'block') {
                                if (this.data.restcount == 0) {
                                    // 如果没有剩余次数
                                    wx.showToast({
                                        title: '游戏失败！',
                                        icon: 'none',
                                        duration: 1000
                                    })
                                } else {
                                    wx.showToast({
                                        icon: 'none',
                                        title: '错啦！',
                                        duration: 1000,
                                    })
                                    // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                                    this.setData({
                                        restcount: this.data.restcount - 1
                                    })
                                    console.log("剩余次数：", this.data.restcount);
                                }
                            }
                        }
                        if (id < 14) {
                            if (id == 11) {
                                if (this.data.rand == newArr[id - 1].number) {
                                    for (var i = 0; i < 18; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                        newArr[id - 1].card_b = 'red';
                                    }
                                    wx.showToast({
                                        image: '../../images/winer.png',
                                        duration: 1000,
                                        title: '一下找到啦',
                                    })
                                    isWin = 1;
                                    timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                    if (this.data.restcount == 5) {
                                        this.setData({
                                            firstWin: 1,
                                            secondWin: 1,
                                            thirdWin: 1,
                                        })
                                    } else if (this.data.restcount == 4) {
                                        this.setData({
                                            firstWin: 1,
                                            secondWin: 1,
                                        })
                                    } else {
                                        this.setData({
                                            firstWin: 1,
                                        })
                                    }
                                } else if (this.data.rand > newArr[id - 1].number) {
                                    for (var i = 9; i < id; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block'
                                    }
                                } else if (this.data.rand < newArr[id - 1].number) {
                                    for (var i = id - 1; i < 13; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                    }
                                }
                                this.setData({
                                    newArr: newArr,
                                    timecount: timecount,
                                    isWin: isWin,
                                })
                            } else if (id != 11 && newArr[id - 1].showA == 'block' && newArr[10].showA == 'none') {
                                if (id > 11) {
                                    if (id == 12) {
                                        if (this.data.rand == newArr[id - 1].number) {
                                            for (var i = 0; i < 18; i++) {
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id - 1].card_b = 'red';
                                            }
                                            wx.showToast({
                                                image: '../../images/winer.png',
                                                duration: 1000,
                                                title: '一下找到啦',
                                            })
                                            isWin = 1;
                                            timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            if (this.data.restcount == 5) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                    thirdWin: 1,
                                                })
                                            } else if (this.data.restcount == 4) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                })
                                            } else {
                                                this.setData({
                                                    firstWin: 1,
                                                })
                                            }
                                        } else if (this.data.rand > newArr[id - 1].number) {
                                            newArr[id - 1].showA = 'none';
                                            newArr[id - 1].showB = 'block'
                                        }
                                        this.setData({
                                            newArr: newArr,
                                            timecount: timecount,
                                            isWin: isWin,
                                        })
                                    } else if (id != 12 && newArr[id - 1].showA == 'block' && newArr[11].showA == 'none') {
                                        if (id == 13) {
                                            if (this.data.rand == newArr[id - 1].number) {
                                                for (var i = 0; i < 18; i++) {
                                                    newArr[i].showA = 'none';
                                                    newArr[i].showB = 'block';
                                                    newArr[id - 1].card_b = 'red';
                                                }
                                                wx.showToast({
                                                    image: '../../images/winer.png',
                                                    duration: 1000,
                                                    title: '一下找到啦',
                                                })
                                                isWin = 1;
                                                timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                                if (this.data.restcount == 5) {
                                                    this.setData({
                                                        firstWin: 1,
                                                        secondWin: 1,
                                                        thirdWin: 1,
                                                    })
                                                } else if (this.data.restcount == 4) {
                                                    this.setData({
                                                        firstWin: 1,
                                                        secondWin: 1,
                                                    })
                                                } else {
                                                    this.setData({
                                                        firstWin: 1,
                                                    })
                                                }
                                            } else {
                                                wx.showToast({
                                                    title: '那就没有啦',
                                                    icon:'none',
                                                })
                                            }
                                            this.setData({
                                                newArr: newArr,
                                                timecount: timecount,
                                                isWin: isWin,
                                            })
                                        } else {
                                            wx.showToast({
                                                title: '错啦！',
                                            })
                                        }

                                    } else if (newArr[id - 1].showA == 'block' && newArr[11].showA == 'block') {
                                        if (this.data.restcount == 0) {
                                            // 如果没有剩余次数
                                            wx.showToast({
                                                title: '游戏失败！',
                                                icon: 'none',
                                                duration: 1000
                                            })
                                        } else {
                                            wx.showToast({
                                                icon: 'none',
                                                title: '先点击前面的哦！',
                                                duration: 1000,
                                            })
                                            // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                                            this.setData({
                                                restcount: this.data.restcount - 1
                                            })
                                            console.log("剩余次数：", this.data.restcount);
                                        }
                                    }
                                }
                                if (id < 11) {
                                    if (id == 10) {
                                        if (this.data.rand == newArr[id - 1].number) {
                                            for (var i = 0; i < 18; i++) {
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id - 1].card_b = 'red';
                                            }
                                            wx.showToast({
                                                image: '../../images/winer.png',
                                                duration: 1000,
                                                title: '一下找到啦',
                                            })
                                            isWin = 1;
                                            timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            if (this.data.restcount == 5) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                    thirdWin: 1,
                                                })
                                            } else if (this.data.restcount == 4) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                })
                                            } else {
                                                this.setData({
                                                    firstWin: 1,
                                                })
                                            }
                                        } else {
                                            wx.showToast({
                                                title: '那就没有啦',
                                                icon:'none',
                                            })
                                        }
                                        this.setData({
                                            newArr: newArr,
                                            timecount: timecount,
                                            isWin: isWin,
                                        })
                                    } else {
                                        wx.showToast({
                                            title: '错啦！',
                                        })
                                    }
                                }
                            } else if (newArr[id - 1].showA == 'block' && newArr[10].showA == 'block') {
                                if (this.data.restcount == 0) {
                                    // 如果没有剩余次数
                                    wx.showToast({
                                        title: '游戏失败！',
                                        icon: 'none',
                                        duration: 1000
                                    })
                                } else {
                                    wx.showToast({
                                        icon: 'none',
                                        title: '错啦！点击中间的数字哦！',
                                        duration: 1000,
                                    })
                                    // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                                    this.setData({
                                        restcount: this.data.restcount - 1
                                    })
                                    console.log("剩余次数：", this.data.restcount);
                                }
                            }
                        }
                    } else if (newArr[id - 1].showA == 'block' && newArr[13].showA == 'block') {
                        if (this.data.restcount == 0) {
                            // 如果没有剩余次数
                            wx.showToast({
                                title: '游戏失败！',
                                icon: 'none',
                                duration: 1000
                            })
                        } else {
                            wx.showToast({
                                icon: 'none',
                                title: '错啦！',
                                duration: 1000,
                            })
                            // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                            this.setData({
                                restcount: this.data.restcount - 1
                            })
                            console.log("剩余次数：", this.data.restcount);
                        }
                    }
                } else if (id < 9) {
                    if (id == 4) {
                        if (this.data.rand == newArr[id - 1].number) {
                            for (var i = 0; i < 18; i++) {
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block';
                                newArr[id - 1].card_b = 'red';
                            }
                            wx.showToast({
                                image: '../../images/winer.png',
                                duration: 1000,
                                title: '一下找到啦',
                            })
                            isWin = 1;
                            timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                            if (this.data.restcount == 5) {
                                this.setData({
                                    firstWin: 1,
                                    secondWin: 1,
                                    thirdWin: 1,
                                })
                            } else if (this.data.restcount == 4) {
                                this.setData({
                                    firstWin: 1,
                                    secondWin: 1,
                                })
                            } else {
                                this.setData({
                                    firstWin: 1,
                                })
                            }
                        } else if (this.data.rand > newArr[id - 1].number) {
                            for (var i = 0; i < id; i++) {
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block'
                            }
                        } else if (this.data.rand < newArr[id - 1].number) {
                            for (var i = id - 1; i < 9; i++) {
                                newArr[i].showA = 'none';
                                newArr[i].showB = 'block';
                            }
                        }
                        this.setData({
                            newArr: newArr,
                            timecount: timecount,
                            isWin: isWin,
                        })
                    } else if (id != 4 && newArr[id - 1].showA == 'block' && newArr[3].showA == 'none') {
                        if (id < 4) {
                            if (id == 2) {
                                if (this.data.rand == newArr[id - 1].number) {
                                    for (var i = 0; i < 18; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                        newArr[id - 1].card_b = 'red';
                                    }
                                    wx.showToast({
                                        image: '../../images/winer.png',
                                        duration: 1000,
                                        title: '一下找到啦',
                                    })
                                    isWin = 1;
                                    timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                    if (this.data.restcount == 5) {
                                        this.setData({
                                            firstWin: 1,
                                            secondWin: 1,
                                            thirdWin: 1,
                                        })
                                    } else if (this.data.restcount == 4) {
                                        this.setData({
                                            firstWin: 1,
                                            secondWin: 1,
                                        })
                                    } else {
                                        this.setData({
                                            firstWin: 1,
                                        })
                                    }
                                } else if (this.data.rand > newArr[id - 1].number) {
                                    for (var i = 0; i < id; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block'
                                    }
                                } else if (this.data.rand < newArr[id - 1].number) {
                                    for (var i = id - 1; i < 4; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                    }
                                }
                                this.setData({
                                    newArr: newArr,
                                    timecount: timecount,
                                    isWin: isWin,
                                })
                            } else if (id != 2 && newArr[1].showA == 'none' && newArr[id - 1].showA == 'block') {
                                if (id > 2) {
                                    if (id == 3) {
                                        if (this.data.rand == newArr[id - 1].number) {
                                            for (var i = 0; i < 18; i++) {
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id - 1].card_b = 'red';
                                            }
                                            wx.showToast({
                                                image: '../../images/winer.png',
                                                duration: 1000,
                                                title: '一下找到啦',
                                            })
                                            isWin = 1;
                                            timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            if (this.data.restcount == 5) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                    thirdWin: 1,
                                                })
                                            } else if (this.data.restcount == 4) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                })
                                            } else {
                                                this.setData({
                                                    firstWin: 1,
                                                })
                                            }
                                        } else {
                                            wx.showToast({
                                                title: '那就没有啦',
                                                icon:'none',
                                            })
                                        }
                                        this.setData({
                                            newArr: newArr,
                                            timecount: timecount,
                                            isWin: isWin,
                                        })
                                    } else {
                                        if (this.data.restcount == 0) {
                                            // 如果没有剩余次数
                                            wx.showToast({
                                                title: '游戏失败！',
                                                icon: 'none',
                                                duration: 1000
                                            })
                                        } else {
                                            wx.showToast({
                                                icon: 'none',
                                                title: '先点击前面的数字哦',
                                                duration: 1000,
                                            })
                                            // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                                            this.setData({
                                                restcount: this.data.restcount - 1
                                            })
                                            console.log("剩余次数：", this.data.restcount);
                                        }
                                    }
                                }
                                if (id < 2) {
                                    if (id == 1) {
                                        if (this.data.rand == newArr[id - 1].number) {
                                            for (var i = 0; i < 18; i++) {
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id - 1].card_b = 'red';
                                            }
                                            wx.showToast({
                                                image: '../../images/winer.png',
                                                duration: 1000,
                                                title: '一下找到啦',
                                            })
                                            isWin = 1;
                                            timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            if (this.data.restcount == 5) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                    thirdWin: 1,
                                                })
                                            } else if (this.data.restcount == 4) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                })
                                            } else {
                                                this.setData({
                                                    firstWin: 1,
                                                })
                                            }
                                        } else {
                                            wx.showToast({
                                                title: '那就没有啦',
                                                icon:'none',
                                            })
                                        }
                                        this.setData({
                                            newArr: newArr,
                                            timecount: timecount,
                                            isWin: isWin,
                                        })
                                    } else {
                                        wx.showToast({
                                            title: '错啦！'
                                        })
                                    }
                                }
                            } else if (newArr[id - 1].showA == 'block' && newArr[1].showA == 'block') {
                                if (this.data.restcount == 0) {
                                    // 如果没有剩余次数
                                    wx.showToast({
                                        title: '游戏失败！',
                                        icon: 'none',
                                        duration: 1000
                                    })
                                } else {
                                    wx.showToast({
                                        icon: 'none',
                                        title: '错啦！',
                                        duration: 1000,
                                    })
                                    // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                                    this.setData({
                                        restcount: this.data.restcount - 1
                                    })
                                    console.log("剩余次数：", this.data.restcount);
                                }
                            }
                        }
                        if (id > 4) {
                            if (id == 6) {
                                if (this.data.rand == newArr[id - 1].number) {
                                    for (var i = 0; i < 18; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                        newArr[id - 1].card_b = 'red';
                                    }
                                    wx.showToast({
                                        image: '../../images/winer.png',
                                        duration: 1000,
                                        title: '一下找到啦',
                                    })
                                    isWin = 1;
                                    timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                    if (this.data.restcount == 5) {
                                        this.setData({
                                            firstWin: 1,
                                            secondWin: 1,
                                            thirdWin: 1,
                                        })
                                    } else if (this.data.restcount == 4) {
                                        this.setData({
                                            firstWin: 1,
                                            secondWin: 1,
                                        })
                                    } else {
                                        this.setData({
                                            firstWin: 1,
                                        })
                                    }
                                } else if (this.data.rand > newArr[id - 1].number) {
                                    for (var i = 4; i < id; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block'
                                    }
                                } else if (this.data.rand < newArr[id - 1].number) {
                                    for (var i = id - 1; i < 8; i++) {
                                        newArr[i].showA = 'none';
                                        newArr[i].showB = 'block';
                                    }
                                }
                                this.setData({
                                    newArr: newArr,
                                    timecount: timecount,
                                    isWin: isWin,
                                })
                            } else if (id != 6 && newArr[id - 1].showA == 'block' && newArr[5].showA == 'none') {
                                if (id > 6) {
                                    if (id == 7) {
                                        if (this.data.rand == newArr[id - 1].number) {
                                            for (var i = 0; i < 18; i++) {
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id - 1].card_b = 'red';
                                            }
                                            wx.showToast({
                                                image: '../../images/winer.png',
                                                duration: 1000,
                                                title: '一下找到啦',
                                            })
                                            isWin = 1;
                                            timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            if (this.data.restcount == 5) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                    thirdWin: 1,
                                                })
                                            } else if (this.data.restcount == 4) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                })
                                            } else {
                                                this.setData({
                                                    firstWin: 1,
                                                })
                                            }
                                        } else if (this.data.rand > newArr[id - 1].number) {
                                            for (var i = 0; i < id; i++) {
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block'
                                            }
                                        }
                                        this.setData({
                                            newArr: newArr,
                                            timecount: timecount,
                                            isWin: isWin,
                                        })
                                    } else if (id != 7 && newArr[6].showA == 'none') {
                                        if (id == 8) {
                                            if (this.data.rand == newArr[id - 1].number) {
                                                for (var i = 0; i < 18; i++) {
                                                    newArr[i].showA = 'none';
                                                    newArr[i].showB = 'block';
                                                    newArr[id - 1].card_b = 'red';
                                                }
                                                wx.showToast({
                                                    image: '../../images/winer.png',
                                                    duration: 1000,
                                                    title: '一下找到啦',
                                                })
                                                isWin = 1;
                                                timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                                if (this.data.restcount == 5) {
                                                    this.setData({
                                                        firstWin: 1,
                                                        secondWin: 1,
                                                        thirdWin: 1,
                                                    })
                                                } else if (this.data.restcount == 4) {
                                                    this.setData({
                                                        firstWin: 1,
                                                        secondWin: 1,
                                                    })
                                                } else {
                                                    this.setData({
                                                        firstWin: 1,
                                                    })
                                                }
                                            } else {
                                                wx.showToast({
                                                    title: '那就没有啦',
                                                    icon:'none',
                                                })
                                            }
                                            this.setData({
                                                newArr: newArr,
                                                timecount: timecount,
                                                isWin: isWin,
                                            })
                                        } else {
                                            wx.showToast({
                                                title: '错啦！',
                                            })
                                        }
                                    } else if (newArr[id - 1].showA == 'block' && newArr[6].showA == 'block') {
                                        if (this.data.restcount == 0) {
                                            // 如果没有剩余次数
                                            wx.showToast({
                                                title: '游戏失败！',
                                                icon: 'none',
                                                duration: 1000
                                            })
                                        } else {
                                            wx.showToast({
                                                icon: 'none',
                                                title: '先点击前面的数字哦',
                                                duration: 1000,
                                            })
                                            // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                                            this.setData({
                                                restcount: this.data.restcount - 1
                                            })
                                            console.log("剩余次数：", this.data.restcount);
                                        }
                                    }
                                }
                                if (id < 6) {
                                    if (id == 5) {
                                        if (this.data.rand == newArr[id - 1].number) {
                                            for (var i = 0; i < 18; i++) {
                                                newArr[i].showA = 'none';
                                                newArr[i].showB = 'block';
                                                newArr[id - 1].card_b = 'red';
                                            }
                                            wx.showToast({
                                                image: '../../images/winer.png',
                                                duration: 1000,
                                                title: '一下找到啦',
                                            })
                                            isWin = 1;
                                            timecount = ((new Date().getTime() - this.data.startTime.getTime()) / 1e3).toFixed(3);
                                            if (this.data.restcount == 5) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                    thirdWin: 1,
                                                })
                                            } else if (this.data.restcount == 4) {
                                                this.setData({
                                                    firstWin: 1,
                                                    secondWin: 1,
                                                })
                                            } else {
                                                this.setData({
                                                    firstWin: 1,
                                                })
                                            }
                                        } else {
                                            wx.showToast({
                                                title: '那就没有啦',
                                                icon:'none',
                                            })
                                        }
                                        this.setData({
                                            newArr: newArr,
                                            timecount: timecount,
                                            isWin: isWin,
                                        })
                                    } else {
                                        wx.showToast({
                                            title: '错啦！',
                                        })
                                    }
                                }
                            } else if (newArr[id - 1].showA == 'block' && newArr[5].showA == 'block') {
                                if (this.data.restcount == 0) {
                                    // 如果没有剩余次数
                                    wx.showToast({
                                        title: '游戏失败！',
                                        icon: 'none',
                                        duration: 1000
                                    })
                                } else {
                                    wx.showToast({
                                        icon: 'none',
                                        title: '错啦！点击中间的数字哦',
                                        duration: 1000,
                                    })
                                    // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                                    this.setData({
                                        restcount: this.data.restcount - 1
                                    })
                                    console.log("剩余次数：", this.data.restcount);
                                }
                            }
                        }
                    } else if (newArr[id - 1].showA == 'block' && newArr[3].showA == 'block') {
                        if (this.data.restcount == 0) {
                            // 如果没有剩余次数
                            wx.showToast({
                                title: '游戏失败！',
                                icon: 'none',
                                duration: 1000
                            })
                        } else {
                            wx.showToast({
                                icon: 'none',
                                title: '错啦！点击中间的数字哦',
                                duration: 1000,
                            })
                            // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                            this.setData({
                                restcount: this.data.restcount - 1
                            })
                            console.log("剩余次数：", this.data.restcount);
                        }
                    }
                }
            } else if (newArr[id - 1].showA == 'block' && newArr[8].showA == 'block') {
                if (this.data.restcount == 0) {
                    // 如果没有剩余次数
                    wx.showToast({
                        title: '游戏失败！',
                        icon: 'none',
                        duration: 1000
                    })
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '错啦！点击中间的数字哦',
                        duration: 1000,
                    })
                    // 没有点击中间的数字，点击错误一次就把剩余次数减少一次
                    this.setData({
                        restcount: this.data.restcount - 1
                    })
                    console.log("剩余次数：", this.data.restcount);
                }
            }
        }
        if (isWin == 1) {
            this.binarysearch_storage()
        }
    },
    binarysearch_storage() {
        let searchResult = {
            // 从全局变量中获取用户信息
            nickName: app.globalData.hasUserInfo ? app.globalData.userInfo.nickName : '',
            // avatarUrl:app.globalData.hasUserInfo?app.globalData.userInfo.avatarUrl:''
            search_times: this.data.search_times,
            search_timesok: this.data.search_timesok,
            timecount: this.data.timecount,
            isWin: this.data.isWin,
            restcount: this.data.restcount,
            timecount: this.data.timecount,
            firstWin: this.data.firstWin,
            secondWin: this.data.secondWin,
            thirdWin: this.data.thirdWin,
        };
        binarysearch_db.add({
            data: {
                ...searchResult,
                time: util.formatTime(new Date())
            }
        })
    },
    again() {
        this.setData({
            firstWin: 0,
            secondWin: 0,
            thirdWin: 0,
            restcount: 5,
            timecount: -1,
            startTime: 0,
            isWin: 0,
            search_times: 0,
            search_timesok: 0,
        })
    },
})