import { useState, useEffect } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const choices = [
    { name: 'Rock', icon: <FaHandRock className="text-8xl" /> },
    { name: 'Paper', icon: <FaHandPaper className="text-8xl" /> },
    { name: 'Scissors', icon: <FaHandScissors className="text-8xl" /> }
];

const getRandomChoice = () => {
    const minimum = 0;
    const maximum = choices.length - 1;
    const randomIndex = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return choices[randomIndex];
};

export default function Start() {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");
    const [score, setScore] = useState({ user: 0, computer: 0 });
    const [countdown, setCountdown] = useState(3);
    const [round, setRound] = useState(1);

    useEffect(() => {
        if (userChoice) {
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(timer);
                        const computerChoice = getRandomChoice();
                        setComputerChoice(computerChoice);
                        determineWinner(userChoice, computerChoice);
                        setTimeout(() => {
                            resetRound();
                        }, 1000); // Give a little delay to show the result before resetting the round
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    });

    const determineWinner = (userChoice, computerChoice) => {
        if (userChoice.name === computerChoice.name) {
            setResult("It's a tie!");
        } else if (
            (userChoice.name === 'Rock' && computerChoice.name === 'Scissors') ||
            (userChoice.name === 'Paper' && computerChoice.name === 'Rock') ||
            (userChoice.name === 'Scissors' && computerChoice.name === 'Paper')
        ) {
            setResult("You win!");
            setScore(prevScore => ({ ...prevScore, user: prevScore.user + 1 }));
        } else {
            setResult("You lose!");
            setScore(prevScore => ({ ...prevScore, computer: prevScore.computer + 1 }));
        }
    };

    const resetRound = () => {
        if (round < 10) {
            setRound(prevRound => prevRound + 1);
            setCountdown(3);
            setUserChoice(null);
            setComputerChoice(null);
            setResult("");
        } else {
            // Game over logic, if you want to display a message or reset the game entirely
            alert(`Game Over! Final Score: User ${score.user} - Computer ${score.computer}`);
            setRound(1);
            setCountdown(3);
            setUserChoice(null);
            setComputerChoice(null);
            setResult("");
            setScore({ user: 0, computer: 0 });
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex gap-4 w-56 justify-center">
                {choices.map(choice => choice.icon)}
            </div>
            <div className="border border-white rounded-lg mt-4 p-4 text-center">
                {countdown > 0 ? <p>Choosing</p> : computerChoice ? computerChoice.name : "Rock"}
            </div>
            <div className="border border-white rounded-lg font-mono mt-4 p-4 text-center">
                <p>*Select One Option* <br /> in <br />  {countdown}</p>
                <div className="flex gap-2 justify-center mt-2">
                    {choices.map(choice => (
                        <span
                            key={choice.name}
                            className="p-3 border m-1 rounded-xl hover:cursor-pointer"
                            onClick={() => setUserChoice(choice)}
                        >
                            {choice.name}
                        </span>
                    ))}
                </div>
            </div>
            <div className="border border-white rounded-lg font-mono mt-4 p-4 text-center">
                <p>{result}</p>
            </div>
            <div className="border border-white rounded-lg font-mono mt-4 p-4">
                <p>Round: {round}/10</p>
                <p>Score: {score.user}/{score.computer}</p>
            </div>
        </div>
    );
}
