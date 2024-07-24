import Singleton from "../base/Singleton";
import { GameInfo } from "../data";
import { DataHelper } from "../helpers/DataHelper";

/**
 * 全局数据管理类
 */
export default class DataManager extends Singleton {
    static get Instance() {
      return super.GetInstance<DataManager>()
    }

    gameInfo: GameInfo;


    init() {
        this.gameInfo = DataHelper.makeBeginningGame();
    }

    reset() {
        this.gameInfo = null;
    }

    // 丢掉最新的record
    rollbackRecord() {
        let l = this.gameInfo.records.length;
        this.gameInfo.records.splice(l - 1, 1);
    }

    addMoney(money: number) {
        this.gameInfo.player.money += money;
    }

    addHp(hp: number) {
        this.gameInfo.player.hp += hp;
    }

    appendWorkEvent(dayIndex: number) {
        this.gameInfo.records.forEach(v => {
            if (v.index == dayIndex) {
                v.events.push(DataHelper.makeWorkEvent());
            }
        });
    }

    appendNewDay() {
        let l = this.gameInfo.records.length;
        // 天数增加一天
        let stage = DataHelper.makeMainStage(l + 1);
        // 备份当前人物信息
        stage.player = this.gameInfo.player;
        stage.npcs = this.gameInfo.npcs;

        this.gameInfo.records.push(stage);
    }
}
