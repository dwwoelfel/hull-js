/*jshint browser:true, debug: true */
/*global define:true, mocha:true, runMocha:true*/
var should;
define(['chai', 'sinonChai'], function(chai, sinonChai) {
  "use strict";

  window.chai         = chai;
  window.expect       = chai.expect;
  window.assert       = chai.assert;
  window.sinonChai    = sinonChai;
  should              = chai.should();
  chai.use(sinonChai);

  mocha.setup('bdd');

  console = window.console || function() {};

  // Don't track
  window.notrack = true;
  window.HULL_ENV = '';

  var specs = [
    // 'spec/lib/bootstrap_spec',
    'spec/lib/utils/base64_spec',
    'spec/lib/utils/emitter_spec',
    'spec/aura-extensions/component-validate-options_spec',
    'spec/aura-extensions/component-normalize-id_spec',
    'spec/lib/extensions/templates_spec',
    'spec/client/api_spec',
    'spec/lib/hullbase_spec',
    'spec/lib/hull_spec',
    'spec/lib/api/api_spec',
    'spec/client/datasource_spec',
    'spec/client/component_spec',
    'spec/client/component/context_spec',
    'spec/lib/extensions/auth_spec',
    'spec/client/api/params_spec',
    'spec/client/api/reporting_spec',
    'spec/remote/handler_spec'
  ];
  require(specs, runMocha);

});
