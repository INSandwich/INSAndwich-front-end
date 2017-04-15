import { Pipe } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(value: string, arg: string) : string {

    let limit = arg ? parseInt(arg, 10) : 10;
    let trail = '...';

    /*
    let limit = args > 0 ? parseInt(args[0], 10) : 10;
    let trail = args.length > 1 ? args[1] : '...';
    */
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
