import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataGame')
export class DataGame extends Component {
    private static dataGame: DataGame = null;
    private static imgItems: SpriteFrame[] = null;
    private static imgNodes: SpriteFrame[] = null;

    public static getInstance(): DataGame {
        if(DataGame.dataGame === null)
            DataGame.dataGame = new DataGame();
        return DataGame.dataGame;
    }

    public setImgItems(imgItems: SpriteFrame[]) {
        DataGame.imgItems = imgItems;
    }

    public getImgItems(): SpriteFrame[] {
        return DataGame.imgItems;
    }

    public setImgNodes(imgNodes: SpriteFrame[]) {
        DataGame.imgNodes = imgNodes;
    }

    public getImgNodes(): SpriteFrame[] {
        return DataGame.imgNodes;
    }   
}


