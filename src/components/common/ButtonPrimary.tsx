
export interface ButtonProps {
  title: string;
}

const ButtonPrimary = ({ title }: ButtonProps): JSX.Element => {
  return (
    <button className="border-2 border-white text-white bg-main hover:bg-mainShade py-2 px-4 rounded-full ">
      {title}
    </button>
  );
};

export default ButtonPrimary;
