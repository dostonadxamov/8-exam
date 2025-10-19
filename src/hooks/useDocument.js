import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useDocument = (collectionName, id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const ref = doc(db, collectionName, id);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() });
        } else {
          setError("Recipe not found");
        }
      },
      (err) => setError(err.message)
    );

    return () => unsubscribe();
  }, [collectionName, id]);

  return { data, error };
};
