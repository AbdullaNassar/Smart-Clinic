import supabase from "./supabase";

export async function getPatients(){
    
let { data, error } = await supabase
.from('patients')
.select('*')
if(error){
    throw new Error('patients cannot be loaded');
  }
  return data;
}

export async function createNewPatient(newPatient){
    
    const { data, error } = await supabase
    .from('patients')
    .insert([newPatient])
    .select()
    if(error){
        console.error(error);
        throw new Error("newPatient cannot be added");
    }
    return data;
    }   

  export async function getPatientInfo(id){
      
      const{data, error}=await supabase
      .from('patients')
      .select()
      .eq('id',id)
      .single()
      
      if(error){
          console.log('error');
      }
      return data;
    }