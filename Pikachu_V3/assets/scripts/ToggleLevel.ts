import { _decorator, Component, Node, ToggleContainer, EventHandler, Toggle } from 'cc';
import { Board } from './Board';
import { Level1 } from './level/Level1';
import { Level2 } from './level/Level2';
import { Level3 } from './level/Level3';
import { Level4 } from './level/Level4';
import { Level5 } from './level/Level5';
const { ccclass, property } = _decorator;

@ccclass('ToggleLevel')
export class ToggleLevel extends Component {
    @property(Toggle)
    allLevel: Toggle[] = [];
    isMenu: boolean = false;
    onLoad() { 
    }

    start() {
        console.log(this.allLevel);
        this.displayLevel(this.allLevel);
    }

    update(deltaTime: number) {
        
    }
    
    handleCheck(event: Event) {
        this.isMenu = !this.isMenu;
        console.log(this.isMenu);
        this.isMenu ? this.displayAllLevel(this.allLevel) : this.displayLevel(this.allLevel) ;
        // this.node.active = this.isMenu;
    }

    displayLevel(level: Toggle[]) {
        for (let idx = 0; idx < level.length; idx++) {
            const tg = level[idx];
            if(tg.isChecked === false) 
                tg.node.active = false;
            else
            {
                switch (idx) {
                    case 0:
                        Board.Inst.level = new Level1();
                        break;
                    case 1:
                        Board.Inst.level = new Level2();
                        break;
                    case 2:
                        Board.Inst.level = new Level3();
                        break;
                    case 3:
                        Board.Inst.level = new Level4();
                        break;
                    case 4:
                        Board.Inst.level = new Level5();                  
                        break;
                }
            }
        }        
    }

    displayAllLevel(level: Toggle[]) {
        level.forEach(tg => {
            tg.node.active = true;
        });        
    }
}


