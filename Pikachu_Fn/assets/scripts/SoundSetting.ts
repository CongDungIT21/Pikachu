import { _decorator, Component, Node, SpriteFrame, Toggle, Sprite, Button } from 'cc';
import { AudioHandle } from './AudioHandle';
import { ConfigGame } from './ConfigGame';
const { ccclass, property } = _decorator;

@ccclass('SoundSetting')
export class SoundSetting extends Component {
    @property(Node)
    menuSoundSetting: Node = null;
    @property(SpriteFrame)
    imgOpenSetiing: SpriteFrame = null;
    @property(SpriteFrame)
    imgCloseSetiing: SpriteFrame = null;
    
    private allSetting: Toggle[] = [];
    private isOpened: boolean = false;
    private configGame: ConfigGame = null;
    public static inst: SoundSetting = null;

    onLoad() {
        SoundSetting.inst = this;
        this.configGame = ConfigGame.getInstance();
        this.allSetting = this.getComponentsInChildren(Toggle);
    }

    start() {
        this.node.on(Button.EventType.CLICK, this.handleClickSoundSetting, this);
        this.loadDefaultSettings();
    }

    update(deltaTime: number) {
        
    }

    loadDefaultSettings() {        
        this.allSetting.forEach(toggle => toggle.isChecked = true);
    }

    handleClickSoundSetting(event) {
        if(this.isOpened) {
            this.closeSetting();
        }
        else {
            this.openSetting();
        }
    }

    openSetting() {
        this.menuSoundSetting.active = true;
        this.node.getComponent(Sprite).spriteFrame = this.imgCloseSetiing;
        this.isOpened = true;
    }

    closeSetting() {
        this.updateSetting();
        this.menuSoundSetting.active = false;
        this.node.getComponent(Sprite).spriteFrame = this.imgOpenSetiing;
        this.isOpened = false;
    }

    updateSetting() {
        this.allSetting.forEach((vl, idx) => {
            if(vl.isChecked) {
                this.configGame.sound[idx] = true;
            }
            else {
                this.configGame.sound[idx] = false;
            }
        })
        AudioHandle.inst.updateSetting();
    }
}


