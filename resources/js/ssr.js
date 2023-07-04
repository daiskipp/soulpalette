import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import Web3 from "web3/dist/web3.min.js";
import moment from 'moment';
const appName = 'Laravel';

createServer(async (page) => {
    console.log('props', props.initialPage.props.user);
    const userEthAddress = props.initialPage.props.auth.user?.eth_address;
    console.log('userEthAddress0', userEthAddress);
    // セッションストレージからethDataを取得
    const storedEthData = JSON.parse(sessionStorage.getItem('ethData'));
    const shouldFetchData = sessionStorage.getItem('shouldFetchData');
    console.log('shouldFetchData', shouldFetchData);
    if (shouldFetchData || ( userEthAddress && !storedEthData )) {
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


            })
            .catch(error => {
                console.error(error);
            });
    } else {
        // ethDataがセッションストレージに保存されている場合は取得
        const ethData = storedEthData || null;


    }
    console.log('newProps', props)

    return createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
        setup({ App, props, plugin }) {
          const app = createSSRApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, {
              ...page.props.ziggy,
              location: new URL(page.props.ziggy.location),
            });

          // `ethData`を`props`オブジェクトに追加
          page.props.ethData = ethData;

          return app;
        },
      });
    });
