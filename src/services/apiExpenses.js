import supabase from "./supabase";

export async function getExpenses(){
    
let { data, error } = await supabase
.from('inventory')
.select('*')
if(error){
    throw new Error('items cannot be loaded');
  }
  return data;
}
export async function addNewExpense(newExpenses){
    
    const { data, error } = await supabase
    .from('inventory')
    .insert([newExpenses])
    .select()
    if(error){
        console.error(error);
        throw new Error("newItem cannot be added");
    }
    return data;
    }   

export async function updateInventoryItem({id, quantityIncreament}){

    const { error } = await supabase
      .from("inventory")
      .update({
        quantity: supabase.sql(`quantity + ${Number(quantityIncreament)}`),
      })
      .eq("id", id);

      if(error){
        throw new Error(error.message)
      }

}

export async function updateQuantity(id, newValue,isIncrease) {
  // Fetch the current quantity value from the database
  const { data, error } = await supabase
    .from("inventory")
    .select("quantity")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching previous quantity:", error);
    return;
  }

  const previousValue = data.quantity;
  let updatedValue;
  if(isIncrease)updatedValue = previousValue + newValue;
  else updatedValue = previousValue - newValue;


  // Update the quantity column with the new value
  const { error: updateError } = await supabase
    .from("inventory")
    .update({ quantity: updatedValue })
    .eq("id", id);

  if (updateError) {
    console.error("Error updating quantity:", updateError);
    return;
  }

  console.log("Quantity updated successfully!");
}