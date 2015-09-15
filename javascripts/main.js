requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'moment': '../lib/bower_components/moment/min/moment.min',
    'fullcalendar': '../lib/bower_components/fullcalendar/dist/fullcalendar',
    'scheduler': '../lib/bower_components/fullcalendar-scheduler/dist/scheduler',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../lib/bower_components/firebase/firebase',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'q': '../lib/bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    },
    'scheduler': ['jquery', 'fullcalendar'],
    'fullcalendar': 'jquery'
  }
});

requirejs(
  ["core-dependencies", "core-work"], 
  function (coreDep, core) {

    
   

// <script src='lib/bower_components/moment/min/moment.min.js'></script>
//     <script src='lib/bower_components/fullcalendar/dist/fullcalendar.js'></script>
//     <script src='lib/bower_components/fullcalendar-scheduler/dist/scheduler.js'></script>
     



     
  });
