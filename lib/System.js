"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class System {
    constructor(ecs) {
        this.ecs = ecs;
        this.entities = new Map();
        this.enable = true;
    }
    addEntity(entity) {
        if (!this.entities.has(entity.id)) {
            this.entities.set(entity.id, entity);
            entity.addSystem(this);
            this.enter(entity);
        }
    }
    removeEntity(entity) {
        if (this.entities.has(entity.id)) {
            entity.removeSystem(this);
            this.exit(entity);
        }
    }
    dispose() {
        this.entities.forEach((entity, id) => {
            entity.removeSystem(this);
            this.exit(entity);
        });
    }
}
exports.System = System;
//# sourceMappingURL=System.js.map