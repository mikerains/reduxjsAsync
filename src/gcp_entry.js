
import Root from './containers/Root';

window.mrains_reddit = function (namespace) {
    function mountInGCP() {
        ReactDOM.render(React.createElement(Root, arguments), document.getElementById('mrains_reddit'));
    }

    return {
        mountInGCP
    };
}(window.mrains_reddit);