import { EVENT_ENUM } from "../enum";
import DataManager from "../runtime/DataManager";
import EventManager from "../runtime/EventManager";
import { BasicStage } from "./BasicStage";

export class PickMoneyStage extends BasicStage {
    money: number;
    makeStageUI(): void {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_PLAYER);
        EventManager.Instance.emit(EVENT_ENUM.CLEAR_BUTTONS);

        EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.textInfo[this.infoIdx]);
    }

    performClick(): void {
        if (this.finalIdx >= 0) {
            if (++this.finalIdx < this.stageInfo.finalText.length) {
                EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.finalText[this.finalIdx]);
            } else if (this.finalIdx == this.stageInfo.finalText.length) {
                this.toNextDay();
            }
            return;
        }
        if (++this.infoIdx < this.stageInfo.textInfo.length) {
            EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.textInfo[this.infoIdx]);
        } else if (this.infoIdx == this.stageInfo.textInfo.length) {
            this.appearChoices();
        }
    }

    private appearChoices() {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.finalText[0]);
        this.money = Math.round(12 + Math.random() * 8); // 花销 12 ~ 20

        let text = `这些钱足足有${this.money}。`;
        EventManager.Instance.emit(EVENT_ENUM.SHOW_DIALOG, text, this, "据为己有", this.takeMoney, "上交归还", this.returnMoney);
    }

    takeMoney() {
        EventManager.Instance.emit(EVENT_ENUM.DISMISS_DIALOG);
        DataManager.Instance.addMoney(this.money);
        DataManager.Instance.addGoodness(-this.money);
        EventManager.Instance.emit(EVENT_ENUM.COMPARE_GOODNESS);
        this.stageInfo.finalText.push("默默收进口袋，高高兴兴回家。");
        this.stageInfo.finalText.push("今天真走运。");
        this.finalIdx = 0;
        this.performClick();
    }

    returnMoney() {
        EventManager.Instance.emit(EVENT_ENUM.DISMISS_DIALOG);
        DataManager.Instance.addGoodness(this.money * 2);
        EventManager.Instance.emit(EVENT_ENUM.COMPARE_GOODNESS);
        this.stageInfo.finalText.push("这钱不属于自己，需要还给失主。");
        this.stageInfo.finalText.push("把钱交给了警察叔叔，叔叔给你点赞。");
        this.finalIdx = 0;
        this.performClick();
    }

    toNextDay() {
        DataManager.Instance.appendNewDay();
        EventManager.Instance.emit(EVENT_ENUM.SWITCH_STAGE);
        this.reset();
    }
}

