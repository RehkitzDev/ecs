import { Entity } from "./Entity";
import { System } from "./System";
export declare class ECS {
    private systems;
    private entities;
    constructor();
    getEntityById(id: string): Entity | null;
    addEntity(entity: Entity): void;
    removeEntity(entity: Entity): boolean;
    addSystem(system: System): void;
    removeSystem(system: System): void;
    update(elapsedTime: number): void;
}
