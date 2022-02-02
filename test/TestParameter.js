import { addPlayer, sendPlayers } from "../js/parameter.js" // importer les fonctions à tester
import assert from 'assert';
import { // importer JSDOM
  JSDOM
} from 'jsdom'
const options = { // Je sais pas comment ca marche mais ca empeche erreur à l'appel d'alert()
  url: "http://localhost/",
  beforeParse(window) {
    window.alert = window.console.log.bind("");
  },
};
await JSDOM.fromFile("parameter.html", options).then(dom => { // Créer un dom virtuel à partir d'un fichier (on peut également écrire le dom désiré directement dans ce constructeur)
  global.window = dom.window
  global.document = dom.window.document // On set le dom virtuel crée en tant que dom pour les tests mocha
});
// TESTS
describe('Fonctions parameters.js', function () {
  describe('addPlayer()', function () {
    it('String non presente dans <input>', function () {
      assert.equal(addPlayer(), false);
    });
    it('String presente dans <input>', function () {
      global.document.getElementById("playerName").value = 'toufik';
      assert.equal(addPlayer(), true);
    });
  });
  describe('sendPlayers()', function() {
    it('Quand on a ajouté au moins un joueur', function() {
      assert.equal(sendPlayers(), true);
    });
  });
});
