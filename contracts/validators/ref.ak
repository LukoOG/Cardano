se aiken/transaction::{
  ScriptContext, Transaction, Output, Input, Value, Address,
}
use aiken/byte_array
use aiken/list
use aiken/value

/// The data attached to the UTXO locked by the escrow script.
/// Stores the buyer's and seller's addresses.
type EscrowDatum {
  buyer: Address,
  seller: Address,
}

/// The data provided with the transaction spending the script UTXO.
/// Signals the action to be performed.
type EscrowRedeemer {
  /// Indicates completion. Requires a specific message.
  Complete: ByteArray,
}

/// The main validator function.
/// Determines if a transaction spending the script UTXO is valid.
fn main(datum: EscrowDatum, redeemer: EscrowRedeemer, context: ScriptContext) -> Bool {
  // Pattern match on the redeemer to determine the action
  when redeemer is {
    // Case 1: Attempting to complete the escrow
    Complete(message) -> {
      // Check if the provided message is the expected "complete" string
      let is_complete_message = message == "complete"

      // If the message is correct, check if the funds are going to the seller
      let funds_go_to_seller = if is_complete_message {
        // Get the value of the UTXO being spent from the script
        let input_value = context.spending_input.output.value

        // Filter transaction outputs to find those going to the seller's address
        let seller_outputs = context.transaction.outputs
          |> filter(fn(output) { output.address == datum.seller })

        // Sum the value of all outputs going to the seller
        let value_to_seller = seller_outputs
          |> fold(fn(total, output) { total + output.value }, Value::zero())

        // Check if the total value sent to the seller is at least the value of the input
        // (This allows for fees to be paid from other inputs, but ensures the principal goes to the seller)
        value_to_seller >= input_value
      } else {
        // If the message is wrong, this action is invalid
        False
      }

      // The transaction is valid for completion only if the message is correct AND funds go to the seller
      is_complete_message && funds_go_to_seller
    }

    // Case 2: Any other redeemer (or if the redeemer structure changes)
    // For this simple contract, any other redeemer is invalid.
    _ -> {
      False
    }
  }
}