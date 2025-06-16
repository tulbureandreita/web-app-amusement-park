import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const FoldersContext = createContext();

export const useFolders = () => useContext(FoldersContext);

export const FoldersProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFolders = useCallback(async () => {
    const start = Date.now();
    let timeoutId;

    try {
      const res = await fetch("/api/folders");
      const data = await res.json();
      setFolders(data);

      const elapsed = Date.now() - start;
      const delay = Math.max(300 - elapsed, 0);
      timeoutId = setTimeout(() => setLoading(false), delay);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <FoldersContext.Provider
      value={{ folders, loading, refreshFolders: fetchFolders }}
    >
      {children}
    </FoldersContext.Provider>
  );
};
