/**
 * Vidvisual 1-Second Safety Switch Revert Script
 * -----------------------------------------------
 * Instantly restores the baseline UI by removing motion-enhancements.css import
 * and resetting modified UI files back to the before-sliding-motion state.
 */
const { execSync } = require('child_process');

try {
  console.log('[Safety Switch] Reverting UI to baseline commit (before-sliding-motion)...');
  execSync('git checkout before-sliding-motion -- app/layout.js app/page.js components/HomeHeroGenerator.js', { stdio: 'inherit' });
  console.log('[Safety Switch] Successfully restored classic Vidvisual UI in 1 second!');
} catch (e) {
  console.error('[Safety Switch] Revert error:', e.message);
}
