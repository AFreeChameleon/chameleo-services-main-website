import { LONDON_WS_URL } from '../../../globals';

class LoggingWebsocket {
    ws: WebSocket;
    logs: any[];
    setLogs: Function;
    constructor(containerId: string, setLogs: Function) {
        if (typeof window !== 'undefined') {
            this.ws = new WebSocket(`${LONDON_WS_URL}?container_id=${containerId}&type=client`);
            this.logs = [];
            this.setLogs = setLogs;
            
            this.ws.addEventListener('open', this.onOpen)
        }
    }

    onOpen = async () => {
        console.log('connection opened')
        this.ws.addEventListener('message', this.onMessage);
    }

    onMessage = async (res) => {
        const data = JSON.parse(res.data);
        this.logs.push(data.logs);
        console.log(data, this.logs);
        this.setLogs([...this.logs]);
    }
}

export default LoggingWebsocket;