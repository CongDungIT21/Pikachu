import { _decorator, Component, Node, director, resources, SpriteFrame } from 'cc';
import { ConfigGame } from './ConfigGame';
const { ccclass, property } = _decorator;

@ccclass('LoadData')
export class LoadData extends Component {
    private static isLoadedItem: boolean = false;
    private static isLoadedBlock: boolean = false;

    onLoad() {
        resources.loadDir('items', SpriteFrame, null, function(err, spriteFrame) {
            if (err) {
                console.log("Error loading");
            }
            else {
                let _list: SpriteFrame[] = [];
                [...spriteFrame].map(e => _list.push(e as SpriteFrame));
                LoadData.isLoadedItem = true;
                ConfigGame.getInstance().imgItems = _list;
            }            
        });

        resources.loadDir('nodeImg', SpriteFrame, null, function(err, spriteFrame) {
            if (err) {
                console.log("Error loading");
            }
            else {
                let _list: SpriteFrame[] = [];
                [...spriteFrame].map(e => _list.push(e as SpriteFrame));
                LoadData.isLoadedBlock = true;
                ConfigGame.getInstance().imgNodes = _list;
            }            
        });

        // resources.loadDir('normal_level', SpriteFrame, null, function(err, spriteFrame) {
        //     if (err) {
        //         console.log("Error loading");
        //     }
        //     else {
        //         let _list: SpriteFrame[] = [];
        //         [...spriteFrame].map(e => _list.push(e as SpriteFrame));
        //         LoadData.isLoadedBlock = true;
        //         ConfigGame.getInstance().normalSpriteLevel = _list;
        //     }            
        // });

        // resources.loadDir('pressed_level', SpriteFrame, null, function(err, spriteFrame) {
        //     if (err) {
        //         console.log("Error loading");
        //     }
        //     else {
        //         let _list: SpriteFrame[] = [];
        //         [...spriteFrame].map(e => _list.push(e as SpriteFrame));
        //         LoadData.isLoadedBlock = true;
        //         ConfigGame.getInstance().pressedSpriteLevel = _list;
        //     }            
        // });
    }

    start() {

    }

    update(deltaTime: number) {
        if(LoadData.isLoadedItem && LoadData.isLoadedBlock) {
            LoadData.isLoadedItem = LoadData.isLoadedBlock = false;
            director.loadScene("Main");
        }  
    }
}


