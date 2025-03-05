import clsx from "clsx";

type Props = {
  className?: string;
  isOpen: boolean;
  toggleOpen: () => void;
};

export default function BurgerButton({ className, isOpen, toggleOpen }: Props) {
  const spanClasses =
    "absolute h-1 w-8 rounded bg-gray-500  transition-all duration-300 ease-in-out";

  return (
    <button
      onClick={toggleOpen}
      className={clsx(
        className,
        "flex h-8 w-8 cursor-pointer items-center justify-center outline-none",
      )}
    >
      <span
        className={clsx(
          spanClasses,
          !isOpen && "-translate-y-[10px] rotate-0",
          isOpen && "translate-y-0 rotate-45",
        )}
      />

      <span
        className={clsx(
          spanClasses,
          !isOpen && "scale-100 opacity-100",
          isOpen && "scale-0 opacity-0",
        )}
      />

      <span
        className={clsx(
          spanClasses,
          !isOpen && "translate-y-[10px] rotate-0",
          isOpen && "translate-y-0 -rotate-45",
        )}
      />
    </button>
  );
}
