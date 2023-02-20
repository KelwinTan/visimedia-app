import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import { cx } from "@emotion/css";

function NavLink({ href, exact, children, activeClassName, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    (<Link
      href={href}
      {...props}
      className={cx(props.className || "", isActive ? activeClassName : "")}>

      {children}

    </Link>)
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  activeClassName: PropTypes.string,
};

NavLink.defaultProps = {
  exact: false,
  activeClassName: "",
};

export default NavLink;
