import styled from 'styled-components';

const App = styled.div`
    height: 100%;
    width: 100%;
    .discussion-section {
        display: flex;
        height: 80%;
        justify-content: flex-end;
        flex-direction: column;
    }
    .message {
        padding: 10px 15px;
        width: fit-content;
        border-radius: 20px;
        max-width: 70%;
    }
    .me {
        background-color: #2196f3;
        color: white;
        align-self: flex-end;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .receiver {
        background-color: #e0e0e0;
        align-self: auto;
        margin-left: 10px;
        margin-bottom: 10px;
    }
    .message-choices {
        height: 20%;
        background-color: darkgray;
        display: flex;
        .list-messages {
            width: 80%;
        }
        .choice {
            padding: 10px;
            width: fit-content;
            background-color: blue;
            border-radius: 20px;
            margin-left: 10px;
        }
        .send-btn {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            border: none;
            background-color: #2196f3;
            display: flex;
            align-self: flex-end;
            img {
                height: 55%;
                width: 55%;
                margin: auto;
                transform: translateX(2px);
            }
        }
    }
`;

export default App;
