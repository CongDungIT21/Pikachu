import { _decorator, Component, Node, SpriteFrame, Sprite, UIOpacity, Enum, tween, Vec3 } from 'cc';
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

    //0: img when opened = id if id === -1 img png no content
    //1: img when closed = png no content
    //2: img when waited = id, opacity lower
    onLoad() {
        this.node.on(Node.EventType.MOUSE_DOWN, this.handleClick, this);
    }

    start() {

    }

    // update(deltaTime: number) {
        
    // }

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
        this.actionClick();

        this.scheduleOnce(function() {
            if(this.state === STATE.OPENED) {
                this.changeState(STATE.WAITED)
                this.node.getParent().getComponent(Board).checkWaitNode(this);
            }
            else if(this.state === STATE.WAITED) {
                this.node.getParent().getComponent(Board).checkWaitNode(this);
                this.changeState(STATE.OPENED)
            }
        }, 0.2);
    }

    changeData(item: Item) {
        this.id = item.id;
        this.getComponentInChildren(Sprite).spriteFrame = item.getComponentInChildren(Sprite).spriteFrame;
        this.state = item.state;
    }

    actionClick() {
        tween(this.node)
            .to(0.2, {scale: new Vec3(1.1, 1.1, 1.1)})
            .to(0.2, {scale: new Vec3(1, 1, 1)})
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

    getPosition()
    {
       return this.node.getPosition();
    }
}


