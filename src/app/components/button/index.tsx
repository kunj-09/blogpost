//yeh Button ka component banaya hai - ab yrh har jagah use karege - khali har ek button ka name alag hoga isliye uska props jesa pass kiya hai samjo text or Onclick 

export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
