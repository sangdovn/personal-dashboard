import clsx from "clsx";

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function BurgerButton({ isOpen, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="absolute top-4 left-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-gray-200"
    >
      <span
        className={clsx(
          "absolute h-1 w-8 rounded bg-gray-900",

          {
            "-translate-y-[10px] rotate-0": !isOpen,
            "translate-y-0 rotate-45": isOpen,
          },
          "transition-all duration-300 ease-in-out",
        )}
      />

      <span
        className={clsx(
          "absolute h-1 w-8 rounded bg-gray-900",

          {
            "scale-100 opacity-100": !isOpen,
            "scale-0 opacity-0": isOpen,
          },
          "transition-all duration-300 ease-in-out",
        )}
      />

      <span
        className={clsx(
          "absolute h-1 w-8 rounded bg-gray-900",

          {
            "translate-y-[10px] rotate-0": !isOpen,
            "translate-y-0 -rotate-45": isOpen,
          },
          "transition-all duration-300 ease-in-out",
        )}
      />
    </button>
  );
}
