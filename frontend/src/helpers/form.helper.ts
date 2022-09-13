import { FormInstance } from "antd";
import { ApiValidationError } from "@/helpers/api.helper";

const FormHelper = {
    validateFields: async (form: FormInstance, requiredFields?: string[]): Promise<boolean> => {
        try {
            const touchedFields = Object.keys(form.getFieldsValue()).filter((el) => form.isFieldTouched(el));
            await form.validateFields(touchedFields);
            return form.isFieldsTouched(requiredFields, true);
        } catch (e) {
            return false;
        }
    },
    setFormErrors(error: ApiValidationError, form: FormInstance, prefix: string = "validation") {
        for (const key of Object.keys(error.data.data)) {
            form.setFields([
                {
                    name: key,
                    errors: error.data.data[key].map((error) => `${prefix}:${error}`),
                },
            ]);
        }
    },
};

export default FormHelper;
