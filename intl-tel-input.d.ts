// intl-tel-input.d.ts
declare module 'intl-tel-input' {
    interface IntlTelInput {
      // Add any specific methods you use, or use `any` if unsure
      setNumber: (number: string) => void;
      getNumber: () => string;
      isValidNumber: () => boolean;
      destroy: () => void;
    }
  
    function intlTelInput(input: HTMLInputElement, options?: any): IntlTelInput;
    export default intlTelInput;
  }

declare module 'intl-tel-input/build/js/utils.js';
