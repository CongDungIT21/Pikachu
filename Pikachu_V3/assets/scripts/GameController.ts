// Vấn đề tiềm ẩn. Việc khởi tạo quá nhiều lần gây tốn bộ nhớ
// Đề xuất thành 1 property của Board

// Thuật toán chưa tối ưu. Nên xem xét sự tượng quan giữa các item để tối ưu nhất
import { _decorator, Component, Node, Line } from 'cc';
import { Board } from './Board';
import { Item, STATE } from './Item';
const { ccclass, property } = _decorator;

enum DIRECTION {
    LEFT,
    RIGHT,
    UP,
    DOWN
}

type IItemAround = {
    [Key in DIRECTION]: Item[];
};

@ccclass('GameController')
export class GameController {
    private colM: number;
    private rowM: number;
    private item1: Item;
    private item2: Item;
    private matrixItems: Item[][] = null;

    constructor(board: Board) {
        this.colM = board.colM;
        this.rowM = board.rowM;
        this.matrixItems = board.matrixItems;
        this.item1 = (board.itemWait[0]);
        this.item2 = (board.itemWait[1]);
    }

    // Không lấy bản thân nút đó
    // Lấy từ nút bên cạnh trở đi
    private initAroundItem1(item: Item): IItemAround {
        let _around: IItemAround = {
            [DIRECTION.LEFT]: [],
            [DIRECTION.RIGHT]: [],
            [DIRECTION.UP]: [],
            [DIRECTION.DOWN]: []
        };
        _around[DIRECTION.LEFT] = this.getLeftItems(item);
        _around[DIRECTION.RIGHT] = this.getRightItems(item);
        _around[DIRECTION.UP] = this.getUpItems(item);
        _around[DIRECTION.DOWN] = this.getDownItems(item);
        return _around;
    }

    private getLeftItems(item: Item): Item[] {
        let _result: Item[] = [];
        let row = item.row;
        let col = item.col;
        for(let i=col-1;i>=0;i--) {
            if(this.matrixItems[row][i].state === STATE.OPENED){
                break;
            }

            _result.push(this.matrixItems[row][i]);
        }
        return _result;
    }

    private getRightItems(item: Item): Item[] {
        let _result: Item[] = [];
        let row = item.row;
        let col = item.col;
        for(let i=col+1;i<this.colM;i++) {
            if(this.matrixItems[row][i].state === STATE.OPENED){
                break;
            }
            _result.push(this.matrixItems[row][i]);
        }
        return _result;
    }

    private getUpItems(item: Item): Item[] {
        let _result: Item[] = [];
        let row = item.row;
        let col = item.col;
        for(let i=row-1;i>=0;i--) {
            if(this.matrixItems[i][col].state === STATE.OPENED){
                break;
            }
            
            _result.push(this.matrixItems[i][col]);
        }
        return _result;
    }

    private getDownItems(item: Item): Item[] {
        let _result: Item[] = [];
        let row = item.row;
        let col = item.col;
        for(let i=row+1;i<this.rowM;i++) {
            if(this.matrixItems[i][col].state === STATE.OPENED){
                break;
            }

            _result.push(this.matrixItems[i][col]);
        }
        return _result;
    }


    public getConnect(): Item[] {
       return this.getZeroCoupling(this.item1, this.item2) || this.getOneCoupling(this.item1, this.item2) || this.getTwoCoupling(this.item1, this.item2);
    }

    // Kiểm với Không khớp nối
    private getZeroCoupling(item1: Item, item2: Item): Item[] {
        let _line: Item[] = [];
        let _aroundItem1 = this.initAroundItem1(item1);
        // console.log("_aroundItem1");
        // console.log(_aroundItem1);
        for (const dir in _aroundItem1) {
            if (Object.prototype.hasOwnProperty.call(_aroundItem1, dir)) {
                const items = _aroundItem1[dir];
                _line = [item1];
                let _isConnected = false;
                for (const item of items) {
                    _line.push(item);
                    if(item.row === item2.row && item.col === item2.col) {
                        _isConnected = true;
                        break;
                    }
                }
                if(_isConnected) break;
                //console.log(_line);
            }
        }
        // console.log("Get Zero Coupling");
        // console.log((_line[_line.length - 1].row === item2.row && _line[_line.length - 1].col === item2.col) ? _line : null)
        return (_line[_line.length - 1].row === item2.row && _line[_line.length - 1].col === item2.col) ? _line : null;
    }

