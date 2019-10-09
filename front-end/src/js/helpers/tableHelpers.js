export const fieldIsInErrorArray = ({ field, errors }) => {
    if (
        errors &&
        errors.length > 0 &&
        errors.find(error => error.field === field)
    ) {
        return true;
    }

    return false;
};

export const getFieldLabel = ({ field, defaultLabel, errors }) => {
    if (errors && errors.length > 0) {
        const foundError = errors.find(error => error.field === field);
        if (foundError) {
            return foundError.defaultMessage;
        }
    }

    return defaultLabel;
};
