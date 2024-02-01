import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  url: string;
};

const handleClick = (url: string) => {
  const navigate = useNavigate();
  return () => {
    navigate(url);
  };
};

export const Button: React.FC<Props> = ({ url, children }) => {
  return (
    <div>
      <button onClick={handleClick(url)}>{children}</button>
    </div>
  );
};
