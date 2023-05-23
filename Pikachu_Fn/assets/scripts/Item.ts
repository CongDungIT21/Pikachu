import { _decorator, Component, Node, tween, Vec3, UIOpacity, Sprite, Tween, Button } from 'cc';
import { Board } from './Board';
const { ccclass, property } = _decorator;

export const enum STATE {
    OPENED,
    CLOSED,
    WAITED
}

@ccclass('Item')
export class Item extends Component {
    id: number;
    row: number;
    col: number;
    state: STATE;
    private parent = null;
    //0: img when opened = id if id === -1 img png no content
    //1: img when closed = png no content
    //2: img when waited = id, opacity lower
    onLoad() {
        this.getComponent(Button).node.on(Button.EventType.CLICK, this.handleClick, this);
    }
    
    start() {
        this.parent = this.node.getParent().getComponent(Board);
    }

    update(deltaTime: number) {
        
    }
    changeData(item: Item) {
        this.id = item.id;
        this.getComponentInChildren(Sprite).spriteFrame = item.getComponentInChildren(Sprite).spriteFrame;
        this.state = item.state;
        this.handleState(this.state);
    }

    changeState(state: STATE) {
        this.state = state;
        this.handleState(state);
    }

    handleState(state: STATE) {
        if(state === STATE.OPENED) {
            this.node.getComponent(UIOpacity).opacity = 255;
        }
        else if(state === STATE.CLOSED) {
            this.node.getComponent(UIOpacity).opacity = 0;
            this.id = -1;
        }
        else {
            this.node.getComponent(UIOpacity).opacity = 200;
        }
    }

    handleClick(event) {
        if(this.state === STATE.OPENED) {
                this.changeState(STATE.WAITED)
                this.parent.checkWaitNode(this);
                this.actionClick();
            }
        else if(this.state === STATE.WAITED) {
                this.parent.checkWaitNode(this);
                this.changeState(STATE.OPENED);
                this.actionClick();
            }
    }

    actionClick() {
        tween(this.node)
            .to(0.2, {scale: new Vec3(1.1, 1.1, 1.1)})
            .to(0.2, {scale: new Vec3(1, 1, 1)}, {onComplete: () => {
                if(Board.inst.itemWait[1] !== null) {
                    Board.inst.callBackDeleteItem();
                }
            }})
            .union()
            .start() 
    }

    actionSuggest() {
        tween(this.node)
            .to(0.2, {scale: new Vec3(1.1, 1.1, 1.1)})
            .to(0.2, {scale: new Vec3(1, 1, 1)})
            .union()
            .repeatForever()
            .start()
    }

    stopAllAction() {
        tween(this.node) //Handle case suggest repeater forever
            .set({scale: new Vec3(1, 1, 1)})
            .start();

        Tween.stopAll();        
    }

    getPosition()
    {
       return this.node.getPosition();
    }    
}


