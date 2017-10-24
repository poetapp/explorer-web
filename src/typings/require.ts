import * as dummy from 'fs';

declare global {
  interface require {
    (moduleId: string): any;
  }
}
