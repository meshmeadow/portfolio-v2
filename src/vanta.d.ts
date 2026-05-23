declare module 'vanta/dist/vanta.clouds.min' {
  interface VantaEffect {
    destroy: () => void;
    setOptions: (options: Record<string, unknown>) => void;
  }

  interface VantaOptions {
    el: HTMLElement;
    THREE: typeof import('three');
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    speed?: number;
    backgroundColor?: number;
    skyColor?: number;
    cloudColor?: number;
    cloudShadowColor?: number;
    sunColor?: number;
    sunGlareColor?: number;
    sunlightColor?: number;
  }

  export default function CLOUDS(options: VantaOptions): VantaEffect;
}
