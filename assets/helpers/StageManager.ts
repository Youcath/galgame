import { EventType, GameEventInfo, StageInfo } from "../data";
import { EVENT_ENUM } from "../enum";
import EventManager from "../runtime/EventManager";
import { BasicStage } from "../stages/BasicStage";
import { MainStage } from "../stages/MainStage";
import { WorkStage } from "../stages/WorkStage";

// 搭建所有场景和事件的工具
export class StageManager {
    private static stageMap: Map<EventType, BasicStage>;
    static {
        StageManager.stageMap = new Map<EventType, BasicStage>();
        StageManager.stageMap[EventType.HOME] = new MainStage();
        StageManager.stageMap[EventType.WORKING] = new WorkStage();
    }
    static makeStage(stage: StageInfo) {
        if (!stage || stage.events.length <= 0) {
            return;
        }

        EventManager.Instance.emit(EVENT_ENUM.UPDATE_DAY, stage.index);

        let eventInfo = stage.events[stage.events.length - 1];
        StageManager.stageMap[eventInfo.eventType].init(stage, eventInfo);
        StageManager.stageMap[eventInfo.eventType].makeStageUI();

    }

    static performClick(stageInfo: StageInfo) {
        if (!stageInfo || stageInfo.events.length <= 0) {
            return;
        }
        
        let eventInfo = stageInfo.events[stageInfo.events.length - 1];
        let stage = StageManager.stageMap[eventInfo.eventType] as BasicStage;
        stage.performClick();
    }
}

