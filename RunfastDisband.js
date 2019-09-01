var timer = 0
cc.Class({
    extends: cc.Component,

    properties: {
        playerResultNodes:
        {
            default:[],
            type: [cc.Node],
            tooltip: CC_DEV && '信息节点',
        },

        agreeDisbandBtn:
        {
            default:null,
            type: cc.Button,
            tooltip: CC_DEV && '同意按键',
        },

        noAgreeDisbandBtn:
        {
            default:null,
            type: cc.Button,
            tooltip: CC_DEV && '不同意按键',
        },


    },

    start() {
        if(this.agreeDisbandBtn) this.agreeDisbandBtn.node.on('click', this.agreeDisbandBtnClick.bind(this));
        if(this.noAgreeDisbandBtn) this.noAgreeDisbandBtn.node.on('click', this.noAgreeDisbandBtnClick.bind(this));
    },

    agreeDisbandBtnClick: function () {
	    cc.ll.AudioMgr.playDefaultBtn();
        var Package = 
        {
            bIsAgree:true,
        };
        cc.ll.net.send('RunFast_DisbandQueryReq', Package);
        this.node.dispatchEvent(new cc.Event.EventCustom('onHidePop', true));
    },

    noAgreeDisbandBtnClick: function () {
	    cc.ll.AudioMgr.playDefaultBtn();
        var Package = 
        {
            bIsAgree:false,
        };

        cc.ll.net.send('RunFast_DisbandQueryReq', Package);
        this.node.dispatchEvent(new cc.Event.EventCustom('onHidePop', true));
    },

    clearAllPlyerNode: function () {
        for (var i = 0; i < this.playerResultNodes.length; i++) {
            var onePlayerInfo = this.playerResultNodes[i];
            if (!onePlayerInfo) continue;

            var yesView = onePlayerInfo.getChildByName('yes');
            yesView.active = false;

            var noView = onePlayerInfo.getChildByName('no');
            noView.active = false;
        }
    },


    setResult: function (disbandInfo, runfastLogic) {
        this.clearAllPlyerNode();

        var cbDisbandUser = disbandInfo;

        for (var i = 0; i < 3; i++) {
            var onePlayerInfo = this.playerResultNodes[i];
            if (!onePlayerInfo) continue;


            var localseat = runfastLogic.getLocalSeat(i);
            var playernode = runfastLogic.playerNodeList[localseat];
            var nodelogic = playernode.getComponent('RunfastPlayerNode');
            if(nodelogic.hasPlayer) {
                onePlayerInfo.active = true;

                var nicknameLbl = onePlayerInfo.getChildByName('name');
                nicknameLbl.getComponent(cc.Label).string = nodelogic.name;

                var yesView = onePlayerInfo.getChildByName('yes');
                yesView.active = cbDisbandUser.indexOf(i) != -1?true:false;

            }else {
                onePlayerInfo.active = false;
            }
        }


       
        var nodelogic = runfastLogic.myselfNode.getComponent('RunfastPlayerNode');
        if(cbDisbandUser.indexOf(nodelogic.seat) == -1) {
            this.agreeDisbandBtn.node.active = true;
            this.noAgreeDisbandBtn.node.active = true;
        }
        else {
            this.agreeDisbandBtn.node.active = false;
            this.noAgreeDisbandBtn.node.active = false;
        }
    }
});
