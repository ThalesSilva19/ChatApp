import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io();

export default function Home() {

    const [inputMessage, setInputMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (msg) => {
            setAllMessages(allMessages => [...allMessages, msg]);
        })
    }, [socket])

    function sendMessage() {
        setInputMessage('');
        socket.emit('message', { message: inputMessage });
    }

    function updateInput(e) {
        setInputMessage(e.target.value);
    }

    return (
        <div>
            <div>
                <input type="text" onChange={updateInput} value={inputMessage}/>
                <button onClick={sendMessage} value="Enviar">Enviar</button>
            </div>
            <div>
                {
                    allMessages.map((msg, index) => {
                        return(
                            <p key={index}>{msg.message}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}