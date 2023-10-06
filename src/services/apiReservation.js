import supabase from "./supabase";

export async function getReservations(){
    let { data,  error } = await supabase
  .from('reservations')
  .select('*')

  if(error){
    throw new Error('bookings cannot be loaded');
  }
  return data;
}

export async function creteReservation(newReservations){
    
    const { data, error } = await supabase
    .from('reservations')
    .insert([newReservations])
    .select()
    if(error){
        console.error(error);
        throw new Error("new reservations cannot be reserved");
    }
    return data;
    }

    export async function getReservationInfo(id){
      
        const{data, error}=await supabase
        .from('reservations')
        .select()
        .eq('id',id)
        .single()
        
        if(error){
            console.log('error');
        }
        return data;
      }