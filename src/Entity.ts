import { v1 } from "uuid";
import { System } from "./System";

export interface ComponentType<T> { new(...args: any[]): T }

export class Entity{

    private _id: string;
    private components: Array<Object>;
    private systems: Array<System>;

    public get id(): string{
        return this._id;
    }

    constructor(){
        this._id = v1();
        this.components = new Array<Object>();
        this.systems = new Array<System>();
    }

    private getComponentIndex<T>(type: ComponentType<T>): number {
        for (let i = 0; i < this.components.length; ++i) {
            const component = this.components[i];
            if (component instanceof type) {
                return i;
            }
        }
        return -1;
    }

    public addSystem(system: System){
        this.systems.push(system);
    }

    public removeSystem(system: System){
        this.systems = this.systems.filter(s => s != system);
    }

    public getSystems(): Array<System>{
        return this.systems;
    }

    public addComponent<T>(type: ComponentType<T>, ...args: any[]): T | null {
        if (this.hasComponent(type)) { return this.getComponent(type); }
        const component: T = new type(...args);
        this.components.push(component);
        return component;
    }

    public getComponent<T>(type: ComponentType<T>, ...args: any[]): T | null {
        const index: number = this.getComponentIndex(type);
        if (index !== -1) {
            return this.components[index] as T;
        }
        return null;
    }

    public removeComponent<T>(type: ComponentType<T>): T {
        const component = this.getComponent(type)!;
        this.components.splice(this.components.indexOf(component), 1);
        return component as T;
    }

    public dispose():void{
        this.systems.forEach((system: System) => {
            system.removeEntity(this);
        })
    }

    public hasComponent<T>(type: ComponentType<T>): boolean{
        return this.getComponentIndex(type) !== -1;
    }


}