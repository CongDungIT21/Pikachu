import { _decorator, Component, Node, SpriteFrame } from 'cc';
import { Level } from './Level/Level';
import { Level0 } from './Level/Level0';
const { ccclass, property } = _decorator;

@ccclass('ConfigGame')
export class ConfigGame {
    private static configGame: ConfigGame = null;
    size: [number, number] = [4, 6];
    level: Level = new Level0();
    sound: [boolean, boolean, boolean, boolean] = [false, false, false, false];
    imgItems: SpriteFrame[] = null;
    imgNodes: SpriteFrame[] = null;

    // normalSpriteLevel: SpriteFrame[] = null;
    // pressedSpriteLevel: SpriteFrame[] = null;

    public static getInstance(): ConfigGame {
        if(ConfigGame.configGame == null) {
            this.configGame = new ConfigGame();
        }

        return ConfigGame.configGame;
    }
}


