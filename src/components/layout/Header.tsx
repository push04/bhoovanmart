import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';
import styles from './Header.module.css';
import { Button } from '@/components/ui/Button';

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoHighlight}>Bhoovan</span>Mart
                </Link>

                {/* Search */}
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Search for authentic Swadeshi products..."
                        className={styles.searchBar}
                    />
                </div>

                {/* Navigation Actions */}
                <nav className={styles.actions}>
                    <Link href="/bhoovan-map" className={styles.navLink}>
                        India Map
                    </Link>
                    <Link href="/sellers" className={styles.navLink}>
                        Sellers
                    </Link>

                    <Button variant="ghost" size="icon" className={styles.iconBtn}>
                        <User size={20} />
                    </Button>

                    <div className={styles.cartWrapper}>
                        <Button variant="ghost" size="icon" className={styles.iconBtn}>
                            <ShoppingCart size={20} />
                        </Button>
                        <span className={styles.cartBadge}>2</span>
                    </div>

                    <Button variant="primary" size="sm" className={styles.loginBtn}>
                        Login
                    </Button>
                </nav>
            </div>
        </header>
    );
}
