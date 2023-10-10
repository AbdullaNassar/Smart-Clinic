import supabase from "./supabase";

export async function getMyRevenues(){
    
let { data, error } = await supabase
.from('myRevenues')
.select('*')
if(error){
    throw new Error('my Revenues cannot be loaded');
  }
  return data;
}
export async function addNewClinicRevenues(newRevenue){
    
    const { data, error } = await supabase
    .from('myRevenues')
    .insert([newRevenue])
    .select()
    if(error){
        console.error(error);
        throw new Error("newRevenue cannot be added");
    }
    return data;
    }   

