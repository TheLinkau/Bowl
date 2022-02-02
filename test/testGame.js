var assert = require('assert');

describe('Creation tableau', function() {
  table = body.getElementsByTagName("table")[0];
  assert.equal(table,null);

  generate_table();
  
  assert.notEqual(table,null);

  
});
