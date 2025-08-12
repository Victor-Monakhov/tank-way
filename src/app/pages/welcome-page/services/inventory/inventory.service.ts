import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { ITankItem } from '../../../../common/resources/interfaces/tank.interface';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  isDragging = false;
  inventoryDraggingData: ITankItem = null;
  tankItemChanged$ = new Subject<ITankItem>();
  inventoryItemClicked$ = new Subject<ITankItem>();
}
