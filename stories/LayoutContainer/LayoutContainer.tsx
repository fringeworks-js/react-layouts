/** @jsxImportSource @emotion/react */
import withLayout from '../../src/with-css/withLayout';
import Box from '../Box';

const LayoutContainer = withLayout(Box, {
  displayName: 'LayoutContainer',
});
export default LayoutContainer;
