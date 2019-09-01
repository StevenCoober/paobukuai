var CardPosType = cc.Enum({
    NONE:0,
    CARD_UP:1,
    CARD_DOWN:2,
});

var tempx = 0;

var CardSprite = cc.Class({
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
        _broze: false,
        cx: {
            get() {
                return this.node.x;
            },
            set(px) {
                this.node.setPositionX(px);
            }
        },
	cy: {
		get() {
			return this.node.y;
		},
		set(py) {
			this.node.setPositionY(py);
		}
	    },

    cscale: {
        get() {
            return this.node.scale;
        },

        set(scale) {
            this.node.scale = scale;
        }
        },
        cname: {
            get() {
                return this.cardName;
            },

            set(cardName) {
                this.cardName = cardName;
            }
        },

        broze: {
            get() {
                return this._broze;
            },

            set(b) {
                this._broze = b;

                if(b) {
                    this.node.color = new cc.Color(122, 122, 122);
                }
                else {
                    this.node.color = new cc.Color(255, 255, 255);
                }
            }
        },


    PokerSpriteAtlas: cc.SpriteAtlas,

    },
    extends: cc.Sprite,

    ctor: function () {
        this.cardCenter = null;
        this.cardCenterUp = null;
        this.cardpostype = null;
        this.carddata = null;
        this.cardName = "";
    },

   

    reversePosType: function() {
        if(this.cardpostype == CardPosType.CARD_UP) {
            this.cardpostype = CardPosType.CARD_DOWN;
        }
        else if(this.cardpostype == CardPosType.CARD_DOWN) {
            this.cardpostype = CardPosType.CARD_UP;
        }
        this.upPosType();
    },

    upPosType: function (cardPosType) {
        if(!this.cardCenterUp) return;
        if(!this.cardCenter) return;

        if(cardPosType)  {
            this.cardpostype = cardPosType;
        }

        var cardcenterpos = cc.p(this.cardCenter.x, this.cardCenter.y);
        var cardcenteruppos = cc.p(this.cardCenterUp.x, this.cardCenterUp.y);

        if(this.cardpostype == CardPosType.CARD_UP) {
            this.node.setPositionY(cardcenteruppos.y);
        }
        else {
            this.node.setPositionY(cardcenterpos.y);
        }
    },

    upSprite: function () {
        if(this.carddata) {
            var cardcolor = (this.carddata & 0xf0) >> 4;
            var cardval = this.carddata & 0x0f;
            if(this.PokerSpriteAtlas) this.spriteFrame = this.PokerSpriteAtlas.getSpriteFrame("p{0}_{1}".format(cardcolor, cardval));
        }
        else if(this.cardName != "") {
             if(this.PokerSpriteAtlas) this.spriteFrame = this.PokerSpriteAtlas.getSpriteFrame(this.cardName);
        }

        
        // cc.loader.loadRes("Common/poker", cc.SpriteAtlas, function (cardsprite, cardcolor, cardval) {
        //     return function (error, atlas) {
        //         if (!error) {
        //             // console.log("cardcolor", cardcolor, "cardval", cardval, (cardcolor << 4) + cardval, ss);
        //             cardsprite.spriteFrame = atlas.getSpriteFrame("p{0}_{1}".format(cardcolor, cardval));
        //         }
        //     }
        // } (this, cardcolor, cardval));
    },

    updateAll: function () {
        this.upPosType();
        this.upSprite();
    },


});

CardSprite.CardPosType = CardPosType;

cc.CardSprite = module.exports = CardSprite;
