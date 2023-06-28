import { Component } from '@angular/core';
import { Promotion } from '../../types/Promotion';
import { ResidencyService } from '../../services/residency.service';
import { PromotionService } from '../../services/promotion.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-update-promotion-page',
  templateUrl: './update-promotion-page.component.html',
  styleUrls: ['./update-promotion-page.component.scss']
})
export class UpdatePromotionPageComponent {
  promotion?: Promotion;
  residenceId?: string;

  constructor(
    private residenceService: ResidencyService,
    private promotionService: PromotionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      mergeMap(params => {
        this.residenceId = params.get('id')!
        let promotionId = params.get('smestajId')!
        return this.promotionService.findByResidenceAndId(promotionId, this.residenceId)
      })
    ).subscribe(promotion => {
      console.log(promotion);
      this.promotion = promotion;
    })
  }
}
