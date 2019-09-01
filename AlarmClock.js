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

     
        alarmLbl: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.timer = -1;
       
    },

    stopTime() {
        this.unscheduleAllCallbacks();
        this.node.active = false;
    },

    showTime(sec) {

        this.node.active = true;
        this.alarmLbl.string = "" + sec;
        this.timer = this.schedule(this.timeCall, 1);
    },

    timeCall() {
        var timeval = parseInt(this.alarmLbl.string);
        if(timeval <= 0) {
            this.unscheduleAllCallbacks();
            this.node.active = false;
        }
        else if(this.alarmLbl) {
            this.alarmLbl.string = "" + timeval - 1;
        }
    }

    // update (dt) {},
});
