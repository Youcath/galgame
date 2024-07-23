import { GameEventInfo, StageInfo } from "../data";
import { EVENT_ENUM } from "../enum";
import EventManager from "../runtime/EventManager";
import { IStage } from "../helpers/StageManager";

export class MainStage implements IStage {
    private infoIdx = 0;
    makeStageUI(eventInfo: GameEventInfo) {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_PLAYER);

        EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, eventInfo.textInfo[this.infoIdx]);
    }

    performClick() {
        
    }
}


