import { editorExtrasTag } from "cc";
import { EventType, DayInfo, StageInfo } from "../data";
import { EVENT_ENUM } from "../enum";
import EventManager from "../runtime/EventManager";
import { BasicStage } from "../stages/BasicStage";
import { MainStage } from "../stages/MainStage";
import { WorkStage } from "../stages/WorkStage";
import { HangOutStage } from "../stages/HangOutStage";
import { PickMoneyStage } from "../stages/PickMoneyStage";
import { HurtStage } from "../stages/HurtStage";

// 搭建所有场景和事件的工具
export class StageManager {
    private static stageMap: Map<EventType, BasicStage>;
    static {
        StageManager.stageMap = new Map<EventType, BasicStage>();
        StageManager.stageMap.set(EventType.HOME, new MainStage());
        StageManager.stageMap.set(EventType.WORKING, new WorkStage());
        StageManager.stageMap.set(EventType.HANGOUT, new HangOutStage());
        StageManager.stageMap.set(EventType.PICK_MONEY, new PickMoneyStage());
        StageManager.stageMap.set(EventType.HURT, new HurtStage());
    }
    static makeStage(dayInfo: DayInfo) {
        if (!dayInfo || dayInfo.events.length <= 0) {
            return;
        }

        EventManager.Instance.emit(EVENT_ENUM.UPDATE_DAY, dayInfo.index);

        let eventInfo = dayInfo.events[dayInfo.events.length - 1];
        StageManager.stageMap.get(eventInfo.eventType).init(dayInfo, eventInfo);
        StageManager.stageMap.get(eventInfo.eventType).makeStageUI();

    }

    static performClick(dayInfo: DayInfo) {
        if (!dayInfo || dayInfo.events.length <= 0) {
            return;
        }
        
        let eventInfo = dayInfo.events[dayInfo.events.length - 1];
        StageManager.stageMap.get(eventInfo.eventType).performClick();
    }

    static reset() {
        StageManager.stageMap.forEach((v, k) => {
            v.reset();
        });
    }
}

