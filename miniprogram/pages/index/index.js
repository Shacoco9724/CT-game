// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  
  data: {

    userInfo:{//用于保存用户数据
      nickName: '点击登录'
    }, 
    islogin: false, //声明一个变量,默认为false,一旦登录成功,改为true

    showUploadTip: false,
    powerList: [{
      title: '云函数',
      tip: '安全、免鉴权运行业务代码',
      showItem: false,
      item: [{
        title: '获取OpenId',
        page: 'getOpenId'
      },
      //  {
      //   title: '微信支付'
      // },
       {
        title: '生成小程序码',
        page: 'getMiniProgramCode'
      },
      // {
      //   title: '发送订阅消息',
      // }
    ]
    }, {
      title: '数据库',
      tip: '安全稳定的文档型数据库',
      showItem: false,
      item: [{
        title: '创建集合',
        page: 'createCollection'
      }, {
        title: '更新记录',
        page: 'updateRecord'
      }, {
        title: '查询记录',
        page: 'selectRecord'
      }, {
        title: '聚合操作',
        page: 'sumRecord'
      }]
    }, {
      title: '云存储',
      tip: '自带CDN加速文件存储',
      showItem: false,
      item: [{
        title: '上传文件',
        page: 'uploadFile'
      }]
    }, {
      title: '云托管',
      tip: '不限语言的全托管容器服务',
      showItem: false,
      item: [{
        title: '部署服务',
        page: 'deployService'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail (res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },
  
  //点击登录后执行
  handleTapLogin(){
    if(this.data.islogin){
      return; //若已经登录,则直接返回,不会执行后面的语句
    }
    wx.getUserProfile({
      desc: '获取用户信息用于维护会员权益',
      lang:'zh_CN',
      success:(res)=>{
        console.log('获取用户信息',res)
        //将用户数据存入data,更新UI
        this.setData({
          islogin: true,//登录成功,改为true
          userInfo: res.userInfo
        })
        //去自己家数据库进行查询,看一下当前用户的最新数据
        this.login()
      }
    })
  },
  //访问自己家数据库执行登录业务
  //1.若在users集合中找到用户信息,那么直接更新UI
  //2.若在users集合中没有找到用户信息,执行注册业务
  login(){
    let db = wx.cloud.database()   //获取数据库信息
    //users集合有权限设置,导致只能查到自己以前添加过得数据
    db.collection('users').get().then(res=>{
      console.log('查询当前用户',res)
      if(res.data.length==0){//没有查到用户
        this.regist() //调一个方法,去注册
      }else{//查到了用户
        let userInfo = res.data[0] //拿到数据库里面的数据
        this.setData({userInfo})   //直接更新到data,这样页面就更新了
      }
    })
  },
  //注册业务  将userInfo存入users集合
  regist(){
    let db = wx.cloud.database() //获取数据库信息
    db.collection('users').add({  //在users中添加数据
      data:this.data.userInfo,    //把userInfo中的新数据存入data
      success:(res)=>{
        console.log('注册用户',res) //执行成功后打印
        //将_id存入 this.data.userInfo
        this.data.userInfo._id = res._id
      }
    })
  },




});
