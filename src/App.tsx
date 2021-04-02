import React, { MouseEventHandler } from 'react';
import gsap from 'gsap';
import Style from './style';
import SendIcon from './assets/send-icon.png';
import Story from './story.json';

interface Message {
    author: string;
    text: string;
}

interface StoryStepAbstract {
    type: 'presentation' | 'interaction' | 'end';
    background: string;
    label?: string;
}
interface Step {
    background?: string;
    timer: number;
    text: string;
}

interface Presentation extends StoryStepAbstract {
    type: 'presentation';
    next: StoryStep;
    steps: Step[];
}

interface Interaction extends StoryStepAbstract {
    type: 'interaction';
    messages: Message[];
    next: StoryStep[] | StoryStep;
}

interface End extends StoryStepAbstract {
    type: 'end';
}

type StoryStep = Presentation | Interaction | End;

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
    const [listChoiceHandler, setListChoiceHandler] = React.useState<MouseEventHandler[]>([]);
    const [listChoice, setListChoice] = React.useState<string[]>([]);
    const [messageList, setMessageList] = React.useState<Message[]>([]);
    const [responseWriting, setResponseWriting] = React.useState<boolean>(false);
    const [currentStep, setCurrentStep] = React.useState<Step | null>(null);
    const [storyStep, setStoryStep] = React.useState<StoryStep>(Story as StoryStep);
    const [lockStoryStep, setLockStoryStep] = React.useState<boolean>(false);
    const filterElement = React.useRef<HTMLDivElement>(null);

    const timeout = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const changeStep = (nextStep: Step) => {
        const t = gsap.timeline();
        t.to(filterElement.current, { duration: 1, opacity: 0 }).call(() =>
            setCurrentStep(nextStep),
        );

        t.to(filterElement.current, { duration: 1, opacity: 1 });
    };

    const readInital = React.useCallback(async (presentation: Presentation) => {
        setCurrentStep(presentation.steps[0]);
        for (const [index, step] of Object.entries(presentation.steps)) {
            // eslint-disable-next-line no-await-in-loop
            await timeout(step.timer);
            changeStep(presentation.steps[Number(index) + 1]);
            console.log('update: stepsPresentation');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const waitForChoice = async (choices: StoryStep[]) => {
        setListChoice(choices.map((c) => c.label || 'Nothing'));
        const promise = new Promise((resolve) => {
            const responses = choices.map((c) => () => resolve(c));
            setListChoiceHandler(responses);
        });
        return await promise;
    };
    const readInteraction = React.useCallback(
        async (interaction: Interaction) => {
            setMessageList([...messageList, ...interaction.messages]);
            if (Array.isArray(interaction.next)) return waitForChoice(interaction.next);

            return interaction.next;
        },
        [messageList],
    );

    React.useEffect(() => {
        const readStory = async (story: StoryStep) => {
            switch (story.type) {
                case 'presentation':
                    setLockStoryStep(true);
                    await readInital(story);
                    setMessageList([]);
                    setStoryStep(story.next as StoryStep);
                    setLockStoryStep(false);
                    break;
                case 'interaction':
                    setLockStoryStep(true);
                    setStoryStep((await readInteraction(story)) as StoryStep);
                    setLockStoryStep(false);
                    break;
                case 'end':
                    return;
                default:
                    throw new Error('Bad element');
            }
        };
        if (!lockStoryStep) readStory(storyStep);
    }, [readInital, readInteraction, storyStep, lockStoryStep, messageList]);

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
                <button className="send-btn" onClick={listChoiceHandler[choice]} type="button">
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
