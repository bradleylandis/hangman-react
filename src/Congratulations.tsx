interface CongratulationsProps {
  word: string[];
  startOver: () => void;
  lost: boolean;
}

const Congratulations = ({ word, startOver, lost }: CongratulationsProps) => {
  return (
    <div>
      <h1>
        {lost ? "Sorry" : "Congratulations"}! The word was {word}.
      </h1>
      <button onClick={() => startOver()}>Play again</button>
    </div>
  );
};

export default Congratulations;
