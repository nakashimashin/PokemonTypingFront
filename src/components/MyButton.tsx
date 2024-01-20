import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const MyButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>{children}</button>
    </div>
  );
};
