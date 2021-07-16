import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [

        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          })
        ]),

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'translateX(50px)',
              opacity: 0
            }),
            animate('250ms 200ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0px)'
            }))
          ], {
            optional: true
          })
        ])

      ]),
      transition(':decrement', [

        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          })
        ]),

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'translateX(-50px)',
              opacity: 0
            }),
            animate('250ms 200ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0px)'
            }))
          ], {
            optional: true
          })
        ])

      ]),
      transition('* => secondary', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          })
        ]),

        group([
          query(':leave', [
            animate('250ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'translateX(-50px)',
              opacity: 0
            }),
            animate('250ms 200ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0px)'
            }))
          ], {
            optional: true
          })
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab'];
      if (!tab) return 'secondary';
      return tab;
    }
  }
}
