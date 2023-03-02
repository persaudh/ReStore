import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { product } from "../../app/models/Product";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<product>();

export const featchProductsAsync = createAsyncThunk<product[]>(
    'catalog/featchProductsAsync',
    async (_,thunkAPI) => {
        try {
            return await agent.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const featchProductAsync = createAsyncThunk<product, number>(
    'catalog/featchProductAsync',
    async (productID, thunkAPI) => {
        try {
            return await agent.Catalog.details(productID);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)



export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState({
        productsLoaded: false,
        status: 'idel'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(featchProductsAsync.pending, (state) => {
            state.status = 'pendingFeatchProducts';
        });
        builder.addCase(featchProductsAsync.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload);
            state.status = 'idel';
            state.productsLoaded = true;
        });
        builder.addCase(featchProductsAsync.rejected, (state,action) => {
            console.log(action.payload);
            state.status = 'idel';
        });
        builder.addCase(featchProductAsync.pending, (state) => {
            state.status = 'pendingFeatchProcudt'
        });
        builder.addCase(featchProductAsync.fulfilled, (state,action) =>{
            productAdapter.upsertOne(state, action.payload);
            state.status = 'idel';
        });
        builder.addCase(featchProductAsync.rejected,(state, action) =>{
            console.log(action);
            state.status = 'idel';
        })
    })
})

export const productSelectors = productAdapter.getSelectors((state: RootState) => state.catalog);