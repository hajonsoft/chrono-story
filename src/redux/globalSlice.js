import { auth, firestore } from "@/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { arrayUnion } from "firebase/firestore";

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

export const saveCapsuleMetadata = createAsyncThunk(
  "capsule/saveCapsuleMetadata",
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

export const deleteCapsuleMetadata = createAsyncThunk(
  "capsule/deleteCapsuleMetadata",
  async ({ timelineId, capsuleId }, { rejectWithValue }) => {
    try {
      const capsuleDocRef = doc(
        firestore,
        `capsule/${timelineId}/metadata/${capsuleId}`
      );
      await deleteDoc(capsuleDocRef);

      console.log("Capsule metadata deleted successfully");
    } catch (error) {
      console.error("Error deleting capsule metadata: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCapsulePhotos = createAsyncThunk(
  "capsule/deleteCapsulePhotos",
  async ({ timelineId, capsuleId }, { rejectWithValue }) => {
    try {
      const capsulePhotosDocRef = doc(
        firestore,
        `capsule/${timelineId}/photos/${capsuleId}`
      );
      await deleteDoc(capsulePhotosDocRef);

      console.log("Capsule photos deleted successfully");
    } catch (error) {
      console.error("Error deleting capsule metadata: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCapsuleVerse = createAsyncThunk(
  "capsule/deleteCapsuleVerse",
  async ({ timelineId, capsuleId, verseId }, { dispatch, rejectWithValue }) => {
    try {
      const verseDocRef = doc(
        firestore,
        `capsule/${timelineId}/verses/${capsuleId}/versesCollection/${verseId}`
      );
      await deleteDoc(verseDocRef);

      console.log("Verse deleted successfully");

      // Dispatch an action to remove the verse from the Redux store
      dispatch(removeVerse({ timelineId, capsuleId, verseId }));
    } catch (error) {
      console.error("Error deleting verse: ", error);
      return rejectWithValue(error.message);
    }
  }
);
export const savePhoto = createAsyncThunk(
  "capsule/savePhoto",
  async (photo, { getState, rejectWithValue }) => {
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

      const photoDocRef = doc(
        firestore,
        `capsule/${activeTimeline}/photos/${activeCapsule.id}`
      );
      await setDoc(photoDocRef, { photos: arrayUnion(photo) }, { merge: true });
      console.log("Photo saved successfully");
      return photo;
    } catch (error) {
      console.error("Error saving photo: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const saveVerses = createAsyncThunk(
  "capsule/saveVerses",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const activeCapsule = { ...state.global.activeCapsule };
      const { activeTimeline } = state.global;
      const { fetchedVerses } = state.global;

      // Check if activeTimeline is not empty
      if (!activeTimeline) {
        return rejectWithValue("Active timeline key is empty");
      }

      // Check if capsuleId is present, if not generate a new one
      if (!activeCapsule.id) {
        activeCapsule.id = uuidv4();
      }

      // Reference to the verses collection
      const versesCollectionRef = collection(
        firestore,
        `capsule/${activeTimeline}/verses/${activeCapsule.id}/versesCollection`
      );

      // Convert fetchedVerses to an array and save each verse with a unique ID
      const versesArray = Object.values(fetchedVerses);
      const promises = versesArray.map((verse) => {
        const verseId = uuidv4();
        const verseWithId = { ...verse, id: verseId }; // Add the ID to the verse object
        const verseDocRef = doc(versesCollectionRef, verseId);
        return setDoc(verseDocRef, verseWithId);
      });

      await Promise.all(promises);
      console.log("Verses saved successfully");
      return versesArray;
    } catch (error) {
      console.error("Error saving verses: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const saveVerse = createAsyncThunk(
  "capsule/saveVerse",
  async ({ timelineId, capsuleId, verseId, comment }, { rejectWithValue }) => {
    try {
      // Get a reference to the verse document
      const verseDocRef = doc(
        firestore,
        `capsule/${timelineId}/verses/${capsuleId}/versesCollection/${verseId}`
      );

      // Update the verse document with the new comment
      await updateDoc(verseDocRef, { comments: comment });

      console.log("Verse updated successfully");
    } catch (error) {
      console.error("Error updating verse: ", error);
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
      const verseText = data.data.text;
      const name = data.data.surah.name;
      return {
        id: uuidv4(),
        text: verseText,
        reference: reference,
        comments: comments || "",
        name,
      };
    } catch (error) {
      console.error("Error fetching verse:", error);
      throw error;
    }
  }
);

export const searchVerse = createAsyncThunk(
  "global/searchVerse",
  async ({ keyword }, { getState, dispatch }) => {
    try {
      // Fetch the verse using the API
      const response = await fetch(
        `https://api.alquran.cloud/v1/search/${keyword}/all/ar`
      );
      const data = await response.json();
      const matches = data.data.matches;
      if (!matches || matches.length === 0) {
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
  timelines: {},
  fetchedVerses: {},
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
      state.timelines[action.payload.id].capsules = {
        ...state.timelines[action.payload.id].capsules,
        ...action.payload.capsules,
      };
    },
    setTimelinePhotos: (state, action) => {
      Object.entries(action.payload.photos).forEach(([capsuleId, photos]) => {
        if (!state.timelines[action.payload.id].capsules[capsuleId]) {
          state.timelines[action.payload.id].capsules[capsuleId] = {};
        }
        state.timelines[action.payload.id].capsules[capsuleId].photos = {
          ...state.timelines[action.payload.id].capsules[capsuleId].photos,
          ...photos,
        };
      });
    },
    setTimelineVerses: (state, action) => {
      const { timelineId, capsuleId, verses } = action.payload;
      state.timelines[timelineId] = state.timelines[timelineId] || {};
      state.timelines[timelineId].capsules =
        state.timelines[timelineId].capsules || {};
      state.timelines[timelineId].capsules[capsuleId] =
        state.timelines[timelineId].capsules[capsuleId] || {};
      state.timelines[timelineId].capsules[capsuleId].verses = {
        ...state.timelines[timelineId].capsules[capsuleId].verses,
        ...verses,
      };
    },
    removeVerse: (state, action) => {
      const { timelineId, capsuleId, verseId } = action.payload;
      if (
        state.timelines[timelineId] &&
        state.timelines[timelineId].capsules[capsuleId] &&
        state.timelines[timelineId].capsules[capsuleId].verses
      ) {
        delete state.timelines[timelineId].capsules[capsuleId].verses[verseId];
      }
    },
    deleteFetchedVerse: (state, action) => {
      const { verseId } = action.payload;
      delete state.fetchedVerses[verseId];
    },
    updateFetchedVerseComment: (state, action) => {
      const { verseId, comment } = action.payload;
      if (state.fetchedVerses[verseId]) {
        state.fetchedVerses[verseId].comments = comment;
      }
    },
    updateVerseComment: (state, action) => {
      const { timelineId, capsuleId, verseId, comment } = action.payload;
      if (
        state.timelines[timelineId] &&
        state.timelines[timelineId].capsules[capsuleId] &&
        state.timelines[timelineId].capsules[capsuleId].verses &&
        state.timelines[timelineId].capsules[capsuleId].verses[verseId]
      ) {
        state.timelines[timelineId].capsules[capsuleId].verses[
          verseId
        ].comments = comment;
      }
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCapsuleMetadata.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveCapsuleMetadata.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveCapsuleMetadata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(savePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePhoto.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(savePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCapsuleMetadata.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCapsuleMetadata.fulfilled, (state, action) => {
        state.loading = false;
        const { timelineId, capsuleId } = action.meta.arg; // get timelineId and capsuleId from action payload
        const timeline = state.timelines[timelineId];
        if (timeline) {
          const capsule = timeline.capsules[capsuleId];
          if (capsule) {
            delete timeline.capsules[capsuleId];
          }
        }
      })
      .addCase(deleteCapsuleMetadata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVerse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVerse.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.fetchedVerses) {
          state.fetchedVerses = {};
        }
        state.fetchedVerses[action.payload.id] = action.payload;
      })
      .addCase(fetchVerse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveVerses.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveVerses.fulfilled, (state) => {
        state.loading = false;
        state.fetchedVerses = {};
      })
      .addCase(saveVerses.rejected, (state, action) => {
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
});

export const {
  setMode,
  setActiveCapsule,
  setActiveTimeLine,
  setSnackbar,
  setUser,
  setTimelines,
  setTimelineCapsules,
  setTimelinePhotos,
  setTimelineVerses,
  removeVerse,
  deleteFetchedVerse,
  updateFetchedVerseComment,
  updateVerseComment,
} = globalSlice.actions;

export default globalSlice.reducer;
