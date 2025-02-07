import { WebSocketServer } from "ws";
import { userManager } from "./usermanager";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws,request)=>{
    const url = request.url;
    const query = new URLSearchParams(url);
    const name = query.get('name');

    ws.on('message', (event) => {
        const data = event;
        console.log(data);
    });
    ws.on('error', console.error);
    ws.send('something');
});