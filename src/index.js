import app from './app';
import {PORT} from './settings';

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})
