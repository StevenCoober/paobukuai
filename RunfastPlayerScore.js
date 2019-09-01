cc.Class({
    extends: cc.Component,

    properties: {
        Num: cc.Label,
        spriteFrame: [cc.SpriteFrame],

        score: {
            get() {
                return this.Num ? this.Num.string : 0
            },
            set(num) {
                if (this.Num) {
                    this.Num.string = num;
                };
            },
        },

        _type: 0,
        type: {
            get() {
                return this._type;
            },
            set(t) {
                let spr = this.getComponent(cc.Sprite);
                spr.spriteFrame = this.spriteFrame[t];
                this._type = t;
            }
        },
    },

    start() {
        let t = Math.ceil(Math.random() * 4) - 1;
        this.type = t < 0 ? 0 : t;
    },
    // update (dt) {},
});