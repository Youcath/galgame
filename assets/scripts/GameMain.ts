import { _decorator, Component, director, find, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    start() {
    }

    update(deltaTime: number) {
        
    }

    backHome() {
        director.loadScene("menu");
    }

}


