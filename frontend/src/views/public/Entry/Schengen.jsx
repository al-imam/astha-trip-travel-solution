function StepIndicator({ steps = [], current = 2 }) {
  return (
    <ol className="flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-500 sm:space-x-4 sm:text-base">
      {steps.map((step, index) => (
        <li key={step} className={`flex items-center ${index + 1 < current && "text-blue-600 dark:text-blue-500"}`}>
          <span
            className={`mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
              index + 1 <= current ? "border-blue-600 text-blue-600" : "border-gray-500"
            }`}
          >
            {index + 1}
          </span>
          {step} <span className="hidden sm:ml-2 sm:inline-flex">Info</span>
          {index + 1 < steps.length && (
            <svg
              className="ml-2 h-3 w-3 sm:ml-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
}

function LeftArrow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.85Z"
      ></path>
    </svg>
  );
}
