import { _decorator, Component, Node, Toggle, ToggleContainer, Button, AudioSource, AudioClip } from 'cc';
import { ConfigGame } from './ConfigGame';
import { UIController } from './UIController';
const { ccclass, property } = _decorator;

@ccclass('Setting')
export class Setting extends Component {
    @property(Toggle)
    sizes: Toggle[] = [];
    // @property(Toggle)
    // levels: Toggle[] = [];
    @property(Button)
    home: Button = null;
    @property(Button)
    defaultValue: Button = null;

    private configGame: ConfigGame = null;
    private uiControl: UIController = null;
    start() {
        this.configGame = ConfigGame.getInstance();
        this.uiControl = UIController.inst;
        this.addSizeEvent();
        // this.addLevelEvent();
    }

    update(deltaTime: number) {
        
    }
    
    handleDefaultValue() {
        this.resertSize();
        //this.resertLevel();
    }

    handleBackHome() {
        this.uiControl.displayScreenStart();
    }

    addSizeEvent() {
        this.sizes[0].node.on(Button.EventType.CLICK, function(event){
            this.configGame.size = [4, 6];
        }, this)

        this.sizes[1].node.on(Button.EventType.CLICK, function(event){
            this.configGame.size = [6, 8];
        }, this)

        this.sizes[2].node.on(Button.EventType.CLICK, function(event){
            this.configGame.size = [8, 10];
        }, this)
    }

    // addLevelEvent() {
    //     this.levels[0].node.on(Button.EventType.CLICK, function(event){
    //         this.configGame.level = new Level0();
    //     }, this);

    //     this.levels[1].node.on(Button.EventType.CLICK, function(event){
    //         this.configGame.level = new Level1();
    //     }, this);

    //     this.levels[2].node.on(Button.EventType.CLICK, function(event){
    //         this.configGame.level = new Level2();
    //     }, this);

    //     this.levels[3].node.on(Button.EventType.CLICK, function(event){
    //         this.configGame.level = new Level3();
    //     }, this);

    //     this.levels[4].node.on(Button.EventType.CLICK, function(event){            
    //         this.configGame.level = new Level4();
    //     }, this);
    // }

    resertSize() {
        this.sizes[0].isChecked = true;
        this.configGame.size = [5, 7];
    }

    // resertLevel() {
    //     this.levels[0].isChecked = true;
    //     this.configGame.level = new Level0();
    // }
}


