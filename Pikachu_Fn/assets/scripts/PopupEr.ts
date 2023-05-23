import { _decorator, Component, Node, Button } from 'cc';
import { UIController } from './UIController';
const { ccclass, property } = _decorator;

@ccclass('PopupEr')
export class PopupEr extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    backPrevScreen() {
        this.node.destroy();
        UIController.inst.disableOverLay();
    }
}


