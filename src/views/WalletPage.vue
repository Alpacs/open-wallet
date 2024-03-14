<template>
    <div class="wrapper-the-wallet">
        <div class="the-header">
            <div class="adress-block">
                <h1>OpenWallet</h1>
                <p @click="copyId()">{{ shortenedText() }}</p>
            </div>
            <img @click="setIdUser('')" src="static/exit.svg">
        </div>
        <div class="balance-block">
            <h1>{{ getBalance['OPEN'].balance }}</h1>
            <p>$OPEN</p>
            <div class="init-transaction-block">
                <button @click="send_active = !send_active" style="margin-right: 3.6%"><img src="static/arrow-up-send.svg">send</button>
                <div @click="closeSendTr" v-if="send_active" class="wrapper-send-tr-block">
                    <div class="send-tr-block">
                        <h1>Send</h1>
                        <div class="wrapper-select">
                            <div @click="openSelectedCoin()" class="selected-coin-block">
                                <p>{{ send_coin.type_coin }}</p>
                                <img :style="'transform: ' + rotate_arrow_select + ';'" src="../assets/select.svg">
                            </div>
                            <div class="wrapper-options-block">
                                <div v-show="selectbl_active" class="options-block">
                                    <p 
                                        v-for="option in selectbl_coin_send"
                                        :key="option"
                                        @click="selectCoinToSend(option)"
                                        class="option-block"
                                    >{{ option }}</p>
                                </div>
                            </div>
                        </div>
                        <input placeholder="Wallet..." v-model="send_coin.wallet" type="text">
                        <input placeholder="OpenCoin amount..." v-model="send_coin.count" type="text">
                        <input class="comment-block" placeholder="Comment..." v-model="send_coin.comment" type="text">
                        <div>
                            <button @click="send_active = !send_active">Close</button>
                            <button @click="sendCoin()">Send</button>
                        </div>
                    </div>
                </div>
                <button @click="receive_active = !receive_active"><img src="static/arrow-down-reveive.svg">receive</button>
                <div @click="closeReceiveTr" v-if="receive_active" class="wrapper-receive-tr-block">
                    <div class="receive-tr-block">
                        <h1>Receive</h1>
                        <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2_210)">
                            <rect x="-5" y="-6" width="267" height="267" rx="20" fill="#222222"/>
                            <path d="M42.6667 32C36.7787 32 32 36.7787 32 42.6667V85.3334C32 91.2214 36.7787 96 42.6667 96H85.3334C91.2214 96 96 91.2214 96 85.3334V42.6667C96 36.7787 91.2214 32 85.3334 32H42.6667ZM117.333 32V53.3333H138.667V32H117.333ZM170.667 32C164.779 32 160 36.7787 160 42.6667V85.3334C160 91.2214 164.779 96 170.667 96H213.333C219.221 96 224 91.2214 224 85.3334V42.6667C224 36.7787 219.221 32 213.333 32H170.667ZM53.3333 53.3333H74.6667V74.6667H53.3333V53.3333ZM181.333 53.3333H202.667V74.6667H181.333V53.3333ZM117.333 74.6667V96H138.667V74.6667H117.333ZM32 117.333V138.667H53.3333V117.333H32ZM74.6667 117.333V138.667H96V117.333H74.6667ZM117.333 117.333V138.667H138.667V117.333H117.333ZM138.667 138.667V160H160V138.667H138.667ZM160 138.667H181.333V117.333H160V138.667ZM181.333 138.667V160H202.667V138.667H181.333ZM202.667 138.667H224V117.333H202.667V138.667ZM202.667 160V181.333H224V160H202.667ZM202.667 181.333H181.333V202.667H202.667V181.333ZM202.667 202.667V224H224V202.667H202.667ZM181.333 202.667H160V224H181.333V202.667ZM160 202.667V181.333H138.667V202.667H160ZM138.667 202.667H117.333V224H138.667V202.667ZM138.667 181.333V160H117.333V181.333H138.667ZM160 181.333H181.333V160H160V181.333ZM42.6667 160C36.7787 160 32 164.779 32 170.667V213.333C32 219.221 36.7787 224 42.6667 224H85.3334C91.2214 224 96 219.221 96 213.333V170.667C96 164.779 91.2214 160 85.3334 160H42.6667ZM53.3333 181.333H74.6667V202.667H53.3333V181.333Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2_210">
                            <rect width="256" height="256" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <p @click="copyId()">{{ shortenedText() }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="ton-wallet-block">
            <div class="ton-balanse-block">
                <img src="static/ton-logo.svg">
                <div>
                    <h1>TON</h1>
                    <p> {{ getBalance['TON'].balance }} </p>
                </div>
            </div>
            <p>${{ getBalance['TON'].current_USD }}</p>
        </div>
        <div class="transactions-block">
            <h2>Transactions</h2>
            <div class="wrapper-transaction">
                <div class="transaction" 
                    v-for="(tr, index) in getTransactions"
                    :key="index"
                >
                    <div>
                        <img :src="require('../assets/' + tr.img)">
                        <div>
                            <h3>{{ tr.type_tr }}</h3>
                            <p>{{ tr.adress }}</p>
                        </div>
                    </div>
                    <p
                        :style="'color:' + tr.color"
                    
                    ><span v-if="tr.type_coin === 'Open'">+</span>{{ tr.count }} <span v-if="tr.type_coin === 'Open'">$OPEN</span><span v-if="tr.type_coin === 'TON'">TON</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'WalletPage',
        data() {
            return {
                send_active: false,
                receive_active: false,
                send_coin: {
                    type_coin: 'OPEN',
                    wallet: '',
                    count: null,
                    comment: ''
                },
                selectbl_coin_send: [
                    'OPEN',
                    'TON'
                ],
                selectbl_active: false,

                rotate_arrow_select: 'none',
            }
        },
        computed: {
            ...mapGetters([
                'getId', 
                'getBalance',
                'getBalanceTon',
                'getBalanceTonUsdt',
                'getTransactions'
            ])
        },
        mounted() {
            this.updateBalance([
                {
                    name: 'TON'
                },
                {
                    name: 'OPEN',
                    pairs: 1151
                }
            ])
        },
        methods: {
            ...mapActions([
                'updateBalance',
                'setIdUser'
            ]),
            copyId() {
                navigator.clipboard.writeText(this.getId)
                // .then(() => {
                //     alert('Текст скопирован!');
                // })
                // .catch(() => {
                //     alert('Не удалось скопировать текст.');
                // })
            },
            shortenedText() {
                const text = this.getId;
                return `${text.slice(0, 4)}...${text.slice(-4)}`;
            },
            sendCoin() {
                // axios({
                //     method: 'post',
                //     data: this.sendCoin
                // })
                this.send_active = !this.send_active
                alert('Done')
            },
            closeSendTr(event) {
                if (!event.target.closest(".send-tr-block")) {
                    this.send_active = false;
                }
            },
            closeReceiveTr(event) {
                if (!event.target.closest(".receive-tr-block")) {
                    this.receive_active = false;
                }
            },
            openSelectedCoin() {
                this.selectbl_active = !this.selectbl_active
                if(this.rotate_arrow_select === 'rotate(180deg)') {
                    this.rotate_arrow_select = 'none'
                } else {
                    this.rotate_arrow_select = 'rotate(180deg)'
                }
            },
            selectCoinToSend(coin) {
                this.send_coin.type_coin = coin;
                this.selectbl_active = !this.selectbl_active
            }
        }
    }
