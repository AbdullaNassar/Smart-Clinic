import supabase from "./supabase";

export async function getExpenses(){
    
let { data, error } = await supabase
.from('expenses')
.select('*')
if(error){
    throw new Error('Expenses cannot be loaded');
  }
  return data;
}
export async function addNewExpense(newExpenses){
    
    const { data, error } = await supabase
    .from('expenses')
    .insert([newExpenses])
    .select()
    if(error){
        console.error(error);
        throw new Error("newExpenses cannot be added");
    }
    return data;
    }   

