<template>
    <div class="register-block">
        <img src="static/logo-white.svg">
        <h1>Welcome to the OpenWallet</h1>
        <a @click="register()" class="register-button">New wallet</a>
        <div v-if="reg_active" class="wrapper-register-block">
            <div class="register-popap-block">
                <h1>Mnemonics time!</h1>
                <div class="word-block"
                    v-for="(word, index) in sid_phrase"
                    :key="index"
                >
                    <span>{{ index }}. </span>
                    <p>{{ word }}</p>
                </div>
                <a @click="to_the_main_page()">Done!</a>
            </div>
        </div>
        <a  @click="auth()"  class="auth-button">I already have a wallet</a>
        <div  v-if="reg_sidphrase_active" class="wrapper-auth-block">
            <div class="auth-popap-block">
                <div class="auth-popap-block">
                    <h1>Mnemonics time!</h1>
                    <div class="word-block"
                        v-for="i in 24"
                        :key="i"
                    >
                        <span>{{ i }}. </span>
                        <input v-model="sid_phrase_check[i]">
                    </div>
                    <a @click="check_sidphrase()">Done!</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

    export default {
        name: 'RegisterBlock',
        data() {
            return {
                reg_active: false,
                reg_sidphrase_active: false,
                sid_phrase: [
                    'red', 'green', 'blue', 'red', 'green', 'blue',
                    'red', 'green', 'blue', 'red', 'green', 'blue',
                    'red', 'green', 'blue', 'red', 'green', 'blue',
                    'red', 'green', 'blue', 'red', 'green', 'blue',
                ],
                sid_phrase_check: [

                ]
            }
        },
        methods: {
            ...mapActions([
                'setIdUser'
            ]),
            register() {
                // async function get sid
                this.reg_active = true;
            },
            auth() {
                this.reg_sidphrase_active = true;
            },
            to_the_main_page() {
                let id_user = 'UQAFQORzd2DQQnjCyi13qJg8nkz5U0KE-m0On51Wb4yuzuXM'
                // async
                this.sid_phrase = null
                this.setIdUser(id_user)
            },
            check_sidphrase() {
                let id_user = 'UQAFQORzd2DQQnjCyi13qJg8nkz5U0KE-m0On51Wb4yuzuXM'
                // async 
                // this.sid_phrase_check === req
                this.sid_phrase_check = null
                this.setIdUser(id_user)
            }
            
        }
    }

</script>

<style scoped lang="scss">
$base-font: 'Inter', sans-serif;
    .register-block {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100dvh;
        z-index: 1;
        position: absolute;
        background: #161616;
        img {
            margin: 62px 0 31px;
            width: 216px;
            height: 216px;
            flex-shrink: 0;
        }
        h1 {
            font-family: $base-font;
            font-size: 40px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            color: #FFF;
            text-align: center;
            margin-bottom: 162px;
        }
        .register-button {
            cursor: pointer;
            border: 0;
            width: 333px;
            height: 79px;
            border-radius: 19px;
            background: #D9D9D9;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-family: $base-font;
            font-size: 40px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            margin-bottom: 39px;
        }
        .auth-button {
            cursor: pointer;
            font-family: $base-font;
            color: #FFF;
            text-align: center;
            font-family: Inter;
            font-size: 20px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
        }
        .wrapper-register-block {
            position: absolute;
            height: 100dvh;
            width: 100%;
            overflow-y: scroll;
            .register-popap-block {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #161616;
                
                h1 {
                    width: 333px;
                    margin: 31px 0 26px;
                    color: #FFF;
                    text-align: center;
                    font-family: Inter;
                    font-size: 40px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                }
                .word-block {
                    margin-bottom: 26px;
                    width: 372px;
                    height: 52px;
                    border-radius: 20px;
                    background: #222;
                    display: flex;
                    align-items: center;
                    span {
                        align-items: center;
                        color: #848484;
                        font-family: $base-font;
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 900;
                        line-height: normal;
                        margin-left: 19px;
                        margin-right: 19px;
                    }
                    p {
                        color: #FFF;
                        font-family: $base-font;
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 800;
                        line-height: normal;
                    }
                }
                a {
                    cursor: pointer;
                    border-radius: 19px;
                    background: #D9D9D9;
                    margin-top: 30px;
                    margin-bottom: 26px;
                    padding: 15px;
                    
                    color: #000;
                    text-align: center;
                    font-family: $base-font;
                    font-size: 30px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                }
            }
        }
        .wrapper-register-block::-webkit-scrollbar {
            width: 0;
        }
        .wrapper-auth-block {
            width: 100%;
            height: 100dvh;
            position: absolute;
            background: #161616;
            overflow-y: scroll;
            .auth-popap-block {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #161616;
                h1 {
                    width: 333px;
                    margin: 31px 0 26px;
                    color: #FFF;
                    text-align: center;
                    font-family: Inter;
                    font-size: 40px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                }
                .word-block {
                    margin-bottom: 26px;
                    // padding-right: 10px;
                    box-sizing: border-box;
                    width: 372px;
                    height: 52px;
                    border-radius: 20px;
                    background: #222;
                    display: flex;
                    align-items: center;
                    span {
                        align-items: center;
                        color: #848484;
                        font-family: $base-font;
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 900;
                        line-height: normal;
                        margin-left: 19px;
                        margin-right: 19px;
                    }
                    input {
                        width: 80%;
                        border: 0;
                        background: #222;

                        color: #FFF;
                        font-family: $base-font;
                        font-size: 20px;
                        font-style: normal;
                        font-weight: 800;
                        line-height: normal;
                        outline-width: 0;
                    }
                }
                a {
                    cursor: pointer;
                    border-radius: 19px;
                    background: #D9D9D9;
                    margin-top: 30px;
                    margin-bottom: 26px;
                    padding: 15px;
                    
                    color: #000;
                    text-align: center;
                    font-family: $base-font;
                    font-size: 30px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                }
            }
        }
        .wrapper-auth-block::-webkit-scrollbar {
            width: 0;
        }
    }
</style>