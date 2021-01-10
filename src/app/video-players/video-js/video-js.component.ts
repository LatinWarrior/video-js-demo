import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
// import 'videojs-youtube';

@Component({
	selector: 'app-video-js',
	templateUrl: './video-js.component.html',
	styleUrls: [ './video-js.component.scss' ],
	encapsulation: ViewEncapsulation.None,
})
export class VideoJsComponent implements OnInit, OnDestroy {
	@ViewChild('videoTarget', { static: true })
  videoTarget: ElementRef | undefined;
  videoTargetEl: any;

  // Improper value supplied for aspect ratio. The format should be width:height, for example 16:9

	// see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
	@Input()
	options:
		{
				autoplay: boolean;
				sources: {
					src: string;
					type: string;
				}[];
			}
		| undefined;

	player: videojs.Player | undefined;

	constructor(private elementRef: ElementRef) {
    
  }

	ngOnInit(): void {
    this.videoTargetEl = this.videoTarget?.nativeElement;
		// instantiate Video.js
		this.player = videojs(this.videoTargetEl, this.options, () => {
			console.log('onPlayerReady', this);
		});
	}

	ngOnDestroy(): void {
		// destroy player
		if (this.player) {
			this.player.dispose();
		}
	}
}
