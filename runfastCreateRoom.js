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
    },

    // use this for initialization
    onLoad: function () {
        this.playtimesConfig = 6;
        this.disarmbombConfig = 0;
    },

    getConfigs: function () {
        return {
            playtimesConfig: this.playtimesConfig,
            disarmbombConfig: this.disarmbombConfig
        }
    },

    onSelectToggle(e, d) {
        if (d == 0) {
            this.playtimesConfig = 6;
        }
        else if (d == 1) {
            this.playtimesConfig = 12;
        }
        else if (d == 3) {
            this.disarmbombConfig = 1;
        }
        else if (d == 4) {
            this.disarmbombConfig = 0;
        }
       
        cc.ll.AudioMgr.playDefaultBtn();
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
