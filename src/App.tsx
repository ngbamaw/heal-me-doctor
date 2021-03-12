import React from 'react';
import Style from './style';
import SendIcon from './assets/send-icon.png';

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
    return (
        <Style>
            <div className="discussion-section">
                <ReceiverMessage>Hello sir</ReceiverMessage>
                <MeMessage>Hello, you</MeMessage>
                <MeMessage>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut
                    commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut
                    commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut
                    commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut
                    commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat
                </MeMessage>
            </div>
            <div className="message-choices">
                <div className="list-messages">
                    <div className="choice selected">
                        <p>Good bye</p>
                    </div>
                </div>
                <button className="send-btn" type="button">
                    <img src={SendIcon} alt="send" />
                </button>
            </div>
        </Style>
    );
};

export default App;