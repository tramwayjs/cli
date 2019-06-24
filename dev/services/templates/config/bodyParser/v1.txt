import bodyParser from 'body-parser';

export default {
    "json": bodyParser.json(),
    "urlEncoding": bodyParser.urlencoded({ extended: false }),
}