import { _decorator, Component, Node, Label, Toggle, Button, ToggleComponent } from 'cc';
import { Board } from './Board';
const { ccclass, property } = _decorator;

interface ISize {
    type: number,
    name: string
    row: number,
    col: number
}

@ccclass('Size')
export class Size extends Component {
    private typeSize: number = 0; //Normal. medium, large
    private board: Board = null;
    private size: ISize = null;
    @property(Label)
    sizeLabel: Label = null;
    sizeToggle: ToggleComponent = null;

    onLoad() {
        this.sizeToggle = this.node.getComponent(ToggleComponent);
        this.board = Board.inst;
        this.sizeToggle.node.on(Toggle.EventType.TOGGLE, this.setSizeGame, this)
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    initSize(size: ISize) {        
        this.size = size;        
        if(size.type == 1) {
            this.sizeToggle.isChecked = true;
            this.board.setSizeGame(this.size.row, this.size.col); //default
        }

        this.sizeLabel.string = `${this.size.name} (${this.size.row} x ${this.size.col})`
    }

    setSizeGame(event) {
        this.board.setSizeGame(this.size.row, this.size.col);
    }
}


