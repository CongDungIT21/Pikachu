import { _decorator, Component, Node, Button } from 'cc';
import { UIController } from './UIController';
const { ccclass, property } = _decorator;

@ccclass('ScreenStart')
export class ScreenStart extends Component {
    @property(Button)
    btnSetting: Button = null;
    @property(Button)
    btnRank: Button = null;
    @property(Button)
    btnPlay: Button = null;
    @property(Button)
    btnDonate: Button = null;
    
    private uiControl: UIController = null;

    onLoad () {
        this.uiControl = UIController.inst;
    }

    start() {        
        this.btnDonate.node.on(Button.EventType.CLICK, this.handleBtnNotSupport, this);
        this.btnRank.node.on(Button.EventType.CLICK, this.handleBtnNotSupport, this);
        this.btnPlay.node.on(Button.EventType.CLICK, this.handleBtnPlay, this);
        this.btnSetting.node.on(Button.EventType.CLICK, this.handleBtnSetting, this);
    }

    // update(deltaTime: number) {
        
    // }

    handleBtnNotSupport(event) {
        this.uiControl.displayPopupErr();
    }

    handleBtnPlay(event) {
        this.uiControl.displayScreenPlay();
    }

    handleBtnSetting(event) {
        this.uiControl.displayScreenSetting();
    }
}


