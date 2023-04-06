import {animate, state, style, transition, trigger} from "@angular/animations";

export const scaleAnimation = trigger('scaleAnimation', [
    state('hide', style({
        opacity: 0,
        transform: 'scale(0)'
    })),
    state('show', style({
        opacity: 1,
        transform: 'scale(1)'
    })),
    transition('hide => show', [
        animate('0.2s')
    ]),
    transition('show => hide', [
        animate('0.2s')
    ])
]);
