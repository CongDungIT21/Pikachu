import { _decorator, Component, Node, AudioSource, Button, Color, Graphics, Prefab, SpriteFrame, Vec3, UITransform, instantiate } from 'cc';
import { AudioHandle } from './AudioHandle';
import { ConfigGame } from './ConfigGame';
import { GameController } from './GameController';
import { Item, STATE } from './Item';
import { Level0 } from './Level/Level0';
import { Level1 } from './Level/Level1';
import { Level2 } from './Level/Level2';
import { Level3 } from './Level/Level3';
import { Level4 } from './Level/Level4';
const { ccclass, property } = _decorator;

@ccclass('Board')
export class Board extends Component {
    public static inst: Board;
    
    @property(Prefab)
    itemNode: Prefab = null;
    @property(Button)
    btnRefresh: Button = null;
    @property(Button)
    btnSuggest: Button = null;

    @property(Graphics)
    drawBoard: Graphics = null;

    itemWait: [Item, Item] = [null, null];
    imgItems: SpriteFrame[] = null;

    rowM: number = 0;
    colM: number = 0;
    level = null;

    matrixItems: Item[][] = null;


    onLoad() {
        console.log("onLoad board");
        Board.inst = this;
        this.imgItems = ConfigGame.getInstance().imgItems;
        this.btnSuggest.node.on(Node.EventType.MOUSE_DOWN, this.handleBtnSuggest, this)
        this.btnRefresh.node.on(Node.EventType.MOUSE_DOWN, this.handleClickBtnRefresh, this)
    }

    start() {
    }

    //Dựa vào id để chọn cách xử lý
    setLevelGame(level: number) {
        if(level === 0 ) this.level = new Level0();
        else if(level === 1 ) this.level = new Level1();
        else if(level === 2 ) this.level = new Level2();
        else if(level === 3 ) this.level = new Level3();
        else if(level === 4 ) this.level = new Level4();
    }

    setSizeGame(rowM: number, colM: number) {
        this.rowM = rowM + 2;
        this.colM = colM + 2;
    }

    handleClickBtnStart() {      
        console.log("handleClickBtnStart");
        console.log(this.rowM + " " + this.colM);
        console.log(this.level);

        this.changeSizeLayout();

        this.level.initLevel(this);
        this.matrixItems = this.level.initBoard();
        //this.printIDItem(this.matrixItems);
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

    checkWaitNode(item: Item) {
        //let _result = false;
        if(this.itemWait[0] === null) 
        {
            this.itemWait[0] = item;
            AudioHandle.inst.playClickMouse();                
        }
        else if(this.itemWait[1] === null)
            this.itemWait[1] = item;        
        //return _result;
    }

    callBackDeleteItem() {
        if(this.itemWait[0] !== null && this.itemWait[1] !== null ) {
            if( this.itemWait[0].id === this.itemWait[1].id &&
                (this.itemWait[0].row !== this.itemWait[1].row 
                || this.itemWait[0].col !== this.itemWait[1].col)
            ) 
            {
                const _GameController = new GameController(this);
                let _line = _GameController.getConnect();
                if(_line !== null) {
                    this.drawLineConnect(_line);
                    this.level.deleteItem(this.itemWait);
                    AudioHandle.inst.playDeleteItem();
                    //_result = true;                    
                }
                else {
                    this.level.resertState(this.itemWait);   
                    AudioHandle.inst.playReverseItem();                 
                }                
            }
            else {
                this.itemWait.forEach(item => item.changeState(STATE.OPENED))
                if(this.itemWait[0].uuid === this.itemWait[1].uuid) 
                    AudioHandle.inst.playClickMouse();
                else 
                    AudioHandle.inst.playReverseItem(); 
            }
            this.itemWait = [null, null];
        }
    }

    checkConnect() {
        let _result = false;
        if( this.itemWait[0].id === this.itemWait[1].id &&
            (this.itemWait[0].row !== this.itemWait[1].row 
            || this.itemWait[0].col !== this.itemWait[1].col)
        ) 
        {
            const _GameController = new GameController(this);
            let _line = _GameController.getConnect();
            if(_line !== null) {
                _result = true;
            }
            else {
                this.level.resertState(this.itemWait);
            }                
        }
        else {
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
        this.level.suggestItem();
    }

    setLevel(level: any) {
        this.level = level;
    }

    changeSizeLayout() {
        let _size = this.node.getComponent(UITransform);
        let _sizeItem = instantiate(this.itemNode).getComponent(UITransform).contentSize;
        let y = _sizeItem.x * this.rowM + (this.rowM + 1) * 10;
        let x = _sizeItem.y * this.colM + (this.colM + 1) * 10;
        _size.setContentSize(x, y);
    }
}


