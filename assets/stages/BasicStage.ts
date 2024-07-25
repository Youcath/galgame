import { DayInfo, EventType, StageInfo } from "../data";

export abstract class BasicStage {
    protected dayInfo: DayInfo;
    protected stageInfo: StageInfo;
    protected infoIdx = 0;
    protected finalIdx = -1;
    constructor() {
    }
    init(dayInfo: DayInfo, stageInfo: StageInfo) {
        this.stageInfo = stageInfo;
        this.dayInfo = dayInfo;
    }

    reset() {
        this.stageInfo = null;
        this.dayInfo = null;
        this.infoIdx = 0;
        this.finalIdx = -1;

        console.log("reset " + this);
    }
    abstract makeStageUI(): void;

    abstract performClick(): void;
}


