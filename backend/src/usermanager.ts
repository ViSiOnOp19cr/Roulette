import { WebSocket } from "ws"
import { MESSAGE, OutgoindMessages } from "./types";
import { User } from "./user";

export class userManager  {
    private _users:User[] = [];
    private _instance:userManager;
    constructor() {

    }
    addUser(ws:WebSocket, name:string) {
        let ID = 0; // Declare and initialize the 'ID' variable
        let id = ID;
        this._users.push(new User(id,name,ws));
        ws.on('close', ()=>this.removeUser(id));
        ID++;
    }
    removeUser(id:number){
        this._users.filter(user => user.id !== id);
    }
    broadcast(message:OutgoindMessages , userId?:number){
        this._users.forEach(({id,ws})=>{
            if(userId !== id){
                ws.send(JSON.stringify(message));
            }
        })
    }
}