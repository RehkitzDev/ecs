"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ECS {
    constructor() {
        this.entities = new Map();
        this.systems = new Array();
    }
    getEntityById(id) {
        if (this.entities.has(id))
            return this.entities.get(id);
        return null;
    }
    addEntity(entity) {
        if (!this.entities.has(entity.id)) {
            this.entities.set(entity.id, entity);
            // maybe entity braucht das ecs ka hier machen dann
            this.systems.forEach(system => {
                if (system.test(entity))
                    system.addEntity(entity);
            });
        }
    }
    removeEntity(entity) {
        return this.entities.delete(entity.id);
    }
    addSystem(system) {
        this.systems.push(system);
        system.init();
        this.entities.forEach((entity, id) => {
            if (system.test(entity))
                system.addEntity(entity);
        });
    }
    removeSystem(system) {
        this.systems = this.systems.filter(s => s != system);
    }
    update(elapsedTime) {
        this.entities.forEach((entity, id) => {
            entity.getSystems().forEach(system => {
                system.update(entity, elapsedTime);
            });
        });
    }
}
exports.ECS = ECS;
//# sourceMappingURL=ECS.js.map