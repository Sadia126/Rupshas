import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Rupsha`;
  }, [title]);
};

export default useTitle;
