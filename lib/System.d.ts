import { Entity } from "./Entity";
import { ECS } from "./ECS";
export declare abstract class System {
    private ecs;
    enable: boolean;
    private entities;
    constructor(ecs: ECS);
    addEntity(entity: Entity): void;
    removeEntity(entity: Entity): void;
    dispose(): void;
    abstract init(): void;
    abstract test(entity: Entity): boolean;
    abstract enter(entity: Entity): void;
    abstract exit(entity: Entity): void;
    abstract update(entity: Entity, elapsedTime: number): void;
}
