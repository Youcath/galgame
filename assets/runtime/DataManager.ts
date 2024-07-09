import Singleton from "../base/Singleton";
import StageInfo, { NpcInfo } from "../data";

export type IRecord = StageInfo;

/**
 * 全局数据管理类
 */
export default class DataManager extends Singleton {
    static get Instance() {
      return super.GetInstance<DataManager>()
    }

    stageInfo: StageInfo;
    records: IRecord[]; //撤回数据

    init() {
        this.stageInfo = {
            player: {
                goodness: 0,
                hp: 10,
                money: 10
            },
            npcs: [{
                goodwill: 0
            }]
        };
    }

    reset() {
        this.stageInfo = null;
        this.records = [];
    }
}
