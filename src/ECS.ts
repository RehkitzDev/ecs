import { Entity } from "./Entity";
import { System } from "./System";

export class ECS{
    
    private systems: Array<System>;
    private entities: Map<string, Entity>;

    constructor(){
        this.entities = new Map<string,Entity>();
        this.systems = new Array<System>();
    }


    public getEntityById(id: string): Entity | null{
        if(this.entities.has(id))
            return this.entities.get(id)!;
        return null;
    }

    public addEntity(entity: Entity){
        if(!this.entities.has(entity.id)){
            this.entities.set(entity.id,entity);

            // maybe entity braucht das ecs ka hier machen dann

            this.systems.forEach(system => {
                if(system.test(entity))
                    system.addEntity(entity);
            });

        }
    }

    public removeEntity(entity: Entity): boolean{
        return this.entities.delete(entity.id);
    }

    public addSystem(system: System){
        this.systems.push(system);
        system.init();

        this.entities.forEach((entity: Entity, id: string) => {
            if(system.test(entity))
                system.addEntity(entity);
        })
    }

    public removeSystem(system: System){
        this.systems = this.systems.filter(s => s != system);
    }

    public update(elapsedTime: number){

        this.entities.forEach((entity: Entity, id: string) => {
            entity.getSystems().forEach(system => {
                system.update(entity,elapsedTime);
            });
        });

    }

}