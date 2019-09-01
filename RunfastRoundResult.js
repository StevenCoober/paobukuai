var fox = 7;

cc.Class({
    extends: cc.Component,

    properties: {

        playerResultNodes:
        {
            default:[],
            type: [cc.Node],
            tooltip: CC_DEV && '信息节点',
        },

        wechatShareBtn: 
        {
            default:null,
            type: cc.Button,
            tooltip: CC_DEV && '微信分享按钮',
        },

        theEndBtn:
        {
            default:null,
            type: cc.Button,
            tooltip: CC_DEV && '结束按钮',
        },

        retArrowBtn:
        {
            default:null,
            type: cc.Button,
            tooltip: CC_DEV && '结束按钮',
        },

        winFlagBg:
        {
            default:null,
            type:cc.Node,
            tooltip: CC_DEV && '黑白',
        },

        loaseFlagBg:
        {
            default:null,
            type:cc.Node,
            tooltip: CC_DEV && '黑白',
        },

        PokerSpriteAtlas: cc.SpriteAtlas,
    },

    // use this for initialization
    onLoad: function () {
        
    },

    start() {
        if(this.wechatShareBtn) this.wechatShareBtn.node.on(cc.Node.EventType.TOUCH_END, this.onWecharShareBtnClick.bind(this));
        if(this.theEndBtn) this.theEndBtn.node.on(cc.Node.EventType.TOUCH_END, this.onStartBtnClick.bind(this));
        if(this.retArrowBtn) this.retArrowBtn.node.on(cc.Node.EventType.TOUCH_END, this.onStartBtnClick.bind(this));
    },

    onWecharShareBtnClick: function () {
        cc.ll.wechat.shareWithFriendImg('dongxiang');
    }, 

    onStartBtnClick: function () {
	    cc.ll.AudioMgr.playDefaultBtn();
        this.node.dispatchEvent(new cc.Event.EventCustom('Round-Start', true));
    },

    hideAllPlyerNode: function() {
        for (var i = 0; i < this.playerResultNodes.length; i++) {
            this.playerResultNodes[i].active = false;
        }
    },

    setResult: function (resultInfo, runfastLogic) {
        // this.hideAllPlyerNode();

        // var lWinner             = resultInfo.lWinner;
        // var lBombCount          = resultInfo.lBombCount;
        // var lCurScore           = resultInfo.lCurScore;
        // var cbHandCardData      = resultInfo.cbHandCardData;

        // var resultinfocount     = Object.getOwnPropertyNames(lBombCount).length;

        // for (var i = 0; i < resultinfocount; i++) {

        //     var localseat = runfastLogic.getLocalSeat(i);

        //     var playernode = runfastLogic.playerNodeList[localseat];

        //     var nodelogic = playernode.getComponent('RunfastPlayerNode');

            
        //     var onePlayerInfo = this.playerResultNodes[i];

        //     if(i == lWinner) {
        //         onePlayerInfo.getChildByName('Playerlostbg').active = false;
        //         onePlayerInfo.getChildByName('Playerwinbg').active  = true;
        //     }else {
        //         onePlayerInfo.getChildByName('Playerlostbg').active = true;
        //         onePlayerInfo.getChildByName('Playerwinbg').active  = false;
        //     }

        //     if(!onePlayerInfo) continue;
        //     onePlayerInfo.active = true;

        //     //昵称
        //     var nicknameLbl = onePlayerInfo.getChildByName('nicknameLbl');
        //     nicknameLbl.getComponent(cc.Label).string = nodelogic.name;

        //     //积分
        //     var scoreLbl = onePlayerInfo.getChildByName('score');
        //     scoreLbl.getComponent(cc.Label).string = "" + lGameScore[i];

        //     var zhuangImg = onePlayerInfo.getChildByName('zhuang');
        //     if (zhuangImg) zhuangImg.active = nodelogic.isBanker;

        //     //剩余牌
        //     var leftCardsNode = onePlayerInfo.getChildByName('leftCardsNode');
        //     leftCardsNode.removeAllChildren();
        //     var cbhandcarddata = cbHandCardData[i];
            
        //     var cardSprites = [];

        //     for (var j = 0; j < cbhandcarddata.length; j++) {
        //         var onecarddata = cbhandcarddata[j];

        //         var node = new cc.Node();

        //         leftCardsNode.addChild(node);

        //         var cardSprite = node.addComponent(cc.CardSprite);

        //         var posy = - Math.floor(j/fox) * 25;

        //         cardSprite.cscale = 0.4;

        //         cardSprite.cardpostype = cc.CardSprite.CardPosType.CARD_DOWN;

        //         cardSprite.carddata = onecarddata;

        //         cardSprite.PokerSpriteAtlas = this.PokerSpriteAtlas;

        //         cardSprite.upSprite();

        //         cardSprite.cy = posy;

        //         cardSprites.push(cardSprite);
        //     }
        //     this.sortRoundResultCard(cardSprites);
        // };

        this.hideAllPlyerNode();

        var lWinner             = resultInfo.lWinner;         //本局赢的玩家
        var lBombCount          = resultInfo.lBombCount;      //本局炸弹统计
        var lCurScore           = resultInfo.lCurScore;       //本局分数
        var lGameScore          = resultInfo.lGameScore;      //最终分数
        var cbWinCount          = resultInfo.cbWinCount;      //赢的局数
        var cbLoseCount         = resultInfo.cbLoseCount;     //输的局数
        var PlayerStatus        = resultInfo.PlayerStatus;    //玩家状态
        var cbHandCardData      = resultInfo.cbHandCardData;  //扑克列表

        var resultinfocount = Object.getOwnPropertyNames(lGameScore).length;

        if(runfastLogic._self_seat == lWinner) {
            this.winFlagBg.active = true;
            this.loaseFlagBg.active = false;
        }
        else {
            this.winFlagBg.active = false;
            this.loaseFlagBg.active = true;
        }

        for (var i = 0; i < resultinfocount; i++) {
            var localseat = runfastLogic.getLocalSeat(i);

            var onelBombCount           = lBombCount[i];
            var onelcurscore            = lCurScore[i];
            var onelgamescore           = lGameScore[i];
            var onecbwincount           = cbWinCount[i];
            var onecblosecount          = cbLoseCount[i];
            var onecbhandcarddata       = cbHandCardData[i];

            console.log("onelgamescore", onelgamescore, "onecbwincount", onecbwincount,"onecblosecount", onecblosecount);

            var playernode = runfastLogic.playerNodeList[localseat];
            var nodelogic = playernode.getComponent('RunfastPlayerNode');

            var onePlayerInfo = this.playerResultNodes[i];
            onePlayerInfo.active = true;

            if(lWinner) {
               if(i == lWinner) {
                    onePlayerInfo.getChildByName('Playerlostbg').active = false;
                    onePlayerInfo.getChildByName('Playerwinbg').active  = true;
                } else {
                    onePlayerInfo.getChildByName('Playerlostbg').active = true;
                    onePlayerInfo.getChildByName('Playerwinbg').active  = false;
                }
            }
            else {
                onePlayerInfo.getChildByName('Playerlostbg').active = false;
                onePlayerInfo.getChildByName('Playerwinbg').active  = true;
            }
            

            //昵称
            var nicknameLbl = onePlayerInfo.getChildByName('nicknameLbl');
            nicknameLbl.getComponent(cc.Label).string = nodelogic.name;

            //id
            var idLbl = onePlayerInfo.getChildByName('idLbl');
            idLbl.getComponent(cc.Label).string = "ID:" + nodelogic.userid;

            //积分
            var scoreLbl = onePlayerInfo.getChildByName('Leiji_defen');
            scoreLbl.getComponent(cc.Label).string = "" + onelgamescore ;

            var wincountLbl = onePlayerInfo.getChildByName('Win_jiesuan');
            wincountLbl.getComponent(cc.Label).string = "" + onecbwincount;

            var losecountLbl = onePlayerInfo.getChildByName('Lose_jiesuan');
            losecountLbl.getComponent(cc.Label).string = "" + onecblosecount;

            var zhadanLbl = onePlayerInfo.getChildByName('Zhadan_jiesuan');
            zhadanLbl.getComponent(cc.Label).string = "" + onelBombCount;
            
            onePlayerInfo.getChildByName('Fangzhu').active = nodelogic.master;

            var Benju_defen = onePlayerInfo.getChildByName('Benju_defen');
            Benju_defen.getComponent(cc.Label).string = "" + onelcurscore ;

            onePlayerInfo.getChildByName('personage_head').getComponent(cc.Sprite).spriteFrame = nodelogic.HeadIcon.spriteFrame;


            //剩余牌
            var leftCardsNode = onePlayerInfo.getChildByName('leftCardsNode');
            leftCardsNode.removeAllChildren();
            
            var cardSprites = [];

            for (var j = 0; j < onecbhandcarddata.length; j++) {
                var onecarddata = onecbhandcarddata[j];

                var node = new cc.Node();

                leftCardsNode.addChild(node);

                var cardSprite = node.addComponent(cc.CardSprite);

                var posy = - Math.floor(j/fox) * 22;

                cardSprite.cscale = 0.2;

                cardSprite.cardpostype = cc.CardSprite.CardPosType.CARD_DOWN;

                cardSprite.carddata = onecarddata;

                cardSprite.PokerSpriteAtlas = this.PokerSpriteAtlas;

                cardSprite.upSprite();

                cardSprite.cy = posy;

                cardSprites.push(cardSprite);
            }
            this.sortRoundResultCard(cardSprites);
        }
    },

    sortRoundResultCard: function(cardSprites) {
        
        var len = cardSprites.length;
        if (len == 0) return;

        var preIndex, currentcarddata;
        for (var i = 1; i < len; i++) {
            preIndex = i - 1;
            currentcarddata = cardSprites[i].carddata;

            while (preIndex >= 0 && (cardSprites[preIndex].carddata & 0x0f) > (currentcarddata & 0x0f)) {
                cardSprites[preIndex + 1].carddata = cardSprites[preIndex].carddata;
                preIndex--;
            }

            cardSprites[preIndex + 1].carddata = currentcarddata;
        }

        for (var i = 0; i < len; i++) {
            var posx;
            posx = (i%fox) * 30;
            var cardSprite = cardSprites[i];
            cardSprite.upSprite();

            cardSprite.cx = posx;
        };

    },
});
