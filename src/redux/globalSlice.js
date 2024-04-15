import { auth, firestore } from "@/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, runTransaction, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const saveNewCapsule = createAsyncThunk(
  "capsules/saveNewEntry",
  async (_, { getState, rejectWithValue }) => {
    try {
      const activeCapsule = { ...getState().global.activeCapsule };
      activeCapsule.id = uuidv4();
      const { activeTimeline } = getState().global;
      // Check if activeTimelineKey is not empty
      if (!activeTimeline?.key) {
        return rejectWithValue("Active timeline key is empty");
      }
      const userId = auth.currentUser.uid;
      const timelineDocRef = doc(
        firestore,
        `users/${userId}/timelines/${activeTimeline.key}`
      );

      // Generate unique IDs for photos, tags, and verses
      activeCapsule.photos = activeCapsule.photos.map((photo) => ({
        ...photo,
        id: uuidv4(),
      }));
      activeCapsule.verses = activeCapsule.verses.map((verse) => ({
        ...verse,
        id: uuidv4(),
      }));

      await runTransaction(firestore, async (transaction) => {
        // Fetch the document data within the transaction
        const timelineDocSnapshot = await transaction.get(timelineDocRef);

        // Initialize the entries array or retrieve existing one
        let entries = timelineDocSnapshot.exists()
          ? timelineDocSnapshot.data().entries || []
          : [];

        // Append the new entry to the entries array
        entries.push(activeCapsule);

        // Update the document with the modified entries array
        transaction.update(timelineDocRef, { entries });
      });

      console.log("Entry added to the timeline successfully");
    } catch (error) {
      console.error("Error adding entry to the timeline: ", error);
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
  async (_, { getState, rejectWithValue }) => {
    try {
      const { activeTimeline } = getState().global;
      const userId = auth.currentUser.uid;

      // Create a new unique key for the timeline
      const newTimelineKey = uuidv4();

      // Create the new timeline
      const newTimeline = {
        entries: [],
        name: activeTimeline.name || "Untitled",
      };

      // Get a reference to the new timeline document
      const newTimelineDocRef = doc(
        firestore,
        `users/${userId}/timelines/${newTimelineKey}`
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

export const fetchVerse = createAsyncThunk(
  "global/fetchVerse",
  async (reference, { getState, dispatch }) => {
    try {
      // Fetch the verse using the API
      const response = await fetch(
        `https://api.alquran.cloud/v1/ayah/${reference}`
      );
      const data = await response.json();

      // Extract the verse text from the response
      const verseText = data.data.text;
      const name = data.data.surah.name;

      const newCapsule = { ...getState().global.activeCapsule };
      newCapsule.verses = [
        ...newCapsule.verses,
        {
          id: uuidv4(),
          text: verseText,
          reference: reference,
          comments: "",
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

const initialState = {
  mode: "default",
  loading: false,
  user: {},
  activeCapsule: {
    tags: [],
    photos: [],
    verses: [],
  },
  activeTimeline: {
    key: "",
    name: "",
  },
  snackbar: {
    open: false,
    message: "",
  },
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
    setActiveTimeLine: (state, action) => {
      state.activeTimeline = action.payload;
    },
    setSnackbar: (state, action) => {
      state.snackbar = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    extraReducers: (builder) => {
      builder
        .addCase(saveNewCapsule.pending, (state) => {
          state.loading = true;
        })
        .addCase(saveNewCapsule.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(saveNewCapsule.rejected, (state, action) => {
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
} = globalSlice.actions;

export default globalSlice.reducer;
