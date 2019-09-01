var GameConfig = require('../etc/game_config');


var RunfastConfig = require('./RunfastConfig');
var GameState = RunfastConfig.GameState;
var GAMETYPE = RunfastConfig.GAMETYPE;
var GAMERULE = RunfastConfig.GAMERULE;
var GAMERULETYPE = RunfastConfig.GAMERULETYPE;

var LAYER_TYPE = {
    Select: 0,
    Create: 1,
    Join: 2
}

cc.Class({
    extends: cc.Component,

    properties: {
        NodeList: [cc.Node],

        RoomIds: [cc.Label],

        _room_id: '',
    },

    onLoad() {
        
        this.showLayer(LAYER_TYPE.Select);

        this.gametype = GAMETYPE.GAMETYPE_NONE;

        this.gamerule = GAMERULE.GAMERULE_NONE;

        this.gameruletype = GAMERULETYPE.GAMERULETYPE_NONE;
    },

    onCloseSelf(event, customEventData) {
        console.log("++++++", customEventData);
        this.node.destroy();
    },
    ////////////////////////////////////////////////////////////
    //                  选择界面
    ////////////////////////////////////////////////////////////
    // 显示界面
    showLayer(type) {
        let self = this;
        setTimeout(() => {
            for (let i = 0; i < self.NodeList.length; i++) {
                const layer = self.NodeList[i];
                if (type == i) {
                    layer.active = true;
                } else {
                    layer.active = false;
                }
            }
        }, 100);
    },

    onCloseClick() {
        this.showLayer(LAYER_TYPE.Select);
    },

    onSelectClick(e, d) { // d为编辑器设置数据
	    cc.ll.AudioMgr.playDefaultBtn();
        this.showLayer(d);
    },

    ////////////////////////////////////////////////////////////
    //                  创建界面
    ////////////////////////////////////////////////////////////
    onRoundToggleSelected(e, d) {
        this._create_round = d;
    },
    onPayToggleSelected(e, d) {
        this._create_pay = d;
    },
    onScoreToggleSelected(e, d) {
        this._create_score = d;
    },

    onCreateClick() {
	    cc.ll.AudioMgr.playDefaultBtn();
        let gametype = this.gametype;
        let gamerule = this.gamerule;
        let gameruletype = this.gameruletype;

        let gameconf = {
            gametype: gametype,
            gamerule: gamerule,
            gameruletype: gameruletype,
        };
        
        let logic = cc.find('Canvas').getComponent('hallLogic');
        logic.onCreateRoom(GameConfig.GameType.RUNFAST, gameconf);
    },

    ////////////////////////////////////////////////////////////
    //                  加入界面
    ////////////////////////////////////////////////////////////
    onResetRoomId() {
        this._room_id = '';
        for (const spr of this.RoomIds) {
            spr.node.active = false;
        }
    },
    onInputRoomId(e, d) {
        if (d == -1) {
            if (this._room_id.length == 0) {
                return;
            }
            this._room_id = this._room_id.substr(0, this._room_id.length - 1);
            var index = this._room_id.length;
            this.RoomIds[index].node.active = false;
        } else {
            if (this._room_id.length >= 6) {
                return;
            }
            var index = this._room_id.length;
            this.RoomIds[index].node.active = true;
            this.RoomIds[index].string = d;
            this._room_id += d.toString();
        }
        if (this._room_id.length == 6) {
            let logic = cc.find('Canvas').getComponent('hallLogic');
            logic.onEnterRoom(this._room_id);
        }
    },
    onDelRoomId() {
        this.onInputRoomId(null, -1);
    },
    
});
