import { Entity } from "./Entity";

export abstract class System{
    
    public enable: boolean;
    private entities: Map<string, Entity>;

    constructor(){
        this.entities = new Map<string,Entity>();
        this.enable = true;
    }

    public addEntity(entity: Entity){
        if(!this.entities.has(entity.id)){
            this.entities.set(entity.id,entity);
            entity.addSystem(this);

            this.enter(entity);
        }
    }

    public removeEntity(entity: Entity){
        if(this.entities.has(entity.id)){
            entity.removeSystem(this);
            this.exit(entity);
        }
    }

    public dispose(){
        this.entities.forEach((entity: Entity, id: string) => {
            entity.removeSystem(this);
            this.exit(entity);
        })
    }

    abstract init(): void;
    abstract test(entity: Entity): boolean;
    abstract enter(entity: Entity): void;
    abstract exit(entity: Entity): void;
    abstract update(entity: Entity, elapsedTime: number): void;

}