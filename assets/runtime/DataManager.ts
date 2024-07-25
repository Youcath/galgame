import Singleton from "../base/Singleton";
import { GameInfo, NpcInfo } from "../data";
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
        if (l > 1) {
            this.gameInfo.records.pop();
            let stage = this.gameInfo.records[this.gameInfo.records.length - 1];
            this.gameInfo.npcs = stage.npcs;
            this.gameInfo.player = stage.player;
            const event = stage.events[0];
            stage.events = new Array();
            stage.events.push(event);
        }
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
        stage.player = this.gameInfo.player.clone();
        let bak = new Array<NpcInfo>()
        this.gameInfo.npcs.forEach(v => {
            bak.push(v.clone());
        });
        stage.npcs = bak;

        this.gameInfo.records.push(stage);
    }
}
