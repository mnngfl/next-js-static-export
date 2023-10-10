import ActiveLink from './ActiveLink'

export default function Header() {
  return (
    <header>
      <nav className="navigation">
        <ActiveLink activeClassName="active" href={'/'}>
          Home
        </ActiveLink>
        <ActiveLink activeClassName="active" href={'/products'}>
          Products
        </ActiveLink>
      </nav>
    </header>
  )
}
