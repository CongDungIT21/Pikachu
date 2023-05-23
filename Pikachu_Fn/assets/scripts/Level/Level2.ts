import { _decorator, Component, Node } from 'cc';
import { Item, STATE } from '../Item';
import { UIController } from '../UIController';
import { Level } from './Level';
const { ccclass, property } = _decorator;

@ccclass('Level2')
export class Level2 extends Level {
    protected initTime(): void {
        this.scoreHandler.setTimeDefault((this.configGame.size[0] + this.configGame.size[1]) * 3);
    }    
    //Đảm bảo sau khi dịch chuyển các nút phải dịch k ảnh hưởng tới nhau
    protected sortItems(items: [Item, Item]): [Item, Item] {
        if(items[0].row === items[1].row) {
            if(items[0].col > items[1].col)
                items = [items[1], items[0]];
        }

        return items;
    }
    
    protected deleteItem(items: [Item, Item]): void {
        items = this.sortItems(items);
        items.forEach(item => {
            this.deleteItemInListID(item);
            this.remount -=1 ;
            item.id = -1
            item.state = STATE.CLOSED;
            // item.stopAllAction();
            this.movingItem(item);
            // Sau khi dịch chuyển bản thân nó có STATE mới 
            item.handleState(item.state);

            //Vì tham chiếu, khi thay đổi handleState id bị thay đổi nên cấn resert lại
            this.saveItemSameID(this.board.matrixItems);
        })

        this.stopSuggestTween();
        this.handleAfterDelete();
    }
    
    protected movingItem(item: Item): void {
        let _board = this.board.matrixItems;
        for(let i=item.col; i>0; i--) { 
            _board[item.row][i].changeData(_board[item.row][i-1]);      
            if(_board[item.row][i-1].id === -1) {
                _board[item.row][i].handleState(_board[item.row][i].state);
                break;
            }
        }
    }
}

