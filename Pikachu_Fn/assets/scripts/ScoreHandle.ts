import { _decorator, Component, Node, Label, ProgressBar, Sprite, SpriteFrame, UIOpacity, Prefab, instantiate } from 'cc';
import { PopupResult } from './PopupResult';
import { UIController } from './UIController';
const { ccclass, property } = _decorator;

@ccclass('ScoreHandle')
export class ScoreHandle extends Component {
    @property(Label)
    time: Label = null;
    @property(Label)
    score: Label = null;
    @property(UIOpacity)
    stars: UIOpacity[] = [];
    @property(ProgressBar)
    pBar: ProgressBar = null;
    @property(Prefab)
    popupResult: Prefab = null;

    public static instance : ScoreHandle = null;
    private timeDefault = 100;

    onLoad() {
        ScoreHandle.instance  = this;
    }

    start() {
        //console.log("Start Game 2")
        this.startGame();
    }

    update(deltaTime: number) {
        
    }

    changeTime(timeSeconds: number) {
        let minute: string | number = Math.floor(timeSeconds / 60);
        let second: string | number = timeSeconds % 60;
        if(minute < 10) {
            minute = "0" + minute;
        }
        if(second < 10) {
            second = "0" + second;
        }

        this.time.string = minute + ": " + second;

        this.changeScore(timeSeconds);
    }

    changeScore(timeSeconds: number) {
        let _score = Math.ceil(timeSeconds * 100 / this.timeDefault );
        this.score.string = _score.toString();
        this.changePBar(_score);
    }

    changePBar(score: number) {
        this.pBar.progress = score / 100;
        //console.log(this.pBar.progress);
        if(this.pBar.progress < 0.30) {
            this.setStar(2);
        }
        if(this.pBar.progress < 0.60) {
            this.setStar(1);
        }
        if(this.pBar.progress < 0.90) {
            this.setStar(0);
        }
    }

    startGame() {
        this.resertPBar();
        let _timeTmp = this.timeDefault;
        const countDown = function () {
            if(_timeTmp === 0) {
                this.displayPopupLose();
                this.unscheduleAllCallbacks(countDown);
            }
            this.changeTime(_timeTmp--);
        }

        this.schedule(countDown, 1);
    }

    resertPBar() {
        this.time.string = "00:00";
        this.score.string = "0";
        this.pBar.progress = 1;
        this.resertStar();
    }

    resertStar() {
        for(let i = 0;i< this.stars.length;i++) {
            this.stars[i].opacity = 255;
        }
    }

    setStar(idx: number) {
        this.stars[2-idx].opacity = 100;
    }

    displayPopupLose() {
        let _popup: Node = instantiate(this.popupResult);
        _popup.getComponent(PopupResult).displayResult("Thất Bại", this.stars, "0");

        UIController.inst.node.addChild(_popup);
        UIController.inst.enableOverLay();
    }

    displayPopupWin() {
        let _popup: Node = instantiate(this.popupResult);
        _popup.getComponent(PopupResult).displayResult("Chiến Thắng", this.stars, this.score.string);

        UIController.inst.node.addChild(_popup);
        UIController.inst.enableOverLay();
        this.unscheduleAllCallbacks();
    }

    public setTimeDefault(time: number) {
        this.timeDefault = time;
        this.startGame();
    }
}


