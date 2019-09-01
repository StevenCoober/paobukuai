cc.Class({
    extends: cc.Component,

    properties: {
        NameLabel: cc.Label,
        WinTimesLabel: cc.Label,
        ScoreLabel: cc.Label,
    },

    start() {

    },

    setInfo(name, wintimes, score) {
        this.NameLabel.string = name;
        this.WinTimesLabel.string = wintimes;
        this.ScoreLabel.string = score;
    },
});