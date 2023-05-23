import { _decorator, Component, Node, Prefab, instantiate, Sprite } from 'cc';
import { Board } from './Board';
const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {
    @property(Node)
    screenStart: Node = null;

    @property(Node)
    screenSetting: Node = null;
    
    @property(Node)
    screenPlay: Node = null;
    
    @property(Prefab)
    popupErr: Prefab = null;

    @property(Node)
    overLayout: Node = null;

    public static inst: UIController = null;

    onLoad() {
        UIController.inst = this;
        this.disableOverLay();
        this.screenPlay.active = true;       
    }
    start() { 
        this.displayScreenStart();       
    }

    update(deltaTime: number) {
        
    }

    resertScreen() {
        this.screenStart.active = false;
        this.screenSetting.active = false;
        this.screenPlay.active = false;        
    }

    displayScreenStart() {
        this.resertScreen();
        this.screenStart.active = true;
    }

    displayScreenSetting() {
        this.resertScreen();
        this.screenSetting.active = true;
    }

    displayScreenPlay() {
        this.resertScreen();
        this.screenPlay.active = true;
        Board.inst.handleClickBtnStart();
    }

    displayPopupErr() {
        let _popup = instantiate(this.popupErr);
        this.node.addChild(_popup);     
        this.enableOverLay();
    }

    enableOverLay() {
        this.overLayout.active = true;
    }

    disableOverLay() {
        this.overLayout.active = false;
    }
}


