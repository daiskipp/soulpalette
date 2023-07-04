import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import Web3 from "web3/dist/web3.min.js";
import moment from 'moment';
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        console.log('props', props.initialPage.props.user);
        const userEthAddress = props.initialPage.props.auth.user?.eth_address;
        console.log('userEthAddress0', userEthAddress);
        // セッションストレージからethDataを取得
        const storedEthData = JSON.parse(sessionStorage.getItem('ethData'));
        const shouldFetchData = sessionStorage.getItem('shouldFetchData');
        console.log('shouldFetchData', shouldFetchData);
        if (shouldFetchData || (userEthAddress && !storedEthData)) {
            // ポリゴンチェーンからデータを取得
            const contractRPC = props.initialPage.props.contractRPC;
            const contractABI = props.initialPage.props.contractABI;
            const contractAddress = props.initialPage.props.contractAddress;
            console.log('props.initialPage.props', props.initialPage.props)
            const web3 = new Web3(contractRPC);

            const timeZoneOffsetMinutes = new Date().getTimezoneOffset();
            const currentTimestamp = moment().subtract(timeZoneOffsetMinutes, 'minutes').valueOf().toString();
            const twoMonthsAgoTimestamp = moment().subtract(2, 'months').subtract(timeZoneOffsetMinutes, 'minutes').valueOf().toString();

            const contract = new web3.eth.Contract(contractABI, contractAddress);
            contract.methods.getEntries(userEthAddress, twoMonthsAgoTimestamp, currentTimestamp)
                .call()
                .then(result => {
                    // レスポンスの処理
                    const entries = result.map((entry) => {
                        return {
                            colors: entry.colors,
                            comments: entry.comments,
                            stamps: entry.stamps,
                            happiness: entry.happiness,
                            date: moment(parseInt(entry.timestamp)).format('YYYY-MM-DD'),
                            unixtimestamp: entry.timestamp,
                        };
                    });

                    const entriesByDate = {};
                    entries.forEach((entry) => {
                        const { date, unixtimestamp } = entry;
                        if (!entriesByDate[date] || unixtimestamp > entriesByDate[date].unixtimestamp) {
                            entriesByDate[date] = entry;
                        }
                    });

                    const ethData = Object.values(entriesByDate);

                    // ethDataをセッションストレージに保存
                    sessionStorage.setItem('ethData', JSON.stringify(ethData));
                    sessionStorage.setItem('shouldFetchData', false );
                    // 新しいオブジェクトを作成し、ethDataを追加

                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            // ethDataがセッションストレージに保存されている場合は取得
            const ethData = storedEthData || null;


        }
        console.log('newProps', props)


        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
