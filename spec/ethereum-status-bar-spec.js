'use babel';

import EthereumStatusBar from '../lib/ethereum-status-bar';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('EthereumStatusBar', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('ethereum-status-bar');
  });

  describe('when the ethereum-status-bar:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.ethereum-status-bar')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'ethereum-status-bar:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.ethereum-status-bar')).toExist();

        let ethStatusBarElement = workspaceElement.querySelector('.ethereum-status-bar');
        expect(ethStatusBarElement).toExist();

        let ethStatusBarPanel = atom.workspace.panelForItem(ethStatusBarElement);
        expect(ethStatusBarPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'ethereum-status-bar:toggle');
        expect(ethStatusBarPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.ethereum-status-bar')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'ethereum-status-bar:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let ethStatusBarElement = workspaceElement.querySelector('.ethereum-status-bar');
        expect(ethStatusBarElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'ethereum-status-bar:toggle');
        expect(ethStatusBarElement).not.toBeVisible();
      });
    });
  });
});
