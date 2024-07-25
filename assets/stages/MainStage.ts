import { DayInfo, StageInfo } from "../data";
import { EVENT_ENUM } from "../enum";
import EventManager from "../runtime/EventManager";
import { Button, Label } from "cc";
import DataManager from "../runtime/DataManager";
import { BasicStage } from "./BasicStage";

export class MainStage extends BasicStage {

    makeStageUI() {
        EventManager.Instance.emit(EVENT_ENUM.SHOW_PLAYER);
        EventManager.Instance.emit(EVENT_ENUM.CLEAR_BUTTONS);

        EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.textInfo[this.infoIdx]);
    }

    performClick() {
        if (++this.infoIdx < this.stageInfo.textInfo.length) {
            EventManager.Instance.emit(EVENT_ENUM.SHOW_INFORMATION, this.stageInfo.textInfo[this.infoIdx]);
        } else if (this.infoIdx == this.stageInfo.textInfo.length) {
            // 文字展示完毕，可以展示按钮了
            this.appearButtons();
        }
    }

    appearButtons() {
        EventManager.Instance.emit(EVENT_ENUM.BIND_BUTTON, "闲逛", this.clickHangOut, this);
        EventManager.Instance.emit(EVENT_ENUM.BIND_BUTTON, "搬砖", this.clickWork, this);

        let records = DataManager.Instance.gameInfo;
        records.npcs.forEach(v => {
            if (v.goodwill > 50) {
                EventManager.Instance.emit(EVENT_ENUM.BIND_BUTTON, "联系" + v.name, this.clickContact, this);
            }
        });
    }

    clickWork(b: Button) {
        console.log("ytyt clickWork");
        DataManager.Instance.appendWorkEvent(this.dayInfo.index);
        EventManager.Instance.emit(EVENT_ENUM.SWITCH_STAGE);
        this.reset();
    }

    clickHangOut(b: Button) {
        console.log("ytyt clickHangOut");
        DataManager.Instance.appendHangOutEvent(this.dayInfo.index);
        EventManager.Instance.emit(EVENT_ENUM.SWITCH_STAGE);
        this.reset();
    }

    clickContact(b: Button) {
        let name = b.node.getChildByName('Label').getComponent(Label).string;
        let npcName = name.replace("联系", "");
        console.log("ytyt clickContact " + npcName);
        let records = DataManager.Instance.gameInfo;
        let npcInfo;
        records.npcs.forEach(v => {
            if (v.name == npcName) {
                npcInfo = v;
            }
        });
        // todo 联系NPC
    }
}


