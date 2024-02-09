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
      <button
        className="bg-blue-500 hover:bg-blue-300 rounded h-[40px] w-[100px] text-[22px] text-white"
        onClick={handleClick(url)}
      >
        {children}
      </button>
    </div>
  );
};
