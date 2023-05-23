import { _decorator, Component, Node, Prefab, SpriteFrame, instantiate, Sprite, Toggle, SpriteAtlas } from 'cc';
import { ConfigGame } from './ConfigGame';
import { HandleLevel } from './HandleLevel';
const { ccclass, property } = _decorator;

@ccclass('RenderLevel')
export class RenderLevel extends Component {
    @property(Prefab)
    level: Prefab = null;
    @property(SpriteAtlas)
    n_atlas: SpriteAtlas = null;
    @property(SpriteAtlas)
    p_atlas: SpriteAtlas = null;

    private normalSpriteLevel: SpriteFrame[] = null;
    private pressedSpriteLevel: SpriteFrame[] = null;

    onLoad() {
        this.normalSpriteLevel = this.n_atlas.getSpriteFrames();
        this.pressedSpriteLevel = this.p_atlas.getSpriteFrames();
    }

    start() {
        //for(let i=0; i<1; i++) {
        for(let i=0; i<this.normalSpriteLevel.length; i++) {
            let node = instantiate(this.level);   
            this.node.addChild(node);
            node.getComponent(HandleLevel).initLevel(i, this.normalSpriteLevel[i], this.pressedSpriteLevel[i]); 
        }
    }
}


