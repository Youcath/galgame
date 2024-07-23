import { EventType, GameEventInfo, StageInfo } from "../data";
import { EVENT_ENUM } from "../enum";
import EventManager from "../runtime/EventManager";
import { MainStage } from "../stages/MainStage";


// 搭建所有场景和事件的工具
export class StageManager {
    private static stageMap: Map<EventType, IStage>
    static {
        StageManager.stageMap = new Map();
        StageManager.stageMap[EventType.HOME] = new MainStage();
    }
    static makeStage(stage: StageInfo) {
        if (!stage || stage.events.length <= 0) {
            return;
        }
        EventManager.Instance.emit(EVENT_ENUM.UPDATE_DAY, stage.index);

        let eventInfo = stage.events[stage.events.length - 1];
        StageManager.stageMap[eventInfo.eventType].makeStageUI(eventInfo);

    }

    static performClick(stage: StageInfo) {
        if (!stage || stage.events.length <= 0) {
            return;
        }
        
        let eventInfo = stage.events[stage.events.length - 1];
        StageManager.stageMap[eventInfo.eventType].performClick();
    }
}

export interface IStage {
    makeStageUI(eventInfo: GameEventInfo);

    performClick();
}