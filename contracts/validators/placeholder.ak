use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use aiken/primitive/string
// use aiken/value
use cardano/transaction.{OutputReference, Transaction}

//Process
// 1. Buyer orders produce offchain.
// 2. Buyer, Seller, and locked stablecoin (ADA for demo) are stored in the smc Datum
// 3. 
//


//stores the escrow UtxO, seller's and buyer's address
pub type Datum {
  owner: VerificationKeyHash, //buyer
  receiver: VerificationKeyHash,
}

// for demo purposes, the redeemer will signal completion by passing a string "complete"
// more complex logic can be implemented moving forward, especially when Aiken developer power increases
pub type EscrowRedeemer {
  msg: ByteArray,
}

validator placeholder {
  spend(
    datum: Option<Datum>,
    redeemer: EscrowRedeemer,
    _own_ref: OutputReference,
    self: Transaction,
  ){
    when redeemer is{
      EscrowRedeemer(message) -> {
        //checking if the message passed is "complete"
        let is_complete_message = message == "complete"

        //checking whether the receiver matches the address
        let funds_go_to_seller = 
        //checking certain conditions before determining funds are going to the seller
        if is_complete_message{
          let input_value = self.spending_input.output.value

          //check if the spender is valid
          let seller_outputs = self.transaction.outputs  |> filter (fn(output){ output.address == datum.address }) 
          let value_to_seller = seller_outputs
          |> fold(fn(total, output) { total + output.value }, 0)

          //returns true if the sender address matches and the funds going to seller is the minimum of what they expect
          //minus fees
          value_to_seller >= input_value
        } else {
          False
        }
      }
      //any other type of redeemer fails
      _ -> {
        False
      }
    }
  }
}