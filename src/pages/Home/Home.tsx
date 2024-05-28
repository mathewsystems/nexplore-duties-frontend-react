import './Home.scss';

export default function HomePage() {

    return (
        <div>
            <h1>Home</h1>
            <div>
                Welcome to Nexplore Duties Assignment System.
            </div>
            <div>
                Build: 43101.324.21b
            </div>
            <div>
                Version Date: 2024-05-28
            </div>
            <div id="server_url_wrapper">
                API Server URL: <span data-testid="http_api_server_url">{process.env.REACT_APP_HTTP_API_SERVER_HOST}</span>
            </div>
        </div>
    );

}