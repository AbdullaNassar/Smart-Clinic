import supabase from "./supabase";


export async function getBooking(){
    const { data, error } = await supabase
  .from('bookings')
  .select('*')
  
  if(error){
    throw new Error('bookings cannot be loaded');
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