import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const character_limit = 12;

export const fetchCharacters = createAsyncThunk('characters/getCharacters', async (page) => {
    const res = await axios(`https://www.breakingbadapi.com/api/characters?limit=${character_limit}&offset=${page * character_limit}`);
    return res.data;
});

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        personas: [],
        status: 'idle',
        page: 0,
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state, action) => {
                state.status = 'loading';

            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.personas = [...state.personas, ...action.payload];
                state.status = 'succeeded';
                state.page += 1;
            
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default charactersSlice.reducer;