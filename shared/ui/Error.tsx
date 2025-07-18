const ErrorMessage = ({ message }: { message: string }) => {
  return <p className={`text-error font-bold`}>{message}</p>;
};

export default ErrorMessage;
