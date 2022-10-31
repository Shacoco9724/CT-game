var a = require("../config.js");

module.exports = function(e) {
    var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, t = getApp().globalData.token;
    return new Promise(function(n, o) {
        wx.showNavigationBarLoading(), wx.request({
            method: "POST",
            url: a.apiServer + e,
            data: r,
            header: {
                "Content-Type": "application/json",
                token: t
            },
            success: function(a) {
                if (wx.hideNavigationBarLoading(), a.data) {
                    var e = a.data;
                    e.success ? n(e.data) : o(new Error(e.message));
                } else o(new Error("请求失败，状态码" + a.statusCode));
            },
            fail: function() {
                wx.hideNavigationBarLoading(), o(new Error("请求失败"));
            }
        });
    });
};