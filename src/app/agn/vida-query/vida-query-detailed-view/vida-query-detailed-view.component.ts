import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VidaQueryModalComponent } from "../vida-query-modal/vida-query-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { VidaQueryService } from "../vida-query.service";
import { Acervo } from "../models/acervo.model";
import { VideoJsPlayerOptions } from "video.js";
import { Observable } from "rxjs";
import { ResTypesEnum, ThemeTypesEnum } from '../models/types.enum';

@Component({
  selector: "app-vida-query-detailed-view",
  templateUrl: "./vida-query-detailed-view.component.html",
  styleUrls: ["./vida-query-detailed-view.component.scss"],
})
export class VidaQueryDetailedViewComponent implements OnInit {
  archiveId: string;
  panelOpenStateTecnico = false;
  panelOpenStateMultimedia = false;
  archive$: Observable<Acervo>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _router: Router,
    private _vidaQueryService: VidaQueryService,
  ) {
    this.archive$ = new Observable<Acervo>();

    this._activatedRoute.params.subscribe((paramRuta) => {
      this.archiveId = this._activatedRoute.snapshot.paramMap.get("id");
    });
  }

  ngOnInit(): void {
    if (this.archiveId === "undefined") {
      this.exitDetailedView();
    } else {
      this.archive$ = this._vidaQueryService.fetchVidaById(this.archiveId);
    }
  }

  private exitDetailedView(): void {
    this._router.navigate(["agn"]);
  }

  public playMedia(source: string, sourceType: number, titulo: string): void {
    let opciones: VideoJsPlayerOptions;

    if (sourceType === ResTypesEnum.RESTYPE_VIDEO) {
      opciones = {
        controls: true,
        fluid: true,
        preload: "none",
        sources: [
          { src: source, type: 'video/mp4' },
          //{ src: "https://vjs.zencdn.net/v/oceans.mp4", type: "video/mp4" },
        ],
      };
    } else if (sourceType === ResTypesEnum.RESTYPE_AUDIO) {
      opciones = {
        controls: true,
        autoplay: false,
        fluid: true,
        loop: false,
        src: source,
        //src: "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
        plugins: {
          wavesurfer: {
            backend: "MediaElement",
            waveColor: "gray",
            progressColor: "white",
            cursorColor: "white",
            hideScrollbar: true,
            barWidth: 2,
            barHeight: 1,
            barGap: null,
            scrollParent: true,
          },
        },
      };
    }

    const dialogRef = this._dialog.open(VidaQueryModalComponent, {
      width: "800px",
      data: { opciones: opciones, tituloModal: titulo },
      panelClass: 'vida-query-view-modal'
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  public onGoBack(): void {
    this._router.navigate(['web/buscar']);
  }
}
