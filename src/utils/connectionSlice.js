import { createSlice } from "@reduxjs/toolkit"
const connectionSlice = createSlice({
    name:"conna=ection",
    initialState:null,
    reducers:{
        addConnections:(state,action)=>action.payload,
        removeConnections:()=>null,
    },
});

export const{addConnections,removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer