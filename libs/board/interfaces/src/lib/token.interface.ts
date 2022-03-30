export type Token = Zombie | Creature;

export interface Zombie {
  type: 'ZOMBIE';
  icon?: string;
}

export interface Creature {
  type: 'CREATURE';
  icon?: string;
}