    private getOneCoupling(item1: Item, item2: Item): Item[] {
        let _line: Item[] = [];
        let _aroundItem1 = this.initAroundItem1(item1);
        let haveItem2 = false;

        for (const dir in _aroundItem1) {
            if (Object.prototype.hasOwnProperty.call(_aroundItem1, dir)) {
                const items = _aroundItem1[dir];
                for (const item of items) {
                    let _zeroCoupling: Item[] = [];
                    if(item.row === item2.row || item.col === item2.col) {
                        _zeroCoupling = this.getZeroCoupling(item, item2)
                        if(_zeroCoupling !== null) {
                            haveItem2 = true;
                            _line = [..._line, ..._zeroCoupling];
                            break;
                        }
                    }
                    _line.push(item);
                }

                if(haveItem2) {
                    _line.pop();
                    break;
                }
                else {
                    _line = [];
                }
            }
        }

        // console.log("getOneCoupling");
        // console.log(haveItem2 ? [item1, ..._line ,item2] : null)
        return haveItem2 ? [item1, ..._line ,item2] : null;
    }

    // Item 1 Left right => item 2 Left right
    // Item 1 Up down => item 2 Up down
    private getTwoCoupling(item1: Item, item2: Item): Item[] {
        let _result: Item[] = [];
        let _aroundItem1 = this.initAroundItem1(item1);
        let _aroundItem2 = this.initAroundItem1(item2);

        _result = this.parallel(_aroundItem1[DIRECTION.LEFT], _aroundItem2[DIRECTION.LEFT]);
        _result = (_result === null) ? this.parallel(_aroundItem1[DIRECTION.LEFT], _aroundItem2[DIRECTION.RIGHT]) : _result;
        _result = (_result === null) ? this.parallel(_aroundItem1[DIRECTION.RIGHT], _aroundItem2[DIRECTION.LEFT]) : _result; 
        _result = (_result === null) ? this.parallel(_aroundItem1[DIRECTION.RIGHT], _aroundItem2[DIRECTION.RIGHT]) : _result;
        _result = (_result === null) ? this.parallel(_aroundItem1[DIRECTION.UP], _aroundItem2[DIRECTION.UP]) : _result;
        _result = (_result === null) ? this.parallel(_aroundItem1[DIRECTION.DOWN], _aroundItem2[DIRECTION.DOWN]) : _result;
        _result = (_result === null) ? this.parallel(_aroundItem1[DIRECTION.UP], _aroundItem2[DIRECTION.DOWN]) : _result;
        _result = (_result === null) ? this.parallel(_aroundItem1[DIRECTION.DOWN], _aroundItem2[DIRECTION.UP]) : _result; 

        if(_result === null) return null;

        let _line1 = this.getZeroCoupling(item1, _result[0]);
        _line1.pop();
        let _line2 = this.getZeroCoupling(item2 , _result[_result.length-1]);
        _line2.pop();

        // console.log("getTwoCoupling");
        // console.log(_result === null ? null : [..._line1, ..._result, ..._line2.reverse()])
        return _result === null ? null : [..._line1, ..._result, ..._line2.reverse()]
    }


    private parallel(l1: Item[], l2: Item[]): Item[] {
        for(let i = 0; i < l1.length; i++) {
            for(let j = 0; j < l2.length; j++) {
                if(l1[i].row === l2[j].row || l1[i].col === l2[j].col) {
                    let _line = this.getZeroCoupling(l1[i], l2[j]);
                    if(_line !== null) {
                        return _line;
                    }
                }
            }
        }
        return null;
    }
}


