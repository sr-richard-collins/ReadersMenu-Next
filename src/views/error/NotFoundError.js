import React, { useState, useEffect } from "react";
import Error from "../../components/Error";

const NotFoundError = () => {

    const error_message = "404 Error | Not Found";

    return (
        <>
            <Error title={error_message}/>
        </>
    );
};

export default NotFoundError;
