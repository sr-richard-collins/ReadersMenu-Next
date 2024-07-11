import React, { useState, useEffect } from "react";
import Error from "../../components/Error";

const ServerError = () => {

    const error_message = "500 Error | Server Error";

    return (
        <>
            <Error title={error_message}/>
        </>
    );
};

export default ServerError;
