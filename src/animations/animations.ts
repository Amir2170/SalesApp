// animation file for global animations

import {animation, style, animate, trigger, transition, useAnimation, state, sequence} from '@angular/animations';

// animation to open and close forms on all pages smoothly
export const triggerOpenCloseForm = trigger('openClose', [
  state('open', style({
    height: '230px',
    opacity: '1',
  })),
  state('closed', style({
    height: '0px',
    opacity: '0',
  })),

  transition('open => closed', sequence([
    animate('0.5s', style({
      opacity: '0',
    })),

    animate('0.5s', style({
      height: '0px'
    }))
  ])),

  transition('closed => open', sequence([
    animate('0.3s', style({
      height: '230px',
    })),

    animate('0.3s', style({
      opacity: '1'
    }))
  ]))
])

// End animation

// animation to show and hide error messages
export const triggerShowHideError = trigger('showHideError', [
  state('open', style({
    opacity: '1'
  })),
  state('closed', style({
    opacity: '0'
  })),

  transition("open <=> closed", [
    animate('0.5s')
  ])
])
