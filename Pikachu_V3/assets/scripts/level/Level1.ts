import { _decorator, Component, Node } from 'cc';
import { Item, STATE } from '../Item';
import { Level } from './Level';
const { ccclass, property } = _decorator;

@ccclass('Level1')
export class Level1 extends Level{
    protected initTime(): void {
        this.scoreHandler.setTimeDefault(100);
    }
    protected sortItems(items: [Item, Item]): [Item, Item] {
        return;
    }
    
    protected deleteItem(items: [Item, Item]): void {
        items.forEach(item => {
            this.deleteItemInListID(item);
            this.remount -=1 ;
            item.id = -1
            item.state = STATE.CLOSED;
            item.changeState(STATE.CLOSED);
        })
        if(this.remount <=0 ) {
            this.scoreHandler.displayPopupWin();
            this.board.audioBackground.stop();
        }
    }
    
    protected movingItem(item: Item): void {
        return;
    }
}


