import { ButtonProps } from "./ButtonPrimary";

const ButtonSecondary = ({ title }: ButtonProps): JSX.Element => {
  return (
    <button className="border-2 border-white py-2 px-4 rounded-full hover:bg-mainShade hover:text-white transition-all">
      {title}
    </button>
  );
};

export default ButtonSecondary;
