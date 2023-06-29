import { Component } from '@angular/core';
import { PromotionService } from '../../services/promotion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { ResidencyService } from '../../services/residency.service';

@Component({
  selector: 'app-create-promotion-page',
  templateUrl: './create-promotion-page.component.html',
  styleUrls: ['./create-promotion-page.component.scss']
})
export class CreatePromotionPageComponent {
  residencyId: string = '';

  constructor(
    private router: Router,
    private promotionService: PromotionService,
    private residencyService: ResidencyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.residencyId = params['smestajId'];
    })
  }
}
