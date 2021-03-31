import React from 'react';
import Style from './style';
import SendIcon from './assets/send-icon.png';

interface Message {
    author: string;
    text: string;
}

const ReceiverMessage: React.FC<{ children: string }> = ({ children }) => (
    <div className="message receiver">
        <p>{children}</p>
    </div>
);

const MeMessage: React.FC<{ children: string }> = ({ children }) => (
    <div className="message me">
        <p>{children}</p>
    </div>
);

const App: React.FC = () => {
    const [choice, setChoice] = React.useState<number>(-1);
    const listChoice = ['Good bye', 'Go back', 'Hey !'];
    const [messageList, setMessageList] = React.useState<Message[]>([
        { author: 'receiver', text: 'Hello sir' },
        { author: 'me', text: 'Hello, you' },
        {
            author: 'me',
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut
        commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut
        commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut
        commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut
        commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat`,
        },
    ]);
    const [responseWriting, setResponseWriting] = React.useState<boolean>(false);

    return (
        <Style>
            <div className="discussion-section">
                {messageList.map(({ author, text }) =>
                    author === 'me' ? (
                        <MeMessage>{text}</MeMessage>
                    ) : (
                        <ReceiverMessage>{text}</ReceiverMessage>
                    ),
                )}
                {responseWriting && <p className="pending-info">...Receiver writing</p>}
            </div>
            <div className="message-choices">
                <div className="list-messages">
                    {listChoice.map((value, index) => (
                        <button
                            type="button"
                            className={`choice ${index === choice && 'selected'}`}
                            onClick={() => setChoice(index)}
                        >
                            <p>{value}</p>
                        </button>
                    ))}
                </div>
                <button
                    className="send-btn"
                    onClick={() =>
                        setMessageList([...messageList, { author: 'me', text: listChoice[choice] }])
                    }
                    type="button"
                >
                    <img src={SendIcon} alt="send" />
                </button>
            </div>
        </Style>
    );
};

export default App;
