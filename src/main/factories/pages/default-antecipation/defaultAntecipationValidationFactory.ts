import { ValidationBuilder as Builder } from 'validation/builder/validationBuilder';
import { ValidationComposite as Composite } from 'validation/composite/validationComposite';

const makeDefaultAntecipationValidation = (): Composite =>
  Composite.build([
    ...Builder.field('amount').required().number().greaterThan(1000).build(),
    ...Builder.field('installments').required().number().range(1, 12).build(),
    ...Builder.field('mdr').required().number().range(1, 100).build(),
  ]);

export default makeDefaultAntecipationValidation;
