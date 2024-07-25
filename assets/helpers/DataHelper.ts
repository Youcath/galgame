
import { EventType, DayInfo, GameInfo, NpcInfo, PlayerInfo, StageInfo } from "../data"

// 用于构造各种详细数据，需要尽量改造成可配置的形式
export class DataHelper {
    static makeBeginningGame(): GameInfo {

        let firstDay: DayInfo = {
            index: 1,
            player: this.newBeginningPlayer(),
            npcs: this.newBeginningNpcs(),
            events: [this.makeFirstMainEvent()]
        }
        return {
            player: this.newBeginningPlayer(),
            npcs: this.newBeginningNpcs(),
            records: [firstDay]
        };
    }

    static newBeginningPlayer(): PlayerInfo {
        return new PlayerInfo(10, 10, 0);
    }

    static newBeginningNpcs(): Array<NpcInfo> {
        return [new NpcInfo("Alice", 0)];
    }

    static makeFirstMainEvent(): StageInfo {
        return {
            eventType: EventType.HOME,
            textInfo: ["昨天刚搬到这个小镇，今天要不出去转转。", "今天做些什么呢......."],
            npc: null,
            finalText: null
        };
    }

    static makeMainStage(day: number): DayInfo {
        return {
            index: day,
            player: null,
            npcs: null,
            events: [{
                eventType: EventType.HOME,
                textInfo: ["起床了", "又是新的一天", "今天做些什么呢......."],
                npc: null,
                finalText: null
            }]
        };
    }

    static makeWorkEvent(): StageInfo {
        let r = Math.random();
        if (r < 0.5) {
            return {
                eventType: EventType.WORKING,
                textInfo: ["工地在招短工", "搬一天砖好了", "......"],
                finalText: ["累死了手还受伤了，看看拿到多少钱"],
                npc: null
            };
        } else {
            return {
                eventType: EventType.WORKING,
                textInfo: ["送外卖有活", "今天出去跑一跑，送外卖吧", "没有车，就用跑的吧", "......"],
                finalText: ["差点被车撞到了，看看今天赚了多少钱"],
                npc: null
            };
        }
    }

    static makeHangOutEvent(): StageInfo {
        let r = Math.random();
        if (r < 0.5) {
            return {
                eventType: EventType.HANGOUT,
                textInfo: ["去商场转转", "人来人往，好像没人注意到我", "在凳子上坐了很久"],
                finalText: ["一抬头，出现在眼前的是......"],
                npc: null
            };
        } else {
            return {
                eventType: EventType.HANGOUT,
                textInfo: ["去走街窜巷", "人来人往，好像没人注意到我", "晃荡了半天"],
                finalText: ["下个路口出现在眼前的是......"],
                npc: null
            };
        }
    }

    
    static makePickMoneyEvent(): StageInfo {
        let r = Math.random();
        if (r < 0.5) {
            return {
                eventType: EventType.PICK_MONEY,
                textInfo: ["楼梯的角落发现一沓钞票", "迅速走过去踩在脚底"],
                finalText: ["这钱怎么处理呢......"],
                npc: null
            };
        } else {
            return {
                eventType: EventType.PICK_MONEY,
                textInfo: ["天上飘来一张纸片，掉在了我的领口里", "拿出来一看，居然是一张钞票", "身边好像没人注意到"],
                finalText: ["这钱怎么处理呢......"],
                npc: null
            };
        }
    }

    static makeHurtEvent(): StageInfo {
        let r = Math.random();
        if (r < 0.5) {
            return {
                eventType: EventType.HURT,
                textInfo: ["突然感到一阵晕眩", "被人送到了医院", "......"],
                finalText: ["居然染上了不知名的病症"],
                npc: null
            };
        } else {
            return {
                eventType: EventType.HURT,
                textInfo: ["突然脑袋一阵剧痛", "倒在了地上，就断片了。", "醒来就在医院病床上", "......"],
                finalText: ["被高空抛物砸到了，幸好对方赔偿了医药费。"],
                npc: null
            };
        }
    }
}


