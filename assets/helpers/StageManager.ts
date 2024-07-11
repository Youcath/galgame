import { EventType, StageInfo } from "../data";
import { EVENT_ENUM } from "../enum";
import EventManager from "../runtime/EventManager";


// 搭建所有场景和事件的工具
export class StageManager {
    static makeStage(stage: StageInfo) {
        if (!stage || stage.events.length <= 0) {
            return;
        }
        EventManager.Instance.emit(EVENT_ENUM.UPDATE_DAY, stage.index);

        let eventInfo = stage.events[stage.events.length - 1];
        switch(eventInfo.eventType) {
            case EventType.HOME:
                StageManager.makeHome();
                break;
        }
    }

    static makeHome() {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_PLAYER);
    }
}