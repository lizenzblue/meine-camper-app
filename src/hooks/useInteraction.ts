import { useCallback } from "react";

export const useKeyboardNavigation = (onAction: () => void) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onAction();
      }
    },
    [onAction],
  );

  return { handleKeyDown };
};

export const useInteractiveHandler = (onInteract: () => void) => {
  const handleClick = useCallback(() => {
    onInteract();
  }, [onInteract]);

  const { handleKeyDown } = useKeyboardNavigation(onInteract);

  return {
    handleClick,
    handleKeyDown,
  };
};
