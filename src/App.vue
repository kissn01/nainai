<template>
    <div class="wrap">
        <div class="container">
            <div class="banner">
                <!--<div v-if="unlock===true" class="my-coin">-->
                <div class="my-coin">
                    <div class="num">{{formatScore(coin)}}</div>
                </div>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <img src="~@/assets/swiper_01.png" alt/>
                        </div>
                        <div class="swiper-slide">
                            <img src="~@/assets/swiper_02.png" alt/>
                        </div>
                        <div class="swiper-slide">
                            <img src="~@/assets/swiper_03.png" alt/>
                        </div>
                        <div class="swiper-slide">
                            <img src="~@/assets/swiper_04.png" alt/>
                        </div>
                        <div class="swiper-slide">
                            <img src="~@/assets/swiper_05.png" alt/>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="con-box">
                <div class="intr_box">
                    <h2 class="intr_tit db">简介</h2>
                </div>
                <p class="content">
                    <span class="c-title">原著：</span>
                    白锦锦
                </p>
                <p class="content">
                    <span class="c-title">剧情：</span>
                    平凡的少女“我”在某天放学回家后目睹了奶奶的死亡，随后便落入了无尽的循环，时间停在了奶奶死去的24小时内，不断重复着同一天。
                    “我”打算阻止奶奶的死亡，但尝试过多种方法均无法改变结局，于是“我”打算探查奶奶死亡的真相。
                    在后来的循环中，“我”发现妈妈和奶奶有过激烈的争吵，且妈妈总能在奶奶死亡后的第一时间处理善后。
                    在不知重复多少次循环后，“我”终于发现杀死奶奶的真正凶手。
                </p>
            </div>
        </div>
        <div class="bot">
            <div class="recommend" @click="recommendGame">游戏推荐</div>
            <div class="share" @click="shareClick">分享游戏</div>
            <div class="unlock" @click="launchClick" v-if="querystate">
                <div class="unlocktext" v-html="unlocktext"></div>
                <div class="coin" v-if="!unlock">
                    <div class="icon"></div>
                    <div class="coin-num">{{price}}</div>
                </div>
            </div>
            <div class="unlockloading" v-if="!querystate">
                <div class="anim2"></div>
            </div>
        </div>

        <div class="lay">
            <div class="trade">
                <h2>确定兑换信息</h2>
                <div class="btn-close" @click="closeClick"></div>
                <div class="goods-pic"></div>
                <div class="goods-info">奶奶 解锁</div>
                <div class="goods-price">
                    <div class="icon"></div>
                    <div class="num">{{price}}</div>
                </div>
                <div class="goods-tips">兑换成功后乐贝无法退回</div>
                <div class="btn-submit" @click="unlockClick">确 定</div>
            </div>
        </div>

        <div class="loading-panel" v-if="showLoadingPanel">
            <div class="anim1"></div>
            <div class="loading-text">数据加载中</div>
        </div>
    </div>
</template>

