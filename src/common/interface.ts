export interface Cloneable {
  clone: () => this;
}

export type StateUpdatable = number | string | boolean | Cloneable;