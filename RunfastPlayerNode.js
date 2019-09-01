var RunfastConfig = require('./RunfastConfig');
var RunFastCardLogic = require('./RunFastCardLogic');

var RUNFAST_GAME_PLAYER_MAX = RunfastConfig.RUNFAST_GAME_PLAYER_MAX

var RUNFAST_PLAYER_MAX_CARD = RunfastConfig.RUNFAST_PLAYER_MAX_CARD


String.prototype.format = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(s, i) {
        return args[i];
    });
}
var OUTCARD_ZORDER = 20002
var RunfastConfig = require('./RunfastConfig');
cc.Class({
    extends: cc.Component,

    properties: {
        NameLabel: cc.Label,
       
        HeadIcon: cc.Sprite,
        OfflineFlag: cc.Node,
        MasterFlag: cc.Node,
        ReadyFlag: cc.Node,
        BankerFlag: cc.Node,
        LightSpr: cc.Sprite,

        _seat: 0,
        _score: 0,
        _niutype: RunfastConfig.NIUNIU_INVALIDE,
 
        outCardsPosBegin: {
            default: cc.p(0, 0),
            tooltip: CC_DEV && '出牌位置始节点',
        },

        outCardsPosEnd: {
            default: cc.p(0, 0),
            tooltip: CC_DEV && '出牌终节点',
        },

        CardSprites: {
            default: [],
            type: cc.Sprite,
            tooltip: CC_DEV && 'CardSprites'
        },

        _userid: 0,
        userid: {
            get() {
                return this._userid;
            },
            set(id) {
                this._userid = id;
            }
        },

        master: {
            get() {
                return this.MasterFlag ? this.MasterFlag.active : false;
            },
            set(flag) {
                if (this.MasterFlag) this.MasterFlag.active = flag;
            }
        },

        isoffline: {
            get() {
                return this.OfflineFlag ? this.OfflineFlag.active : false;
            },
            set(flag) {
                if (this.OfflineFlag) this.OfflineFlag.active = flag;
            }
        },

        isReady: {
            get() {
                return this.ReadyFlag ? this.ReadyFlag.active : false;
            },
            set(flag) {
                if (this.ReadyFlag) this.ReadyFlag.active = flag;
                if(flag) {
                    var a = 1;
                }
            }
        },

        ismyturn: {
            get() {
                return this.LightSpr ? this.LightSpr.node.active : false;
            },
            set(flag) {
                if (this.LightSpr) this.LightSpr.node.active = flag;
            }
        },

        isBanker: {
            get() {
                return this.BankerFlag ? this.BankerFlag.active : false;
            },
            set(flag) {
                if (this.BankerFlag) this.BankerFlag.active = flag;
            }
        },

        headShow: {
            get() {
                return this.HeadIcon ? this.HeadIcon.node.active : false;
            },
            set(flag) {
                if (this.HeadIcon) this.HeadIcon.node.active = flag;
            }
        },
        ScoreLabel: cc.Label,
        score: {
            get() {
                return this._score;
            },
            set(flag) {
                this._score = flag;
                if (this.ScoreLabel) this.ScoreLabel.string = flag.toString();
            }
        },
        scoreShow: {
            get() {
                return this.ScoreLabel ? this.ScoreLabel.node.active : false;
            },
            set(flag) {
                if (this.ScoreLabel) {
                    this.ScoreLabel.node.active = flag;
                }
            }
        },
        name: {
            override: true,
            get() {
                if (this.NameLabel) return this.NameLabel.string;
                return "";
            },
            set(what) {
                if (this.NameLabel) this.NameLabel.string = what;
            }
        },

        noOutSprite: cc.Sprite,
        noOutSpriteShow: {
            get() {
                return this.noOutSprite ? this.noOutSprite.node.active : false;
            },
            set(flag) {
                if (this.noOutSprite) {
                    this.noOutSprite.node.active = flag;
                }
            }
        },

        cardCounterBg: {
            default: null,
            type: cc.Sprite,
            tooltip: CC_DEV && '统计'
        },

        cardCounterLable: {
            default: null,
            type: cc.Label,
            tooltip: CC_DEV && '统计11'
        },

        cardCount: {
            get() {
                return this.cardCounterLable ? Math.floor(this.cardCounterLable.string) : "";
            },
            set(flag) {
                if (this.cardCounterLable) {
                    this.cardCounterLable.string = "" + flag;
                }
            }
        },

        cardCounterShow: {
            get() {
                return this.cardCounterLable ? this.cardCounterLable.node.active : false;
            },
            set(flag) {
                if (this.cardCounterLable) {
                    this.cardCounterLable.node.active = flag;
                }

                if(this.cardCounterBg) {
                    this.cardCounterBg.node.active = flag;
                }
            }
        },

        seat: {
            get() {
                return this._seat;
            },
            set(what) {
                this._seat = what;
            }
        },

        PokerSpriteAtlas: cc.SpriteAtlas,
    },

    onLoad: function() {
        this.userid = 0;
        this.isReady = false;
        this.master = false;
        this.isoffline = false;
        this.hasPlayer = false;
        this.islook = false;
        this.ismyturn = false;
        this.isBanker = false;
        this.headShow = false;
        this.score = 0;
        this.scoreShow = false;
        this.noOutSpriteShow = false;
        this.cardCounterShow = false;
        this.seat = -1;
        this.outCardSprites = [];
    },

    roundStart: function() {
        this.isReady = false;
        this.ismyturn = false;
        this.isBanker = false;
        this.scoreShow = true;
        this.noOutSpriteShow = false;
        this.cardCounterShow = false;
        this.cardCount = 0;
        this.clearOutCards();
    },

    start: function() {

    },

    initnode: function() {
        this.isoffline = true;
    },
    setScore: function(score) {
        this.ScoreLabel.string = score;
    },

    loadHeadIcon: function(path) {
        
        if (path != null && path.length > 0){
            var imgurl = path + '?player=player.jpg';
            let self = this;
            cc.loader.load(imgurl, function (err, texture) {
                if(err){
                    return;
                }
                self.HeadIcon.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    },

    clearOutCards: function() {
        if (this.outCardSprites == null) return;

        for (var i = 0; i < this.outCardSprites.length; i++) {
            var oneOutCardSprite = this.outCardSprites[i];
            oneOutCardSprite.node.removeFromParent();
        }
        this.outCardSprites = [];
    },

    sortOutCards: function (cbCardData) {
        var cbOutCards = [];

        var analyseresult = RunFastCardLogic.AnalysebCardData(cbCardData);
        for (var i = 3; i >= 0; i--) {
            for (var j = 0; j < analyseresult.cbBlockCount[i] * (i + 1); j++) {
                cbOutCards.push(analyseresult.cbCardData[i][j]);
            }  
        }
        
        return cbOutCards;
    },
    
    outCards: function(cbCardData) {

        var cbCardData = this.sortOutCards(cbCardData);
        this.clearOutCards();
        var test = cc.pNormalize(cc.pSub(this.outCardsPosEnd, this.outCardsPosBegin));
        var dir;
        if(test.x == 1) {
            dir = 1;
            
        }
        else if(test.x == -1) {
            dir = -1;
           
        }
        else if(test.y = 1){
            dir = 0;
          
        }

        for (var i = 0; i < cbCardData.length; i++) {
            var onecarddata     = cbCardData[i];
            var node            = new cc.Node();
            node.zIndex         = OUTCARD_ZORDER;
            this.node.addChild(node);
            this.node.setGlobalZOrder(-1);

            var cscale          = 0.5;
            var cardspace       = 60 * cscale;
            var cardcenterpos   = this.outCardsPosBegin;
            var cardsprite      = node.addComponent(cc.CardSprite);

            var offsetx = 0;
            var offsety = 0;
            if(dir == 1) {
                offsetx             =  i * cardspace;
            }
            else if(dir == -1) {
                offsetx             =  -(cbCardData.length - 1 - i) * cardspace;
            }
            else if(dir == 0) {
                offsetx             =  - cardspace * (cbCardData.length - 1) / 2 + i * cardspace;
            }
            

            var posx            = cardcenterpos.x + offsetx;
            var posy            = this.outCardsPosBegin.y;


            cardsprite.cx       = posx;
            cardsprite.cy       = posy;


            cardsprite.cscale    = cscale;
            
            cardsprite.PokerSpriteAtlas = this.PokerSpriteAtlas;

            cardsprite.carddata = onecarddata;
            cardsprite.updateAll();

            this.outCardSprites.push(cardsprite);

            var startPoint = cc.p(this.outCardsPosBegin);
            var endPoint = cc.p(this.outCardsPosEnd);
            endPoint.x = endPoint.x + offsetx;

            var angle = 90;
            var height = 60;
            // 把角度转换为弧度  
            var radian = angle*cc.macro.RAD;
            // 第一个控制点为抛物线左半弧的中点  
            var q1x = startPoint.x+(endPoint.x - startPoint.x)/4.0;  
            var q1 = cc.p(q1x, height + startPoint.y+Math.cos(radian)*q1x);         
            // 第二个控制点为整个抛物线的中点  
            var q2x = startPoint.x + (endPoint.x - startPoint.x)/2.0;  
            var q2 = cc.p(q2x, height + startPoint.y+Math.cos(radian)*q2x);  

            var bezier = cc.bezierTo(0.2, [q1, q2, endPoint]);
            bezier.easing(cc.easeIn(1));

            cardsprite.node.runAction(bezier);
        }
    }

    // setNiuType: function (niutype) {
    //             this._niutype = niutype;
    //             console.log("+++++++++++", this.NiuSpr, niutype);
    //             if (!this.NiuSpr) return;

    //             if (niutype != RunfastConfig.NIUNIU_INVALIDE) {
    //                     cc.loader.loadRes("Runfast/GameRunfastPage", cc.SpriteAtlas, function (NiuSpr) {
    //                         return function (error, atlas) {
    //                             console.log("error",error);
    //                             if (!error) {
    //                                 NiuSpr.spriteFrame = atlas.getSpriteFrame("txt_niu{0}".format(niutype));
    //                                 NiuSpr.node.active = true;
    //                             }
    //                         }
    //                     }(this.NiuSpr, niutype));
    //             }
    //         }
});