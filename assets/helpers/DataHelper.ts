import { EventType, GameEventInfo, GameInfo, StageInfo } from "../data"

// 用于构造各种详细数据，需要尽量改造成可配置的形式
export class DataHelper {
    static makeBeginningGame(): GameInfo {

        let firstStage: StageInfo = {
            index: 11,
            events: [this.makeMainEvent()]
        }
        return {
            player: {
                goodness: 0,
                hp: 10,
                money: 10
            },
            npcs: [{
                name: "girl1",
                goodwill: 0
            }],
            records: [firstStage]
        };
    }

    static makeMainEvent(): GameEventInfo {
        return {
            eventType: EventType.HOME,
            textInfo: ["今天做些什么呢"],
            npc: null
        };
    }


}


