import {Menu} from 'lucide-solid';

export function Header() {
    return (
        <header class={"flex flex-row justify-between items-center px-4 w-full h-10"}>
            <div class={"w-40 flex justify-start"}>
                <a href={"/"} class={"text-white bg-black px-1"}>iverlindholm.com</a>
            </div>

            <a href={"/"} class={"hidden sm:block hover:cursor-pointer bg-black text-white px-1"}>home</a>

            <div class={"w-40 flex justify-end"}>
                <Menu color={"white"} class={"bg-black"}/>
            </div>
        </header>
    );
}