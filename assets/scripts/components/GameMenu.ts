import { _decorator, Component, director, Node } from 'cc';
import { GameData } from './GameData';
const { ccclass, property } = _decorator;

@ccclass('GameMenu')
export class GameMenu extends Component {
    @property(Node) gameDataNode: Node;

    start() {
        director.addPersistRootNode(this.gameDataNode);
    }

    update(deltaTime: number) {
        
    }

    startGame() {
        const gameData = this.gameDataNode.getComponent(GameData);
        gameData.init();
        director.loadScene("main")
    }

    resumeGame() {
        const gameData = this.gameDataNode.getComponent(GameData);
        if (gameData.roleData == null) {
            gameData.init();
        }
        director.loadScene("main")
    }
}


