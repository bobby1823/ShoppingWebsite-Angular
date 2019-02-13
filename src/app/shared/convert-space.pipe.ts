import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToSpaces'
})
export class ConvertToSpacePipe implements PipeTransform {

    transform(inputValue: string, character: string): string {        
        return inputValue.replace(character,"");
    }
}