import { JSX } from "react/jsx-runtime";

export function ItemFrame({
  children,
  status,
  className,
}: {
  children: JSX.Element;
  status?: "selected" | "excluded";
  className?: string;
}) {
  const baseGradient = "bg-gradient-to-br to-transparent";

  const statusGradient =
    status === "selected"
      ? "from-select-dark/20"
      : status === "excluded"
        ? "from-exclude-dark/20"
        : "from-standard-dark/10 hover:from-standard-dark/20";

  return (
    <div
      className={`
        transition-all relative grid place-items-center px-8 py-6 border-2 border-b-0 w-full
        ${baseGradient} ${statusGradient}
        ${
          status === "selected"
            ? "border-select-dark"
            : status === "excluded"
              ? "border-exclude-dark"
              : "border-standard-dark"
        }
        ${className ?? ""}
      `}
    >
      <div className={`${status === "excluded" ? "" : ""}`}>
        {children}
      </div>

      <div className="absolute bottom-0 h-0.5 w-full gap-2 flex">
        <span
          className={`transition-all size-full ${
            status === "selected"
              ? "bg-select-dark w-[30%]"
              : status === "excluded"
                ? "bg-exclude-dark"
                : "bg-standard-dark"
          }`}
        />
        <span
          className={`transition-all size-full ${
            status === "selected"
              ? "bg-select-light w-[40%]"
              : status === "excluded"
                ? "bg-exclude-dark"
                : "bg-standard-light"
          }`}
        />
        <span
          className={`transition-all size-full ${
            status === "selected"
              ? "bg-select-dark w-[30%]"
              : status === "excluded"
                ? "bg-exclude-dark"
                : "bg-standard-dark"
          }`}
        />
      </div>
    </div>
  );
}
