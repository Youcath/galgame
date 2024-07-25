
import { EVENT_ENUM } from "../enum";
import DataManager from "../runtime/DataManager";
import EventManager from "../runtime/EventManager";
import { BasicStage } from "./BasicStage";


export class HurtStage extends BasicStage {
    makeStageUI() {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_PLAYER);
        EventManager.Instance.emit(EVENT_ENUM.CLEAR_BUTTONS);

        EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.textInfo[this.infoIdx]);
    }

    performClick() {
        if (++this.infoIdx < this.stageInfo.textInfo.length) {
            EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.textInfo[this.infoIdx]);
        } else if (this.infoIdx == this.stageInfo.textInfo.length) {
            this.settleAcount();
        }
    }

    settleAcount() {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.finalText[0]);

        let damage = 1; // 损失的健康值  1~5
        let text = '';
        
        if (this.stageInfo.textInfo.length <= 3) {
            // 生病
            damage = Math.round(0.6 + Math.random() * 2) // 1 ~ 3
            text = `损失了${damage}健康，还花了医药费2。`;
            DataManager.Instance.addMoney(-2);
        } else {
            // 受伤
            damage = Math.round(2.6 + Math.random() * 2) // 3 ~ 5
            text = `损失了${damage}健康。`;
        }
        
        EventManager.Instance.emit(EVENT_ENUM.SHOW_DIALOG, text, this, "回家", this.toNextDay);
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

