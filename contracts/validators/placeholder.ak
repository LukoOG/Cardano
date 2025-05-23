use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use aiken/primitive/string
use cardano/transaction.{OutputReference, Transaction}

pub type Datum {
  owner: VerificationKeyHash,
}

pub type Redeemer {
  msg: ByteArray,
}

//conditions: The redeemer must be saying "Hello, World!" and must be the owner;
//validated by checking if the signature is the same as the owner
validator hello_world {
  spend(
    datum: Option<Datum>,
    redeemer: Redeemer,
    _own_ref: OutputReference,
    self: Transaction,
  ) {
    trace @"redeemer": string.from_bytearray(redeemer.msg)

    expect Some(Datum { owner }) = datum

    let must_say_hello = redeemer.msg == "Hello, World!"

    let must_be_signed = list.has(self.extra_signatories, owner)

    must_be_signed? && must_say_hello?
  }

  else(_) {
    fail
  }
}

test hello_world_example() {
  let datum =
    Datum { owner: #"00000000000000000000000000000000000000000000000000000000" }

  let redeemer = Redeemer { msg: "Hello, World!" }

  let placeholder_utxo = OutputReference { transaction_id: "", output_index: 0 }

  hello_world.spend(
    Some(datum),
    redeemer,
    placeholder_utxo,
    Transaction { ..transaction.placeholder, extra_signatories: [datum.owner] },
  )
}
