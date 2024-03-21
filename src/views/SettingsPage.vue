<template>
    <div class="the-header">
        <h1>Settings</h1>
        <p>{{ shortenedText() }}</p>
    </div>
    <div class="settings-block">
        <div class="settings-option">
            <svg width="54" height="66" viewBox="0 0 54 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 0L0 12V30C0 53.49 19.317 64.458 27 66C34.683 64.458 54 53.49 54 30V12L27 0ZM27 6.56835L48 15.9023V30C48 48.402 33.645 57.7635 27 59.8125C20.355 57.7635 6 48.402 6 30V15.9023L27 6.56835ZM24 15V39H30V15H24ZM24 45V51H30V45H24Z" fill="white"/>
            </svg>
            <p>Security</p>
        </div>
        <div class="settings-option">
            <svg width="54" height="66" viewBox="0 0 54 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 0L0 12V30C0 53.49 19.317 64.458 27 66C34.683 64.458 54 53.49 54 30V12L27 0ZM27 6.56835L48 15.9023V30C48 48.402 33.645 57.7635 27 59.8125C20.355 57.7635 6 48.402 6 30V15.9023L27 6.56835ZM24 15V39H30V15H24ZM24 45V51H30V45H24Z" fill="white"/>
            </svg>
            <p>Security</p>
        </div>
    </div>
    <div class="settings-block">
        <div class="settings-option">
            <svg width="54" height="66" viewBox="0 0 54 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 0L0 12V30C0 53.49 19.317 64.458 27 66C34.683 64.458 54 53.49 54 30V12L27 0ZM27 6.56835L48 15.9023V30C48 48.402 33.645 57.7635 27 59.8125C20.355 57.7635 6 48.402 6 30V15.9023L27 6.56835ZM24 15V39H30V15H24ZM24 45V51H30V45H24Z" fill="white"/>
            </svg>
            <p>Security</p>
        </div>
        <div class="settings-option">
            <svg width="54" height="66" viewBox="0 0 54 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 0L0 12V30C0 53.49 19.317 64.458 27 66C34.683 64.458 54 53.49 54 30V12L27 0ZM27 6.56835L48 15.9023V30C48 48.402 33.645 57.7635 27 59.8125C20.355 57.7635 6 48.402 6 30V15.9023L27 6.56835ZM24 15V39H30V15H24ZM24 45V51H30V45H24Z" fill="white"/>
            </svg>
            <p>Security</p>
        </div>
    </div>  
</template>

<script>
import { mapGetters } from 'vuex'

    export default {
        name: 'SettingsPage',
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'getId'
            ])
        },
        methods: {
            shortenedText() {
                const text = this.getId;
                return `${text.slice(0, 4)}...${text.slice(-4)}`;
            }
        }
    }

</script>

<style scoped lang="scss">
$base-font: 'Inter', sans-serif;
    .the-header {
        text-align: center;
        h1 {
            font-family: $base-font;
            font-size: 30px;
            color: white;
            font-weight: 800;
            line-height: 36px;
            margin-top: 8px;
        }
        p {
            font-family: $base-font;
            font-size: 20px;
            color: #848484;
            font-weight: 600;
            line-height: 25px;
            margin-bottom: 42px;
        }
    }
    .settings-block {
        width: 466px;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        padding: 0 23px;
        box-sizing: border-box;
        .settings-option {
            width: 198px;
            height: 198px;
            background-color: #222222;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 27px;
            svg {
                width: 72px;
                height: 72px;
                margin-bottom: 14px;
            }
            p {
                font-family: $base-font;
                font-size: 25px;
                font-weight: 800;
                color: white;
            }   
        }
    }

</style>