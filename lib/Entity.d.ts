import { System } from "./System";
export interface ComponentType<T> {
    new (...args: any[]): T;
}
export declare class Entity {
    private _id;
    private components;
    private systems;
    readonly id: string;
    constructor();
    private getComponentIndex<T>(type);
    addSystem(system: System): void;
    removeSystem(system: System): void;
    getSystems(): Array<System>;
    addComponent<T>(type: ComponentType<T>, ...args: any[]): T | null;
    getComponent<T>(type: ComponentType<T>, ...args: any[]): T | null;
    delComponent<T>(type: ComponentType<T>): T;
    dispose(): void;
    hasComponent<T>(type: ComponentType<T>): boolean;
}
