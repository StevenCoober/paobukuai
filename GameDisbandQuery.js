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
        okBtn: cc.Button,
        cancelBtn: cc.Button,
    },

    // use this for initialization
    onLoad: function () {
        if(this.okBtn) this.okBtn.node.on(cc.Node.EventType.TOUCH_END, this.onOk.bind(this));
        if(this.cancelBtn) this.cancelBtn.node.on(cc.Node.EventType.TOUCH_END, this.onCacel.bind(this));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onOk: function (event) {
        var Package = 
        {
            bIsAgree:true,
        };
        cc.ll.net.send('RunFast_DisbandQueryReq', Package);
        this.node.dispatchEvent(new cc.Event.EventCustom('onHidePop', true));
    },

    onCacel: function (event) {
        this.node.dispatchEvent(new cc.Event.EventCustom('onHidePop', true));
    }
});
