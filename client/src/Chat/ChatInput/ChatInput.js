import React, { useState } from 'react';

const ChatInput = (props) => {
    const [user, setUser] = useState('');
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');
    const [userid, setUserId] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';
        const isReceiverProvided = receiver && receiver !== '';

        if (isUserProvided && isMessageProvided && isReceiverProvided) {
            props.sendMessage(user, receiver, message);
        }
        else {
            alert('Please insert an user and a message.');
        }
    }

    // const onUserIdUpdate = (e) => {
    //     setUserId()
    // }

    const onUserIdUpdate = (userId) => {
        setUserId(userId);
    }

    const onUserUpdate = (e) => {
        setUser(e.target.value);
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    const onReceiverUpdate = (e) => {
        setReceiver(e.target.value);
    }

    return (
        <form
            onSubmit={onSubmit}>
            {/* <label htmlFor="userid"
                id="userid"
                name="userid"
                value={userid}
                onChange={onUserIdUpdate}
            > 
             </label> */ }
            <label htmlFor="user">User:</label>
            <br />
            <input
                id="user"
                name="user"
                value={user}
                onChange={onUserUpdate} />
            <br />
            <label htmlFor="receiver">Receiver:</label>
            <br />
            <input
                id="receiver"
                name="receiver"
                value={receiver}
                onChange={onReceiverUpdate}
            />
            <br />
            <label htmlFor="message">Message:</label>
            <br />
            <input
                type="text"
                id="message"
                name="message"
                value={message}
                onChange={onMessageUpdate} />
            <br /><br />
            <button>Submit</button>
        </form>
    )
};

export default ChatInput;