import { _decorator, Button, Component, director, EventTouch, find, Input, input, instantiate, Label, math, Node, Prefab, RichText, Sprite } from 'cc';
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
    @property(Node) buttonContainer: Node;
    @property(Prefab) selectionPrefab: Prefab;

    onLoad(): void {
        EventManager.Instance.on(EVENT_ENUM.SHOW_PLAYER, this.showPlayerUI, this);
        EventManager.Instance.on(EVENT_ENUM.SHOW_NPC, this.showNpcUI, this);
        EventManager.Instance.on(EVENT_ENUM.UPDATE_DAY, this.updateDay, this);
        EventManager.Instance.on(EVENT_ENUM.SHOW_INFORMATION, this.showInformation, this);
        EventManager.Instance.on(EVENT_ENUM.SWITCH_STAGE, this.makeStage, this);
        EventManager.Instance.on(EVENT_ENUM.CLEAR_BUTTONS, this.clearButtons, this);
        EventManager.Instance.on(EVENT_ENUM.BIND_BUTTON, this.bindButton, this);
        EventManager.Instance.on(EVENT_ENUM.SHOW_DIALOG, this.showDialog, this);
        EventManager.Instance.on(EVENT_ENUM.DISMISS_DIALOG, this.dismissDialog, this);
        EventManager.Instance.on(EVENT_ENUM.GAME_OVER, this.gameOver, this);
    }

    start() {
        this.makeStage();
        input.on(Input.EventType.TOUCH_START, this.onTouch, this);
    }

    makeStage() {
        this.dismissDialog();
        let records = DataManager.Instance.gameInfo.records;
        if (records.length > 0) {
            StageManager.makeStage(records[records.length - 1]);
        }
    }

    backHome() {
        director.loadScene("menu");
    }

    rollbackToYesterday() {
        console.log("ytyt rollback To Yesterday!");
        DataManager.Instance.rollbackRecord();
        this.makeStage();
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
        // if (this.dialogNode.active == true) {
        //     this.dialogNode.active = false;
        //     return;
        // }
        let records = DataManager.Instance.gameInfo.records;
        if (records.length > 0) {
            StageManager.performClick(records[records.length - 1]);
        }
    }

    clearButtons() {
        this.buttonContainer.destroyAllChildren();
    }

    bindButton(text: string, callback: (Button) => void, target?: any) {
        let selectionNode = instantiate(this.selectionPrefab);
        selectionNode.on(Button.EventType.CLICK, callback, target);

        let label = selectionNode.getChildByName('Label').getComponent(Label);
        label.string = text;

        this.buttonContainer.addChild(selectionNode);
    }

    showDialog(text: string, target?: any, button1?: string, callback1?: (Button?) => void, button2?: string, callback2?: (Button?) => void) {
        if (text && text.length > 0) {
            this.dialogNode.active = true;

            this.dialogNode.getChildByName('Label').getComponent(RichText).string = text;

            let button1Node = this.dialogNode.getChildByName('Button1');
            let button2Node = this.dialogNode.getChildByName('Button2');
            button1Node.active = false;
            button2Node.active = false;

            if (button1 && button1.length > 0) {
                // 有右下角第一个按钮
                button1Node.active = true;
                if (callback1) {
                    button1Node.once(Button.EventType.CLICK, callback1, target);
                } else {
                    button1Node.once(Button.EventType.CLICK, this.onTouch, this);
                }

                let label = button1Node.getChildByName('Label').getComponent(Label);
                label.string = button1;
            }
            if (button2 && button2.length > 0) {
                // 有左下角第二个按钮
                button2Node.active = true;
                if (callback2) {
                    button2Node.once(Button.EventType.CLICK, callback2, target);
                } else {
                    button2Node.once(Button.EventType.CLICK, this.onTouch, this);
                }

                let label = button2Node.getChildByName('Label').getComponent(Label);
                label.string = button2;
            }
        }
    }

    dismissDialog() {
        this.dialogNode.active = false;
    }

    gameOver() {
        this.showDialog("你倒在路边，再也没有站起来。", this, "领盒饭", this.backHome);
    }
}


