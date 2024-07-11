import Singleton from "../base/Singleton";
import { GameInfo, StageInfo } from "../data";
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
}
