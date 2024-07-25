import { EventType, GameEventInfo, StageInfo } from "../data";

export abstract class BasicStage {
    protected stageInfo: StageInfo;
    protected eventInfo: GameEventInfo;
    protected infoIdx = 0;
    constructor() {
        
    }
    init(stage: StageInfo, eventInfo: GameEventInfo) {
        this.stageInfo = stage;
        this.eventInfo = eventInfo;
    }

    reset() {
        this.stageInfo = null;
        this.eventInfo = null;
        this.infoIdx = 0;

        console.log("reset " + this);
    }
    abstract makeStageUI(): void;

    abstract performClick(): void;
}


