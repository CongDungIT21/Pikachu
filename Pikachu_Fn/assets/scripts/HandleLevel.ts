import { _decorator, Component, Node, Button, SpriteFrame, Sprite, Toggle } from 'cc';
import { Board } from './Board';
const { ccclass, property } = _decorator;

@ccclass('HandleLevel')
export class HandleLevel extends Component {
    typeLevel: number = null;
    board: Board = null;
    normalSprite: Sprite = null;
    pressedSprite: Sprite = null;

    onLoad() {
        this.normalSprite = this.node.getComponent(Sprite);
        this.pressedSprite = this.node.getComponentInChildren(Sprite);
        this.board = Board.inst;
    }

    start() {
        this.node.on(Button.EventType.CLICK, function(event){    
            this.board.setLevelGame(this.typeLevel);
        }, this);
    }

    initLevel(typeLevel: number, normalSpriteFrame: SpriteFrame, pressedSpriteFrame: SpriteFrame) {
        this.typeLevel = typeLevel;
        this.normalSprite.spriteFrame = normalSpriteFrame;
        this.pressedSprite.spriteFrame = pressedSpriteFrame;
        //Default
        if(typeLevel === 0) {
            this.getComponent(Toggle).isChecked = true;  
            this.board.setLevelGame(this.typeLevel);              
        }
    }
}


