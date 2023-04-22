import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="error 404" />
                <title>Error 404</title>
            </Helmet>
            <div>
                <ErrorMessage />
                <p
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                    }}
                >
                    Page doesn't exist
                </p>
                <Link
                    to="/"
                    style={{
                        display: "block",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "24px",
                        marginTop: "30px",
                    }}
                >
                    Back to main page
                </Link>
            </div>
        </>
    );
};

export default Page404;
