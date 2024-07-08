import { _decorator, Component, Node } from 'cc';
import { SelfInfo } from '../data/SelfInfo';
import { NpcInfo } from '../data/NpcInfo';
const { ccclass, property } = _decorator;

@ccclass('GameData')
export class GameData extends Component {
    roleData: SelfInfo;

    girl1Data: NpcInfo;

    init() {
        this.roleData = new SelfInfo();
        this.roleData.goodness = 0;
        this.roleData.hp = 10;
        this.roleData.money = 10;

        this.girl1Data = new NpcInfo();
        this.girl1Data.goodwill = 0;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


