// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        cardCenter: {
            default:null,
            type: cc.Node,
            tooltip: CC_DEV && '终节点',
        },

        cardSpace: {
            default: 30,
            tooltip: CC_DEV && '终节点11',
        },

        cscale: {
            default: 0.5,
            tooltip: CC_DEV && '终节点12',
        },

        ctime: {
            default: 0.3,
            tooltip: CC_DEV && '终节点12',
        },

        accountEdit: cc.EditBox,

        PokerSpriteAtlas: cc.SpriteAtlas,

        moveEvents: {
            default: [],
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '等待',
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    loadAni() {
        if(!this.cardCenter) return;

        var cardCenter = cc.pSub(this.cardCenter.getPosition(), this.node.getPosition());

        this.cardSprites = [];
        var cardLen = 16; 
        for (var i = 0; i < cardLen; i++) {
            
            var node = new cc.Node();

            this.node.addChild(node);

            var cardSprite = node.addComponent(cc.CardSprite);

            cardSprite.cscale = this.cscale;

            cardSprite.cardpostype = cc.CardSprite.CardPosType.CARD_DOWN;

            cardSprite.PokerSpriteAtlas = this.PokerSpriteAtlas;

            cardSprite.cname = "p";

            cardSprite.upSprite();

            this.cardSprites.push(cardSprite);

            var postox   = - (Math.floor(cardLen/2) * this.cardSpace)  + (i * this.cardSpace);

            var postoy   = cardCenter.y;

            var delaytime = cc.delayTime(this.ctime*i);

            var moveto   = cc.moveTo(this.ctime, cc.p(postox, postoy));

            var callfunc = cc.callFunc(this.onMoveEnd, this, i);

            var action2 = cc.spawn(moveto, cc.scaleTo(this.ctime, 1.0));

            cardSprite.node.runAction(cc.sequence(delaytime, action2, callfunc));
        };
    },

    onMoveEnd(node, i) {
        
        cc.Component.EventHandler.emitEvents(this.moveEvents, i);

        if(i == this.cardSprites.length) {
             for(var i = 0; i < this.cardSprites.length; i++) {
                this.cardSprites[i].node.removeAllChildren();
             }
             this.cardSprites = [];
        }
        else {
            this.cardSprites[i].node.active = false;
        }
    },

    start () {

    },

    test() {
        this.ctime = parseFloat(this.accountEdit.string);
        this.loadAni();
    }

    // update (dt) {},
});
