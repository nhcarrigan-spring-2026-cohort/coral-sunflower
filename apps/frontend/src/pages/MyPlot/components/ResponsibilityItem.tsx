import { useState } from "react";
import CheckCircleIcon from "./icons/CheckCircleIcon";

type ResponsibilityItemProps = {
  id: string;
  responsibility: string;
  initialCompleted: boolean;
};

export default function ResponsibilityItem({ id, responsibility, initialCompleted }: ResponsibilityItemProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (isLoading) return;

    // Optimistic UI update
    const previousState = isCompleted;
    setIsCompleted(!isCompleted);
    setIsLoading(true);

    try {
      // FUTURE API CALL: Uncomment when backend is ready

      // await fetch(`/api/responsibilities/${id}`, {
      //   method: "PATCH",
      //   body: JSON.stringify({ status: !previousState ? "completed" : "pending" }),
      // });

      // MOCK API CALL: Simulate a 500ms delay to test the loading state
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(`Mock PATCH request sent for ID ${id} to state ${!previousState}`);
    } catch (error) {
      console.error("Failed to update status", error);
      setIsCompleted(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`flex w-full items-start gap-4 p-4 rounded-xl border cursor-pointer
            ${isCompleted ? `bg-transparent border-transparent` : "bg-gray-50 border-gray-100"}`}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      tabIndex={0}
      type="button"
    >
      <div
        className={`mt-1 w-5 h-5 shrink-0 flex items-center justify-center border-2 
                ${isCompleted ? `bg-green-500 border-green-500 rounded-full` : `border-green-500 rounded-full`}`}
      >
        {isCompleted && <CheckCircleIcon />}
      </div>
      <p className={`leading-tight ${isCompleted ? `text-gray-400 line-through` : `text-gray-700`}`}>
        {responsibility}
      </p>
    </button>
  );
}
