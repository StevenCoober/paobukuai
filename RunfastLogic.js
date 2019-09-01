
var RunFastConfig = require('./RunFastConfig');
var RunFastCardLogic = require('./RunFastCardLogic');
var StrCommon = require('../etc/str_common');

var RUNFAST_GAME_PLAYER_MAX = RunFastConfig.RUNFAST_GAME_PLAYER_MAX;

var RUNFAST_PLAYER_MAX_CARD = RunFastConfig.RUNFAST_PLAYER_MAX_CARD;
var INVALID_USER = -1;

var OUTCARD_ZORDER = 20000 
var HANDCARD_ZORDER = 20001
var CHOOSEMENU_ZORDER = 30000
var POPLAYER_ZORDER = 40000

var AUDIO_BACK = "runfast"
var AUDIO_BASE = "runfast/"
// cc.ll = function () {

// }

// cc.ll.net = function () {

// }

// cc.ll.net.send = function () {

// }

// cc.ll.net.close = function () {
    
// }

// cc.ll.net.addHandler = function () {
    
// }

cc.Class({
    extends: cc.Component,

    properties: {
        RoomIdLabel: cc.Label,

        roomid: {
            get() {
                return this._roomid;
            },
            set(id) {
                this._roomid = id;
                if (this.RoomIdLabel) this.RoomIdLabel.string = id;
            },
        },

        outCardsPosBegins: {
            default: [],
            type: [cc.Node],
            tooltip: CC_DEV && '出牌位置始节点\n         \
            佛曰:\n                                     \
            写字楼里写字间，写字间里程序员；\n          \
            程序人员写程序，又拿程序换酒钱。\n          \
            酒醒只在网上坐，酒醉还来网下眠；\n          \
            酒醉酒醒日复日，网上网下年复年。\n          \
            但愿老死电脑间，不愿鞠躬老板前；\n          \
            奔驰宝马贵者趣，公交自行程序员。\n          \
            别人笑我忒疯癫，我笑自己命太贱；\n          \
            不见满街漂亮妹，哪个归得程序员？',
        },

        outCardsPosEnds: {
            default: [],
            type: [cc.Node],
            tooltip: CC_DEV && '出牌终节点 \n       \
            致终于来到这里的勇敢的人：\n         \
            你是被上帝选中的人，是英勇的、不敌辛苦的、不眠不休的来修改我们这最棘手的代码的编程骑士。\n        \
            你，我们的救世主，人中之龙，我要对你说：永远不要放弃，永远不要对自己失望，永远不要逃走，辜负了自己，\n        \
            永远不要哭啼，永远不要说再见，永远不要说谎来伤害自己。',
        },

        playerNodeList: {
            default: [],
            type: [cc.Node],
            tooltip: CC_DEV && '玩家节点'
        },

        runfastPopLayer: 
        {
            default:null,
            type: cc.Node,
            tooltip: CC_DEV && '弹出节点',
        },

        runfastPopLayerShow: 
        {
            get() {
                if (this.runfastPopLayer) return this.runfastPopLayer.active;

                return false;
            },
            set(bshow) {
                if (this.runfastPopLayer) this.runfastPopLayer.active = bshow;
            },
            tooltip: CC_DEV && '弹出节点显示',
        },

        wechatInviteBtn: 
        {
            default:null,
            type:cc.Button,
            tooltip: CC_DEV && '微信邀请按钮',
        },

        wechatInviteBtnShow: 
        {
            get() {
                if (this.wechatInviteBtn) return this.wechatInviteBtn.node.active;

                return false;
            },
            set(bshow) {
                if (this.wechatInviteBtn) this.wechatInviteBtn.node.active = bshow;
            },
            tooltip: CC_DEV && '微信邀请按钮显示',
        },

        startBtn: 
        {
            default:null,
            type:cc.Button,
            tooltip: CC_DEV && '开始按钮',
        },

        startBtnShow:
        {
            get() {
                if (this.startBtn) return this.startBtn.node.active;
                return false;
            },
            set(bshow) {
                if (this.startBtn) this.startBtn.node.active = bshow;
            },
            tooltip: CC_DEV && '开始显示',
        },


        myselfNode:
        {
            default:null,
            type: cc.Node,
            tooltip: CC_DEV && '自己节点',
        },

        chooseMenuNode:
        {
            default:null,
            type:cc.Node,
            tooltip: CC_DEV && '选择菜单节点',
        },

        chooseMenuShow:
        {
            get() {
                if(this.chooseMenuNode) return this.chooseMenuNode.active;
                return false;
            },
            set(bshow) {
                if(this.chooseMenuNode) this.chooseMenuNode.active = bshow;
            },
            tooltip: CC_DEV && '选择菜单',
        },

        myselfCardNode:
        {
            default:null,
            type: cc.Node,
            tooltip: CC_DEV && '自己牌节点',
        },

        myselfCardNodeShow:
        {
            get() {
                if(this.myselfCardNode) return this.myselfCardNode.active;
                return false;
            },
            set(bshow) {
                if(this.myselfCardNode) this.myselfCardNode.active = bshow;
            },
            tooltip: CC_DEV && '自己牌节点',
        },

        noOutBtn:
        {
            default: null,
            type: cc.Button,
            tooltip: CC_DEV && '不出按钮',
        },

        noOutBtnEabled:
        {
            get() {
                var interactable = false;
                if(this.noOutBtn) {
                    interactable = this.noOutBtn.interactable;
                }
                return interactable;
            },
            set(interactable) {
                this.noOutBtn.interactable = interactable;
            },
            tooltip: CC_DEV && '不出按钮禁用',
        },

        rePromptBtnBtn:
        {
            default: null,
            type: cc.Button,
            tooltip: CC_DEV && '重选按钮',
        },

        outCardBtn:
        {
            default: null,
            type: cc.Button,
            tooltip: CC_DEV && '出牌按钮',
        },

        outCardBtnEabled:
        {
            get() {
                var interactable = false;
                if(this.outCardBtn) {
                    interactable = this.outCardBtn.interactable;
                }
                return interactable;
            },
            set(interactable) {
                this.outCardBtn.interactable = interactable;
            },
            tooltip: CC_DEV && '不出按钮禁用',
        },

        promptBtnBtn:
        {
            default: null,
            type: cc.Button,
            tooltip: CC_DEV && '选择按钮',
        },

        myselfNameNode:
        {
            default:null,
            type: cc.Label,
            tooltip: CC_DEV && '自己名字',
        },

        myselfName:
        {
            get() {
                if(this.myselfNameNode) return this.myselfNameNode.string;
                return false;
            },
            set(name) {
                if(this.myselfNameNode) this.myselfNameNode.string = name;
            },
            tooltip: CC_DEV && '自己名字',
        },

        myselfScoreNode:
        {
            default:null,
            type: cc.Label,
            tooltip: CC_DEV && '自己积分',
        },

        myselfScore:
        {
            get() {
                if(this.myselfScoreNode) return this.myselfScoreNode.string;
                return false;
            },
            set(score) {
                if(this.myselfScoreNode) this.myselfScoreNode.string = score;
            },
            tooltip: CC_DEV && '自己名字',
        },

        lCurRoundLabel: 
        {
            default:null,
            type: cc.Label,
            tooltip: CC_DEV && '当前局数',
        },

        lCurRound: {
            get() {
                if(this.lCurRoundLabel) return Number(this.lCurRoundLabel.string);
                return 0;
            },
            set(flag) {
                if(this.lCurRoundLabel) this.lCurRoundLabel.string = flag.toString();
            },
            tooltip: CC_DEV && '当前局数',
        },

        lMaxRoundLabel:
        {
            default:null,
            type: cc.Label,
            tooltip: CC_DEV && '总局数',
        },

        lMaxRound: {
            get() {
                if(this.lMaxRoundLabel) return Number(this.lMaxRoundLabel.string);
                return 0;
            },
            set(flag) {
                if(this.lMaxRoundLabel) this.lMaxRoundLabel.string = flag.toString();
            },
            tooltip: CC_DEV && '总局数',
        },

        GameDisbandQueryBtn: {
            default:null,
            type: cc.Button,
            tooltip: CC_DEV && '解散房间',
        },

        _roomid: 0,

        alarmNodes: {
            default: [],
            type: [cc.Node],
            tooltip: CC_DEV && '闹钟',
        },

        chatDialog: {
            default: null,
            type: cc.Node,
            tooltip: CC_DEV && '聊天',
        }
    },


    roundStartBefore() {

        if(this.startBtn) this.startBtn.node.on('click', this.onBeginBtnClick.bind(this));
        
        if(this.chooseMenuNode) this.chooseMenuNode.zIndex = CHOOSEMENU_ZORDER;

        if(this.runfastPopLayer) this.runfastPopLayer.zIndex = POPLAYER_ZORDER;

        if(this.myselfCardNode) this.myselfCardNode.zIndex = HANDCARD_ZORDER;

        if(this.noOutBtn) this.noOutBtn.node.on('click', this.onNoOutBtnClick.bind(this));

        if(this.rePromptBtnBtn) this.rePromptBtnBtn.node.on('click', this.onRePromptBtnClick.bind(this));

        if(this.outCardBtn) this.outCardBtn.node.on('click', this.onOutCardBtnClick.bind(this));

        if(this.promptBtnBtn) this.promptBtnBtn.node.on('click', this.onPromptBtnClick.bind(this));

        if(this.GameDisbandQueryBtn) this.GameDisbandQueryBtn.node.on('click', this.onExitBtnClick.bind(this));
    
        if(this.wechatInviteBtn) this.wechatInviteBtn.node.on('click', this.onWechatInviteBtnClick.bind(this));

        for (var i = 0; i < this.playerNodeList.length; i++) {
            var playernode = this.playerNodeList[i];
            var playernodeLogic = playernode.getComponent('RunfastPlayerNode');

            var bpos = this.outCardsPosBegins[i].getPosition();
            playernodeLogic.outCardsPosBegin = bpos.sub(playernode.getPosition());

            var epos = this.outCardsPosEnds[i].getPosition ();
            playernodeLogic.outCardsPosEnd = epos.sub(playernode.getPosition());
        };


    },

    onWechatInviteBtnClick(event) {
        cc.ll.wechat.shareWithFriendUrl('dongxiang', "" + this.roomid + ':' + RunFastConfig.RUNFAST_GAME_PLAYER_MAX);
    },

    onDisbandQueryBtnClick(event) {
	    cc.ll.AudioMgr.playDefaultBtn();
        this.runfastPopLayerShow = true;
        var runfastpoplayer = this.runfastPopLayer.getComponent('RunfastPopLayer');
        runfastpoplayer.ShowDisbandQuery(true);
    },

    roundStartInit() {
        this.runfastPopLayerShow = false;
        this.callScoreMenuShow = false;
        this.chooseMenuShow = false;
        this.myselfCardNodeShow = true;
        this.on3                 = false;

        var mycard = this.myselfCardNode.getComponent('MyCard');
        mycard.removeAllCards();
        
        for (var i = 0; i < this.playerNodeList.length; i++) {
            var playernode = this.playerNodeList[i];

            var playernodeLogic = playernode.getComponent('RunfastPlayerNode');
            playernodeLogic.roundStart();
            
        };

        this.startBtnShow = true;

        this.choosemenuwaitcatoon = false;

        this.bOnlyOnecard        = false;           //是否报单

        for(var i = 0; i < RunFastConfig.RUNFAST_GAME_PLAYER_MAX; i++) {
            this.alarmNodes[i].getComponent("AlarmClock").stopTime();
        }
    },

    onMsgRoundStart() {
        this.roundStartInit();
    },
 
    onLoad() {

        this._playerInfoList     = [];              //节点
        this._roomid             = 0;               //房间id
        this._cur_round          = 0;               //当前轮数
        this._max_round          = 0;               //最大轮数
        this._self_seat          = 0;               //自己的椅子号
        this._master             = 0;               //创建者
        this._operation_time     = 0;               //操作时间
        this._scoreNodeList      = [];              //分数节点

        this._endInfo            = null;            //大局结束信息

        this._newturn            = false;           //是否是新的一轮
        this._outcards           = null;            //出的牌
        this._promptFunc         = null;            //提示
        this.runfastPopLayerShow = false;           //各种弹出框
        this.bOnlyOnecard        = false;           //是否报单
        this.on3                 = false;            
        this._disarmbomb         = 1;               //是否可以拆炸弹(1, 0)
        this.initOthers();      
        cc.ll.AudioMgr.playBgm(AUDIO_BACK);
    },

    initOthers() {
        var Protocal = require('../network/RunfastProtocol');
        Protocal.initRunfastHandle();
        this.roundStartBefore();
        this.node.on('Round-Start', this.onMsgRoundStart.bind(this));
        this.node.on('cardDownSprites', this.cardDownSprites.bind(this));
    },

    cardDownSprites() {
        this.outCardBtnEabled = this.canOutCard() == null? false : true;
    },

    start() {
        cc.ll.net.send('enter');


        this.roundStartInit();
        cc.ll.AudioMgr.playBgm('runfast');
        cc.ll.loading.unshowLoading();
    },

    roundStart() {
        this.roundStartInit();
        this.onBeginBtnClick();
    },
    /*
        开始游戏按钮回调
    */
    onBeginBtnClick(e, d) {
	    cc.ll.AudioMgr.playDefaultBtn();
        if (this._endInfo != null) {
            this.showEndResult();
            return;
        }

        cc.ll.net.send('runfast_ready');
    },

    chooseMenuWaitCatoon() {
        if(this.choosemenuwaitcatoon) {
            this.chooseMenuShow = this.choosemenuwaitcatoon;
            this.choosemenuwaitcatoon = false;
        }
    },

    
    onNoOutBtnClick(event, customEventData) {
	    cc.ll.AudioMgr.playDefaultBtn();
        var mycard = this.myselfCardNode.getComponent('MyCard');
       
        var carddata = mycard.getCardData();

        if(this._newturn || this._promptFunc) {
            var compareResult = RunFastCardLogic.PromptOutCard(this._disarmbomb, carddata, this._outcards);
            if(compareResult == null) return;
        }
        
               
        cc.ll.net.send('RunFast_PassCardReq');
        this.chooseMenuShow = false; 
    },

    transformOnlyOneCard(bOnlyOnecard, promptResult) {
        if(!promptResult) return null;
        if(!bOnlyOnecard) return promptResult;
        var maxcard = -1;
        var result = [];
        for(var i = 0; i < promptResult.length; i++) {
            var oneresult = promptResult[i];
            if(oneresult.length == 1) {
                if(oneresult[0] > maxcard) {
                    maxcard = oneresult[0];
                }
            }
            else {
                result.push(oneresult);
            }
        }

        if(maxcard != -1) result.push([maxcard]);

        if(result.length == 0) return null;

        return result;
    },

    transOnlyHeartThree(on3, promptResult) {
        if(!on3) return promptResult;
        var result = [];
        for(var i = 0; i < promptResult.length; i++) {
            var oneresult = promptResult[i];
            if(oneresult.indexOf(0x23) != -1) {
                result.push(oneresult);
            }
        }
        if(result.length == 0) return null;
        return result;
    },

    promptFunc() {

        var promptresult;
        var mycard = this.myselfCardNode.getComponent('MyCard');
        if(this._newturn) {
            var handcards = mycard.getCardData();
            promptresult = RunFastCardLogic.PromptOutCard(this._disarmbomb, handcards);
        }
        else {
            var handcards = mycard.getCardData();
            promptresult = RunFastCardLogic.PromptOutCard(this._disarmbomb,handcards, this._outcards);
        }

        promptresult = this.transformOnlyOneCard(this.bOnlyOnecard, promptresult);
        promptresult = this.transOnlyHeartThree(this.on3, promptresult);
        if(promptresult) {

            var index = -1;
            return function (index, mycard) {
                return function () {
                index = index + 1;
                var oneresult = promptresult[Math.floor(index%promptresult.length)];
                RunFastCardLogic.SortCardByVal(oneresult);
                mycard.cardDownSprites();
                mycard.cardUpSprites(oneresult);
            }
        }(index, mycard);
    }

        return null;
    },

    onRePromptBtnClick(event, customEventData) {
	    cc.ll.AudioMgr.playDefaultBtn();
        var mycard = this.myselfCardNode.getComponent('MyCard');
        mycard.cardDownSprites();
        this.outCardBtnEabled = this.canOutCard() == null? false : true;
    },


    canOutCard() {

        var mycard = this.myselfCardNode.getComponent('MyCard');
        var outcardsprites = mycard.getUpCardSprites();
        var carddatas = null;


        if(outcardsprites) {

            var cbHandCardData = mycard.getCardData();
            carddatas = mycard.getCardDataByCardSprites(outcardsprites);
            if(this.on3 && carddatas.indexOf(0x23) == -1) return null;
            var cardType = RunFastCardLogic.GetCardType(carddatas);

            if(cardType != RunFastConfig.RUNFAST_INVALIDE) {
                
                if(!this._newturn) {
                    var compareResult  = RunFastCardLogic.CompareCard(this._disarmbomb, carddatas, this._outcards, cbHandCardData);
                    if (compareResult != RunFastConfig.COMPARE_LEFT_BIG) {
                        return null;
                    }
                }
                else if(!RunFastCardLogic.IsUpCardValid(carddatas, cbHandCardData)){
                    return null;
                }


                if(this.bOnlyOnecard && cardType == RunFastConfig.RUNFAST_SINGLE) {
                    var promptresult = RunFastCardLogic.PromptOutCardNotNullByType(cbHandCardData, RunFastConfig.RUNFAST_SINGLE, 1, this._disarmbomb);

                    for(var i = 0; i < promptresult.length; i++) {
                        if(RunFastCardLogic.GetLogicVal(promptresult[i][0]) > RunFastCardLogic.GetLogicVal(carddatas[0])) {
                            return null;
                        }
                    }
                    
                }
                return carddatas;
            }
        }
        return null;
    },

    onOutCardBtnClick(event, customEventData) {
	    cc.ll.AudioMgr.playDefaultBtn();
        var carddatas = this.canOutCard();
        if(carddatas) {
            var Package = 
            {
                cbCardData:carddatas,
            }
            cc.ll.net.send('RunFast_OutCardReq', Package);
            this.chooseMenuShow = false;
        }
        else {
            var mycard = this.myselfCardNode.getComponent('MyCard');
            mycard.cardDownSprites();
        }
    },

    onPromptBtnClick(event, customEventData) {
	    cc.ll.AudioMgr.playDefaultBtn();
        if(this._promptFunc) this._promptFunc();
        this.outCardBtnEabled = this.canOutCard() == null? false : true;
    },


    /*
        放弃按钮回调
    */
    onGiveUpBtnClick(e, d) {
	    cc.ll.AudioMgr.playDefaultBtn();
        if (this._operation_time <= 0) {
            return;
        }
        this._operation_time--;
        cc.ll.net.send('dn_giveup');
    },

    /**
     * 
     * @param {*} seat 
     */
    onExitBtnClick(e, d) {
	    cc.ll.AudioMgr.playDefaultBtn();
        cc.ll.notice.addMsg(1, StrCommon.IsDisbanRoom, () => {
            var Package = 
            {
                bIsAgree:true,
            };
            cc.ll.net.send('RunFast_DisbandQueryReq', Package);
        });
    },


  
    ///////////////////////////////////////////////////////////////
    //              逻辑部分
    ///////////////////////////////////////////////////////////////

    /* 
        内部方法 
            获取玩家逻辑位置
            网络位置固定 1 2 3 4 5
            逻辑位置分布为
            3           2
            4           1
                0
    */
    getLocalSeat(seat) {
        return (RUNFAST_GAME_PLAYER_MAX + this._self_seat - seat) % RUNFAST_GAME_PLAYER_MAX;
    },

    /* 
        内部方法 
            获取玩家信息
            数据信息由 playerEnter 参数playerInfo 提供
    */
    getPlayerInfo(userid) {
        let player = null;
        for (const p of this._playerInfoList) {
            if (p.userid == userid) {
                player = p;
                break;
            }
        }
        return player;
    },

    /* 
        内部方法 
            获取玩家头像节点
    */
    getPlayerNode(userid) {

        for (const playernode of this.playerNodeList) {
            let nodelogic = playernode.getComponent('RunfastPlayerNode');
            if (nodelogic.userid == userid) {
                return playernode;
            }
        }
        return null;
    },




    /* 
        网络消息 
            有玩家进入
            playerinfo  userid seat name score
    */
    playerEnter(playerInfo) {
        if(playerInfo.userid == cc.ll.player.userid) {
            this._self_seat = playerInfo.seat;
            this.myselfName = playerInfo.name;
            this.myselfScore = playerInfo.score;
        }

        var userid    = playerInfo.userid;    //用户id
        var name      = playerInfo.name;      //用户姓名
        var seat      = playerInfo.seat;      //用户椅子号
        var score     = playerInfo.score;     //用户积分
        var isready   = playerInfo.isready;   //用户是否准备
        var isoffline = playerInfo.isoffline; //用户是否掉线
        var islook    = playerInfo.islook;    //用户是否是旁观者
        var headicon  = playerInfo.headicon;
        

        var localseat = this.getLocalSeat(seat);
        var playernode = this.playerNodeList[localseat];
        var nodelogic = playernode.getComponent('RunfastPlayerNode');

        nodelogic.name = name;
        nodelogic.seat = seat;
        nodelogic.score = score;
        nodelogic.scoreShow = true;
        nodelogic.headShow = true;
        nodelogic.userid = userid;
        nodelogic.isoffline = isoffline;
        nodelogic.hasPlayer = true;
        nodelogic.loadHeadIcon(headicon);
    },

    /* 
        网络消息 
            有玩家离开 暂离
    */
    playerLeave(data) {
        let wleaveuser = data.wLeaveUser;
        let myselfNodelogic = this.myselfNode.getComponent("RunfastPlayerNode");
        if(wleaveuser == myselfNodelogic.seat)
        {
            cc.ll.player.roomid = 0;
            cc.ll.sceneMgr.changeScene('HallScene');
        }
        else {
            var localseat = this.getLocalSeat(wleaveuser);
            var playernode = this.playerNodeList[localseat];
            var nodelogic = playernode.getComponent('RunfastPlayerNode');
            nodelogic.isoffline = true;
            nodelogic.hasPlayer = false;
        }
    },

    /* 
        网络消息 
            有玩家退出 真正退出
    */
    playerExit(data) {
        let playernode = this.getPlayerNode(data.userid);
        if (playernode) {
            let nodelogic = playernode.getComponent('RunfastPlayerNode');
            nodelogic.initnode();
        }
        cc.ll.sceneMgr.changeScene('HallScene');
    },




    /* 
        网络消息 
            玩家积分变化
    */
    playerScoreChange(data) {
        let playernode = this.getPlayerNode(data.userid);
        if (playernode) {
            let nodelogic = playernode.getComponent('RunfastPlayerNode');
            nodelogic.setScore(data.score);
        }
    },

    /* 
        网络消息 
            有玩家准备
    */
    playerReady(data) {

        let playernode = this.getPlayerNode(data.userid);
        if (playernode) {
            let nodelogic = playernode.getComponent('RunfastPlayerNode');
            nodelogic.isReady = true;
        }
        if (cc.ll.player.userid == data.userid) {
            this.startBtnShow = false;
        }
    },

    ////////////////////////////////////////////////////////////////////////


    setStartUser(wStartUser) {

        for (let index = 0; index < this.playerNodeList.length; index++) {
           let playernode = this.playerNodeList[index].getComponent("RunfastPlayerNode");
           playernode.isBanker = false;
        }


        var wstartuser = this.getLocalSeat(wStartUser); 
        var playernode = this.playerNodeList[wstartuser];
        var playernodeLogic = playernode.getComponent('RunfastPlayerNode');
        playernodeLogic.isBanker = true;
    },
    /* 
        网络消息 
            游戏开始
    */
    gameStart(data) {
        var lCurRound           = data.lCurRound;
        var lMaxRound           = data.lMaxRound;
        var wStartUser          = data.wStartUser;
        var wCurrentUser        = data.wCurrentUser;
        var pais                = data.pais;
        
        this.lCurRound = lCurRound;
        this.lMaxRound = lMaxRound;

        var mycard = this.myselfCardNode.getComponent('MyCard');
        mycard.setCardData(data.pais, true);
        mycard.sortCard();

        for(var i = 0; i < RUNFAST_GAME_PLAYER_MAX; i++) {
            var playernode = this.playerNodeList[i];
            var playernodeLogic = playernode.getComponent('RunfastPlayerNode');
            playernodeLogic.isReady = false;
            playernodeLogic.cardCount = RunFastConfig.RUNFAST_PLAYER_MAX_CARD;
            playernodeLogic.cardCounterShow = true;
        }

        let myselfNodelogic = this.myselfNode.getComponent("RunfastPlayerNode");
        if(myselfNodelogic.seat == wCurrentUser) {
                this.chooseMenuShow = false;
                this.choosemenuwaitcatoon = true;
                this.outCardBtnEabled = this.canOutCard() == null? false : true;
                this._newturn = true;
                this.on3 = true;
                this._promptFunc = this.promptFunc();
                
        }
        
        this.startBtnShow       = false;
        this.myselfCardNodeShow = true;
        this.noOutBtnEabled = !this._newturn;
        this.wechatInviteBtnShow = false;



        this.setTurnSign(wCurrentUser);
        this.setStartUser(wStartUser);
    },


    setTurnSign(wCurrentUser) {

        for (let index = 0; index < this.playerNodeList.length; index++) {
           let playernode = this.playerNodeList[index].getComponent("RunfastPlayerNode");
           playernode.ismyturn = false;
        }

        var wLocalCurrentUser = this.getLocalSeat(wCurrentUser);
        var curnodelogic = this.playerNodeList[wLocalCurrentUser].getComponent("RunfastPlayerNode");
        curnodelogic.ismyturn = true;
    },

    /*
        网络消息 
       用户出牌
     */
    RunFast_OutCardSyn(data) {
        this.on3 = false;
        var wCurrentUser = data.wCurrentUser;
        var wOutCardUser = data.wOutCardUser;
        var cbCardData = data.cbCardData;
        var bOnlyOnecard = data.bOnlyOnecard;

        this.bOnlyOnecard = bOnlyOnecard;

        this._newturn = (wCurrentUser == wOutCardUser);

        this._outcards = cbCardData;

        var playernodeLogic = this.myselfNode.getComponent('RunfastPlayerNode');
        playernodeLogic.isReady = false;

        for (let index = 0; index < this.playerNodeList.length; index++) {
           let playernode = this.playerNodeList[index].getComponent("RunfastPlayerNode");
           playernode.clearOutCards();
         
        }

        let myselfNodelogic = this.myselfNode.getComponent("RunfastPlayerNode");

        if(wOutCardUser == myselfNodelogic.seat) {
            var mycard = this.myselfCardNode.getComponent('MyCard');
            mycard.removeSomeCards(cbCardData);
        }
        
        var wOutCardUserSeat = this.getLocalSeat(wOutCardUser);
        var nodelogic = this.playerNodeList[wOutCardUserSeat].getComponent("RunfastPlayerNode");
        
        nodelogic.outCards(cbCardData);
        var cardCount = nodelogic.cardCount;
        nodelogic.cardCount = cardCount - cbCardData.length;
        
        for(var i = 0; i < RunFastConfig.RUNFAST_GAME_PLAYER_MAX; i++) {
            this.alarmNodes[i].getComponent("AlarmClock").stopTime();
        }

        var wCurrentUserSeat = this.getLocalSeat(wCurrentUser);
        this.alarmNodes[wCurrentUserSeat].getComponent("AlarmClock").showTime(10);

        if(playernodeLogic.seat == wCurrentUser) {
            this.chooseMenuShow = true;
            this.outCardBtnEabled = this.canOutCard() == null? false : true;
            this._promptFunc = this.promptFunc();
            this.noOutBtnEabled = !this._newturn && !this._promptFunc;

            if(this.noOutBtnEabled) { 
                
                // this.onNoOutBtnClick();
            }
           
        }

       this.setTurnSign(wCurrentUser); 
       for(var i = 0; i < RUNFAST_GAME_PLAYER_MAX; i++) {
            this.playerNodeList[i].getComponent('RunfastPlayerNode').noOutSpriteShow = false;
        }

        this.playOutCardSound(cbCardData);


        cc.ll.AudioMgr.playOutCard();
    },

    playOutCardSound(cbCardData) {
        var cbCardCount = cbCardData.length;
        var cardType = RunFastCardLogic.GetCardType(cbCardData);
        switch(cardType) 
        {
            case RunFastConfig.RUNFAST_SINGLE:
            {
                var val = RunFastCardLogic.GetLogicVal(cbCardData[0]);
                cc.ll.AudioMgr.playAudio(AUDIO_BASE + RunFastConfig.Sound[RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_SINGLE][val - 3]);
                break;
            }
            case RunFastConfig.RUNFAST_DOUBLE:
            {
                var val = RunFastCardLogic.GetLogicVal(cbCardData[0]);
                cc.ll.AudioMgr.playAudio(AUDIO_BASE + RunFastConfig.Sound[RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_DOUBLE][val - 3]);
                break;
            }
            
            case RunFastConfig.RUNFAST_BOMB:
            {
                cc.ll.AudioMgr.playAudio(AUDIO_BASE + RunFastConfig.Sound[RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_BOMB]);
                break;
            }
            case RunFastConfig.RUNFAST_SINGLE_LINE:
            {
                cc.ll.AudioMgr.playAudio(AUDIO_BASE + RunFastConfig.Sound[RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_SINGLE_LINE]);
                break;
            }
            case RunFastConfig.RUNFAST_DOUBLE_LINE:
            {
                cc.ll.AudioMgr.playAudio(AUDIO_BASE + RunFastConfig.Sound[RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_DOUBLE_LINE]);
                break;
            }
            case RunFastConfig.RUNFAST_THREE:
            {
                break;
            }
            case RunFastConfig.RUNFAST_THREE_LINE:
            {
                cc.ll.AudioMgr.playAudio(AUDIO_BASE + RunFastConfig.Sound[RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_THREE][1]);
                
                break;
            }
            case RunFastConfig.RUNFAST_THREE_ADD_ONE:
            {
                if(cbCardCount == 4) {
                   
                }
                else {
                    cc.ll.AudioMgr.playAudio(AUDIO_BASE + RunFastConfig.Sound[RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_THREE][1]);
                }
                
                break;
            }
            case RunFastConfig.RUNFAST_THREE_ADD_TWO:
            {
                if(cbCardCount == 5) {
                    cc.ll.AudioMgr.playAudio(AUDIO_BASE + RunFastConfig.Sound[RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_THREE][0]);
                }
                else {
                    cc.ll.AudioMgr.playAudio(AUDIO_BASE + RunFastConfig.Sound[RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_THREE][1]);
                }
                
                break;
            }

        }
    },

    RunFast_DisbandSyn(data) {

        var cbDisbandUser = data.cbDisbandUser;
        // var test = false;
        // let myselfNodelogic = this.myselfNode.getComponent("RunfastPlayerNode");
        // for (var i = 0; i < cbDisbandUser.length; i++) {
        //     if(cbDisbandUser[i] == myselfNodelogic.seat) {
        //         test = true;
        //         break;
        //     }
        // };

        // if(test) return;

        this.runfastPopLayerShow = true;
        
      
        var test = this.runfastPopLayer.getComponent('RunfastPopLayer');
        test.setDisbandResult(cbDisbandUser, this);
    },

    RunFast_NoDisbandSyn(data) {
        var bNoDisbandUser = data.bNoDisbandUser;
        this.runfastPopLayerShow = false;
        var lseat                  = this.getLocalSeat(bNoDisbandUser);
        var runfastplayernode      = this.playerNodeList[lseat].getComponent("RunfastPlayerNode");
        cc.ll.msgbox.addMsg(runfastplayernode.name + "不同意解散");
    },



    /*
        网络消息 
       用户出牌
   */
    RunFast_PassCardSyn(data) {
        var cbTurnOver = data.cbTurnOver;
        var wCurrentUser = data.wCurrentUser;
        var wPassCardUser = data.wPassCardUser;
        this.on3 = false;
        this._newturn = cbTurnOver;
        
        
        var playernodeLogic = this.myselfNode.getComponent('RunfastPlayerNode');
        playernodeLogic.isReady = false;

        for(var i = 0; i < RunFastConfig.RUNFAST_GAME_PLAYER_MAX; i++) {
            this.alarmNodes[i].getComponent("AlarmClock").stopTime();
        }

        var wCurrentUserSeat = this.getLocalSeat(wCurrentUser);
        this.alarmNodes[wCurrentUserSeat].getComponent("AlarmClock").showTime(10);

        if(playernodeLogic.seat == wCurrentUser) {
            this.chooseMenuShow = true;
            this.outCardBtnEabled = this.canOutCard() == null? false : true;
            if(this._newturn) {
                this._promptFunc = this.promptFunc();
            }
            else {
                this._promptFunc = this.promptFunc(this._outcards);
            }

            this.noOutBtnEabled = !this._newturn && !this._promptFunc;

            if(this.noOutBtnEabled) { 
               
                this.onNoOutBtnClick();
            }


            
            
        }
       
        this.setTurnSign(wCurrentUser);


        for(var i = 0; i < RUNFAST_GAME_PLAYER_MAX; i++) {
            this.playerNodeList[i].getComponent('RunfastPlayerNode').noOutSpriteShow = false;
        }
        var lPassCardUser = this.getLocalSeat(wPassCardUser);
        this.playerNodeList[lPassCardUser].getComponent('RunfastPlayerNode').noOutSpriteShow = true;
        cc.ll.AudioMgr.playAudio(AUDIO_BASE + RunFastConfig.Sound[RunFastConfig.SoundType.SOUND_TYPE_MAN_RUNFAST_PASS][0]);
    },

   

    /* 
        网络消息 
        游戏庄主
    */
    bankerInfo(seat) {
        var lseat = this.getLocalSeat(seat);
        this.playerNodeList[lseat].isBanker = true;

       
        if(this._self_seat != seat) {
            this.callScoreMenuShow = true;
        }
    },

    /* 
        网络消息 
        游戏叫分
    */
    callScore(seat, score)   {
        var lseat = this.getLocalSeat(seat);
    },

    setPlayerData(data, showReady) {
        var userid       = data.userid;             //用户id
        var name         = data.name;               //用户姓名
        var seat         = data.seat;               //用户椅子号
        var score        = data.score;              //用户积分
        var isready      = data.isready;            //用户是否准备
        var isoffline    = data.isoffline;          //用户是否掉线
        var islook       = data.islook;             //用户是否是旁观者
        var lHandCount   = data.lHandCount;         //用户手牌数量
        var headicon     = data.headicon;       

        var lseat                  = this.getLocalSeat(seat);
        var runfastplayernode      = this.playerNodeList[lseat].getComponent("RunfastPlayerNode");

        runfastplayernode.name     = name;
        runfastplayernode.seat     = seat; 
        runfastplayernode.score    = score ;
        runfastplayernode.scoreShow = true;
        if(showReady) runfastplayernode.isReady  = isready;
        runfastplayernode.isoffline = isoffline;
        runfastplayernode.islook   = islook;
        runfastplayernode.headShow = true;
        runfastplayernode.userid = userid;
        runfastplayernode.cardCount = lHandCount;
        runfastplayernode.hasPlayer = true;
        if (isready && cc.ll.player.userid == data.userid) {
            this.startBtnShow = false;
            this.myselfScore = score; 
        }

        runfastplayernode.loadHeadIcon(headicon);
    },

    freeStatus(data) {
        var roomid         = data.roomid;                  //房间id
        var lCellScore     = data.lCellScore;              //基础积分
        var lCollectScore  = data.lCollectScore;           //

        var cbTurnScore    = data.cbTurnScore;             //所有玩家的积分信息
        var wCreateUser    = data.wCreateUser;             //创建者id
        var lCurRound      = data.lCurRound;               //当前局数
        var lMaxRound      = data.lMaxRound;               //总局数
        var lDisarmBomb    = data.lDisarmBomb;             //是否可以拆炸弹(1, 0)

        var bIsDisband     = data.bIsDisband;              //房间是否解散
        var cbDisbandUser  = data.cbDisbandUser;           //解散房间的用户
        var playerList     = data.playerList;              //用户列表

        for(var i = 0; i < playerList.length; i++) {
          this.setPlayerData(playerList[i], true);
        }

        this.roomid    = roomid;
        this.lCurRound = lCurRound;
        this.lMaxRound = lMaxRound;
        this._disarmbomb = lDisarmBomb;
        var player = this.getPlayerNode(wCreateUser);
        if(player) player.getComponent("RunfastPlayerNode").master = true;

        for (var seat in cbTurnScore) {
            var score               = cbTurnScore[seat];
            var localseat           = this.getLocalSeat(seat);
            var runfastplayernode   = this.playerNodeList[localseat].getComponent("RunfastPlayerNode");
            runfastplayernode.score = score;
        };

        if(bIsDisband) this.RunFast_DisbandSyn(data);
    },
    


    playStatus(data) {
        var roomid              = data.roomid;          //房间id
        var lCellScore          = data.lCollectScore;   //基础积分
        var lCollectScore       = data.lCollectScore;   //
        var cbTurnScore         = data.cbTurnScore;     //所有玩家的积分信息
        var wCreateUser         = data.wCreateUser;     //创建者椅子
        var lCurRound           = data.lCurRound;       //当前局数
        var lMaxRound           = data.lMaxRound;       //总局数
        var lDisarmBomb    = data.lDisarmBomb;             //是否可以拆炸弹(1, 0)

        var bIsDisband          = data.bIsDisband;      //房间是否解散
        var cbDisbandUser       = data.cbDisbandUser;   //解散房间的用户
        var playerList          = data.playerList;      //用户列表
        
        for(var i = 0; i < playerList.length; i++) {
          this.setPlayerData(playerList[i], false);
          var playernode        = this.playerNodeList[i];
          var playernodeLogic   = playernode.getComponent('RunfastPlayerNode');

          playernodeLogic.cardCounterShow = true;
        }
        
        this.roomid    = roomid;
        this.lCurRound = lCurRound;
        this.lMaxRound = lMaxRound;
        this._disarmbomb = lDisarmBomb;

        var wBankerUser      = data.wBankerUser;          //庄家用户
        var wCurrentUser     = data.wCurrentUser;         //当前玩家
        var wTurnUser        = data.wTurnUser;            //出牌玩家
        var cbTurnCardCount  = data.cbTurnCardCount;      //出牌数目
        var cbTurnCardData   = data.cbTurnCardData;       //出牌数据
        var cbHandCardData   = data.cbHandCardData;       //手上扑克
        var cbCollectScore   = data.cbCollectScore;       //所有玩家的积分信息
        var bOnlyOnecard     = data.bOnlyOnecard;

        this.bOnlyOnecard    = bOnlyOnecard;


        var player = this.getPlayerNode(wCreateUser);

        if(player) player.getComponent("RunfastPlayerNode").master = true;

        this.wechatInviteBtnShow = false;
        let myselfNodelogic = this.myselfNode.getComponent("RunfastPlayerNode");
        
        var mycard = this.myselfCardNode.getComponent('MyCard');
        mycard.setCardData(cbHandCardData);
        mycard.sortCard();

        this._newturn = (wTurnUser == INVALID_USER)?true: wTurnUser == wCurrentUser;

        //出牌,为了提示
        if(wTurnUser != INVALID_USER) {
            var lseat = this.getLocalSeat(wTurnUser);
            var playernode = this.playerNodeList[lseat];
            var playernodeLogic = playernode.getComponent('RunfastPlayerNode');
            playernodeLogic.outCards(cbTurnCardData);
            this._outcards = cbTurnCardData;
        }

        if(myselfNodelogic.seat == wCurrentUser) {
            this.chooseMenuShow = true;
            this.outCardBtnEabled = this.canOutCard() == null? false : true;
            this.startBtnShow       = false;
            this.myselfCardNodeShow = true;
           
            this._promptFunc = this.promptFunc();
            this.noOutBtnEabled = !this._newturn && !this._promptFunc;
            if(this.noOutBtnEabled) { 
                this.onNoOutBtnClick();
            }
        }

        

        if(bIsDisband) this.RunFast_DisbandSyn(data);


        this.setTurnSign(wCurrentUser);
        this.setStartUser(wBankerUser);
    },

    /* 
        网络消息 
        游戏小局结束
    */
    gameConclude(resultInfo)   {

        for(var i = 0; i < RunFastConfig.RUNFAST_GAME_PLAYER_MAX; i++) {
            this.alarmNodes[i].getComponent("AlarmClock").stopTime();
        }

        this.runfastPopLayerShow = true;
        
        var test = this.runfastPopLayer.getComponent('RunfastPopLayer');
        test.setRoundResult(resultInfo, this);

        var wOutCardUser = resultInfo.wOutCardUser;
        var cbCardData = resultInfo.cbCardData;

        for (let index = 0; index < this.playerNodeList.length; index++) {
           let playernode = this.playerNodeList[index].getComponent("RunfastPlayerNode");
           playernode.clearOutCards(); 
        }

        var loutcardseat = this.getLocalSeat(wOutCardUser);
        var playernodeLogic = this.playerNodeList[loutcardseat].getComponent('RunfastPlayerNode');
        playernodeLogic.cardCounterShow = true;
        playernodeLogic.cardCount = playernodeLogic.cardCount - cbCardData.length;

        let myselfNodelogic = this.myselfNode.getComponent("RunfastPlayerNode");

        if(wOutCardUser == myselfNodelogic.seat) {
            var mycard = this.myselfCardNode.getComponent('MyCard');
            mycard.removeSomeCards(cbCardData);
        }
        
        var wOutCardUserSeat = this.getLocalSeat(wOutCardUser);
        var nodelogic = this.playerNodeList[wOutCardUserSeat].getComponent("RunfastPlayerNode");
        nodelogic.outCards(cbCardData);
    },


    /* 
        网络消息 
        游戏大局结束
    */
    gameFinal(resultInfo)   {
        this.needNotice = false;
        for(var i = 0; i < RunFastConfig.RUNFAST_GAME_PLAYER_MAX; i++) {
            this.alarmNodes[i].getComponent("AlarmClock").stopTime();
        }

        this.runfastPopLayerShow = true;
        
        var test = this.runfastPopLayer.getComponent('RunfastPopLayer');
        test.setFinalResult(resultInfo, this);


        var wOutCardUser = resultInfo.wOutCardUser;
        var cbCardData = resultInfo.cbCardData;
        
        for (let index = 0; index < this.playerNodeList.length; index++) {
           let playernode = this.playerNodeList[index].getComponent("RunfastPlayerNode");
           playernode.clearOutCards();
         
        }

        let myselfNodelogic = this.myselfNode.getComponent("RunfastPlayerNode");

        if(wOutCardUser == myselfNodelogic.seat) {
            var mycard = this.myselfCardNode.getComponent('MyCard');
            mycard.removeSomeCards(cbCardData);
        }
        
        if(wOutCardUser != -1) {
            var wOutCardUserSeat = this.getLocalSeat(wOutCardUser);
            var nodelogic = this.playerNodeList[wOutCardUserSeat].getComponent("RunfastPlayerNode");
            nodelogic.outCards(cbCardData);
        }
        
    },

    /*游戏积分*/
    RunFast_ScoreChange(scoreInfo) {
        var cbScore = scoreInfo.cbScore;
        for(var i = 0; i < cbScore.length; i++) {
            var scoreInfo = cbScore[i];
            var wScoreUser = scoreInfo.wScoreUser;
            var lScore = scoreInfo.lScore;

            var lseat = this.getLocalSeat(wScoreUser);
            var nodelogic = this.playerNodeList[lseat].getComponent("RunfastPlayerNode");
            nodelogic.score = lScore;

            if(this._self_seat == wScoreUser) {
                this.myselfScore = lScore;
            }
        }
    },

    onChatSpriteClick(data) {
        // console.log("onChatSpriteClick........................", data);
        var Package = 
        {
            idx:data,
        }
        cc.ll.net.send('RunFast_ChatReq', Package);
    },

    onExpressionSpriteClick(data) {
        // console.log("onExpressionSpriteClick........................", data);
        var Package = 
        {
            idx:data,
        }
        cc.ll.net.send('RunFast_ExpressionReq', Package);
    },

    onChatBtnClick() {
        if(this.chatDialog) this.chatDialog.active = true;
    },

    RunFast_ChatSyn(data) {
        var seat = data.seat;
        var idx = data.idx;

        var lseat = this.getLocalSeat(seat);

        var pos = this.node.getChildByName("p" + lseat).getPosition();
        this.chatDialog.getComponent('ChatDialog').playChatAnimation(idx, pos);
    },

    RunFast_ExpressionSyn(data) {
        var seat = data.seat;
        var idx = data.idx;

        var lseat = this.getLocalSeat(seat);

        var pos = this.node.getChildByName("p" + lseat).getPosition();
        this.chatDialog.getComponent('ChatDialog').playExpressionAnimation(idx, pos);
    },

    runfast_player_exit(data) {
        this.playerLeave(data);
    }
});
