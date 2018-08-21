import { v1 } from "uuid";
import { System } from "./System";

export class Entity{

    private _id: string;
    private components: Map<string,Object>;
    private systems: Array<System>;

    public get id(): string{
        return this._id;
    }

    constructor(){
        this._id = v1();
        this.components = new Map<string,Object>();
        this.systems = new Array<System>();
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

    public addCompoment (component: Object): void {
        if(!this.components.has(component.constructor.name))
            this.components.set(component.constructor.name,component);
        else console.log("component exists already");
    }

    public getComponent<T> (componentClass: { new (): T }): T | null{
        if(this.components.has(componentClass.name))
            return this.components.get(componentClass.name) as T;
        
        return null;
    }

    public dispose():void{
        this.systems.forEach((system: System) => {
            system.removeEntity(this);
        })
    }

    public hasComponents1<T1>(c1:{ new (): T1 }){
        return this.components.has(c1.name);
    }

    public hasComponents2<T1,T2>(c1:{ new (): T1}, c2:{ new (): T2 }){
        return this.components.has(c1.name) && this.components.has(c2.name);
    }

    public hasComponents3<T1,T2,T3>(c1:{ new (): T1}, c2:{ new (): T2 }, c3:{ new (): T3 }){
        return this.components.has(c1.name) && this.components.has(c2.name) && this.components.has(c3.name);
    }

}