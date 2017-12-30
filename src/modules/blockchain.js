import store from '../../node_modules/store'
import axios from 'axios'
import { ChainStore, FetchChain, Login, PrivateKey } from 'bitsharesjs'
import { Apis, ChainConfig } from 'bitsharesjs-ws'


const FAUCET_URL = 'https://sandbox.travelchain.io/api/faucet/'

// Patch for TravelChain testnet node
ChainConfig.networks.TTT_TESTNET = {
    core_asset: 'TTEST',
    address_prefix: 'TEST',
    chain_id: '3a6e30213e0244d869810c5b213f10bd4f0b27b0aded88d22e444f7529eebfc4'
}


export default {
    isAuth: false,
    account: store.get( 'account' ),
    wifs: store.get( 'wifs' ),

    init() {
        this.isAuth = !!this.wifs

        if( this.wifs ) {
            FetchChain( "getAccount", this.account ).then( res => this.account.id = res.get( 'id' ) )
        }

        return new Promise( ( resolve, reject ) => {
            Apis.instance( 'wss://sandbox.travelchain.io/ws', true ).init_promise.then( () => {
                ChainStore.init().then( () => {
                    resolve()
                }, err => reject( err ) )
            }, err => reject( err ) )
        } )
    },

    getPrivateKey( type ) {
        // TODO Проверка ключа, разлогин если невалид
        return PrivateKey.fromWif( this.wifs[ type ] )
    },

    save( accountName, password ) {
        // Сохраняем данные юзера в локалсторадж
        let keys = Login.generateKeys( accountName, password, [ 'active', 'owner', 'memo' ] )

        this.wifs = {
            active: keys.privKeys.active.toWif(),
            memo: keys.privKeys.memo.toWif(),
            owner: keys.privKeys.owner.toWif()
        }

        store.set( 'account', this.account )
        store.set( 'wifs', this.wifs )

        this.isAuth = true
    },

    signUp( accountName, password ) {
        return new Promise( ( resolve, reject ) => {
            FetchChain( 'getAccount', [ accountName ] ).then( () => {
                reject( 'Account already exist' )
            }, () => {
                try {
                    var keys = Login.generateKeys( accountName, password, [ 'active', 'owner', 'memo' ] )
                } catch( e ) {
                    return reject( e.message )
                }

                axios.post( FAUCET_URL, {
                    account: accountName,
                    owner_key: keys.pubKeys.owner,
                    active_key: keys.pubKeys.active,
                    memo_key: keys.pubKeys.memo
                } ).then( () => {

                    // TODO Проверить работу когда будет фаусет
                    FetchChain( 'getAccount', [ accountName ] ).then( res => {
                        let acc = res.toJS()[ 0 ]

                        this.account = {
                            id: acc.id,
                            name: acc.name
                        }

                        this.save( accountName, password )
                        resolve()
                    } )
                }, err => {
                    resolve( err )
                } )
            } )
        } )
    },

    doesUserExist( accountName ) {
        return FetchChain( 'getAccount', [ accountName ] ).then(
            () => {
                return true
            },
            () => {
                return false
            }
        )
    },

    login( accountName, password ) {
        if( !accountName || !password ) {
            return Promise.reject( 'Empty creditials' )
        }

        return new Promise( ( resolve, reject ) => {
            FetchChain( 'getAccount', [ accountName ] ).then( res => {
                res = res.toJS()[ 0 ]

                this.account = {
                    id: res.id,
                    name: res.name
                }

                try {
                    var success = Login.checkKeys( {
                        accountName: accountName,
                        password: password,
                        auths: {
                            active: res.active.key_auths
                        }
                    } )
                } catch( e ) {
                    return reject( e.message )
                }

                if( success ) {
                    this.save( accountName, password )
                    resolve()
                }
                else {
                    reject( 'Invalid password' )
                }
            }, () => {
                reject( 'User does not exists' )
            } )
        } )
    }
}