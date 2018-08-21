import { System } from "./System";
export declare class Entity {
    private _id;
    private components;
    private systems;
    readonly id: string;
    constructor();
    addSystem(system: System): void;
    removeSystem(system: System): void;
    getSystems(): Array<System>;
    addCompoment(component: Object): void;
    getComponent<T>(componentClass: {
        new (): T;
    }): T | null;
    dispose(): void;
    hasComponents1<T1>(c1: {
        new (): T1;
    }): boolean;
    hasComponents2<T1, T2>(c1: {
        new (): T1;
    }, c2: {
        new (): T2;
    }): boolean;
    hasComponents3<T1, T2, T3>(c1: {
        new (): T1;
    }, c2: {
        new (): T2;
    }, c3: {
        new (): T3;
    }): boolean;
}
