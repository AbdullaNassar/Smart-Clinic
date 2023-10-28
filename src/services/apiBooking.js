import { getToday } from "../utils/helper";
import supabase from "./supabase";
export async function getBooking(){
    const { data, error } = await supabase
  .from('bookings')
  .select('*,patients(*)')
  
  if(error){
    throw new Error('bookings cannot be loaded');
  }
  return data;
}

export async function getTodayBooking(){
  const currentDate = new Date().toISOString().slice(0, 10); // Get today's date
  const startOfToday = new Date(currentDate).toISOString(); // Start of today
  const endOfToday = new Date(currentDate + 'T23:59:59.999Z').toISOString(); // End of today

  const {data,error}=await supabase 
  .from('bookings')
  .select('*,patients(*)')
  .gte('date', startOfToday) // Greater than or equal to the start of today
  .lte('date', endOfToday); // Less than or equal to the end of today

  if(error){
    throw new Error('bookings cannot be loaded');
  }
  return data;
}


export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, patients(*)")
    .eq('date',getToday)
    .order("date");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}
export async function deleteBooking(id){
    
const { error } = await supabase
.from('bookings')
.delete()
.eq('id', id)
if(error){
    throw new Error('bookings cannot be deleted');
  }
}

export async function createBooking(newBooking){
    
const { data, error } = await supabase
.from('bookings')
.insert([newBooking])
.select()

if(error){
    console.error(error);
    throw new Error("booking cannot be reserved");
}
return data;
}

export async function getbookingInfo(id){
      
  const{data, error}=await supabase
  .from('bookings')
  .select()
  .eq('id',id)
  .single()
  
  if(error){
      console.log('error');
  }
  return data;
}

export async function updateBooking(id,columnName, value){
  const updates = {
    [columnName]: value,
  };
  const { data, error } = await supabase
  .from('bookings')
  .update(updates)
  .eq("id",id)

  if (error) {
     console.log('error');
  }
  return data;
}


export async function updateSpecficBooking(id, updatedData){
  const { data, error } = await supabase
  .from('bookings')
  .update(updatedData)
  .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}