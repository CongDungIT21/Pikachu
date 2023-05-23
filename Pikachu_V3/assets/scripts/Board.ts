import { _decorator, Component, Node, Prefab, Button, SpriteFrame, instantiate, game, AudioSource, assert, InstancedBuffer, Graphics, Vec3, Color } from 'cc';
import { DataGame } from './DataGame';
import { GameController } from './GameController';
import { Item, STATE } from './Item';
import { Level } from './level/Level';
import { Level1 } from './level/Level1';
import { Level2 } from './level/Level2';
import { Level3 } from './level/Level3';
import { Level4 } from './level/Level4';
import { Level5 } from './level/Level5';
const { ccclass, property } = _decorator;

@ccclass('Board')
export class Board extends Component {
    public static Inst: Board;
    
    @property(Prefab)
    itemNode: Prefab = null;
    @property(Button)
    btnStart: Button = null;
    @property(Button)
    btnRefresh: Button = null;
    @property(Button)
    btnSuggest: Button = null;
    @property(AudioSource)
    audioBackground: AudioSource = null!;
    @property(Graphics)
    drawBoard: Graphics = null;

    itemWait: [Item, Item] = [null, null];

    imgItems: SpriteFrame[] = null;
    rowM: number = 9;
    colM: number = 16;
    level = null;

    matrixItems: Item[][] = null;

    onLoad() {
        Board.Inst = this;
        console.log('onLoad');
        this.imgItems = DataGame.getInstance().getImgItems();
        this.setLevel(new Level1());
        this.btnRefresh.node.active = false;
        this.btnSuggest.node.active = false;
        this.btnStart.node.on(Node.EventType.MOUSE_DOWN, this.handleClickBtnStart, this)
        this.btnSuggest.node.on(Node.EventType.MOUSE_DOWN, this.handleBtnSuggest, this)
        this.btnRefresh.node.on(Node.EventType.MOUSE_DOWN, this.handleClickBtnRefresh, this)
    }

    start() {
        //this.node.addChild(instantiate(this.itemNode));
        this.audioBackground.pause();
    }

    // update(deltaTime: number) {
        
    // }

    handleClickBtnStart(event) {
        //console.log('handleClick');
        //console.log(Board.level);
        // Board.level = new Level1();
        this.level.initLevel(this);
        this.matrixItems = this.level.initBoard();
        this.printIDItem(this.matrixItems);
        
        this.btnRefresh.node.active = true;
        this.btnSuggest.node.active = true;
    }

    handleClickBtnRefresh(event) {
        this.level.refreshItems();
    }

    printIDItem(matrixItems: Item[][]) {
        for(let i=0; i<matrixItems.length; i++) {
            let _str = ""
            for(let j=0; j<matrixItems[i].length; j++) {
                _str += " " + matrixItems[i][j].id;
            }
            console.log(_str);
        }
    }

    checkWaitNode(item: Item): boolean {
        let _result = false;
        if(this.itemWait[0] === null) 
        {
            this.itemWait[0] = item;                
        }
        else if(this.itemWait[1] === null)
            this.itemWait[1] = item;
        
        if(this.itemWait[0] !== null && this.itemWait[1] !== null ) {
            // Same id and item1 !== item2
            if( this.itemWait[0].id === this.itemWait[1].id &&
                (this.itemWait[0].row !== this.itemWait[1].row 
                || this.itemWait[0].col !== this.itemWait[1].col)
            ) 
            {
                // console.log(this.itemWait[0]);
                // console.log(this.itemWait[1]);
                const _GameController = new GameController(this);
                let _line = _GameController.getConnect();
                //console.log(_line);
                if(_line !== null) {
                    this.drawLineConnect(_line);
                    this.level.deleteItem(this.itemWait);
                    _result = true;
                }
                else {
                    this.level.resertState(this.itemWait);
                }                
            }
            else {
                //console.log("1");
                this.itemWait.forEach(item => item.changeState(STATE.OPENED))
            }
            this.itemWait = [null, null];
        }
        //console.log("Item Wait")
        //console.log(this.itemWait);
        return _result;
    }

    checkConnect() {
        let _result = false;
        // Same id and item1 !== item2
        if( this.itemWait[0].id === this.itemWait[1].id &&
            (this.itemWait[0].row !== this.itemWait[1].row 
            || this.itemWait[0].col !== this.itemWait[1].col)
        ) 
        {
            // console.log(this.itemWait[0]);
            // console.log(this.itemWait[1]);
            const _GameController = new GameController(this);
            let _line = _GameController.getConnect();
            //console.log(_line);
            if(_line !== null) {
                this.itemWait[0].actionSuggest();
                this.itemWait[1].actionSuggest();
                _result = true;
            }
            else {
                this.level.resertState(this.itemWait);
            }                
        }
        else {
            //console.log("1");
            this.itemWait.forEach(item => item.changeState(STATE.OPENED))
        }
        this.itemWait = [null, null];    
        return _result;    
    }

    drawLineConnect(items: Item[]): void {
        //console.log("Start Draw Line Connect")
        for(let i = 0; i < items.length - 1; i++) {
            let p1 = items[i].getPosition();
            let p2 = items[i+1].getPosition();
            this.drawLine(p1, p2)
        }
    }

    drawLine(p1: Vec3, p2: Vec3) {
        this.drawBoard.lineCap = Graphics.LineCap.ROUND;
        this.drawBoard.lineJoin = Graphics.LineJoin.MITER;
        this.drawBoard.lineWidth = 10;
        this.drawBoard.moveTo(p1.x, p1.y);
        this.drawBoard.lineTo(p2.x, p2.y);
        this.drawBoard.strokeColor = Color.BLUE;
        this.drawBoard.stroke();
        this.scheduleOnce(function() {
            this.drawBoard.clear();
        }, 0.1)


    }

    handleBtnSuggest() {
        // this.printIDItem(this.matrixItems);
        this.level.suggestItem();
    }

     setLevel(level: any) {
        this.level = level;
    }
}



