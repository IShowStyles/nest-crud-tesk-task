import { Logger } from '@nestjs/common';

export interface Options {
  prefix?: string;
  transform?: (data: any) => any;
  timestamp?: boolean;
  propertyName?: string;
}

const DEFAULT_OPTIONS: Options = {
  prefix: 'Function',
  timestamp: true,
};

export const CustomLog = (options = DEFAULT_OPTIONS) => {
  return function (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>,
  ): void {
    const {
      prefix = 'Function',
      transform = (data: any) => JSON.stringify(data),
      timestamp = true,
    } = options || {};
    const logger = new Logger(target.constructor.name);

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<any> {
      const startTime = Date.now();
      const argsToLog = transform(args);

      logger.log(`${prefix} "${propertyName}" invoked with args: ${argsToLog}`);

      let result;
      try {
        result = await originalMethod.apply(this, args);
      } catch (error) {
        logger.error(
          `${prefix} "${propertyName}" encountered an error: ${error.message}`,
        );
        throw error;
      }

      const endTime = Date.now();
      const timeTaken = timestamp
        ? ` Execution time: ${endTime - startTime}ms.`
        : '';
      const resultToLog = transform(result);

      logger.log(
        `${prefix} "${propertyName}" completed with result: ${resultToLog}${timeTaken}`,
      );

      return result;
    };
  };
};
