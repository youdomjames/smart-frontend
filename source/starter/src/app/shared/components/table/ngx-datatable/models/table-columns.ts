export class TableColumns{
    name: string;
    size: string;
    pipe:{transform:any};

    constructor(name:string, size:string, pipe:{transform:any}){
        this.name = name;
        this.size = size;
        this.pipe = pipe;
    }
}