<script>
  import * as rem from "./lib/rem";
  import * as swiper from "./lib/swiper.min";
  import Vue from "vue";
  import BScroll from "better-scroll";

  export default {
    name: "app",
    data() {
      return {
        title: "奶奶",
        gameId: 11016,
        version: "0.01",
        heiheiready: false,
        playing: false,
        firstplay: false,
        count: 0,
        flowercount: 0,
        eggcount: 0,
        unlock: false,
        unlockwaiting: false,
        unlocktext: "解锁",
        coin: 0,
        price: 88,
        animid: undefined,
        querystate: true,
        rankstate: undefined,
        myrank: {},
        upitem: {},
        upshow: false,
        upshowtimer: undefined,
        pulldown: false,
        nowlist: "score",
        showLoadingPanel: false,
        showLoadingTimer: null,
        showLoadingLock: false,
        devoteRank: [
          // {rank:1,nick:'1`213123123',gender:1,uid:1,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:2,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:3,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:4,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:5,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:6,relation:1,score:55555},
        ],
        flowerRank: [
          // {rank:1,nick:'1`213123123',gender:1,uid:1,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:2,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:3,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:4,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:5,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:6,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:7,relation:1,score:55555},
        ],
        eggRank: [
          // {rank:1,nick:'1`213123123',gender:1,uid:1,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:2,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:3,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:4,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:5,relation:1,score:55555},
          // {rank:1,nick:'1`213123123',gender:1,uid:6,relation:1,score:55555},
        ],
        charalist: [
          {id: "1", name: "米雪", pic: "2-mixue.png", wall: "1-mixue.png"},
          {
            id: "2",
            name: "沈修平",
            pic: "2-shenxiuping.png",
            wall: "1-shenxiuping.png"
          },
          {
            id: "3",
            name: "魏海超",
            pic: "2-weihaichao.png",
            wall: "1-weihaichao.png"
          },
          {
            id: "4",
            name: "方梓蓉",
            pic: "2-fangzirong.png",
            wall: "1fangzirong.png"
          },
          {id: "5", name: "何俊", pic: "2-hejun.png", wall: "1-hejun.png"},
          {
            id: "6",
            name: "刘警官",
            pic: "2-jingguan.png",
            wall: "1-jingguan.png"
          },
          {id: "7", name: "张磊", pic: "2-zhanglei.png", wall: "1-zhanglei.png"}
        ]
      };
    },
    watch: {},
    computed: {},
    created() {
      if (localStorage.getItem("myrank"))
        this.myrank = JSON.parse(localStorage.getItem("myrank"));
      if (localStorage.getItem("devoteRank")) {
        this.devoteRank = JSON.parse(localStorage.getItem("devoteRank"));
        this.rankstate = true;
      }
      if (localStorage.getItem("flowerRank"))
        this.flowerRank = JSON.parse(localStorage.getItem("flowerRank"));
      if (localStorage.getItem("eggRank"))
        this.eggRank = JSON.parse(localStorage.getItem("eggRank"));

      window["onHeiHeiReady"] = () => {
        this.heiheiready = true;
        this.modifyTitleBar();
        this.webPageReady();

        this.getLoginUserInfo()
          .then(res => {
            if (res && res.data) {
              Vue.set(this.myrank, "uid", res.data.uid);
              Vue.set(this.myrank, "nick", res.data.nick);
              Vue.set(this.myrank, "gender", res.data.gender);
              Vue.set(this.myrank, "headUrl", res.data.headUrl);
              this.coin = res.data.coinAmount;
            }
          })
          .then(() => {
            this.queryGameLockState().then(res => {
              if (res && res.data) {
                let data = res.data;
                if (data.isOpen) {
                  this.unlocktext = '启动<br>游戏';
                  this.unlock = true;
                } else {
                  this.price = data.info.price;
                }
                this.querystate = true;
              }
            });
          });
      };
    },
    mounted() {
      let pattern = new RegExp("[?&]" + "pagePaddingTop" + "=([^&]+)", "g");
      let match = pattern.exec(window.location.href);
      let padding;
      if (match) padding = match[1];
      window["MtaH5"] && MtaH5.clickStat("index_exposed");
      window.mySwiper = new Swiper(".swiper-container", {
        effect: "coverflow",
        loop: true,
        autoplay: {
          disableOnInteraction: false
        },
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: -10,
          depth: 0,
          modifier: 1,
          slideShadows: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      });

      // this.vInit();
      if (this.shouldBlank()) document.querySelector(".bot").style.bottom = "0";
    },
    methods: {
      // 用户信息
      getUserInfo(uidlist) {
        console.log("call client getUserInfo");
        return new Promise(resolve => {
          try {
            dsBridge.call(
              "getUserInfo",
              {gameId: this.gameId, uids: uidlist, tag: "yxshz"},
              res => {
                const data = JSON.parse(res);
                console.log("call client getUserInfo success", data);
                resolve(data);
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      // 关系链信息
      getFriendRelation(uidlist) {
        console.log("call client getFriendRelation");
        return new Promise(resolve => {
          try {
            dsBridge.call(
              "getFriendRelation",
              {gameId: this.gameId, uids: uidlist, tag: "yxshz"},
              res => {
                const data = JSON.parse(res);
                console.log("call client getFriendRelation success", data);
                resolve(data);
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      // 登录信息
      getLoginUserInfo() {
        console.log("call client getLoginUserInfo");
        return new Promise(resolve => {
          try {
            dsBridge.call(
              "getLoginUserInfo",
              {gameId: this.gameId, needCoinAmount: true},
              res => {
                const data = JSON.parse(res);
                console.log("call client getLoginUserInfo success", data);
                resolve(data);
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      // 关注好友
      userFollow(uid) {
        console.log("call client userFollow");
        return new Promise(resolve => {
          try {
            dsBridge.call(
              "userFollow",
              {gameId: this.gameId, uid: uid},
              res => {
                const data = JSON.parse(res);
                console.log("call client userFollow success", data);
                resolve(data);
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      // 取关好友
      userUnFollow(uid) {
        console.log("call client userUnFollow");
        return new Promise(resolve => {
          try {
            dsBridge.call(
              "userUnFollow",
              {gameId: this.gameId, uid: uid},
              res => {
                const data = JSON.parse(res);
                console.log("call client userUnFollow success", data);
                resolve(data);
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      // 排行榜
      getCommonGameRank(ranktype, timetype) {
        console.log("call client getCommonGameRank");
        return new Promise(resolve => {
          try {
            console.log({
              gameId: this.gameId,
              gameRankType: ranktype,
              dateRankType: timetype
            });
            dsBridge.call(
              "launch.getCommonGameRank",
              {
                gameId: this.gameId,
                gameRankType: ranktype,
                dateRankType: timetype
              },
              res => {
                if (res) {
                  const data = JSON.parse(res);
                  console.log("call client getCommonGameRank success", data);
                  resolve(data);
                }
                this.pulldown = false;
                this.scroll.finishPullDown();
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      // 启动游戏
      launchGame() {
        console.log("call client launchGame");
        return new Promise(resolve => {
          try {
            dsBridge.call("launch.launchGame", {gameId: this.gameId}, res => {
              const data = JSON.parse(res);
              console.log("call client launchGame success", data);
              resolve(data);
            });
          } catch (e) {
            resolve(false);
          }
        });
      },
      // 获取解锁信息
      queryGameLockState() {
        console.log("call client queryGameLockState");
        return new Promise(resolve => {
          try {
            dsBridge.call(
              "launch.queryGameLockState",
              {bizGameId: this.gameId},
              res => {
                const data = JSON.parse(res);
                console.log("call client queryGameLockState success", data);
                resolve(data);
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      //解锁游戏
      doUnLockGameState() {
        console.log("call client doUnLockGameState");
        return new Promise(resolve => {
          try {
            dsBridge.call(
              "launch.doUnLockGameState",
              {bizGameId: this.gameId},
              res => {
                const data = JSON.parse(res);
                console.log("call client doUnLockGameState success", data);
                resolve(data);
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      //赠送礼物
      sendGift(uid, gift) {
        console.log("call client sendGift");
        return new Promise(resolve => {
          try {
            dsBridge.call(
              "sendGift",
              {gameId: this.gameId, receiverId: uid, giftId: gift, num: 1},
              res => {
                const data = JSON.parse(res);
                console.log("call client sendGift success", data);
                resolve(data);
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      //推荐有乐好友
      recommendGame() {
        console.log("call client recommendGame");
        window["MtaH5"] && MtaH5.clickStat("index_recommend");
        try {
          dsBridge.call("recommendGame", {gameId: this.gameId}, res => {
            const data = JSON.parse(res);
            console.log("call client recommendGame success", data);
            resolve(data);
          });
        } catch (e) {
          resolve(false);
        }
      },
      //分享游戏
      shareConsoleGame(cardList) {
        console.log("call client shareConsoleGame");
        try {
          let params = Object.assign(
            {cardList},
            {gameId: this.gameId, tag: this.title, gameVersion: this.version}
          );
          console.log("--------share params", params);
          dsBridge.call("shareConsoleGame", params, res => {
            const data = JSON.parse(res);
            console.log("call client shareConsoleGame success", data);
          });
        } catch (e) {
        }
      },
      //通知平台页面已就绪
      webPageReady() {
        console.log("call client webPageReady");
        try {
          dsBridge.call("webPageReady", {gameId: this.gameId}, res => {
            const data = JSON.parse(res);
            console.log("call client webPageReady success", data);
          });
        } catch (e) {
        }
      },
      //showdialog
      showDialog(title, desc, button) {
        console.log("call client showDialog");
        let btn = button ? button : ["我知道了"];
        return new Promise(resolve => {
          try {
            dsBridge.call(
              "showDialog",
              {gameId: this.gameId, title: title, desc: desc, buttons: btn},
              res => {
                const data = JSON.parse(res);
                console.log("call client showDialog success", data);
                resolve(data);
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      //toast
      toast(text, duration) {
        console.log("call client toast");
        let du = duration ? duration : 1500;
        return new Promise(resolve => {
          try {
            dsBridge.call(
              "toast",
              {gameId: this.gameId, text: text, duration: du},
              res => {
                const data = JSON.parse(res);
                console.log("call client toast success", data);
                resolve(data);
              }
            );
          } catch (e) {
            resolve(false);
          }
        });
      },
      //modifyTitleBar
      modifyTitleBar() {
        console.log("call client modifyTitleBar");
        try {
          dsBridge.call(
            "modifyTitleBar",
            {gameId: this.gameId, titleText: "", titleBarStyle: 2},
            res => {
              const data = JSON.parse(res);
              console.log("call client modifyTitleBar success", data);
            }
          );
        } catch (e) {
        }
      },
      launchClick(event) {
        console.log('launchClick')
        if (this.unlock) {
          // document.querySelector('#v-wrap').innerHTML = '';
          this.launchGame();
          window["MtaH5"] && MtaH5.clickStat("index_launch");
        } else {
          document.querySelector(".lay").style.display = "block";
          // window["MtaH5"] && MtaH5.clickStat('index_clickunlock');
        }
      },
      unlockClick(event) {
        if (this.unlockwaiting) return;
        this.unlockwaiting = true;
        this.doUnLockGameState().then(res => {
          this.unlockwaiting = false;
          if (res && res.data && res.data.isSuccess) {
            this.coin -= this.price;
            document.querySelector(".bot .unlock").innerText = "启动\n游戏";
            this.unlock = true;
            this.closeClick();
            // alert('解锁成功')
            this.showDialog("", "解锁成功，快去启动游戏吧");
            // window["MtaH5"] && MtaH5.clickStat('index_unlock');
          } else if (
            res.ret == 1100003 ||
            res.ret == 1100004 ||
            res.ret == 1100024
          ) {
            // alert('乐贝不足');
            this.showDialog("您的乐贝余额不足", "每日登录有乐可赚取乐贝");
            // window["MtaH5"] && MtaH5.clickStat('index_unlockfail');
          } else if (res.ret == 1100016) {
            this.unlock = true;
            this.closeClick();
            // alert('已经购买');
            this.showDialog("", "已经购买");
          } else {
            // alert('解锁失败');
            this.showDialog(
              "",
              "解锁失败（错误码" + res.ret + ",msg:" + ret.msg + "）"
            );
            // window["MtaH5"] && MtaH5.clickStat('index_unlockfail');
          }
        });
      },
      closeClick(event) {
        document.querySelector(".lay").style.display = "none";
      },

      // 角色信息
      charaAvatar(id) {
        let pic;
        this.charalist.some(o => {
          if (o.id == id) {
            pic = o.pic;
            return true;
          }
        });
        return (
          "https://cdn.cymini.qq.com/business/web/share_pic/LookingAtYou/" + pic
        );
      },
      charaName(id) {
        let name;
        this.charalist.some(o => {
          if (o.id == id) {
            name = o.name;
            return true;
          }
        });
        return name;
      },
      //排行榜切换
      rankClick(name) {
        this.pulldown = false;
        this.scroll.finishPullDown();
        this.scroll.scrollTo(0, 0);
        this.nowlist = name;
        // document.querySelectorAll('.rank-list').forEach(o=>{
        //   o.style.display = 'none'
        // })
        // document.querySelector('#'+name).style.display = 'block';
        document.querySelectorAll(".rank-nav span").forEach(o => {
          o.className = "";
        });
        document.querySelector("#button-" + name).className = "on";
        // document.querySelector('.rank-content').scrollTop = 0;
        // document.querySelector('.my-coin').style.display = name == 'score' ? 'none' : 'block';
        document.querySelectorAll(".chara-score .add").forEach(o => {
          o.className = "add";
        });
        setTimeout(() => {
          this.scroll.refresh();
          console.log("-----------scroll", this.scroll);
        }, 20);
        if (name == "score") this.getScoreRank();
      },
      followClick(uid) {
        this.userFollow(uid).then(res => {
          if (res.ret === 0) {
            this.getFriendRelation([uid]).then(res => {
              if (
                res.ret === 0 &&
                res.data &&
                res.data.list &&
                res.data.list.length
              ) {
                res.data.list.map(o => {
                  this.devoteRank.some(p => {
                    if (o.uid == p.uid) {
                      Vue.set(p, "relation", o.relation);
                      console.log(p);
                      return true;
                    }
                  });
                });
              }
            });
          }
        });
      },
      unfollowClick(uid) {
        this.userUnFollow(uid).then(res => {
          if (res.ret === 0) {
            this.getFriendRelation([uid]).then(res => {
              if (
                res.ret === 0 &&
                res.data &&
                res.data.list &&
                res.data.list.length
              ) {
                res.data.list.map(o => {
                  this.devoteRank.some(p => {
                    if (o.uid == p.uid) {
                      Vue.set(p, "relation", o.relation);
                      return true;
                    }
                  });
                });
              }
            });
          }
        });
      },
      // 排行榜调用加重试
      getScoreRank() {
        this.getCommonGameRank(1, 4).then(res => {
          if (res && res.ret === 0 && res.data) {
            Vue.set(this.myrank, "rank", res.data.myRankInfo.rank);
            Vue.set(this.myrank, "score", res.data.myRankInfo.score);
            this.devoteRank = res.data.rankInfos;
            this.rankstate = true;
            console.log("myrank:", this.myrank);
            localStorage.setItem("myrank", JSON.stringify(this.myrank));
            console.log("devoteRank:", this.devoteRank);
            let uidlist = [];
            this.devoteRank.map(o => {
              uidlist.push(o.uid);
            });
            // localStorage.setItem('devoteRank',JSON.stringify(this.devoteRank));
            let getinfo = () => {
              this.getUserInfo(uidlist).then(res => {
                if (
                  res.ret === 0 &&
                  res.data &&
                  res.data.list &&
                  res.data.list.length
                ) {
                  res.data.list.map(o => {
                    this.devoteRank.some(p => {
                      if (o.uid == p.uid) {
                        Vue.set(p, "nick", o.nick);
                        Vue.set(p, "gender", o.gender);
                        Vue.set(p, "headUrl", o.headUrl);
                        return true;
                      }
                    });
                    localStorage.setItem(
                      "devoteRank",
                      JSON.stringify(this.devoteRank)
                    );
                  });
                }
                // console.log('get user info:',this.devoteRank)
              });
            };
            let getfriend = () => {
              this.getFriendRelation(uidlist).then(res => {
                if (
                  res.ret === 0 &&
                  res.data &&
                  res.data.list &&
                  res.data.list.length
                ) {
                  res.data.list.map(o => {
                    this.devoteRank.some(p => {
                      if (o.uid == p.uid) {
                        Vue.set(p, "relation", o.relation);
                        return true;
                      }
                    });
                  });
                  localStorage.setItem(
                    "devoteRank",
                    JSON.stringify(this.devoteRank)
                  );
                }
                // console.log('get relation info:',this.devoteRank)
              });
            };
            uidlist.length && getinfo();
            uidlist.length && getfriend();
          }
          if (res.ret < 0 && this.nowlist == "score") this.getScoreRank();
        });
      },
      getFlowerRank() {
        this.getCommonGameRank(2, 4).then(res => {
          if (res && res.ret === 0 && res.data) {
            let list = [];
            res.data.rankInfos &&
            res.data.rankInfos.map(o => {
              // if(o.uid !=7 && o.uid !=18) {
              list.push(o);
              // }
            });
            this.charalist.map(o => {
              let has = list.some(p => {
                if (p.uid == o.id) {
                  return true;
                }
              });
              if (!has) {
                list.push({
                  uid: o.id,
                  rank: 0,
                  score: 0,
                  gradeLevel: 0,
                  rankingStar: 0
                });
              }
            });
            this.flowerRank = list;
            console.log("flowerRank:", this.flowerRank);
            localStorage.setItem("flowerRank", JSON.stringify(this.flowerRank));
          }
          if (res.ret < 0 && this.nowlist == "flower") this.getFlowerRank();
        });
      },
      getEggRank() {
        this.getCommonGameRank(3, 4).then(res => {
          if (res && res.ret === 0 && res.data) {
            let list = [];
            res.data.rankInfos &&
            res.data.rankInfos.map(o => {
              // if(o.uid !=5) {
              list.push(o);
              // }
            });
            this.charalist.map(o => {
              let has = list.some(p => {
                if (p.uid == o.id) {
                  return true;
                }
              });
              if (!has && o.id != 6) {
                list.push({
                  uid: o.id,
                  rank: 0,
                  score: 0,
                  gradeLevel: 0,
                  rankingStar: 0
                });
              }
            });
            this.eggRank = list;
            console.log("eggRank:", this.eggRank);
            localStorage.setItem("eggRank", JSON.stringify(this.eggRank));
          }
          if (res.ret < 0 && this.nowlist == "egg") this.getEggRank();
        });
      },
      // 分享点击
      shareClick() {
        if (this.showLoadingLock) {
          return;
        }
        this.showLoadingLock = true;
        clearTimeout(this.showLoadingTimer);
        this.showLoadingTimer = setTimeout(() => {
          this.showLoadingPanel = true;
        }, 1000);
        if (this.heiheiready) {
          this.showLoadingLock = false;
          clearTimeout(this.showLoadingTimer);
          this.showLoadingPanel = false;
          let cardList = [
            {
              nameTextColor: "#ffffff",
              uidTextColor: "#ffffff",
              qrCodeDescTextColor: "#ffffff",
              bgImageSmall:
                "https://cdn.cymini.qq.com/business/web/share_pic/GrandMa/share_small.jpg",
              bgImageBig:
                "https://cdn.cymini.qq.com/business/web/share_pic/GrandMa/share_big.jpg",
              textListBig: [],
              textListSmall: []
            }
          ];
          this.shareConsoleGame(cardList);
          window["MtaH5"] && MtaH5.clickStat("index_share");
        } else {
          this.showLoadingLock = false;
          clearTimeout(this.showLoadingTimer);
          this.showLoadingPanel = false;
          this.toast("贡献值获取失败，请稍后再试");
        }
      },
      // 数字格式化
      formatScore(score, symbol) {
        let scoreStr = score ? "" + score : "0";
        let newStr = "";
        let count = 0;
        let sb = symbol ? symbol : ",";
        for (let i = scoreStr.length - 1; i >= 0; i--) {
          if (count > 0 && count % 3 == 0) newStr = sb + newStr;
          count++;
          newStr = scoreStr[i] + newStr;
        }
        return newStr;
      },
      // 视频
      vInit() {
        // document.querySelector('#v-wrap').innerHTML = '<video id="video" class="video" crossorigin="anonymous" x-webkit-airplay="true" x5-video-player-type="h5-page" webkit-playsinline="true" playsinline="true" preload="true" loop="true" src="https://cdn.cymini.qq.com/business/web/yxshz_jump/video/pv2.mp4"></video>';
        // // this.vPlay();
        // console.log('++++++++++++++视频初始化')
        // document.querySelector('#video').addEventListener('timeupdate',()=>{
        //   if(!this.firstplay && document.querySelector('#video').currentTime) {
        //     this.firstplay = true;
        //   }
        // })
      },
      vPlay() {
        document.querySelector(".video").play();
        this.playing = true;
        // document.querySelector('.icon-play').style.display = 'none';
      },
      vPause() {
        document.querySelector(".video").pause();
        this.playing = false;
        document.querySelector(".icon-play").style.display = "block";
      },
      vClick() {
        // if(this.playing) {
        //   this.vPause()
        // } else {
        //   this.vPlay();
        // }
      },
      // 送礼
      giftClick(item, gift) {
        if (item.isClick) return;
        item.isClick = true;
        let cost = gift == 111 ? 10 : 20;
        if ((gift == 111 && this.flowercount) || (gift == 112 && this.eggcount)) {
          gift == 111 ? this.flowercount++ : this.eggcount++;
          if (this.flowercount < 5)
            localStorage.setItem(
              "flowercount" + this.myrank.uid,
              this.flowercount
            );
          if (this.eggcount < 5)
            localStorage.setItem("eggcount" + this.myrank.uid, this.eggcount);
          if (this.coin < cost) {
            this.showDialog("您的乐贝余额不足", "每日登录有乐可赚取乐贝");
            item.isClick = false;
            return;
          }
          this.sendGift(item.uid, gift).then(res => {
            item.isClick = false;
            if (res.ret == 0) {
              this.giftChange(item, gift);
              if (res.data) this.coin = res.data.remainCoinAmmount;
            } else if (
              res.ret == 1100003 ||
              res.ret == 1100004 ||
              res.ret == 1100024
            ) {
              this.showDialog("您的乐贝余额不足", "每日登录有乐可赚取乐贝");
            } else {
              // alert('解锁失败');
              this.showDialog(
                "",
                "赠送失败（错误码" + res.ret + ",msg:" + ret.msg + "）"
              );
            }
          });
        } else {
          item.isClick = false;
          let giftname = gift == 111 ? "鲜花" : "鸡蛋";
          this.showDialog(
            "是否确定赠送" + giftname,
            "每次赠送" + giftname + "将消耗" + cost + "乐贝",
            ["确定", "取消"]
          ).then(res => {
            if (res.ret === 0 && res.data && res.data.index === 0) {
              gift == 111 ? this.flowercount++ : this.eggcount++;
              this.giftClick(item, gift);
            }
          });
        }
      },
      giftChange(dataitem, gift) {
        console.log("giftchange");
        let list = gift == 111 ? this.flowerRank : this.eggRank;
        let item, index;
        list.some((o, i) => {
          if (o.uid == dataitem.uid) {
            Vue.set(o, "score", o.score + 1);
            item = o;
            index = i;
            return true;
          }
        });
        let upfunc = () => {
          if (index && list[index - 1].score < item.score) {
            list[index] = list[index - 1];
            list[index - 1] = item;
            index--;
            upfunc();
            this.upitem = item;
            Vue.set(this.upitem, "rank", index + 1);
            clearTimeout(this.upshowtimer);
            this.upshow = true;
            this.upshowtimer = setTimeout(() => {
              this.upshow = false;
            }, 2000);
          }
        };
        upfunc();

        this.animid = dataitem.uid;
        setTimeout(() => (this.animid = undefined), 200);
        // setTimeout(()=>{
        //     console.log('timeout count')
        //     let add = document.querySelector('#chara_'+gift+'_'+dataitem.uid);
        //     // add.className = 'add';
        //     // setTimeout(()=>add.className = 'add anim',20);
        //     add.style.opacity = '1';
        //     setTimeout(()=>add.style.opacity = '0',20);
        // },200);
        // setTimeout(()=>{
        //   Vue.set(dataitem,'isAnim',false);
        //   setTimeout(()=>Vue.set(dataitem,'isAnim',true),0);
        // },0)
      },
      // 判断ipx
      shouldBlank() {
        const u = navigator.userAgent;
        const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (
          (window.screen.height == 812 && window.screen.width == 375) ||
          (window.screen.height == 896 && window.screen.width == 414)
        ) {
          // &&  !this.doinput
          //判断iPhone X和XR
          return true;
        } else {
          return false;
        }
      },
      // 获取用户头像地址
      avatarUrl(head_url) {
        if (
          head_url.indexOf("http://") == 0 ||
          head_url.indexOf("https://") == 0
        ) {
          let arr = head_url.split("/");
          let sizeList = arr[arr.length - 1];
          let sizeOKList = [];
          sizeList.split("|").forEach(size => {
            size && sizeOKList.push(size);
          });
          arr.length--;
          if (head_url.indexOf("q.qlogo.cn/qqapp") > 0) {
            return `${arr.join("/")}/100`;
          } else {
            return `${arr.join("/")}/${sizeOKList[0]}`;
          }
        } else {
          let host;
          if (GlobalData.getEnv() == "online") {
            host = "https://piccdn.cymini.qq.com";
          } else {
            host = "http://183.57.50.47";
          }
          let url = host + "/cy_head/" + head_url + "/128";
          return url;
        }
      },
      _initPullDownRefresh() {
        // 下拉刷新
        this.scroll.on("pullingDown", () => {
          console.log("refresh room list");
          if (!this.pulldown) {
            switch (this.nowlist) {
              case "score":
                this.getScoreRank();
                break;
              case "flower":
                this.getFlowerRank();
                break;
              case "egg":
                this.getEggRank();
                break;
            }
          }
          this.pulldown = true;

          // setTimeout(() => {
          //   this.pulldown = false;
          // }, 2 * 1000);
        });
      }
    }
  };
</script>


<style>
    * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    html {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        /* background: #151b1b; */
        width: 100%;
        height: 100%;
        scroll-behavior: smooth;
        background: #f6f6f6;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    ul,
    li {
        margin: 0;
        padding: 0;
    }

    @font-face {
        font-family: "rankNum";
        src: url("./assets/rankNum.eot"); /* IE9 */
        src: url("./assets/rankNum.eot?#iefix") format("embedded-opentype"),
            /* IE6-IE8 */ url("./assets/rankNum.woff") format("woff"),
            /* chrome、firefox */ url("./assets/rankNum.ttf") format("truetype"),
            /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */ url("./assets/rankNum.svg#rankNum") format("svg"); /* iOS 4.1- */
        font-style: normal;
        font-weight: normal;
    }

    .container {
        display: flex;
        flex-flow: column;
        height: 100%;
        overflow: hidden;
    }

    .con-box {
        padding-bottom: 2.28rem;
        overflow-y: auto;
    }

    .loading-panel {
        width: 2rem;
        height: 2.4rem;
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 9999;
        margin: -1.2rem 0 0 -1rem;
        background: url(~@/assets/loding_ditu.png) no-repeat;
        background-size: 100% auto;
        font-size: 0.24rem;
    }

    .loading-text {
        text-align: center;
        padding-top: 1.5rem;
    }

    .swiper-container {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .swiper-wrapper {
        width: 1000%;
        height: 100%;
        display: flex;
        transition-property: transform;
        box-sizing: content-box;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        width: 6.2rem;
        height: 3.4rem;
        flex-shrink: 0;
        /* position: relative; */

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .swiper-pagination {
        width: 100%;
        height: 0.1rem;
        position: absolute;
        bottom: 1.12rem;
        text-align: center;
        display: flex;
        justify-content: center;
    }

    .swiper-pagination .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background: #ffffff;
        border-radius: 50%;
        margin: 0 0.1rem;
        opacity: 0.5;
        background: url(~@/assets/point_select_1.png) no-repeat center center;
        background-size: 100% auto;
    }

    .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {
        opacity: 1;
        background: url(~@/assets/point_select.png) no-repeat center center;
        background-size: 100% auto;
    }

    .slider-content {
        width: 6rem;
        height: 3.4rem;
        margin: 0 auto;
        position: relative;
    }

    .slider-content img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
    }

    .video-wrap,
    .video {
        width: 6rem;
        height: 3.4rem;
        margin: 0 auto;
        border-radius: 0.2rem;
        background: #000;
    }

    .slider-content .video-poster {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
        border-radius: 0.2rem;
    }

    .icon-play {
        width: 0.46rem;
        height: 0.52rem;
        background: url(~@/assets/button_bofang.png) no-repeat;
        background-size: 100% auto;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -0.26rem 0 0 -0.23rem;
        z-index: 99;
    }

    .rank {
        width: 100%;
        flex: 1;
        background: #ececeb;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
    }

    .rank-top {
        width: 100%;
        flex: 0 0 0.84rem;
    }

    .rank-nav {
        width: 3.8rem;
        height: 0.44rem;
        background: url(~@/assets/erjidaohang_di.png) no-repeat;
        background-size: 100% auto;
        margin: 0.2rem auto 0;
    }

    .rank-nav span {
        width: 1.4rem;
        height: 0.44rem;
        float: left;
        margin-right: -0.2rem;
        text-align: center;
        font-size: 0.24rem;
        line-height: 0.46rem;
        color: #d8d4d1;
        overflow: hidden;
    }

    .rank-nav span:first-child {
        margin-left: -0.01rem;
    }

    .rank-nav span:last-child {
        margin-left: 0.03rem;
    }

    .rank-nav span.on {
        background: url(~@/assets/erjidaohang_xuanzhong.png) no-repeat;
        background-size: 100% auto;
        color: #7e4814;
    }

    .rank-content {
        width: 100%;
        flex: 1;
        overflow: hidden;
    }

    .rank-list {
        width: 100%;
        height: auto;
        padding-bottom: 2rem;
        /* margin-left: 0.4rem; */
    }

    .rank-list#egg {
        padding-bottom: 3.3rem;
    }

    /* .rank-list#flower,.rank-list#egg {
          padding-top: 0.8rem;
        } */
    .rank-list li {
        width: 6.8rem;
        height: 1.3rem;
        position: relative;
        color: #211a19;
        list-style: none;
        padding: 0 0.35rem;
    }

    .rank-list .my-li {
        background: #e6e2e1;
    }

    .rank-list .num {
        width: 0.7rem;
        padding-top: 0.45rem;
        font-size: 0.6rem;
        text-indent: 0.1rem;
        font-family: "rankNum";
    }

    .rank-list .no {
        position: absolute;
        left: 0.25rem;
        top: 0.45rem;
        font-size: 0.26rem;
    }

    .rank-list .avatar {
        width: 1.06rem;
        height: 1.06rem;
        position: absolute;
        left: 1.22rem;
        top: 0.13rem;
        background-size: 100% auto;
    }

    .rank-list .avatar img {
        width: 0.94rem;
        height: 0.94rem;
        border-radius: 50%;
        display: block;
        margin: 0.06rem 0 0 0.06rem;
    }

    .rank-list .info {
        position: absolute;
        left: 2.65rem;
        top: 0.34rem;
        display: flex;
        flex-wrap: nowrap;
    }

    .rank-list .name {
        max-width: 2.2rem;
        font-size: 0.26rem;
        height: 0.32rem;
        line-height: 0.32rem;
        font-family: Arial;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .rank-list .male,
    .rank-list .female {
        width: 0.32rem;
        height: 0.32rem;
        background: url(~@/assets/tongyong_icon_xingbie_nan.png) no-repeat;
        background-size: 100% auto;
        margin-left: 0.12rem;
    }

    .rank-list .female {
        background-image: url(~@/assets/tongyong_icon_xingbie_nv.png);
    }

    .rank-list .chat {
        width: 0.32rem;
        height: 0.32rem;
        background: url(~@/assets/xunzhang_pingwang_s.png) no-repeat;
        background-size: 100% auto;
        margin-left: 0.12rem;
    }

    .rank-list .score {
        position: absolute;
        left: 2.65rem;
        top: 0.7rem;
        font-size: 0.36rem;
        font-weight: bold;
        font-family: "rankNum";
    }

    .rank-list .btn-add {
        width: 0.94rem;
        height: 0.46rem;
        position: absolute;
        right: 0.35rem;
        top: 0.42rem;
        background: url(~@/assets/button_guanzhu.png) no-repeat;
        background-size: 100% auto;
    }

    .rank-list .btn-add.had {
        background-image: url(~@/assets/button_yiguanzhu.png);
    }

    .rank-list .btn-add.both {
        background-image: url(~@/assets/button_huxiangguanzhu.png);
    }

    .rank-list .list-li:nth-child(1) .avatar,
    #score .list-li:nth-child(2) .avatar {
        background-image: url(~@/assets/touxiangkuang_1.png);
    }

    .rank-list .list-li:nth-child(2) .avatar,
    #score .list-li:nth-child(3) .avatar {
        background-image: url(~@/assets/touxiangkuang_2.png);
    }

    .rank-list .list-li:nth-child(3) .avatar,
    #score .list-li:nth-child(4) .avatar {
        background-image: url(~@/assets/touxiangkuang_3.png);
    }

    .rank-list .list-li:nth-child(1) .num,
    .rank-list .list-li:nth-child(2) .num,
    .rank-list .list-li:nth-child(3) .num,
    #score .list-li:nth-child(4) .num {
        text-indent: -9999px;
        width: 0.54rem;
        height: 0.54rem;
        background-repeat: no-repeat;
        background-position: 0 0.42rem;
        background-size: 100% auto;
    }

    .rank-list .list-li:nth-child(1) .num,
    #score .list-li:nth-child(2) .num {
        background-image: url(~@/assets/kaihei_paihangbang_diyi.png);
    }

    .rank-list .list-li:nth-child(2) .num,
    #score .list-li:nth-child(3) .num {
        background-image: url(~@/assets/kaihei_paihangbang_dier.png);
    }

    .rank-list .list-li:nth-child(3) .num,
    #score .list-li:nth-child(4) .num {
        background-image: url(~@/assets/kaihei_paihangbang_disan.png);
    }

    /* 鲜花角色榜相关 */
    .rank-list .chara {
        width: 0.9rem;
        height: 0.9rem;
        position: absolute;
        left: 1.3rem;
        top: 0.18rem;
    }

    .rank-list .chara img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 0.05rem;
    }

    .rank-list .chara-name {
        position: absolute;
        left: 2.65rem;
        top: 0.34rem;
        font-size: 0.26rem;
        line-height: 0.32rem;
        font-family: Arial;
    }

    .rank-list .chara-score {
        height: 0.44rem;
        display: flex;
        justify-content: start;
        /* align-items: center; */
        position: absolute;
        left: 2.65rem;
        top: 0.7rem;
    }

    .rank-list .chara-score .flower {
        width: 0.36rem;
        height: 0.44rem;
        background: url(~@/assets/icon_xianhua.png) no-repeat;
        background-size: 100% auto;
    }

    .rank-list .chara-score .egg {
        width: 0.32rem;
        height: 0.41rem;
        background: url(~@/assets/icon_jidan.png) no-repeat;
        background-size: 100% auto;
    }

    .rank-list .chara-score .chara-num {
        font-size: 0.36rem;
        line-height: 0.38rem;
        padding-top: 0.06rem;
        height: 0.44rem;
        /* overflow: hidden; */
        margin-left: 0.15rem;
        font-family: "rankNum";
    }

    .rank-list .chara-score .add {
        font-size: 0.36rem;
        line-height: 0.38rem;
        padding-top: 0.06rem;
        height: 0.44rem;
        margin-left: 0.1rem;
        font-family: "rankNum";
        color: #ea5c7b;
        /* opacity: 0; */
    }

    .rank-list .chara-score .anim {
        -webkit-animation: add 1s forwards linear;
        animation: add 1s forwards linear;
    }

    @keyframes add {
        0% {
            opacity: 1;
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            -webkit-transform: translateY(-10px);
            transform: translateY(-10px);
        }
    }

    .rank-list .btn-gift {
        width: 1.2rem;
        height: 0.57rem;
        /* background: url(./assets/button_zensong.png) no-repeat; */
        background-repeat: no-repeat;
        background-size: 100% auto;
        position: absolute;
        right: 0.3rem;
        top: 0.35rem;
    }

    .rank-list .btn-flower {
        background-image: url(~@/assets/button_songhua.png);
    }

    .rank-list .btn-egg {
        background-image: url(~@/assets/button_zadan.png);
    }

    .rank-list .btn-flower.on {
        background-image: url(~@/assets/button_songhua_anya.png);
    }

    .rank-list .btn-egg.on {
        background-image: url(~@/assets/button_zadan_anya.png);
    }

    .bot {
        width: 7.5rem;
        height: 2.28rem;
        position: fixed;
        z-index: 999;
        left: 0;
        bottom: -0.3rem;
        background: url(~@/assets/daohanglan_di.png) no-repeat center bottom;
        background-size: 7.5rem 2.88rem;
        color: #211a19;
    }

    .bot .recommend {
        position: absolute;
        width: 1rem;
        height: 1rem;
        left: 0.9rem;
        top: 0.69rem;
        background: url(~@/assets/icon_tuijianhaoyou.png) no-repeat 0.3rem 0.1rem;
        background-size: 0.45rem 0.44rem;
        text-align: center;
        font-size: 0.2rem;
        padding-top: 0.7rem;
        overflow: hidden;
    }

    .bot .share {
        position: absolute;
        width: 1rem;
        height: 1rem;
        left: 5.56rem;
        top: 0.69rem;
        background: url(~@/assets/icon_gongxiangxuanyao.png) no-repeat 0.27rem 0.1rem;
        background-size: 0.44rem 0.44rem;
        text-align: center;
        font-size: 0.2rem;
        padding-top: 0.7rem;
        overflow: hidden;
    }

    .bot .unlock,
    .bot .unlockloading {
        width: 1.6rem;
        height: 1.6rem;
        position: absolute;
        left: 50%;
        top: 0;
        margin-left: -0.8rem;
        background: url(~@/assets/daohanglang_button_jiesuo.png) no-repeat;
        background-size: 100% auto;
        font-size: 0.34rem;
        line-height: 0.36rem;
        text-align: center;
        color: #7e4814;
        font-weight: bold;
        padding-top: 0.45rem;
        overflow: hidden;
    }

    .bot .unlockloading {
        padding: 0;
    }

    .bot .coin {
        position: absolute;
        top: 0.92rem;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .bot .icon {
        width: 0.31rem;
        height: 0.32rem;
        background: url(~@/assets/icon_heibei.png) no-repeat;
        background-size: 100% auto;
    }

    .bot .coin-num {
        font-size: 0.32rem;
        padding-top: 0.04rem;
        height: 0.32rem;
        overflow: hidden;
        margin-left: 0.06rem;
        font-family: "rankNum";
    }

    .lay {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.7);
        display: none;
    }

    .trade {
        width: 100%;
        height: 8rem;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #f0f0ef;
        border-top-left-radius: 0.4rem;
        border-top-right-radius: 0.4rem;
        color: #2b2321;
    }

    .trade h2 {
        margin-top: 0.45rem;
        font-size: 0.36rem;
        line-height: 0.38rem;
        text-align: center;
        height: 1.25rem;
    }

    .trade .btn-close {
        width: 0.34rem;
        height: 0.33rem;
        position: absolute;
        right: 0.33rem;
        top: 0.47rem;
        background: url(~@/assets/icon_guanbi.png) no-repeat;
        background-size: 100% auto;
    }

    .trade .goods-pic {
        width: 3.4rem;
        height: 2rem;
        background: url(~@/assets/zhangjiejiesuotu.png) no-repeat;
        background-size: 100% auto;
        margin: 0 auto 0.2rem;
    }

    .trade .goods-info {
        font-size: 0.28rem;
        line-height: 0.3rem;
        text-align: center;
        height: 0.5rem;
    }

    .trade .goods-price {
        height: 0.58rem;
        display: flex;
        justify-content: center;
    }

    .trade .goods-price .icon {
        width: 0.56rem;
        height: 0.58rem;
        background: url(~@/assets/icon_heibei_da.png) no-repeat;
        background-size: 100% auto;
    }

    .trade .goods-price .num {
        font-size: 0.5rem;
        padding-top: 0.06rem;
        height: 0.58rem;
        overflow: hidden;
        margin-left: 0.06rem;
        font-family: "rankNum";
    }

    .trade .goods-tips {
        margin-top: 0.8rem;
        font-size: 0.22rem;
        line-height: 0.24rem;
        height: 0.48rem;
        text-align: center;
    }

    .trade .btn-submit {
        width: 3.36rem;
        height: 0.8rem;
        margin: 0 auto;
        background: #ea5c7b url(~@/assets/button_queding.png) no-repeat;
        background-size: 100% auto;
        border-radius: 0.1rem;
        text-align: center;
        font-size: 0.3rem;
        color: #fff;
        line-height: 0.8rem;
    }

    .anim1,
    .anim2 {
        width: 0.44rem;
        height: 0.44rem;
        position: absolute;
        left: 50%;
        top: 40%;
        margin: -0.22rem 0 0 -0.22rem;
        background: url(~@/assets/xiapxi_state_jiazai_2.png) no-repeat;
        background-size: 100% auto;
        -webkit-animation: rotate 2s infinite linear;
        animation: rotate 2s infinite linear;
    }

    .anim2 {
        background-image: url(~@/assets/xiapxi_state_jiazai.png);
        top: 50%;
    }

    #loading {
        top: 0.8rem;
        margin-top: 0;
    }

    @keyframes rotate {
        0% {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
    }

    .my-coin {
        width: 1.61rem;
        height: 0.58rem;
        position: absolute;
        right: 0.3rem;
        top: 0.8rem;
        z-index: 99;
        background: url(~@/assets/wodeheibeiditu.png) no-repeat;
        background-size: 100% auto;
        color: #fff;
    }

    .my-coin .num {
        height: 0.8rem;
        /* line-height: 0.8rem; */
        padding: 0.16rem 0 0 0.7rem;
        font-size: 0.36rem;
        line-height: 0.38rem;
        font-family: "rankNum";
    }

    .rank-up {
        width: 5.8rem;
        height: 2rem;
        position: absolute;
        left: 50%;
        top: 0.9rem;
        z-index: 999;
        margin-left: -2.9rem;
        background: url(~@/assets/duanweishangshengdiban.png) no-repeat;
        background-size: 100% auto;
        color: #2b2321;
    }

    .rank-up .icon {
        width: 0.62rem;
        height: 0.7rem;
        background: url(./assets/icon_duanweishangsheng.png) no-repeat;
        background-size: 100% auto;
        position: absolute;
        left: 0.94rem;
        top: 0.45rem;
    }

    .rank-up .num {
        font-size: 0.58rem;
        line-height: 0.6rem;
        position: absolute;
        left: 1.8rem;
        top: 0.6rem;
        font-family: "rankNum";
    }

    .rank-up .chara {
        width: 0.9rem;
        height: 0.9rem;
        position: absolute;
        left: 2.73rem;
        top: 0.35rem;
    }

    .rank-up .chara img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 0.05rem;
    }

    .rank-up .chara-name {
        position: absolute;
        left: 3.85rem;
        top: 0.4rem;
        font-size: 0.26rem;
        line-height: 0.32rem;
        font-family: Arial;
    }

    .rank-up .chara-score {
        height: 0.44rem;
        display: flex;
        justify-content: start;
        /* align-items: center; */
        position: absolute;
        left: 3.85rem;
        top: 0.76rem;
    }

    .rank-up .chara-score .flower {
        width: 0.36rem;
        height: 0.44rem;
        background: url(~@/assets/icon_xianhua.png) no-repeat;
        background-size: 100% auto;
    }

    .rank-up .chara-score .egg {
        width: 0.32rem;
        height: 0.41rem;
        background: url(~@/assets/icon_jidan.png) no-repeat;
        background-size: 100% auto;
    }

    .rank-up .chara-score .chara-num {
        font-size: 0.36rem;
        line-height: 0.38rem;
        padding-top: 0.06rem;
        height: 0.44rem;
        /* overflow: hidden; */
        margin-left: 0.15rem;
        font-family: "rankNum";
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
    }

    .fade-enter {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

    .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
    }

    .wrap {
        background: #f6f6f6 url(~@/assets/rp.jpg) no-repeat;
        width: 7.5rem;
        height: 100%;
        box-sizing: border-box;
        background-size: 100% auto;
        position: relative;
    }

    .btn_back {
        background: url(~@/assets/back.png) no-repeat;
        width: 0.6rem;
        height: 0.6rem;
        background-size: 100% auto;
        position: absolute;
        top: 0.52rem;
        left: 0.46rem;
    }

    .logo {
        position: absolute;
        width: 100%;
        top: 0.86rem;
        left: 0;
        text-align: center;
        font-size: 0.4rem;
        letter-spacing: -1px;
        color: #fffefe;
    }

    .banner {
        width: 100%;
        height: 6.52rem;
        padding: 1.9rem 0 .73rem;
        overflow: hidden;
        box-sizing: border-box;
        flex-shrink: 0;
    }

    .swiper-container {
        margin-top: -0.5rem;
        width: 100%;
        height: 4.4rem;
    }

    .swiper-slide,
    .swiper-slide img {
        width: 6.59rem;
        height: 3.83rem;
        display: block;
    }

    .swiper-container-horizontal > .swiper-pagination-bullets,
    .swiper-pagination-custom,
    .swiper-pagination-fraction {
        bottom: 0.1rem;
    }

    .swiper-pagination-bullet-active,
    .swiper-pagination-bullet {
        background: #fff;
    }

    .intr_box {
        padding: 0.3rem 0.44rem;
    }

    .content {
        padding: 0 0.5rem;
        margin: 0;
        font-size: 0.28rem;
        margin-bottom: 0.2rem;
        line-height: 2;
        text-align: justify;
    }

    .content .c-title {
        display: inline-block;
        margin-right: 0.1rem;
        width: 1.13rem;
        height: 0.34rem;
        line-height: 0.34rem;
        background: url(~@/assets/icon.png) no-repeat;
        background-size: 100% 100%;
        color: #fff;
        font-size: 0.28rem;
        text-indent: 0.25rem;
    }

    .intr_tit {
        background: url(~@/assets/intr.png) no-repeat;
        width: 1.59rem;
        height: 0.75rem;
        background-size: 100% auto;
    }

    .hide {
        display: block;
        width: 0;
        height: 0;
        overflow: hidden;
    }

    .c:before,
    .c:after {
        content: "";
        display: table;
    }

    .c:after {
        clear: both;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .pr {
        position: relative;
    }

    .pa {
        position: absolute;
    }

    .db {
        display: block;
        text-indent: -9999em;
        font-size: 0;
    }
</style>
