
export class SelfInfo {
    hp: number; // 血量
    money: number; // 钱
    goodness: number; // 善恶值
}

export class NpcInfo {
    goodwill: number; // 好感度
}

export interface StageInfo {
    player: SelfInfo
    npcs: Array<NpcInfo>
}


export default StageInfo;

