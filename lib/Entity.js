"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Entity {
    get id() {
        return this._id;
    }
    constructor() {
        this._id = uuid_1.v1();
        this.components = new Array();
        this.systems = new Array();
    }
    getComponentIndex(type) {
        for (let i = 0; i < this.components.length; ++i) {
            const component = this.components[i];
            if (component instanceof type) {
                return i;
            }
        }
        return -1;
    }
    addSystem(system) {
        this.systems.push(system);
    }
    removeSystem(system) {
        this.systems = this.systems.filter(s => s != system);
    }
    getSystems() {
        return this.systems;
    }
    addComponent(type, ...args) {
        if (this.hasComponent(type)) {
            return this.getComponent(type);
        }
        const component = new type(...args);
        this.components.push(component);
        return component;
    }
    getComponent(type, ...args) {
        const index = this.getComponentIndex(type);
        if (index !== -1) {
            return this.components[index];
        }
        return null;
    }
    delComponent(type) {
        const component = this.getComponent(type);
        this.components.splice(this.components.indexOf(component), 1);
        return component;
    }
    dispose() {
        this.systems.forEach((system) => {
            system.removeEntity(this);
        });
    }
    hasComponent(type) {
        return this.getComponentIndex(type) !== -1;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map