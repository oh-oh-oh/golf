import React from 'react';

if (typeof window === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}
