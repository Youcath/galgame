import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SelfInfo')
export class SelfInfo {
    hp: number; // 血量
    money: number; // 钱
    goodness: number; // 善恶值
}


