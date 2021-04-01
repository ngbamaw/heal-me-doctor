import styled from 'styled-components';

const App = styled.div`
    height: 100%;
    width: 100%;
    .presentation-screen {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9999;
        display: flex;
        background-image: url(http://localhost/imgs/heal-me-doctor/initial.jpg);
        background-size: cover;
        background-position: bottom left;
        & > p {
            margin: auto;
            font-weight: bold;
            color: white;
        }
    }
    .discussion-section {
        display: flex;
        height: 75%;
        justify-content: flex-end;
        flex-direction: column;
        position: relative;
    }
    .message {
        padding: 10px 15px;
        width: fit-content;
        border-radius: 20px;
        max-width: 70%;
    }
    .message:last-of-type {
        margin-bottom: 30px;
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

    .pending-info {
        position: absolute;
        right: 10px;
        bottom: 0;
    }
    .message-choices {
        height: 25%;
        display: flex;
        .list-messages {
            width: 80%;
            height: fit-content;
            margin: auto 0;
        }
        .choice {
            padding: 10px;
            width: fit-content;
            background-color: white;
            border: 1px solid black;
            border-radius: 20px;
            margin-left: 10px;
            margin-top: 5px;
            margin-bottom: 5px;
            display: flex;
            transition: all 0.5s;
            outline: none;
            &.selected {
                background-color: aqua;
                color: white;
                border-color: aqua;
                box-shadow: transparent 0 0 0 !important;
            }
            &:focus,
            &:hover {
                box-shadow: aqua 0px 0px 15px;
            }
        }
        .send-btn {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            border: none;
            background-color: #2196f3;
            display: flex;
            align-self: flex-end;
            margin-left: auto;
            margin-right: 10px;
            margin-bottom: 10px;
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
