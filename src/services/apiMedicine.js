import supabase from "./supabase";

export async function getMedicines(){
    
let { data, error } = await supabase
.from('medicines')
.select('*')
if(error){
    throw new Error('Medicines cannot be loaded');
  }
  return data;
}
export async function addNewMedicine(newMedicine){
    
    const { data, error } = await supabase
    .from('medicines')
    .insert([newMedicine])
    .select()
    if(error){
        console.error(error);
        throw new Error("newMedicine cannot be added");
    }
    return data;
    }   

//   export async function getPatientInfo(id){
      
//       const{data, error}=await supabase
//       .from('patients')
//       .select()
//       .eq('id',id)
//       .single()
      
//       if(error){
//           console.log('error');
//       }
//       return data;
//     }