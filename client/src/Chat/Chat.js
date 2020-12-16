import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow/ChatWindow';
import ChatInput from './ChatInput/ChatInput';

const Chat = () => {
    const [ chat, setChat ] = useState([]);
    const [ userId, setUserId ] = useState([]);
    const latestChat = useRef(null);
    //var connectionId = null;
    const [ connectionId, setConnectionId ] = useState([]);

    latestChat.current = chat;

    useEffect(() => {
        // const connection = new HubConnectionBuilder()
        //     .withUrl('https://localhost:5001/hubs/chat')
        //     .withAutomaticReconnect()
        //     .build();
            
        // connection.start()
        //     .then(result => {
        //         console.log('Connected!');

        //         connection.on('ReceiveMessage', message => {
        //             const updatedChat = [...latestChat.current];
        //             updatedChat.push(message);
                
        //             setChat(updatedChat);
        //         });
        //     })
        //     .catch(e => console.log('Connection failed: ', e));

        startConnection();

    }, []);

    const getConnectionId = (connection) => {
        connection.invoke('getconnectionid').then(
            (data) => {
                console.log('print connectionId')
                console.log(data);
                setConnectionId('your userId is : ' + data);

                alert(data);
            }
        );
    }

    const startConnection = () => {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/chat')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => console.log('Connected!'))
            .then(() => {
                getConnectionId(connection);
            })
            .then(result => {

                connection.on('ReceiveMessage', message => {
                    console.log('received !')
                    console.log(message)
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);

                    setChat(updatedChat);
                })

                
            })
            .catch(
                // e => {
                // setTimeout(() => {
                //     console.log("reconnecting!");
                //     startConnection();
                // }, 5000);   
                // }
                e => console.log('Connection failed: ', e)
            )
    }

    const sendMessage = async (user, receiver, message) => {
        const chatMessage = {
            user: user,
            receiver : receiver,
            message: message
        };

        console.log(chatMessage);

        try {
            await  fetch('https://localhost:5001/chat/messages', { 
                method: 'POST', 
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch(e) {
            console.log('Sending message failed.', e);
        }
    }
    

    // const sendMessage = async (user, message) => {
    //     const chatMessage = {
    //         user: user,
    //         message: message
    //     };

    //     try {
    //         await  fetch('https://localhost:5001/chat/messages', { 
    //             method: 'POST', 
    //             body: JSON.stringify(chatMessage),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //     }
    //     catch(e) {
    //         console.log('Sending message failed.', e);
    //     }
    // }

    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat}/>
        </div>
    );
};

export default Chat;