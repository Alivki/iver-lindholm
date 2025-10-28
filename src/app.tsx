import {Router} from "@solidjs/router";
import {FileRoutes} from "@solidjs/start/router";
import {Suspense} from "solid-js";
import {Header} from "~/components/sections/header"
import {Footer} from "~/components/sections/footer"
import "./app.css";

export default function App() {
    return (
        <Router
            root={props => (
                <div class={"relative bg-[url(/bg-phone.png)] md:bg-[url(/bg.png)] bg-origin-border bg-bottom bg-cover bg-no-repeat"}>
                    <div class={"h-screen"}>
                        <Header/>
                        <Suspense>
                            {props.children}
                        </Suspense>
                    </div>
                    <Footer/>
                </div>
            )}
        >
            <FileRoutes/>
        </Router>
    );
}
