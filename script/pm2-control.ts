import * as pm2 from 'pm2';

pm2.connect(function(err) {
    if(err) process.exit(2);
    
    pm2.start({
        script: 'app.js',
        name: 'runtime tracker'
    },  () => {
        pm2.disconnect();  
    });

})