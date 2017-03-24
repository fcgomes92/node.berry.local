const path = require('path');
require('html-loader!./Home.html')
require('./Home.scss');

const Home = (request, response) => {
    response.status(200).sendFile('html/Home.html', {root: 'assets/'});
}
export default Home;
