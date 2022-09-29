import { Logger } from '../../../lib';
import { AssemblerLoggerInterface } from '../../../lib/assemblerLogger';
import { AppError } from '../../utils/appError';
import { Either, right, left } from '../../utils/either';

@Logger
export class HeroWithoutLogSetup {
  public readonly name: string;

  private armor: number;

  private hp: number;

  private assemblerLogger!: AssemblerLoggerInterface;

  constructor(props: { name: string; armor: number; hp: number }) {
    this.name = props.name;
    this.armor = props.armor > 100 ? 100 : props.armor;
    this.hp = props.hp > 100 ? 100 : props.hp;
  }

  private damageReductionPercentage() {
    return (this.armor * 0.75) / 100;
  }

  private calcRealDamage(props: { damage: number }) {
    return (1 - this.damageReductionPercentage()) * props.damage;
  }

  takesDamage(props: { damage: number }): Either<AppError, 'ok'> {
    try {
      this.assemblerLogger.info({
        message: 'input',
        data: props,
        identifier: '#123',
        functionName: this.takesDamage.name, // opcional
      });

      if (props.damage < 0) {
        throw new AppError({
          name: 'DamageLessThanZero',
          message: `Damage invalid: ${props.damage}. Damage must be greather than 0`,
          code: 'Hero-001',
        });
      }

      this.assemblerLogger.info({
        message: 'hp before damage',
        data: { hp: this.hp },
        identifier: '#456',
        functionName: this.takesDamage.name, // opcional
      });

      this.hp = this.hp - this.calcRealDamage({ damage: props.damage });

      this.assemblerLogger.info({
        message: 'hp after damage',
        data: { hp: this.hp },
        identifier: '#789',
        functionName: this.takesDamage.name, // opcional
      });

      return right('ok');
    } catch (e) {
      const appError =
        e instanceof AppError
          ? e
          : new AppError({ name: 'InternalError', message: `${e}` });

      this.assemblerLogger.error({
        ...appError.value,
        functionName: this.takesDamage.name,
      });

      return left(appError);
    }
  }
}
