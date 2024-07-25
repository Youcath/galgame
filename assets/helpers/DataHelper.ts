
import { EventType, GameEventInfo, GameInfo, NpcInfo, PlayerInfo, StageInfo } from "../data"

// 用于构造各种详细数据，需要尽量改造成可配置的形式
export class DataHelper {
    static makeBeginningGame(): GameInfo {

        let firstStage: StageInfo = {
            index: 1,
            player: this.newBeginningPlayer(),
            npcs: this.newBeginningNpcs(),
            events: [this.makeFirstMainEvent()]
        }
        return {
            player: this.newBeginningPlayer(),
            npcs: this.newBeginningNpcs(),
            records: [firstStage]
        };
    }

    static newBeginningPlayer(): PlayerInfo {
        return new PlayerInfo(10, 10, 0);
    }

    static newBeginningNpcs(): Array<NpcInfo> {
        return [new NpcInfo("Alice", 0)];
    }

    static makeFirstMainEvent(): GameEventInfo {
        return {
            eventType: EventType.HOME,
            textInfo: ["昨天刚搬到这个小镇，今天要不出去转转。", "今天做些什么呢......."],
            npc: null,
            finalText: null
        };
    }

    static makeMainStage(day: number): StageInfo {
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

    static makeWorkEvent(): GameEventInfo {
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

}


