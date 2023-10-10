import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useState } from 'react'

type ActiveLinkProps = LinkProps & {
  className?: string
  activeClassName: string
}

const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const { asPath, isReady } = useRouter()
  const [computedClassName, setComputedClassName] = useState(className)

  useEffect(() => {
    if (isReady) {
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname.split('/')[1]

      const activePathname = new URL(asPath, location.href).pathname.split('/')[1]

      const newClassname =
        activePathname === linkPathname
          ? `${className} ${activeClassName}`.trim()
          : className

      if (newClassname !== computedClassName) {
        setComputedClassName(newClassname)
      }
    }
  }, [
    activeClassName,
    asPath,
    className,
    computedClassName,
    isReady,
    props.as,
    props.href
  ])

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  )
}

export default ActiveLink
