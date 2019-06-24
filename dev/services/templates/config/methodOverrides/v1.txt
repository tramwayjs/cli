import methodOverride from 'method-override';

export default {
    "_method": methodOverride('_method'),
    "xMethod": methodOverride('X-HTTP-Method-Override'),
}