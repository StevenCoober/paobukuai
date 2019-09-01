var RunFastCardLogic = require('./RunFastCardLogic');

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        cardCenter: cc.Node,
        cardCenterUp: cc.Node,
        // cardSpace: cc.Integer,
        cardSpace: {
            default: 30,
            type: cc.Integer,
        },
        PokerSpriteAtlas: cc.SpriteAtlas,
        myCardCatoon: cc.Node,
        WaitMoveEvents: {
            default: [],
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '等待',
        }

    },

    bindTouch: function () {
        // 添加单点触摸事件监听器 
        var canvas = cc.find('Canvas');
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
         canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    },

    // use this for initialization
    onLoad: function() {
        this.cardSprites = [];
        this.touchPrei = null;
    },

    onTouchBegan: function (event) {
        var touches = event.getTouches();

        var touchLoc = touches[0].getLocation();

        for(var i = this.cardSprites.length - 1; i >= 0; i--) {
            var cardsprite = this.cardSprites[i];
            if(cardsprite.node.getBoundingBoxToWorld().contains(touchLoc)) {
                this.touchPrei = i;
                if(cardsprite.node.active)this._onMyCardClick(cardsprite);
                break;
            }
        }
    },

    onTouchMove: function (event) {
        var touches = event.getTouches();

        var touchLoc = touches[0].getLocation();

        for(var i = this.cardSprites.length - 1; i >= 0; i--) {
            var cardsprite = this.cardSprites[i];
            if(cardsprite.node.getBoundingBoxToWorld().contains(touchLoc)) {
                if(i != this.touchPrei) {
                    this.touchPrei = i;
                     if(cardsprite.node.active)this._onMyCardClick(cardsprite);
                }

                break;
            }
        }
    },

    onTouchEnd: function (event) {
        var touches = event.getTouches();

        var touchLoc = touches[0].getLocation();
      
        for(var i = this.cardSprites.length - 1; i >= 0; i--) {
            var cardsprite = this.cardSprites[i];
            if(cardsprite.node.getBoundingBoxToWorld().contains(touchLoc)) {
                if(i != this.touchPrei) {
                    this.touchPrei = i;
                     if(cardsprite.node.active)this._onMyCardClick(cardsprite);
                }

                break;
            }
        }
        this.touchPrei = null;
    },

    start: function() {
        this.bindTouch();
    },

    removeAllCards: function() {
        if (!this.cardSprites) return;
        if (this.cardSprites.length != 0) {
            for (var i = 0; i < this.cardSprites.length; i++) {
                this.cardSprites[i].node.removeFromParent();
            };
            this.cardSprites = [];
        }
    },

    removeSomeCards: function(cbCardData) {
        for (var i = 0; i < cbCardData.length; i++) {
            var onecarddata = cbCardData[i];

            for (var j = 0; j < this.cardSprites.length; j++) {
                var onecardsprite = this.cardSprites[j];
                if (onecardsprite.carddata == onecarddata) {
                    onecardsprite.node.removeFromParent();
                    this.cardSprites.remove(onecardsprite);
                }
            }
        }

        this.sortCard();
    },

    setCardData: function(cardData, cartoon) {
        this.clearCardData();
        this.drawCard(cardData, cartoon);
    },

    clearCardData: function() {
        this.removeAllCards();
    },

    sortCard: function() {
        var canvas = cc.find('Canvas');
        
        var cardCenter = this.node.convertToNodeSpace(cc.pAdd(canvas.getPosition(), this.cardCenter.getPosition()));
        var cardCenterUp = this.node.convertToNodeSpace(cc.pAdd(canvas.getPosition(), this.cardCenterUp.getPosition()));
 
        var cardSprites = this.cardSprites;
        var len = cardSprites.length;
        if (len == 0) return;

        var preIndex, currentcarddata;
        for (var i = 1; i < len; i++) {
            preIndex = i - 1;
            currentcarddata = cardSprites[i].carddata;

            while (preIndex >= 0 && RunFastCardLogic.GetLogicVal(cardSprites[preIndex].carddata) < RunFastCardLogic.GetLogicVal(currentcarddata)) {
                cardSprites[preIndex + 1].carddata = cardSprites[preIndex].carddata;
                preIndex--;
            }

            cardSprites[preIndex + 1].carddata = currentcarddata;
        }

        var str = "";
        for (var i = 0; i < len; i++) {
            str = str + cardSprites[i].carddata + ",";
        }

        for (var i = 0; i < len; i++) {

            var cardSprite = cardSprites[i];
            cardSprite.upSprite();

            
            var cardspace = this.cardSpace;
            var posx = cardCenter.x - cardspace * (len - 1) / 2 + i * cardspace;

            cardSprite.cx = posx;
        };

    },

    drawCard: function(cardData, cartoon) {
        var canvas = cc.find('Canvas');
        var cardCenter = this.node.convertToNodeSpace(cc.pAdd(canvas.getPosition(), this.cardCenter.getPosition()));
        var cardCenterUp = this.node.convertToNodeSpace(cc.pAdd(canvas.getPosition(), this.cardCenterUp.getPosition()));
 
        var carddata = cardData;
        var cardspace = this.cardSpace;
        if (!carddata) return;
        if (!cardspace) return;

        var cardcenterpos = cardCenter;

        for (var i = 0; i < carddata.length; i++) {
            var onecarddata = carddata[i];

            var node = new cc.Node();

            this.node.addChild(node);

            var cardSprite = node.addComponent(cc.CardSprite);

            var posx = cardcenterpos.x - cardspace * (carddata.length - 1) / 2 + i * cardspace;

            cardSprite.cx = posx;

            cardSprite.cardpostype = cc.CardSprite.CardPosType.CARD_DOWN;

            cardSprite.carddata = onecarddata;

            cardSprite.cardCenter = cardCenter;

            cardSprite.cardCenterUp = cardCenterUp;

            cardSprite.PokerSpriteAtlas = this.PokerSpriteAtlas;

            cardSprite.updateAll();

            // node.on(cc.Node.EventType.TOUCH_END, this._onMyCardClick.bind(this));

            this.cardSprites.push(cardSprite);


            if(cartoon) node.active = false;
        };

        if(cartoon) {
            if(this.myCardCatoon) this.myCardCatoon.getComponent('MyCardCartoon').loadAni();
        }
    },

    onCartoon(idx) {
        var cardsprite = this.cardSprites[idx];
        if(cardsprite) cardsprite.node.active = true;
        if(idx >= this.cardSprites.length - 1) cc.Component.EventHandler.emitEvents(this.WaitMoveEvents, i);
    },

    _onMyCardClick: function(cardsprite) {
        // var target = event.target;
        // var cardsprite = target.getComponent(cc.CardSprite);
        cardsprite.reversePosType();
        this.node.dispatchEvent(new cc.Event.EventCustom('cardDownSprites', true));
    },

    getUpCardSprites: function() {
        var sprites = [];
        for (var i = 0; i < this.cardSprites.length; i++) {
            var cardsprite = this.cardSprites[i];
            if (cardsprite.cardpostype == cc.CardSprite.CardPosType.CARD_UP) {
                sprites.push(cardsprite);
            }
        }

        if (sprites.length == 0) return null;

        return sprites;
    },

    getCardData: function() {
        var cardData = [];
        for (var i = 0; i < this.cardSprites.length; i++) {
            var carddata = this.cardSprites[i].carddata;
            cardData.push(carddata);
        };

        if (cardData.length == 0) return null;
        return cardData;
    },

    cardDownSprites: function(cardData) {
        if (cardData) {
            for (var i = 0; i < cardData.length; i++) {
                var carddata = cardData[i];
                for (var j = 0; j < this.cardSprites.length; j++) {
                    var cardsprite = this.cardSprites[j];
                    var scarddata = (cardsprite.carddata & 0x0f);
                    if (scarddata == carddata) {
                        if (cardsprite.cardpostype == cc.CardSprite.CardPosType.CARD_DOWN) continue;
                        cardsprite.upPosType(cc.CardSprite.CardPosType.CARD_DOWN);
                        break;
                    }
                };
            };
        } else {
            for (var i = 0; i < this.cardSprites.length; i++) {
                var cardsprite = this.cardSprites[i];
                cardsprite.upPosType(cc.CardSprite.CardPosType.CARD_DOWN);
            }
        }
        // this.cardGray();
    },


    cardUpSprites: function(cardData) {
        if (cardData) {
            for (var i = 0; i < cardData.length; i++) {
                var carddata = cardData[i];
                for (var j = 0; j < this.cardSprites.length; j++) {
                    var cardsprite = this.cardSprites[j];
                    var scarddata = (cardsprite.carddata & 0x0f);
                    
                    if (scarddata == (carddata & 0x0f)) {
                        if (cardsprite.cardpostype == cc.CardSprite.CardPosType.CARD_UP) continue;
                        cardsprite.upPosType(cc.CardSprite.CardPosType.CARD_UP);
                        break;
                    }
                };
            };
        } else {
            for (var i = 0; i < this.cardSprites.length; i++) {
                var cardsprite = this.cardSprites[i];
                cardsprite.upPosType(cc.CardSprite.CardPosType.CARD_UP);
            }
        }
    },



    getCardDataByCardSprites: function(cardSprites) {
        var carddatas = [];
        for (var i = 0; i < cardSprites.length; i++) {
            var carddata = cardSprites[i].carddata;
            carddatas.push(carddata);
        };

        if (carddatas.length == 0) return null;

        return carddatas;
    },


    cardBroze: function (carddata) {
        var selectColor = new cc.Color(122, 122, 122);

        // for(var i = 0; i < carddata.length; i++) {
        //     if() {
                
        //     }
        // }
        
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});