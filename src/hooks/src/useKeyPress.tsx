import { Keys } from "structures/index";
import { useEffect } from "react";
/**
 * useKeyPress
 * @param {Keys} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(key: Keys, action: () => void) {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) action();
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, [action, key]);
}
