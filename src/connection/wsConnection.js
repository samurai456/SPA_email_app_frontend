class WsConnection{
    constructor(cb){
        this.conn = new WebSocket(`wss://${location.host}`);
        this.conn.onopen = this.onopen;
        this.conn.onclose = this.onclose;
        this.conn.onerror = this.onerror;
        this.conn.onmessage = m=>this.onmessage(m,cb);
    }
    onerror(){
        console.log('connection failed');
    }
    onopen(){
        console.log('connected');
    }
    onclose(){
        console.log('closed')
    }
    onmessage(m, cb){
        const data = m.data;
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (e) {
            console.log('data above is not json!');
            return
        }
        cb(jsonData);
    }
    send(msg){
        if(!this.conn.readyState){
            setTimeout(()=>this.send(msg), 200);
            return
        }
        const data = JSON.stringify(msg);
        this.conn.send(data);
    }

}

export { WsConnection }