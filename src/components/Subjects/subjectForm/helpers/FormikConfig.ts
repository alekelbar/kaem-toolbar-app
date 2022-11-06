import * as yup from "yup";


export const initialValues = {
    title: '',
    description: '',
    startAt: '',
    endAt: ''
}

export const formVal = yup.object({
    title: yup.string().required("El titulo es requerido"),
    description: yup.string().required("La descripción es requerida"),
    startAt: yup.date().required("La fecha inicial es requerida"),
    endAt: yup.date().required().when("startAt", ((startAt, schema) => startAt && schema.min(startAt, "La fecha final, no puede ser anterior a la inicial"))),
})
