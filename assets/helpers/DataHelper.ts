
import { EventType, GameEventInfo, GameInfo, StageInfo } from "../data"

// 用于构造各种详细数据，需要尽量改造成可配置的形式
export class DataHelper {
    static readonly beginPlayer = {
        goodness: 0,
        hp: 10,
        money: 10
    };
    static readonly beginNpcs = [{
        name: "girl1",
        goodwill: 0
    }];
    static makeBeginningGame(): GameInfo {

        let firstStage: StageInfo = {
            index: 1,
            player: DataHelper.beginPlayer,
            npcs: DataHelper.beginNpcs,
            events: [this.makeFirstMainEvent()]
        }
        return {
            player: DataHelper.beginPlayer,
            npcs: DataHelper.beginNpcs,
            records: [firstStage]
        };
    }

    static makeFirstMainEvent(): GameEventInfo {
        return {
            eventType: EventType.HOME,
            textInfo: ["昨天刚搬到这个小镇，今天要不出去转转。", "今天做些什么呢......."],
            npc: null,
            finalText: null
        };
    }

    static makeMainStage(day: number) {
        return {
            index: day,
            player: DataHelper.beginPlayer,
            npcs: DataHelper.beginNpcs,
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
                textInfo: ["工地在招短工", "搬一天砖好了"],
                finalText: ["累死了手还受伤了，看看拿到多少钱"],
                npc: null
            };
        } else {
            return {
                eventType: EventType.WORKING,
                textInfo: ["送外卖有活", "今天跑一跑", "就送外卖吧"],
                finalText: ["差点被大车撞到了，看看今天赚了多少钱"],
                npc: null
            };
        }

    }

}


