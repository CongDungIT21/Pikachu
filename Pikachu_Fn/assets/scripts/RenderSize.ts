import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Size } from './Size';
const { ccclass, property } = _decorator;

interface ISize {
    type: number,
    name: string
    row: number,
    col: number
}

const allSize : ISize[] = [
    {
        type: 1,
        name: "Nomal",
        row: 4,
        col: 6
    },
    {
        type: 2,
        name: "Medium",
        row: 6,
        col: 8
    },
    {
        type: 3,
        name: "Hard",
        row: 8,
        col: 10
    },    
]

@ccclass('RenderSize')
export class RenderSize extends Component {
    @property(Prefab)
    size: Prefab = null;

    start() {
        console.log("Start Render Size");
        allSize.forEach(ele => {
            let _size = instantiate(this.size);
            this.node.addChild(_size);
            _size.getComponent(Size).initSize(ele);
        })
    }
}


