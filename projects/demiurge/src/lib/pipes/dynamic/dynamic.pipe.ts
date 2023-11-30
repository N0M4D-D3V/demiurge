import { Injector, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dynamic',
    standalone: true
})
export class DynamicPipe implements PipeTransform {
  constructor(private readonly injector: Injector) {}

  /**
   * Transforms the input value using the provided pipe token and arguments.
   * @param value - The value to be transformed.
   * @param pipeToken - The token of the pipe to be used for transformation.
   * @param args - Optional arguments to be passed to the pipe.
   * @returns The transformed value using the specified pipe.
   */
  public transform(value: any, pipeToken?: any, args?: any[]): any {
    if (!pipeToken) return value;
    else {
      // Retrieves the pipe instance using the injector based on the provided token
      const pipe = this.injector.get<any>(pipeToken);

      // Transforms the value using the obtained pipe instance and optional arguments
      return args ? pipe.transform(value, ...args) : pipe.transform(value);
    }
  }
}
