import { trigger, style, animate, transition } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('1s {{ i * 0.2 }}s ease-in-out', style({ opacity: 1 }))
    ])
]);
