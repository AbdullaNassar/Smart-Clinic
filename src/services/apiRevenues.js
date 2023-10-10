import supabase from "./supabase";

export async function getRevenues(){
    
let { data, error } = await supabase
.from('revenues')
.select('*')
if(error){
    throw new Error('Revenues cannot be loaded');
  }
  return data;
}
export async function addNewRevenue(newRevenue){
    
    const { data, error } = await supabase
    .from('revenues')
    .insert([newRevenue])
    .select()
    if(error){
        console.error(error);
        throw new Error("newRevenue cannot be added");
    }
    return data;
    }   

