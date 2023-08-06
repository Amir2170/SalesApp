// animation file for global animations

import {animation, style, animate, trigger, transition, useAnimation, state, sequence} from '@angular/animations';

// animation to open and close forms on all pages smoothly
export const triggerOpenCloseForm = trigger('openClose', [
  state('open', style({
    height: '33vh',
    opacity: '1',
  })),
  state('closed', style({
    height: '0vh',
    opacity: '0',
  })),

  transition('open => closed', sequence([
    animate('0.5s', style({
      opacity: '0',
    })),

    animate('0.5s', style({
      height: '0vh'
    }))
  ])),

  transition('closed => open', sequence([
    animate('0.5s', style({
      height: '33vh',
    })),

    animate('0.5s', style({
      opacity: '1'
    }))
  ]))
])

// End animation
