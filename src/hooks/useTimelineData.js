// useTimelineData.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { setTimelineCapsules, setTimelinePhotos, setTimelineVerses } from '@/redux/globalSlice'; // adjust the import path accordingly
import { firestore } from '@/firebase'; 

export const useTimelineData = (timelineId) => {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state.global);

  useEffect(() => {
    const userId = globalState.user?.uid;
    if (!userId) return;

    // Fetch capsule metadata
    const capsulesCollectionRef = collection(firestore, `capsule/${timelineId}/metadata`);
    const unsubscribeCapsules = onSnapshot(query(capsulesCollectionRef), (snapshot) => {
        const capsules = {};
        snapshot.docs.forEach(doc => {
          capsules[doc.id] = doc.data();
        });
        dispatch(setTimelineCapsules({ id: timelineId, capsules }));
      });

    // Fetch capsule photos
    const photosCollectionRef = collection(firestore, `capsule/${timelineId}/photos`);
    const unsubscribePhotos = onSnapshot(query(photosCollectionRef), (snapshot) => {
        const photos = {};
        snapshot.docs.forEach(doc => {
          photos[doc.id] = doc.data();
        });
        dispatch(setTimelinePhotos({ id: timelineId, photos }));
      });

    // Fetch capsule verses
    const versesCollectionRef = collection(firestore, `capsule/${timelineId}/verses`);
    const unsubscribeVerses = onSnapshot(query(versesCollectionRef), (snapshot) => {
        const verses = {};
        snapshot.docs.forEach(doc => {
          verses[doc.id] = doc.data();
        });
        dispatch(setTimelineVerses({ id: timelineId, verses }));
      });

    return () => {
      unsubscribeCapsules();
      unsubscribePhotos();
      unsubscribeVerses();
    };
  }, [dispatch, globalState.user?.uid, timelineId]);

  return null;
};