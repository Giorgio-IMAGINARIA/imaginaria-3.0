import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
//Services
import { BlurService } from '../services/blur.service';
import { MessagesService } from '../services/messages.service';

// MODELS
import { ContactModel } from '../models/contactModel';

declare let $: any;
declare var google: any;

@Component({
    selector: 'my-contact',
    templateUrl: '../templates/contact.component.html',
    styleUrls: ['../styles/contact.component.css'],
    animations: [
        trigger('toBlur', [
            state('inactive', style({
                "-webkit-filter": 'blur(0px)',
                filter: 'blur(0px)'
            })),
            state('active', style({
                "-webkit-filter": 'blur(10px)',
                filter: 'blur(10px)'
            })),
            transition('inactive => active', animate('500ms ease-in')),
            transition('active => inactive', animate('500ms ease-out'))
        ])]
})
export class ContactComponent implements OnInit {
    private blurStateString: string;
private model: any;
    constructor(private blurService: BlurService, private messagesService: MessagesService) { }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.initModel();
        this.initMap();
        this.checkBlurService();
        if (this.blurService.currentBlurState) {
            this.blurStateString = 'active';
            $('body').css('overflow', 'hidden');
        }
    }
    private initModel(): void {
        this.model = new ContactModel('', '', '', '');
    }
    private initMap(): void {
        var gCampus = { lat: 51.522807, lng: -0.085483 };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.business",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c9c9c9"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                }
            ],
            center: gCampus
        });
        var marker = new google.maps.Marker({
            title: 'Uluru (Ayers Rock)',
            draggable: false,
            animation: google.maps.Animation.BOUNCE,
            position: gCampus,
            map: map
        });
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Google Campus</h1>' +
            '<div id="bodyContent">' +
            '<p>The <b><a href="https://www.campus.co/london/en">' +
            'Google Campus</a></b> is a busy Start-up incubator and buzzing community in the heart of the <b><a href="https://en.wikipedia.org/wiki/East_London_Tech_City">' +
            'East London Tech City</a></b>.' +
            '<p>I love to meet my friends and clients here, while sipping a coffe and working at my laptop in the bar downstairs.</p>' +
            '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    }
    onSubmit() {
        console.log('submit!!!');
        // this.submitted = true;
        this.sendMessage();
    }
    private sendMessage() {
        console.log('the model is: ',this.model)
        this.messagesService.sendNew(this.model);
    }

    private checkBlurService(): void {
        this.blurService.activeBlurStateObservable.subscribe(
            response => {
                if (response) {
                    this.blurStateString = 'active';
                    $('body').css('overflow', 'hidden');
                } else {
                    this.blurStateString = 'inactive';
                    $('body').css('overflow', 'initial');
                }
            },
            error => console.log('Error! Description: ' + error)
        );
    }
}