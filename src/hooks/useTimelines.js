import { firestore } from "@/firebase";
import { setTimelines } from "@/redux/globalSlice"; 
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 

export const useTimelines = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.global);

  useEffect(() => {
    const userId = globalState.user?.uid;

    if (!userId) return;
    const unsubscribe = onSnapshot(
      collection(firestore, "metadata", userId, "timelines"),
      (snapshot) => {
        const timelines = {};
        snapshot.docs.forEach((doc) => {
          timelines[doc.id] = doc.data();
        });
        dispatch(setTimelines(timelines));
      }
    );

    return unsubscribe;
  }, [dispatch, globalState.user?.uid]);

  return null;
};
