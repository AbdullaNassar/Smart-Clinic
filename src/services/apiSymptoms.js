import supabase from "./supabase";

export async function getSymptoms(){
    
let { data, error } = await supabase
.from('symptoms')
.select('*')
if(error){
    throw new Error('symptoms cannot be loaded');
  }
  return data;
}
export async function addNewSymptom(newSymptom){
    
    const { data, error } = await supabase
    .from('symptoms')
    .insert([newSymptom])
    .select()
    if(error){
        console.error(error);
        throw new Error("newSymptom cannot be added");
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