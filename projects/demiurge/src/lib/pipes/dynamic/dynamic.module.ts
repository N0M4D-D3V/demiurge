import { NgModule } from '@angular/core';
import { DynamicPipe } from './dynamic.pipe';

@NgModule({
    imports: [DynamicPipe],
    exports: [DynamicPipe],
})
export class DynamicPipeModule {}
