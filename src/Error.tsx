interface ErrorProps {
  tryAgain: () => void
}

const Error = ({ tryAgain }: ErrorProps) => {
  return (
    <h1>
      Unable to load a word. Please{" "}
      <button onClick={tryAgain}>try again</button>
    </h1>
  );
};

export default Error;
