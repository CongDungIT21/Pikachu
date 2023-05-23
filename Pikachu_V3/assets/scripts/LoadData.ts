import { _decorator, Component, Node, resources, SpriteFrame, director } from 'cc';
import { DataGame } from './DataGame';
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
                DataGame.getInstance().setImgItems(_list);
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
                DataGame.getInstance().setImgNodes(_list);
            }            
        });
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


