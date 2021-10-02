import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

export function FormatDate(date: Date) {

    const dateToFormat = date;

    console.log(dateToFormat);

    const dateFormatted = format(dateToFormat, 'dd-MMMM-yyyy', { locale: ptBR });

    console.log(dateFormatted);

    return dateFormatted;
}
