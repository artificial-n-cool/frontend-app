import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Residency } from 'src/app/modules/residency-crud/types/Residency';
import { ResidencyService } from '../../services/residency.service';

@Component({
  selector: 'app-residency-page',
  templateUrl: './residency-page.component.html',
  styleUrls: ['./residency-page.component.scss']
})
export class ResidencyPageComponent {
  residency?: Residency;

  constructor(
    private route: ActivatedRoute,
    private residencyService: ResidencyService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const residencyId = params['id'];
      this.fetchResidency(residencyId);
    });
  }

  fetchResidency(residencyId: string) {
    this.residencyService.getResidency(residencyId).subscribe(residency => {
      this.residency = residency;
    });
  }
}
