import { _decorator, Component, Node, SpriteFrame, Prefab, instantiate, Sprite } from 'cc';
import { Board } from '../Board';
import { GameController } from '../GameController';
import { Item, STATE} from '../Item';
import { ScoreHandle } from '../ScoreHandle';
const { ccclass, property } = _decorator;

interface IItem {
    [key: number]: Item[];
}

@ccclass('Level')
export abstract class Level {
    protected itemSameID: IItem = null;
    protected board: Board;
    protected remount: number;
    protected scoreHandler: ScoreHandle = null;
    
    public initLevel(board: Board): void{
        this.board = board;
        this.scoreHandler = ScoreHandle.instance;
        this.remount = (this.board.rowM - 2)*(this.board.colM - 2);
        this.initTime();
        this.scoreHandler.node.active = true;
    }


    protected initBoard() {
        //console.log("initBoard");

        this.board.audioBackground.play();

        this.board.node.removeAllChildren();
        let _result: Item[][] = []
        let _listIdItem = this.ramdomValue((this.board.rowM - 2)*(this.board.colM - 2), this.board.imgItems.length);
        // console.log(_listIdItem);
        let _idxItem = 0;
        for(let i=0; i<this.board.rowM; i++) {
            let _rowItem: Item[] = [];
            for(let j=0; j<this.board.colM; j++) {
                let _itemNode = instantiate(this.board.itemNode);
                let _itemScirpt = _itemNode.getComponent(Item);
                _itemScirpt.row = i;
                _itemScirpt.col = j;
                
                if(i==0 || j==0 || i==this.board.rowM - 1 || j==this.board.colM - 1) {
                    _itemScirpt.changeState(STATE.CLOSED);
                }
                else {
                    _itemScirpt.id = _listIdItem[_idxItem];
                    _itemNode.getComponentInChildren(Sprite).spriteFrame = this.board.imgItems[_itemScirpt.id];
                    _idxItem++;
                    _itemScirpt.changeState(STATE.OPENED);
                }
                this.board.node.addChild(_itemNode);
                _rowItem.push(_itemScirpt);
            }  
            
            _result.push(_rowItem);
        }

        this.saveItemSameID(_result);
        return _result;
    }

    //Refresh all Item còn lại
    protected refreshItems() {
       // console.log(this.remount);
        let _listIdItem = this.ramdomValue(this.remount, this.board.imgItems.length);
        let _tmp = 0;
        for(let i=0; i<this.board.rowM; i++) {
            for(let j=0; j<this.board.colM; j++) {
                if(this.board.matrixItems[i][j].id !== -1) {
                    this.board.matrixItems[i][j].id = _listIdItem[_tmp];
                    _tmp++;
                    this.board.matrixItems[i][j].getComponentInChildren(Sprite).spriteFrame = this.board.imgItems[this.board.matrixItems[i][j].id];
                }
            }
        }

        this.saveItemSameID(this.board.matrixItems);
    } 

    protected ramdomValue(num: number, rangeValue: number) {
        let _arrSameItem: number[] = Array(num).fill(-1);
        for(let i=0; i<num; i+=2) {
            let _id = Math.round(Math.random() * (rangeValue-1));
            _arrSameItem[i] = _id;
            _arrSameItem[i+1] = _id;
        }

        let _result: number[] = [];
        for(let i=0; i<num; i++) {
            let _idx = Math.round(Math.random() * (_arrSameItem.length-1));
            _result.push(_arrSameItem[_idx]);
            _arrSameItem.splice(_idx, 1);
        }

        return _result
    }

    protected resertState(items: [Item, Item]): void {
        items.forEach(item => {
            item.changeState(STATE.OPENED);
        })
    }

    protected saveItemSameID(board: Item[][]): void{
        this.itemSameID = {};
        let row = board.length;
        let col = board[0].length;
        for(let i = 1; i < row; i++) {
            for(let j = 0;j < col; j++){
                let item = board[i][j];
                if(item.id === -1) continue;
                else {
                    this.itemSameID[item.id] ? this.itemSameID[item.id].push(item) : this.itemSameID[item.id] = [item];
                }
            }
        }
    }

    protected deleteItemInListID(item: Item): void {
        //console.log(item.id);
        this.itemSameID[item.id].some((ele, idx) => {
            if(ele.row === item.row && ele.col === item.col) {
                this.itemSameID[item.id].splice(idx, 1);
                //console.log(this.itemSameID);
                return;
            }
        })
    }

    protected suggestItem() {
        for (const key of Object.keys(this.itemSameID)) {
            let _listItem = this.itemSameID[key];
            if(_listItem.length === 0) continue;
            if(this.getSuggestItem(_listItem)) {
                return;
            }
        }

        //Case: Matrix hiện tại không có item nào để nối
        this.refreshItems();
        this.suggestItem();
    }

    protected getSuggestItem(listItem: Item[]) {
        for(let i = 0; i <= listItem.length-2; i++) {
            for(let j = i+1; j <= listItem.length-1; j++) {    
                this.board.itemWait = [listItem[i], listItem[j]];           
                if(this.board.checkConnect()) return true;           
            }
        }
        return false;
    }

    // protected checkAround(item: Item): boolean {
    //     if(this.board.matrixItems[item.row + 1][item.col].id === -1) return true;
    //     if(this.board.matrixItems[item.row - 1][item.col ].id === -1) return true;
    //     if(this.board.matrixItems[item.row][item.col + 1].id === -1) return true;
    //     if(this.board.matrixItems[item.row][item.col - 1].id === -1) return true;
    //     return false;
    // }

    protected abstract sortItems(items: [Item, Item]): [Item, Item];
    protected abstract deleteItem(items: [Item, Item]): void;
    protected abstract movingItem(item: Item): void;
    protected abstract initTime(): void;
}


