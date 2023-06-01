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

export const changeHeightAnimation = trigger('changeHeightAnimation', [
    state('close', style({
        maxHeight: '0',
    })),
    state('open', style({
        maxHeight: '30%',
    })),
    transition('open => close', [
        animate('300ms')
    ]),
    transition('close => open', [
        animate('300ms')
    ]),
])

export const showUserListAnimation = trigger('showUserListAnimation', [
    state('close', style({
        height: '0',
    })),
    state('open', style({
        maxHeight: '30vh',
    })),
    transition('open => close', [
        animate('200ms')
    ]),
    transition('close => open', [
        animate('200ms')
    ]),
])
