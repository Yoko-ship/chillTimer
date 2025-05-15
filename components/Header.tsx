import classes from "@/app/page.module.css"
import Link from "next/link"
function Header() {
  return (
    <header className={classes.header}>
        <nav>
            <ul>
                <li>
                  <Link href="/">Главное меню</Link>
                </li>
                {/* <li>
                  <Link href="/timer">Добавить таймер</Link>
                </li> */}
            </ul>
        </nav>
    </header>
  )
}

export default Header