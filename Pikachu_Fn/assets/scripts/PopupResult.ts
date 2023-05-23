import { _decorator, Component, Node, Label, UIOpacity, Button } from 'cc';
import { AudioHandle } from './AudioHandle';
import { UIController } from './UIController';
const { ccclass, property } = _decorator;

@ccclass('PopupResult')
export class PopupResult extends Component {
    @property(Label)
    result: Label = null;
    @property(UIOpacity)
    stars: UIOpacity[] = [];
    @property(Label)
    score: Label = null;
    @property(Button)
    home: Button = null;
    @property(Button)
    setting: Button = null;
    @property(Button)
    play: Button = null;

    public static inst = null;
    private uiControl: UIController = null;
    onLoad() {
        this.uiControl = UIController.inst;
    }

    start() {
        PopupResult.inst = this;
        this.assignClickEvent();
    }

    update(deltaTime: number) {
        
    }

    displayResult(result: string, stars: UIOpacity[], score: string) {
        if(stars.length !== 3) throw new Error("Diffirence start between Screen");
        AudioHandle.inst.stopSound();
        this.result.string = result;
        this.score.string = score + "/100";

        for(let i=0; i<stars.length; i++) {
            this.stars[i].opacity = stars[i].opacity;
        }
    }

    assignClickEvent() {
        this.home.node.on(Button.EventType.CLICK, function(event) {
            this.uiControl.displayScreenStart();
            this.uiControl.disableOverLay();
            this.destroyPopup();
        }, this);

        this.setting.node.on(Button.EventType.CLICK, function(event) {
            this.uiControl.displayScreenSetting();
            this.uiControl.disableOverLay();
            this.destroyPopup();
        }, this);

        this.play.node.on(Button.EventType.CLICK, function(event) {
            this.uiControl.displayScreenPlay();
            this.uiControl.disableOverLay();
            this.destroyPopup();
        }, this);
    }

    destroyPopup() {
        this.node.destroy();        
    }
}


