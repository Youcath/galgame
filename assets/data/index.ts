
export class PlayerInfo {
    hp: number; // 血量
    money: number; // 钱
    goodness: number; // 善恶值
}

export class NpcInfo {
    name: string;
    goodwill: number; // 好感度
}

// 事件信息，不同的UI都对应不同的一个事件，界面显示可以根据该信息完整确定
export interface GameEventInfo {
    eventType: EventType;
    npc: NpcInfo;
    textInfo: Array<string>;   // 场景介绍的文案
    finalText: Array<string>; // 用于展示场景的结果
}

// 场景信息，以天/回合为单位，作为可以回退的基本单位
// 有确定的事件信息
export interface StageInfo {
    index: number;  // 第几天，从1开始
    player: PlayerInfo; // 这天开始时的玩家数据
    npcs: Array<NpcInfo>; // 这天开始时的NPC数据
    events: GameEventInfo[];
}

// 具体事件类型
export enum EventType {
    HOME = "home",   // 基本界面，一天选择的开始

    WORKING = "work",    // 打工事件
    HANGOUT = "hangout",    // 闲逛事件，准备随机遭遇

    PICK_MONEY = "pickMoney",  // 捡钱事件
    SICK = "sick",  // 生病事件
    HURT = "hurt", // 受伤事件

    MEET_NPC = "meetNpc", // 偶遇NPC


}


// 每个操作周期的记录信息
export type IRecord = StageInfo;

// 游戏进程记录信息
export interface GameInfo {
    player: PlayerInfo;
    npcs: Array<NpcInfo>;
    records: IRecord[]; // 撤回数据
}

