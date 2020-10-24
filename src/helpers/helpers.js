export const handleError = async (error) => {
    const errorStatus = error ? error.status : error;
   return await prepareErrorMessage(errorStatus);
    //store.dispatch("populateErrors", errorMessage);
};

const prepareErrorMessage = async (status) => {
    switch (status) {
        case 401:
            return 401;
        case 422:
            return "Unprosomething entity";
        case 404:
            return "You're lost";
        case 405:
            return "Read the manual";
        default:
            return "Error, please try again later";
    }
};