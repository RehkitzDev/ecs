"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Entity {
    get id() {
        return this._id;
    }
    constructor() {
        this._id = uuid_1.v1();
        this.components = new Map();
        this.systems = new Array();
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
    addCompoment(component) {
        if (!this.components.has(component.constructor.name))
            this.components.set(component.constructor.name, component);
        else
            console.log("component exists already");
    }
    getComponent(componentClass) {
        if (this.components.has(componentClass.name))
            return this.components.get(componentClass.name);
        return null;
    }
    dispose() {
        this.systems.forEach((system) => {
            system.removeEntity(this);
        });
    }
    hasComponents1(c1) {
        return this.components.has(c1.name);
    }
    hasComponents2(c1, c2) {
        return this.components.has(c1.name) && this.components.has(c2.name);
    }
    hasComponents3(c1, c2, c3) {
        return this.components.has(c1.name) && this.components.has(c2.name) && this.components.has(c3.name);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map