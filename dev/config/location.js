import path from 'path';

export default process.env.TRAMWAY_PROJECT_PATH || `${path.dirname(require.main.filename)}/src`;