</script>

<style scoped lang="scss">
$base-font: 'Inter', sans-serif;

    .wrapper-the-wallet {
        // overflow: hidden;
        // box-sizing: border-box;
        max-height: calc(100dvh - 110px);
        display: flex;
        flex-direction: column;
        .the-header {
            .adress-block {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                h1 {
                    margin-top: 8px;
                    color: #FFF;
                    text-align: center;
                    font-family: $base-font;
                    font-size: 30px;
                    font-style: normal;
                    font-weight: 800;
                    line-height: normal;
                    flex-shrink: 0;
                }
                p {
                    margin-bottom: 40px;
                    cursor: pointer;
                    color: #848484;
                    text-align: center;
                    font-family: $base-font;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: normal;
                }
            }
            img {
                position: absolute;
                top: 16px;
                right: 22px;
            }
        }
        .balance-block {
            h1 {
                color: #FFF;
                text-align: center;
                font-family: $base-font;
                font-size: 60px;
                font-style: normal;
                font-weight: 800;
                line-height: 105px;
            }
            p {
                margin-bottom: 27px;
                color: #848484;
                text-align: center;
                font-family: $base-font;
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
            }
            .init-transaction-block {
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                button {
                    cursor: pointer;
                    border: 0;
                    height: 37px;
                    flex-shrink: 0;
                    border-radius: 20px;
                    background: #222;
                    padding: 5px 14px 7px 12px;

                    color: #FFF;
                    text-align: center;
                    font-family: $base-font;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 800;
                    line-height: normal;
                    img {
                        margin-right: 12px;
                    }
                }
                .wrapper-send-tr-block {
                    position: absolute;
                    width: 100%;
                    height: 100dvh;
                    top: 0;
                    left: 0;
                    background-color: #05050559;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .send-tr-block {
                        border-radius: 36px;
                        width: 85%;
                        background-color: #161616;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 21px 0;
                        h1 {
                            text-align: left;
                            line-height: 36px;
                            font-family: $base-font;
                            font-size: 30px;
                            font-weight: 800;
                            margin-bottom: 28px;
                        }
                        .wrapper-select {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            position: relative;
                            appearance: none;
                            .selected-coin-block {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                outline:none;

                                width: 85.3%;
                                height: 52px;
                                background-color: #222222;

                                border-radius: 20px;
                                border: 0;
                                box-sizing: border-box;
                                padding-left: 19px;
                                padding-right: 45px;
                                margin-bottom: 13px;
                                p {
                                    color: white;
                                    font-family: $base-font;
                                    font-size: 20px;
                                    font-weight: 700;
                                    margin: 0;
                                }
                                img {
                                    width: 17px;
                                    transition: 0.3s;
                                }
                            }
                            .wrapper-options-block {
                                position: absolute;
                                left: 0;
                                right: 0;
                                top: 55px;
                                display: flex;
                                justify-content: center;
                                .options-block {
                                    cursor: pointer !important;    
                                    width: 85.3%;

                                    background-color: #222222;

                                    border-radius: 20px;
                                    border: 0;
                                    box-sizing: border-box;
                                    padding-top: 20px;
                                    margin-bottom: 13px;
                                    .option-block {
                                        cursor: pointer;
                                        font-weight: 500;
                                        font-size: 19px;
                                        font-family: $base-font;
                                        color: #848484;
                                    }
                                }
                            }
                        }
                        input {
                            box-sizing: border-box;
                            padding-left: 19px;
                            width: 85.3%;
                            height: 52px;
                            display: block;
                            outline:none;
                            background-color: #222222;
                            border-radius: 20px;
                            border: 0;
                            margin-bottom: 15px;
                        }
                        input[type="text"] {
                            color: #848484;
                            font-family: $base-font;
                            font-size: 20px;
                            font-weight: 700;
                        }
                        input::placeholder {
                            color: #848484;
                            font-family: $base-font;
                            font-size: 20px;
                            font-weight: 700;
                        }
                        .comment-block {
                            height: 97px;
                        }
                    }
                }
                .wrapper-receive-tr-block {
                    position: absolute;
                    width: 100%;
                    height: 100dvh;
                    top: 0;
                    left: 0;
                    background-color: #05050559;
                    display: flex;
                    padding: 0 24.5px;
                    box-sizing: border-box;
                    justify-content: center;
                    align-items: center;
                    .receive-tr-block {
                        width: 93.5%;
                        max-width: 436px;
                        height: 440px;
                        border-radius: 36px;
                        background-color: #161616;
                        padding: 25px 0 0 0;
                        box-sizing: border-box;
                        text-align: center;
                        h1 {
                            text-align: left;
                            font-family: $base-font;
                            font-size: 30px;
                            font-weight: 800;
                            line-height: 36px;
                            margin-left: 38px;
                            margin-bottom: 26px;
                        }
                        svg {
                            width: 256px;
                            height: 256px;
                            margin-bottom: 27px;
                            border-radius: 20px;
                            display: block;
                            margin: 0 auto;
                            margin-bottom: 27px;
                        }
                        p {
                            display: inline-block;
                            
                            cursor: pointer;
                            font-family: $base-font;
                            font-size: 20px;
                            line-height: 25px;
                            font-weight: 700;
                            color: #848484;
                        }
                    }
                }
                
            }
        }
        .ton-wallet-block {
            display: flex;
            align-items: center;
            border-radius: 20px;
            width: 100%;
            height: 76px;
            padding: 10px 22px 10px 14px;
            box-sizing: border-box;
            margin: 0 auto;
            justify-content: space-between;
            background-color: #222222;
            margin-top: 40px;
            .ton-balanse-block {
                display: flex;
                align-items: center;
                
                img {
                    width: 50px;
                    border: 0;
                    margin-right: 15px;
                    border-radius: 215px;
                }
                div {
                    h1 {
                        font-weight: 800;
                        line-height: 28px;
                        color: #FFFFFF;
                        font-size: 20px;
                        font-family: $base-font;
                    }
                    p {
                        font-weight: 500;
                        font-size: 15px;
                        font-family: $base-font;
                        color: #848484;
                    }
                }
            }
            p {
                font-weight: 800;
                font-size: 20px;
                font-family: $base-font;
                color: #848484;
            }
        }
        .transactions-block {
            width: 100%;
            margin: 37px auto 0;
            overflow-y: auto;
            flex-grow: 1;

            h2 {
                color: #848484;
                font-family: $base-font;
                font-weight: 700;
                font-size: 20px;
                margin-bottom: 11px;
            }
            .wrapper-transaction {
                width: 100%;
                overflow-y: auto;
                .transaction {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 22px 0 14px;
                    margin-bottom: 10px;
                    box-sizing: border-box;
                    background-color: #222222;
                    border-radius: 20px;
                    height: 76px;
                    width: 100%;
                    div {
                        display: flex;
                        align-items: center;
                        img {
                            width: 50px;
                            height: 50px;
                            border-radius: 512px;
                            margin-right: 15px;
                        }
                        div {
                            display: block;
                            h3 {
                                font-family: $base-font;
                                font-weight: 700;
                                font-size: 20px;
                                line-height: 28px;
                                color: white;
                            }
                            p {
                                font-family: $base-font;
                                font-weight: 600;
                                font-size: 15px;
                                color: #848484;
                            }
                        }
                    }
                    p {
                        font-family: $base-font;
                        font-weight: 800;
                        font-size: 20px;
                    }
                }
            }
            .wrapper-transaction::-webkit-scrollbar {
                width: 0;
            }
        }
        .transactions-block::-webkit-scrollbar {
            width: 0;
        }
    }
    @media (min-width: 377px) and (max-width: 414px) {
        .wrapper-the-wallet {
            .the-header {
                .adress-block {
                    h1 {
                        margin-top: 8px;
                        font-size: 20px;
                    }
                    p {
                        margin-bottom: 20px;
                        font-size: 15px;
                    }
                }
                img {
                    width: 30px;
                    top: 16px;
                    right: 22px;
                }
            }
            .balance-block {
                h1 {
                    font-size: 40px;
                    line-height: 65px;
                }
                p {
                    margin-bottom: 17px;
                    font-size: 15px;
                }
                .init-transaction-block {
                    button {
                        height: 30px;
                        padding: 5px 14px 7px 12px;

                        font-size: 15px;
                        img {
                            margin-right: 12px;
                        }
                    }
                    .wrapper-send-tr-block {
                        .send-tr-block {
                            width: 85%;
                            padding: 21px 0;
                            h1 {
                                line-height: 36px;
                                font-size: 30px;
                                margin-bottom: 28px;
                            }
                            .wrapper-select {
                                .selected-coin-block {
                                    width: 85.3%;
                                    height: 52px;

                                    padding-left: 19px;
                                    padding-right: 45px;
                                    margin-bottom: 13px;
                                    p {
                                        font-size: 20px;
                                    }
                                    img {
                                        width: 17px;
                                    }
                                }
                                .wrapper-options-block {
                                    .options-block {    
                                        width: 85.3%;
                                        padding-top: 20px;
                                        margin-bottom: 13px;
                                        .option-block {
                                            font-size: 19px;
                                        }
                                    }
                                }
                            }
                            input {
                                width: 85.3%;
                                height: 52px;
                                margin-bottom: 15px;
                                padding-left: 19px;
                            }
                            input[type="text"] {
                                font-size: 20px;
                            }
                            input::placeholder {
                                font-size: 20px;
                            }
                            .comment-block {
                                height: 97px;
                            }
                        }
                    }
                    .wrapper-receive-tr-block {
                        .receive-tr-block {
                            width: 100%;
                            height: auto;
                            padding: 25px 0 0 0;
                            h1 {
                                font-size: 25px;
                                margin-left: 38px;
                                margin-bottom: 26px;
                            }
                            svg {
                                width: 256px;
                                height: 256px;
                                margin-bottom: 27px;
                                border-radius: 20px;
                                margin-bottom: 27px;
                            }
                            p {
                                font-size: 20px;
                                line-height: 25px;
                            }
                        }
                    }
                    
                }
            }
            .ton-wallet-block {
                width: 100%;
                height: auto;
                padding: 7px 22px 7px 14px;
                margin: 25px auto 0;
                .ton-balanse-block {
                    img {
                        width: 35px;
                        margin-right: 15px;
                    }
                    div {
                        h1 {
                            font-size: 15px;
                        }
                        p {
                            font-size: 13px;
                        }
                    }
                }
                p {
                    font-size: 18px;
                }
            }
            .transactions-block {
                margin: 25px auto 0;
                border-radius: 20px;
                h2 {
                    font-size: 20px;
                    margin-bottom: 11px;
                }
                .wrapper-transaction {
                    // max-height: 40dvh;
                    // overflow: scroll;
                    width: 100%;
                    .transaction {
                        padding: 7px 22px 7px 14px;
                        margin-bottom: 10px;
                        height: auto;
                        width: 100%;
                        div {
                            img {
                                width: 35px;
                                height: 50px;
                                margin-right: 15px;
                            }
                            div {
                                h3 {
                                    font-size: 15px;
                                }
                                p {
                                    font-size: 13px;
                                }
                            }
                        }
                        p {
                            font-size: 17px;
                        }
                    }
                }
            }
        }
    } //480 px
    @media (min-width: 321px) and (max-width: 376px) {
        .wrapper-the-wallet {
            .the-header {
                .adress-block {
                    margin-top: 10px;
                    h1 {
                        margin-top: 8px;
                        font-size: 25px;
                    }
                    p {
                        margin-bottom: 30px;
                        font-size: 15px;
                    }
                }
                img {
                    width: 50px;
                    height: 50px;
                    top: 16px;
                    right: 22px;
                }
            }
            .balance-block {
                h1 {
                    font-size: 45px;
                    line-height: 95px;
                }
                p {
                    margin-bottom: 27px;
                    font-size: 20px;
                }
                .init-transaction-block {
                    button {
                        height: 37px;
                        padding: 5px 14px 7px 12px;

                        font-size: 18px;
                        img {
                            margin-right: 12px;
                        }
                    }
                    .wrapper-send-tr-block {
                        .send-tr-block {
                            width: 85%;
                            padding: 21px 0;
                            h1 {
                                line-height: 36px;
                                font-size: 30px;
                                margin-bottom: 28px;
                            }
                            .wrapper-select {
                                .selected-coin-block {
                                    width: 85.3%;
                                    height: 52px;

                                    padding-left: 19px;
                                    padding-right: 45px;
                                    margin-bottom: 13px;
                                    p {
                                        font-size: 20px;
                                    }
                                    img {
                                        width: 17px;
                                    }
                                }
                                .wrapper-options-block {
                                    .options-block {    
                                        width: 85.3%;
                                        padding-top: 20px;
                                        margin-bottom: 13px;
                                        .option-block {
                                            font-size: 19px;
                                        }
                                    }
                                }
                            }
                            input {
                                width: 85.3%;
                                height: 52px;
                                margin-bottom: 15px;
                                padding-left: 19px;
                            }
                            input[type="text"] {
                                font-size: 20px;
                            }
                            input::placeholder {
                                font-size: 20px;
                            }
                            .comment-block {
                                height: 97px;
                            }
                        }
                    }
                    .wrapper-receive-tr-block {
                        .receive-tr-block {
                            width: 100%;
                            height: 60%;
                            padding: 25px 0 0 0;
                            h1 {
                                font-size: 30px;
                                margin-bottom: 26px;
                                margin-left: 38px;
                            }
                            svg {
                                width: 200px;
                                height: 200px;
                                margin-bottom: 27px;
                                border-radius: 20px;
                                margin-bottom: 27px;
                            }
                            p {
                                font-size: 20px;
                                line-height: 25px;
                            }
                        }
                    }
                    
                }
            }
            .ton-wallet-block {
                width: 100%;
                height: 76px;
                padding: 0 22px 0 14px;
                margin: 0 auto;
                margin-top: 40px;
                .ton-balanse-block {
                    img {
                        width: 50px;
                        margin-right: 15px;
                    }
                    div {
                        h1 {
                            font-size: 16px;
                        }
                        p {
                            font-size: 14px;
                        }
                    }
                }
                p {
                    font-size: 14px;
                }
            }
            .transactions-block {
                margin: 37px auto 0;
                h2 {
                    font-size: 20px;
                    margin-bottom: 11px;
                }
                .wrapper-transaction {
                    // max-height: 40dvh;
                    // overflow: scroll;
                    width: 100%;
                    .transaction {
                        padding: 0 22px 0 14px;
                        margin-bottom: 10px;
                        height: 76px;
                        width: 100%;
                        div {
                            img {
                                width: 50px;
                                height: 50px;
                                margin-right: 15px;
                            }
                            div {
                                h3 {
                                    font-size: 16px;
                                }
                                p {
                                    font-size: 14px;
                                }
                            }
                        }
                        p {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    } // 640 px
    @media (max-width: 320px) {
        .wrapper-the-wallet {
            .the-header {
                .adress-block {
                    margin-top: 10px;
                    h1 {
                        margin-top: 8px;
                        font-size: 21px;
                    }
                    p {
                        margin-bottom: 40px;
                        font-size: 15px;
                    }
                }
                img {
                    width: 40px;
                    height: 40px;
                    top: 16px;
                    right: 22px;
                }
            }
            .balance-block {
                h1 {
                    font-size: 40px;
                    line-height: 85px;
                }
                p {
                    margin-bottom: 27px;
                    font-size: 20px;
                }
                .init-transaction-block {
                    button {
                        height: 37px;
                        padding: 5px 14px 7px 12px;

                        font-size: 15px;
                        img {
                            margin-right: 12px;
                        }
                    }
                    .wrapper-send-tr-block {
                        .send-tr-block {
                            width: 85%;
                            padding: 21px 0;
                            h1 {
                                line-height: 36px;
                                font-size: 30px;
                                margin-bottom: 28px;
                            }
                            .wrapper-select {
                                .selected-coin-block {
                                    width: 85.3%;
                                    height: 52px;

                                    padding-left: 19px;
                                    padding-right: 45px;
                                    margin-bottom: 13px;
                                    p {
                                        font-size: 20px;
                                    }
                                    img {
                                        width: 17px;
                                    }
                                }
                                .wrapper-options-block {
                                    .options-block {    
                                        width: 85.3%;
                                        padding-top: 20px;
                                        margin-bottom: 13px;
                                        .option-block {
                                            font-size: 19px;
                                        }
                                    }
                                }
                            }
                            input {
                                width: 85.3%;
                                height: 52px;
                                margin-bottom: 15px;
                                padding-left: 19px;
                            }
                            input[type="text"] {
                                font-size: 20px;
                            }
                            input::placeholder {
                                font-size: 20px;
                            }
                            .comment-block {
                                height: 97px;
                            }
                        }
                    }
                    .wrapper-receive-tr-block {
                        .receive-tr-block {
                            width: 100%;
                            height: 60%;
                            padding: 25px 0 0 0;
                            h1 {
                                font-size: 30px;
                                margin-bottom: 26px;
                                margin-left: 38px;
                            }
                            svg {
                                width: 200px;
                                height: 200px;
                                margin-bottom: 27px;
                                border-radius: 20px;
                                margin-bottom: 27px;
                            }
                            p {
                                font-size: 20px;
                                line-height: 25px;
                            }
                        }
                    }
                    
                }
            }
            .ton-wallet-block {
                width: 100%;
                height: 76px;
                padding: 0 22px 0 14px;
                margin: 0 auto;
                margin-top: 40px;
                .ton-balanse-block {
                    img {
                        width: 35px;
                        margin-right: 15px;
                    }
                    div {
                        h1 {
                            font-size: 15px;
                        }
                        p {
                            font-size: 12px;
                        }
                    }
                }
                p {
                    font-size: 15px;
                }
            }
            .transactions-block {
                margin: 37px auto 0;
                h2 {
                    font-size: 14px;
                    margin-bottom: 11px;
                }
                .wrapper-transaction {
                    width: 100%;
                    .transaction {
                        padding: 0 22px 0 14px;
                        margin-bottom: 10px;
                        height: 76px;
                        width: 100%;
                        div {
                            img {
                                width: 35px;
                                height: 35px;
                                margin-right: 15px;
                            }
                            div {
                                h3 {
                                    font-size: 15px;
                                }
                                p {
                                    font-size: 12px;
                                }
                            }
                        }
                        p {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    } 
</style>