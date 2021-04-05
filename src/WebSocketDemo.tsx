import React, {useState} from "react";

const WebSocketDemo: React.FC = () => {
    const socketUrl = 'ws://localhost:3000/echo';
    const [message, setMessage] = useState('');
    const [logs, setLogs] = useState<Array<string>>([])
    const [ws, setWs] = useState<WebSocket | null>(null);

    const connect = () => {
        const newWs = new WebSocket(socketUrl)
        newWs.onopen = function() {
            log('Info: Connection Established.');
        };

        newWs.onmessage = function(event) {
            log(event.data);
        };

        newWs.onclose = function(_) {
            log('Info: Closing Connection.');
        };

        setWs(newWs);
    }

    const disconnect = () => {
        if (ws != null) {
            ws.close();
            setWs(null);
        }
    }

    const echo = () => {
        if (ws != null) {
            ws.send(message);
            log('Sent to server :: ' + message);
            setMessage('');
        } else {
            alert('connection not established, please connect.');
        }
    }

    const log = (value: string) => {
        logs.push(value)
        setLogs(logs);
    }

    return (
        <div>
            <div className="ui centered grid">
                <div className="row">
                    <button onClick={connect} className="ui green button ">Connect</button>
                    <button onClick={disconnect} className="ui red button">Disconnect</button>
                </div>
                <div className="row">
                <textarea className="ui input"
                          onChange={(event) => setMessage(event.target.value) }
                          placeholder="Message to Echo"/>
                </div>
                <div className="row">
                    <button onClick={echo} className="ui button">Echo message</button>
                </div>
            </div>
            <div>
                <h3>Logging</h3>
                <div>{logs.map(log => (<p>{log}</p>))}</div>
            </div>
        </div>
    );
};

export default WebSocketDemo;