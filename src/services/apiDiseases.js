import supabase from "./supabase";

export async function getDiseases(){
    
let { data, error } = await supabase
.from('diseases')
.select('*')
if(error){
    throw new Error('diseases cannot be loaded');
  }
  return data;
}
export async function addNewdisease(newDisea){
    
    const { data, error } = await supabase
    .from('diseases')
    .insert([newDisea])
    .select()
    if(error){
        console.error(error);
        throw new Error("newDisea cannot be added");
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