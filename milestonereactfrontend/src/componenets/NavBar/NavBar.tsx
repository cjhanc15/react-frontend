import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css';

const NavBar = () => {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <p>MyApp</p>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li className={isActive('/') ? styles.activeLink : ''}>
          <Link href="/">
            <p>Home</p>
          </Link>
        </li>
        <li className={isActive('/habits') ? styles.activeLink : ''}>
          <Link href="/habits">
            <p>Habits</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
