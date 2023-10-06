import supabase from "./supabase";

export async function getFood(){
    
let { data, error } = await supabase
.from('food')
.select('*')
if(error){
    throw new Error('foods cannot be loaded');
  }
  return data;
}
export async function addNewFood(newFood){
    
    const { data, error } = await supabase
    .from('food')
    .insert([newFood])
    .select()
    if(error){
        console.error(error);
        throw new Error("newFood cannot be added");
    }
    return data;
    }   

