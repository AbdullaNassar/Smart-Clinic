import supabase from "./supabase";

export async function getMyExpenses(){
    
let { data, error } = await supabase
.from('myExpenses')
.select('*')
if(error){
    throw new Error('My Expenses cannot be loaded');
  }
  return data;
}
export async function addNewClinicExpenses(newExpenses){
    
    const { data, error } = await supabase
    .from('myExpenses')
    .insert([newExpenses])
    .select()
    if(error){
        console.error(error);
        throw new Error("newExpenses cannot be added");
    }
    return data;
    }   

