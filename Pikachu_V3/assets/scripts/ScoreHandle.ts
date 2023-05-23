import { _decorator, Component, Node, Label, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreHandle')
export class ScoreHandle extends Component {
    public static instance = null;

    @property(Label)
    time: Label  = null;
    @property(Label)
    score: Label = null;
    @property(ProgressBar)
    pBar: ProgressBar = null;
    
    private timeDefault = 100;

    onLoad() {
        this.resertPBar();
        ScoreHandle.instance = this;
        this.node.active = false;
    }

    start() {
        // this.changeTime(70)
        console.log(this.timeDefault);
        this.startGame();
    }

    update(deltaTime: number) {
        
    }

    resertPBar() {
        this.time.string = "00:00";
        this.score.string = "0";
        this.pBar.progress = 1;
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
        console.log(timeSeconds)
        let _score = Math.ceil(timeSeconds * 100 / this.timeDefault );
        this.score.string = _score.toString();
        this.changePBar(_score);
    }

    changePBar(score: number) {
        this.pBar.progress = score / 100;
    }

    startGame() {
        let _timeTmp = this.timeDefault;
        const countDown = function () {
            this.changeTime(_timeTmp--);
            if(_timeTmp === 0) {
                this.displayPopupLose(); //Ưu tiên người dùng
                this.unschedule(countDown);
            }
        }

        this.schedule(countDown, 1);
    }

    displayPopupLose() {
        console.log("Thua Cmnr")
    }

    displayPopupWin() {
        console.log("Win hihihi")
        this.unscheduleAllCallbacks();
    }

    public setTimeDefault(time: number) {
        this.timeDefault = time;
    }
}


