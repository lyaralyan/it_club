declare module '@front/assets/icons/*.svg' {
  import React from 'react'

  const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

  export default Component
}


declare module '*.mp4' {
  const src: string;
  export default src;
}