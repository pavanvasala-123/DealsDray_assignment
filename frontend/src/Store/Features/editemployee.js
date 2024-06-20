import { createSlice } from '@reduxjs/toolkit';



const editEmployee = createSlice({
  name: 'edit',
  initialState: {
    isEdit: false,
    employeeId:null
  },
  reducers: {
    setEditemployee : (state)=>{
        state.isEdit = !state.isEdit
    },
    setEmployeeId :(state,action)=>{
        state.employeeId = action.payload
    }
  }
});

export const {setEditemployee,setEmployeeId} = editEmployee.actions
export default editEmployee.reducer
