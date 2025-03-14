import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Appointment {
	dateTime: string;
	employee: string;
	service: string;
	note: string;
	status: string;
}

interface BookingState {
	appointments: Appointment[];
}

const initialState: BookingState = {
	appointments: [],
};

const bookingSlice = createSlice({
	name: 'booking',
	initialState,
	reducers: {
		addAppointment: (state, action: PayloadAction<Appointment>) => {
			state.appointments.push(action.payload);
		},
	},
});

export const { addAppointment } = bookingSlice.actions;
export default bookingSlice.reducer;
