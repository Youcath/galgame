import { _decorator, Component, director, Node } from 'cc';
import DataManager from '../runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('GameMenu')
export class GameMenu extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    startGame() {
        const gameData = DataManager.Instance;
        gameData.init();
        director.loadScene("main")
    }

    resumeGame() {
        const gameData = DataManager.Instance;
        if (gameData.stageInfo == null) {
            gameData.init();
        }
        director.loadScene("main")
    }
}


