import supabase from "./supabase";

export async function getMedicalTests(){
    
let { data, error } = await supabase
.from('medicalTest')
.select('*')
if(error){
    throw new Error('medicalTest cannot be loaded');
  }
  return data;
}
export async function addNewMedicalTest(newMedicalTest){
    
    const { data, error } = await supabase
    .from('medicalTest')
    .insert([newMedicalTest])
    .select()
    if(error){
        console.error(error);
        throw new Error("newMedicalTest cannot be added");
    }
    return data;
    }   

