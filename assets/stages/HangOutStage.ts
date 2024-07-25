import { EVENT_ENUM } from "../enum";
import DataManager from "../runtime/DataManager";
import EventManager from "../runtime/EventManager";
import { BasicStage } from "./BasicStage";

export class HangOutStage extends BasicStage {
    makeStageUI(): void {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_PLAYER);
        EventManager.Instance.emit(EVENT_ENUM.CLEAR_BUTTONS);

        EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.textInfo[this.infoIdx]);
    }

    performClick(): void {
        if (++this.infoIdx < this.stageInfo.textInfo.length) {
            EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.textInfo[this.infoIdx]);
        } else if (this.infoIdx == this.stageInfo.textInfo.length) {
            this.prepareNextEvent();
        }
    }

    private prepareNextEvent() {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.finalText[0]);
        let money = Math.round(2 + Math.random() * 3); // 花销 2 ~ 5

        let text = `今天吃饭花掉${money}。`;
        EventManager.Instance.emit(EVENT_ENUM.SHOW_DIALOG, text, this, "走吧", this.toNextStage);
        DataManager.Instance.addMoney(-money);
    }

    toNextStage() {
        EventManager.Instance.emit(EVENT_ENUM.DISMISS_DIALOG);

        let r = Math.random();
        if (r < 0.5) {
            // 意外受伤
            DataManager.Instance.appendHurtEvent(this.dayInfo.index);
        } else {
            // 意外捡钱
            DataManager.Instance.appendPickMoneyEvent(this.dayInfo.index);
        }
        EventManager.Instance.emit(EVENT_ENUM.SWITCH_STAGE);
        this.reset();
    }
}