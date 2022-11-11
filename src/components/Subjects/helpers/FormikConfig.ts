import * as yup from "yup";
import dayjs from 'dayjs';


export const initialValues = {
    title: '',
    description: '',
    startAt: dayjs().format("YYYY-MM-DD"),
    endAt: dayjs().add(1, 'M').format("YYYY-MM-DD"),
}

export const subjectsAddValidation = yup.object({
    title: yup.string().required("El titulo es requerido"),
    description: yup.string().required("La descripción es requerida"),
    startAt: yup.date().required("La fecha inicial es requerida"),
    endAt: yup.date().required().when("startAt", ((startAt: string, schema) => startAt && schema.min(dayjs(startAt).add(1, 'month'), "La fecha final, al menos debería ser un mes posterior a la inicial"))),
})

export const subjectsEditValidation = yup.object({
    title: yup.string().required("El titulo es requerido"),
    descr: yup.string().required("La descripción es requerida"),
    startAt: yup.date().required("La fecha inicial es requerida"),
    endAt: yup.date().required().when("startAt", ((startAt: string, schema) => startAt && schema.min(dayjs(startAt).add(1, 'month'), "La fecha final, al menos debería ser un mes posterior a la inicial"))),
})

