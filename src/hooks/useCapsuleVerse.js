import { firestore } from "@/firebase";
import { setTimelineVerses } from "@/redux/globalSlice"; // Adjust the import path accordingly
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const LIMIT = 1; // Changed to a more practical limit for real use

const useCapsuleVerse = (timelineId, capsuleId) => {
  const dispatch = useDispatch();
  const lastVisibleRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!timelineId || !capsuleId) return;

    const fetchVerses = async () => {
      setLoading(true);
      try {
        const versesCollectionRef = collection(
          firestore,
          `capsule/${timelineId}/verses/${capsuleId}/versesCollection`
        );
        const versesQuery = query(versesCollectionRef, limit(LIMIT));
        const snapshot = await getDocs(versesQuery);

        if (!snapshot.empty) {
          const versesData = {};
          snapshot.docs.forEach((doc) => {
            versesData[doc.id] = doc.data();
          });
          lastVisibleRef.current = snapshot.docs[snapshot.docs.length - 1];
          setHasMore(snapshot.docs.length === LIMIT);
          dispatch(
            setTimelineVerses({ timelineId, capsuleId, verses: versesData })
          );
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching verses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [dispatch, timelineId, capsuleId]);

  const loadMoreVerses = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const versesCollectionRef = collection(
        firestore,
        `capsule/${timelineId}/verses/${capsuleId}/versesCollection`
      );
      const versesQuery = query(
        versesCollectionRef,
        startAfter(lastVisibleRef.current),
        limit(LIMIT)
      );
      const snapshot = await getDocs(versesQuery);

      if (!snapshot.empty) {
        const versesData = {};
        snapshot.docs.forEach((doc) => {
          versesData[doc.id] = doc.data();
        });
        lastVisibleRef.current = snapshot.docs[snapshot.docs.length - 1];
        setHasMore(snapshot.docs.length === LIMIT);
        dispatch(
          setTimelineVerses({ timelineId, capsuleId, verses: versesData })
        );
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more verses:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loadMoreVerses, hasMore, loading };
};

export default useCapsuleVerse;
