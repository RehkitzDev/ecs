import { Entity } from "./Entity";
export declare abstract class System {
    enable: boolean;
    private entities;
    constructor();
    addEntity(entity: Entity): void;
    removeEntity(entity: Entity): void;
    dispose(): void;
    abstract init(): void;
    abstract test(entity: Entity): boolean;
    abstract enter(entity: Entity): void;
    abstract exit(entity: Entity): void;
    abstract update(entity: Entity, elapsedTime: number): void;
}
