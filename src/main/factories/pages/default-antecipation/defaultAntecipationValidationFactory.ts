import { ValidationBuilder as Builder } from 'validation/builder/validationBuilder';
import { ValidationComposite as Composite } from 'validation/composite/validationComposite';

const makeDefaultAntecipationValidation = (): Composite =>
  Composite.build([
    ...Builder.field('amount').required().greaterThan(1000).build(),
    ...Builder.field('installments').required().build(),
    ...Builder.field('mdr').required().build(),
  ]);

export default makeDefaultAntecipationValidation;
