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
        RunfastRoundResultNode: cc.Node,

        RunfastRoundResultNodeShow: {
            get() {
                if (this.RunfastRoundResultNode) return this.RunfastRoundResultNode.active;

                return false;
            },
            set(bshow) {
                if (this.RunfastRoundResultNode) this.RunfastRoundResultNode.active = bshow;
            },
            tooltip: CC_DEV && '结束节点显示',
        },

        RunfastEndResultNode: cc.Node,

        RunfastEndResultNodeShow: {
            get() {
                if (this.RunfastEndResultNode) return this.RunfastEndResultNode.active;

                return false;
            },
            set(bshow) {
                if (this.RunfastEndResultNode) this.RunfastEndResultNode.active = bshow;
            },
            tooltip: CC_DEV && '结束节点显示',
        },

        RunfastGameDisbandNode: cc.Node,

        RunfastGameDisbandNodeShow: {
            get() {
                if (this.RunfastGameDisbandNode) return this.RunfastGameDisbandNode.active;

                return false;
            },
            set(bshow) {
                if (this.RunfastGameDisbandNode) this.RunfastGameDisbandNode.active = bshow;
            },
            tooltip: CC_DEV && '解散1节点显示',
        },

        RunfastGameDisbandQueryNode: cc.Node,

        RunfastGameDisbandQueryNodeShow: {
            get() {
                if (this.RunfastGameDisbandQueryNode) return this.RunfastGameDisbandQueryNode.active;

                return false;
            },
            set(bshow) {
                if (this.RunfastGameDisbandQueryNode) this.RunfastGameDisbandQueryNode.active = bshow;
            },
            tooltip: CC_DEV && '解散2节点显示',
        }
    },

    // use this for initialization
    onLoad: function() {
        this.node.on('onHidePop', this.onHidePop.bind(this));
        
    },

    start: function() {
        
    },

    hideAll: function () {
        this.RunfastRoundResultNodeShow = false;
        this.RunfastEndResultNodeShow = false;
        this.RunfastGameDisbandNodeShow = false;
        this.RunfastGameDisbandQueryNodeShow = false;
    },


    onHidePop: function () {
        this.hideAll();
        this.node.active = false;
    },
    /*
    roundResultInfo = 
    {
        wOutCardUser:0,
        cbCardData: [60, 12, 44],
        cbHandCardData:[],
        lBombCount:[],
        lGameScore:[],
        lWinner:0
    }
    */
    setRoundResult: function(roundResultInfo, runfastLogic) {
        this.hideAll();

        this.RunfastRoundResultNodeShow = true;
        this.RunfastRoundResultNode.getComponent('RunfastRoundResult').setResult(roundResultInfo, runfastLogic);
    },

    setFinalResult: function(endResultInfo, runfastLogic) {
        this.hideAll();

        this.RunfastEndResultNodeShow = true;
        this.RunfastEndResultNode.getComponent('RunfastEndResult').setResult(endResultInfo, runfastLogic);
       
    },

    setDisbandResult:function (disbandInfo, runfastLogic) {
        this.hideAll();

        this.RunfastGameDisbandNodeShow = true;
        this.RunfastGameDisbandNode.getComponent('RunfastDisband').setResult(disbandInfo, runfastLogic);
    },

    ShowDisbandQuery(flag) {
        this.hideAll();
        this.RunfastGameDisbandQueryNodeShow = flag;
    },




    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});