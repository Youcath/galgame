
import { EVENT_ENUM } from "../enum";
import DataManager from "../runtime/DataManager";
import EventManager from "../runtime/EventManager";
import { BasicStage } from "./BasicStage";


export class WorkStage extends BasicStage {
    makeStageUI() {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_PLAYER);
        EventManager.Instance.emit(EVENT_ENUM.CLEAR_BUTTONS);

        EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.eventInfo.textInfo[this.infoIdx]);
    }

    performClick() {
        if (++this.infoIdx < this.eventInfo.textInfo.length) {
            EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.eventInfo.textInfo[this.infoIdx]);
        } else if (this.infoIdx == this.eventInfo.textInfo.length) {
            this.settleAcount();
        }
    }

    settleAcount() {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.eventInfo.finalText[0]);

        let damage = Math.round(0.5 + Math.random() * 2); // 损失的健康值  1~2
        let money = Math.round(3 + Math.random() * 7); // 赚的钱 3 ~ 10

        let text = `今天赚到${money}，但消耗了${damage}健康。`;
        EventManager.Instance.emit(EVENT_ENUM.SHOW_DIALOG, text, this, "收下", this.toNextDay);
        DataManager.Instance.addMoney(money);
        DataManager.Instance.addHp(-damage);
    }

    toNextDay() {
        EventManager.Instance.emit(EVENT_ENUM.DISMISS_DIALOG);
        if (DataManager.Instance.gameInfo.player.hp <= 0) {
            EventManager.Instance.emit(EVENT_ENUM.GAME_OVER);
            return;
        }
        DataManager.Instance.appendNewDay();
        EventManager.Instance.emit(EVENT_ENUM.SWITCH_STAGE);
        this.reset();
    }
}


