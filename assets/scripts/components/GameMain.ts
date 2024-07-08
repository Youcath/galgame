import { _decorator, Component, director, find, Node } from 'cc';
import { GameData } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    gameData: GameData;

    start() {
       
        this.gameData =  find("menu").getChildByName("GameData").getComponent(GameData);
    }

    update(deltaTime: number) {
        
    }


}


