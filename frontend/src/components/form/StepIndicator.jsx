export function StepIndicator({ steps = [], current = 2 }) {
  return (
    <ol className="relative isolate flex w-full items-center justify-around gap-2 text-sm font-medium text-gray-500 sm:text-base">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`mt-auto flex flex-1 flex-col-reverse items-center ${
            index + 1 < current && "text-blue-600 dark:text-blue-500"
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full text-lg transition-all duration-200 ${
              index + 1 <= current ? "bg-green-400 text-white" : "bg-gray-300 text-gray-900"
            }`}
          >
            {index + 1}
          </span>
          <p className={`hidden select-none ${steps.length > 4 ? "lg:inline-flex" : "md:inline-flex"}`}>{step}</p>
        </li>
      ))}
      <div className="absolute bottom-0 -z-10 flex h-8 min-w-0 max-w-full items-center" style={{ width: "100%" }}>
        <div
          className="inline-block h-2 rounded-full bg-green-400 transition-all"
          style={{ width: `${(current / steps.length) * 100}%` }}
        />
      </div>
      <div className="absolute bottom-0 -z-20 flex h-8 min-w-0 max-w-full items-center" style={{ width: "100%" }}>
        <div
          className="inline-block h-2 rounded-full bg-gray-300 transition-all duration-500"
          style={{ width: `100%` }}
        />
      </div>
    </ol>
  );
}
