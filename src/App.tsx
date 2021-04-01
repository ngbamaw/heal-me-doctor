import React from 'react';
import Style from './style';
import SendIcon from './assets/send-icon.png';
import Story from './story.json';

interface Message {
    author: string;
    text: string;
}

interface StoryStep {
    type: 'initial' | 'presentation' | 'interaction';
}
interface Step {
    background?: string;
    timer: number;
    text: string;
}
interface Presentation {
    background: string;
    steps: Step[];
    next: StoryStep;
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
    const [stepsPresentation, setStepsPresentation] = React.useState<Step[]>([]);

    const readInital = async (inital: Presentation) => {
        setStepsPresentation(inital.steps);
    };
    const readStory = async (story: any) => {
        switch (story.type) {
            case 'initial':
                await readInital(story);
                readStory(story.next);
                break;
            default:
                throw new Error('Bad element');
        }
    };

    readStory(Story);

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
            <div className="presentation-screen">
                {stepsPresentation.map((step) => (
                    <div className="filter">
                        <p>{step.text}</p>
                    </div>
                ))}
            </div>
        </Style>
    );
};

export default App;
