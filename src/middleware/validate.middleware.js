export const validate = (schema, source = "body") => {
    return (req, res, next) => {
        try {
            const data = source === "params" ? req.params : req.body;
            const parsedData = schema.parse(data);

            if (source === "params") {
                req.params = parsedData;
            } else {
                req.body = parsedData;
            }

            next();
        } catch (error) {
            const issues = error.issues || error.errors;
            if (issues) {
                const formattedErrors = issues.map(err => ({
                    field: err.path.join("."),
                    message: err.message
                }));

                return res.status(400).json({
                    status: "error",
                    message: "Error de validación en los datos enviados",
                    errors: formattedErrors
                });
            }

            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    };
};
