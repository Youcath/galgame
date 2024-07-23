import { _decorator, Component, director, EventTouch, find, Input, input, Label, math, Node, Prefab, RichText, Sprite } from 'cc';
import EventManager from '../runtime/EventManager';
import DataManager from '../runtime/DataManager';
import { EVENT_ENUM } from '../enum';
import { NpcInfo } from '../data';
import { StageManager } from '../helpers/StageManager';
const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    @property(Node) bgNode: Node;
    @property(Node) roleNode: Node;
    @property(Node) playerUiNode: Node;
    @property(Node) npcUiNode: Node;
    @property(Node) infoNode: Node;
    @property(Node) dialogNode: Node;
    @property(Node) dayNode: Node;
    @property(Prefab) selectionPrefab: Prefab;

    onLoad(): void {
        EventManager.Instance.on(EVENT_ENUM.SHOW_PLAYER, this.showPlayerUI, this);
        EventManager.Instance.on(EVENT_ENUM.SHOW_NPC, this.showNpcUI, this);
        EventManager.Instance.on(EVENT_ENUM.UPDATE_DAY, this.updateDay, this);
        EventManager.Instance.on(EVENT_ENUM.SHOW_INFORMATION, this.showInformation, this);
    }

    start() {
        this.makeStage();
        input.on(Input.EventType.TOUCH_START, this.onTouch, this);
    }

    makeStage() {
        let records = DataManager.Instance.gameInfo.records;
        if (records.length > 0) {
            StageManager.makeStage(records[records.length - 1]);
        }
    }

    backHome() {
        director.loadScene("menu");
    }

    showPlayerUI() {
        let playerInfo = DataManager.Instance.gameInfo.player;
        this.playerUiNode.active = true;
        this.npcUiNode.active = false;
        this.roleNode.active = false;

        this.playerUiNode.getChildByName('Health').getChildByName('value').getComponent(Label).string = playerInfo.hp.toString();
        this.playerUiNode.getChildByName('Money').getChildByName('value').getComponent(Label).string = playerInfo.money.toString();
        const goodness = playerInfo.goodness; // -100 ~ 100
        let r = 0;
        let g = 255;
        let b = 0;

        if (goodness > 0) {
            // 善恶值上升，从绿色往蓝色变化
            b = 255 * goodness / 100;
            r = 0;
            g = 255 - 255 * goodness / 100;
        } else {
            // 善恶值下降，从绿色往红色变化
            r = 255 * goodness / 100;
            b = 0;
            g = 255 - 255 * goodness / 100;
        }
        let color = new math.Color(r, g, b);
        this.playerUiNode.getChildByName('Goodness').getChildByName('splash').getComponent(Sprite).color = color;
    }

    showNpcUI(npc: NpcInfo) {
        this.playerUiNode.active = false;
        this.npcUiNode.active = true;
        this.roleNode.active = true;

        this.playerUiNode.getChildByName('Name').getComponent(Label).string = npc.name;

        let color = math.Color.WHITE;
        if (npc.goodwill < -20) {
            // 仇人 灰色
            color = math.Color.GRAY;
        } else if (npc.goodwill < 50) {
            // 陌生人 绿色
            color = math.Color.GREEN;
        } else if (npc.goodwill < 200) {
            // 朋友 蓝色
            color = math.Color.BLUE;
        } else if (npc.goodwill < 50) {
            // 恋人 黄色
            color = math.Color.YELLOW;
        } else {
            // 恋人以上 红色
            color = math.Color.RED;
        }

        this.playerUiNode.getChildByName('Goodwill').getChildByName('splash').getComponent(Sprite).color = color;
    }

    showInformation(info: string) {
        let label = this.infoNode.getChildByName('Label');
        let richText = label.getComponent(RichText);
        richText.string = info;
    }

    updateDay(day: number) {
        this.dayNode.getComponent(Label).string = `Day ${day}`;
    }

    onTouch(event: EventTouch) {
        let records = DataManager.Instance.gameInfo.records;
        if (records.length > 0) {
            StageManager.performClick(records[records.length - 1]);
        }
    }
}


