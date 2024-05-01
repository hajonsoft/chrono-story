import { auth, firestore } from "@/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const fetchAllTimelinesMetadata = createAsyncThunk(
  "timelines/fetchAllTimelinesMetadata",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const userId = auth?.currentUser?.uid;
      if (!userId) {
        return rejectWithValue("User ID is null or undefined");
      }
      // Get a reference to the timelines collection
      const timelinesCollectionRef = collection(
        firestore,
        `users/${userId}/timelines`
      );

      // Get all timelines documents
      const timelinesSnapshot = await getDocs(timelinesCollectionRef);

      // Convert the timelines documents to an array of timelines
      const timelines = timelinesSnapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      }));
      dispatch(setTimelines(timelines));
    } catch (error) {
      console.error("Error fetching timelines: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const saveNewCapsuleMetadata = createAsyncThunk(
  "capsules/saveNewCapsuleMetadata",
  async (_, { getState, rejectWithValue }) => {
    try {
      const activeCapsule = { ...getState().global.activeCapsule };
      const { activeTimeline } = getState().global;
      // Check if activeTimelineKey is not empty
      if (!activeTimeline) {
        return rejectWithValue("Active timeline key is empty");
      }

      // Check if capsuleId is present, if not generate a new one
      if (!activeCapsule.id) {
        activeCapsule.id = uuidv4();
      }

      const capsuleDocRef = doc(
        firestore,
        `capsule/${activeTimeline}/metadata/${activeCapsule.id}`
      );

      await setDoc(capsuleDocRef, activeCapsule);

      console.log("Capsule information saved successfully");
    } catch (error) {
      console.error("Error saving capsule information: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCapsule = createAsyncThunk(
  "capsules/deleteCapsule",
  async ({ timelineId, capsuleId }, { rejectWithValue }) => {
    try {
      const userId = auth.currentUser.uid;
      const timelineDocRef = doc(
        firestore,
        `users/${userId}/timelines/${timelineId}`
      );

      await runTransaction(firestore, async (transaction) => {
        // Fetch the document data within the transaction
        const timelineDocSnapshot = await transaction.get(timelineDocRef);

        // Initialize the entries array or retrieve existing one
        let entries = timelineDocSnapshot.exists()
          ? timelineDocSnapshot.data().entries || []
          : [];

        // Filter out the capsule with the given capsuleId
        entries = entries.filter((capsule) => capsule.id !== capsuleId);

        // Update the document with the modified entries array
        transaction.update(timelineDocRef, { entries });
      });

      console.log("Capsule deleted from the timeline successfully");
    } catch (error) {
      console.error("Error deleting capsule from the timeline: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const saveEditCapsule = createAsyncThunk(
  "capsules/saveEditCapsule",
  async ({ timelineId, capsuleId }, { getState, rejectWithValue }) => {
    try {
      const activeCapsule = { ...getState().global.activeCapsule };
      const userId = auth.currentUser.uid;
      const timelineDocRef = doc(
        firestore,
        `users/${userId}/timelines/${timelineId}`
      );

      await runTransaction(firestore, async (transaction) => {
        // Fetch the document data within the transaction
        const timelineDocSnapshot = await transaction.get(timelineDocRef);

        // Initialize the entries array or retrieve existing one
        let entries = timelineDocSnapshot.exists()
          ? timelineDocSnapshot.data().entries || []
          : [];

        // Find the index of the capsule with the given capsuleId
        const index = entries.findIndex((capsule) => capsule.id === capsuleId);

        // Replace the capsule at the found index with the activeCapsule
        if (index !== -1) {
          entries[index] = activeCapsule;
        }

        // Update the document with the modified entries array
        transaction.update(timelineDocRef, { entries });
      });

      console.log("Capsule updated in the timeline successfully");
    } catch (error) {
      console.error("Error updating capsule in the timeline: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const saveNewTimeLine = createAsyncThunk(
  "capsules/saveNewTimeLine",
  async ({ name }, { getState, rejectWithValue }) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        return rejectWithValue("User ID is null or undefined");
      }

      if (!name) {
        return rejectWithValue("Timeline name is empty");
      }

      // Create a new unique key for the timeline
      const newTimelineKey = uuidv4();

      // Create the new timeline
      const newTimeline = {
        name,
      };

      // Get a reference to the new timeline document
      const newTimelineDocRef = doc(
        firestore,
        `metadata/${userId}/timelines/${newTimelineKey}`
      );

      // Set the new timeline document with the new timeline data
      await setDoc(newTimelineDocRef, newTimeline);

      console.log("Timeline added successfully");
    } catch (error) {
      console.error("Error adding timeline: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateTimelineMetaData = createAsyncThunk(
  "timeline/updateTimelineMetaData",
  async (updateData, { getState, rejectWithValue }) => {
    try {
      const { activeTimeline } = getState().global;
      const userId = auth.currentUser.uid;

      // Get a reference to the existing timeline document
      const timelineDocRef = doc(
        firestore,
        `metadata/${userId}/timelines/${activeTimeline}`
      );

      // Update the timeline document with the new name and description
      await updateDoc(timelineDocRef, {
        name: updateData.name || "Untitled",
        description: updateData.description || "No Description",
      });

      console.log("Timeline updated successfully");
    } catch (error) {
      console.error("Error updating timeline: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVerse = createAsyncThunk(
  "global/fetchVerse",
  async ({ reference, comments }, { getState, dispatch }) => {
    console.log("📢[globalSlice.js:197]: reference: ", reference);
    try {
      const response = await fetch(
        `https://api.alquran.cloud/v1/ayah/${reference}`
      );
      const data = await response.json();
      console.log("📢[globalSlice.js:202]: data: ", data);
      const verseText = data.data.text;
      const name = data.data.surah.name;
      const newCapsule = { ...getState().global.activeCapsule };
      newCapsule.verses = [
        ...newCapsule.verses,
        {
          id: uuidv4(),
          text: verseText,
          reference: reference,
          comments: comments || "",
          name,
        },
      ];
      dispatch(setActiveCapsule(newCapsule));
    } catch (error) {
      console.error("Error fetching verse:", error);
      throw error;
    }
  }
);

export const searchVerse = createAsyncThunk(
  "global/fetchVerse",
  async ({ keyword }, { getState, dispatch }) => {
    try {
      // Fetch the verse using the API
      const response = await fetch(
        `https://api.alquran.cloud/v1/search/${keyword}/all/ar`
      );
      const data = await response.json();
      const matches = data.data.matches;
      if (matches.length === 0) {
        throw new Error("No verses found");
      }

      const referenceMap = matches.reduce((map, match) => {
        const reference = `${match.surah.number}:${match.numberInSurah}`;

        // If the reference is already in the map, append the match.text
        // Otherwise, set the match.text as the value for the reference
        map.set(
          reference,
          map.has(reference) ? map.get(reference) + match.text : match.text
        );

        return map;
      }, new Map());

      console.log("📢[globalSlice.js:287]: referenceMap: ", referenceMap);
      referenceMap.forEach((text, reference) => {
        console.log("📢[globalSlice.js:239]: match: ", reference, text);
        dispatch(
          fetchVerse({
            reference,
            comments: text,
          })
        );
      });
    } catch (error) {
      console.error("Error fetching verse:", error);
      throw error;
    }
  }
);

export const deleteTimeline = createAsyncThunk(
  "timeline/deleteTimeline",
  async (timelineKey, { getState, rejectWithValue, dispatch }) => {
    try {
      const userId = auth.currentUser.uid;

      // Get a reference to the existing timeline document
      const timelineDocRef = doc(
        firestore,
        `metadata/${userId}/timelines/${timelineKey}`
      );

      // Delete the timeline document
      dispatch(setActiveTimeLine(null));
      await deleteDoc(timelineDocRef);
      console.log("Timeline deleted successfully");
    } catch (error) {
      console.error("Error deleting timeline: ", error);
      return rejectWithValue(error.message);
    }
  }
);
// export const moveRecords = createAsyncThunk(
//   "capsules/moveRecords",
//   async (_, { rejectWithValue }) => {
//     try {
//       // Get a reference to the source document
//       const sourceDocRef = doc(firestore, "/users/mQsKRhg3MtgKmcLNTZ3BnfC2OLA2");

//       // Read the source document
//       const sourceDocSnap = await getDoc(sourceDocRef);

//       // Get the timeLine array from the source document
//       const sourceArray = sourceDocSnap.data().timeLine;

//       // Log the array
//       console.log("Source array: ", sourceArray);

//       // Get a reference to the target document
//       const targetDocRef = doc(firestore, "/users/fw8myGA7buOKBF7FmerFSI6vXV13/timelines/1617f40f-77bf-45ee-bd22-5530630281bf");

//       // Set the entries field of the target document to contain the source array
//       await setDoc(targetDocRef, { entries: sourceArray });

//       console.log("Records moved successfully");
//     } catch (error) {
//       console.error("Error moving records: ", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

const initialState = {
  mode: "default",
  loading: false,
  user: {},
  activeCapsule: {
    year: 0,
    image: "",
    title: "",
    description: "",
    tags: [],
  },
  activeTimeline: null,
  snackbar: {
    open: false,
    message: "",
  },
  timelines: {},
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setActiveCapsule: (state, action) => {
      state.activeCapsule = action.payload;
    },
    setTimelineCapsules: (state, action) => {
      state.timelines[action.payload.id].capsules = action.payload.capsules;
    },
    setActiveTimeLine: (state, action) => {
      state.activeTimeline = action.payload;
    },
    setSnackbar: (state, action) => {
      state.snackbar = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTimelines: (state, action) => {
      state.timelines = action.payload;
    },
    extraReducers: (builder) => {
      builder
        .addCase(saveNewCapsuleMetadata.pending, (state) => {
          state.loading = true;
        })
        .addCase(saveNewCapsuleMetadata.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(saveNewCapsuleMetadata.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(saveNewTimeLine.pending, (state) => {
          state.loading = true;
        })
        .addCase(saveNewTimeLine.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(saveNewTimeLine.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  },
});

export const {
  setMode,
  setActiveCapsule,
  setActiveTimeLine,
  setSnackbar,
  setUser,
  setTimelines,
  setTimelineCapsules,
} = globalSlice.actions;

export default globalSlice.reducer;
