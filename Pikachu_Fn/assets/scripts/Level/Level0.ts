import { _decorator, Component, Node } from 'cc';
import { Item, STATE } from '../Item';
import { Level } from './Level';
const { ccclass, property } = _decorator;

@ccclass('Level0')
export class Level0 extends Level {
    protected initTime(): void {
        this.scoreHandler.setTimeDefault((this.configGame.size[0] + this.configGame.size[1]) * 2);
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

        this.handleAfterDelete();
    }
    
    protected movingItem(item: Item): void {
        return;
    }
}


