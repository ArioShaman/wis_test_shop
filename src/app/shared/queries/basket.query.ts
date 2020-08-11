
import { Query } from '@datorama/akita';

import { BasketListStore, IBasketListState } from '../store/basket.store';

export class BasketQuery extends Query<IBasketListState> {

  constructor(protected store: BasketListStore) {
    super(store);
  }

  protected getBasketEl(id: number): IBasketListState {
    return this.getValue().entities[id];
  }

}