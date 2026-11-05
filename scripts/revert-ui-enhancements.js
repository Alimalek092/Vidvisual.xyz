/**
 * Vidvisual 1-Second Safety Switch Revert Script
 * -----------------------------------------------
 * Instantly restores the baseline UI by reverting layout, page, and removing premium-ui.css.
 */
const { execSync } = require('child_process');

try {
  console.log('[Safety Switch] Reverting UI to baseline tag (before-ui-overhaul)...');
  execSync('git checkout before-ui-overhaul -- app/layout.js app/page.js components/HomeHeroGenerator.js', { stdio: 'inherit' });
  console.log('[Safety Switch] Successfully restored classic Vidvisual UI in 1 second!');
} catch (e) {
  console.error('[Safety Switch] Revert error:', e.message);
}
