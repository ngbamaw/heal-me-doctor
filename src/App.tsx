import React from 'react';
import gsap from 'gsap';
import Style from './style';
import SendIcon from './assets/send-icon.png';
import Story from './story.json';

interface Message {
    author: string;
    text: string;
}

interface StoryStepAbstract {
    type: 'initial' | 'presentation' | 'interaction';
    background: string;
    next: StoryStep;
}
interface Step {
    background?: string;
    timer: number;
    text: string;
}

interface Presentation extends StoryStepAbstract {
    type: 'presentation';
}
interface Initial extends StoryStepAbstract {
    type: 'initial';
    steps: Step[];
}

interface Interaction extends StoryStepAbstract {
    type: 'interaction';
    messages: Message[];
}

type StoryStep = Initial | Presentation | Interaction;

type StoryStepType = 'initial' | 'presentation' | 'interaction';

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
    const [stepsPresentation, setStepsPresentation] = React.useState<Step[] | null>(null);
    const [currentStepStoryType, setCurrentStepStoryType] = React.useState<StoryStepType>(
        'initial',
    );
    const [currentStep, setCurrentStep] = React.useState<Step | null>(null);
    const filterElement = React.useRef<HTMLDivElement>(null);

    const timeout = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const changeStep = (nextStep: Step) => {
        const t = gsap.timeline();
        console.log(currentStep);
        t.to(filterElement.current, { duration: 1, opacity: 0 }).call(() =>
            setCurrentStep(nextStep),
        );

        t.to(filterElement.current, { duration: 1, opacity: 1 });
    };

    const readInital = React.useCallback(async (inital: Initial) => {
        setCurrentStep(inital.steps[0]);
        for (const [index, step] of Object.entries(inital.steps)) {
            // eslint-disable-next-line no-await-in-loop
            await timeout(step.timer);
            changeStep(inital.steps[Number(index) + 1]);
            console.log('update: stepsPresentation');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const readInteraction = React.useCallback(async (interaction: Interaction) => {
        setMessageList(interaction.messages);
    }, []);
    const readStory = React.useCallback(
        async (story: StoryStep) => {
            switch (story.type) {
                case 'initial':
                    await readInital(story);
                    readStory(story.next as StoryStep);
                    break;
                case 'interaction':
                    await readInteraction(story);
                    readStory(story.next as StoryStep);
                    break;
                default:
                    throw new Error('Bad element');
            }
        },
        [readInital, readInteraction],
    );

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        readStory(Story as Initial);
    }, [readStory]);

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
            {currentStep && (
                <div className="presentation-screen">
                    <div className="filter" ref={filterElement}>
                        <p>{currentStep.text}</p>
                    </div>
                </div>
            )}
        </Style>
    );
};

export default App;
