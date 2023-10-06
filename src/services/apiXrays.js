import supabase from "./supabase";

export async function getXrays(){
    
let { data, error } = await supabase
.from('rays')
.select('*')
if(error){
    throw new Error('xRays cannot be loaded');
  }
  return data;
}
export async function addNewXray(newXray){
    
    const { data, error } = await supabase
    .from('rays')
    .insert([newXray])
    .select()
    if(error){
        console.error(error);
        throw new Error("XRay cannot be added");
    }
    return data;
    }   

