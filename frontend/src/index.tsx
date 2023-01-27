import { App } from "app/App";
import ReactDOM from "react-dom/client";
import 'app/styles/index.scss';
import { StoreProvider } from "app/providers/StoreProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>
    
)