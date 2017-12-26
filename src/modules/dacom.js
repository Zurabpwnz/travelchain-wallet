import {Apis} from "bitsharesjs-ws"
import {ops, FetchChain, PrivateKey, TransactionHelper, Aes, TransactionBuilder} from 'bitsharesjs'

// import {generate_aes_by_hash} from '../utils'

// TODO В утилиты добавить
import crypto from 'crypto'
import CryptoJS from 'crypto-js'

import auth from './blockchain'


export default {
  async test() {
    let data_hash = crypto.randomBytes(32).toString('hex')

    let shared = generate_aes_by_hash(data_hash)

    let message = 'Привет qweasd'

    let e_messge = CryptoJS.AES.encrypt(message, shared).toString()
    console.log(e_messge)

    // decript
    console.log(data_hash)
    let shared2 = generate_aes_by_hash(data_hash)
    // let d_message = CryptoJS.AES.decrypt(e_messge, shared2)
    let d_message = CryptoJS.AES.decrypt(e_messge, shared2).toString(CryptoJS.enc.Utf8)

    console.log(2, d_message)
    // console.log(d_message.toString(CryptoJS.enc.Utf8))
  },

  async exec(...params) {
    return await Apis.instance().db_api().exec(...params)
  },

  async dacom_assets(username) {
    let assests = await this.exec("get_named_account_balances", [username, []])

    return await this.exec('get_assets', [assests.map((a) => a.asset_id)])
  },

  async broadcast(tr) {
    let pKey = auth.getPrivateKey('active')

    await tr.set_required_fees()
    tr.add_signer(pKey, pKey.toPublicKey().toPublicKeyString())

    return await tr.broadcast()
  },

  async upload_data(type, data) {
    // Уникольный хеш для каждой операции данных
    let data_hash = crypto.randomBytes(32).toString('hex')

    // Ключ шифрования для AES'а
    let shared = generate_aes_by_hash(data_hash)

    let encrypted = []

    for (let key in data) {
      if (data[key].encrypted) {
        encrypted.push(key)

        data[key].data = CryptoJS.AES.encrypt(data[key].data, shared).toString()
      }

      data[key] = data[key].data
    }

    data.hash = data_hash 
    data.type = type
    data.encrypted = encrypted

    let byte_data = Buffer.from(
      JSON.stringify(data)
    )

    let tr = new TransactionBuilder()

    tr.add_type_operation('custom', {
      payer: auth.account.id,
      id: 666,
      data: byte_data
    })

    let res = await this.broadcast(tr)

    console.log(res)
  },

  async send_proposal(from, amount, message) {
    let sendAmount = {
      amount: amount * 10000, // Умножаем на точность в бч.
      asset: "TEST"
    }

    let [fromAccount, toAccount, feeAsset] = await Promise.all([
      FetchChain("getAccount", from),
      FetchChain("getAccount", auth.account),
      FetchChain("getAsset", sendAmount.asset),
    ])

    let memoFromKey = fromAccount.getIn(["options", "memo_key"])
    let memoToKey = toAccount.getIn(["options", "memo_key"])

    let nonce = TransactionHelper.unique_nonce_uint64()

    let memo_object = {
      from: memoToKey,
      to: memoFromKey,
      nonce,
      message: Aes.encrypt_with_checksum(
        auth.getPrivateKey('active'),
        memoFromKey,
        nonce,
        message
      )
    }

    let tr = new TransactionBuilder()

    let transfer_op = tr.get_type_operation("transfer", {
      fee: {
        amount: 0,
        asset_id: feeAsset.get("id")
      },

      from: fromAccount.get("id"),
      to: toAccount.get("id"),
      amount: { amount: sendAmount.amount, asset_id: feeAsset.get("id") },
      memo: memo_object,
    })

    tr.add_type_operation('proposal_create', {
      fee: {
        amount: 0,
        asset_id: feeAsset.get("id")
      },
      fee_paying_account: toAccount.get('id'),
      proposed_ops: [
        {op: transfer_op}
      ],
      
      // Reviev 2 hours
      review_period_seconds: 60 * 60 * 2,
    })

    await tr.set_required_fees()

    let res = await this.broadcast(tr)
    console.log(res)
    alert('OK')
  }
}