

const getFirstMongooseError = (err) => {
    const errors = Object.keys(err.errors).map(key => err.errors[key].message);
    return errors[0];
}

const getErrorMessage = (err) => {
    switch (err.name) {
        case "Error":
            return err.message;
        case "ValidationError":
            return getFirstMongooseError(err);
        default:
            return err.message;
    }
 }

exports.errorResponse = (res, template, error,status = 404) => {
    return res.status(status).render(template, {errors: getErrorMessage(error)})
}
