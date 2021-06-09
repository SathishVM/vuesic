import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  configure,
  ErrorMessage,
} from 'vee-validate';

import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('password_mismatch', confirmed);
    defineRule('excluded', excluded);

    configure({
      generateMessage(ctx) {
        const messages = {
          required: `The ${ctx.field} is required.`,
          min: `The ${ctx.field} is too short.`,
          max: `The ${ctx.field} is too long.`,
          alpha_spaces: `The ${ctx.field} may only contain alphabetiic characters and spaces.`,
          email: `The ${ctx.field} must be a valid email.`,
          min_value: `The ${ctx.field} is too low.`,
          max_value: `The ${ctx.field} is too high.`,
          excluded: `You are not allowed to use this option: ${ctx.field}`,
          password_mismatch: "The confirm password don't match to password.",
          tos: 'You must accept the terms and conditions.',
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The ${ctx.field} is invalid.`;

        return message;
      },
    });
  },
};
