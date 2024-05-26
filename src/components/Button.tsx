import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  url: string;
  onClick?: () => void; // onClickプロパティを追加
};

export const Button: React.FC<Props> = ({ url, children, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick(); // onClickが提供されていればそれを実行
    navigate(url);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-300 rounded h-[40px] w-[100px] text-[22px] text-white"
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
};
