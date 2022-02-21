/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "../utils/propTypes";
import bn from "../utils/bemnames";
import Typography from "./Typography";
import styled from "styled-components";
import { Button, Nav, Navbar } from "reactstrap";
import { MdClearAll } from "react-icons/md";

const bem = bn.create("page");
const DivComponent = styled.div`
  display: inline-block;
`;

const Page = ({
  title,
  create,
  breadcrumbs,
  onClick,
  tag: Tag,
  className,
  children,
  ...restProps
}) => {
  const classes = bem.b("px-3", className);
  const handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector(".cr-sidebar").classList.toggle("cr-sidebar--open");
  };

  return (
    <Tag className={classes} {...restProps}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DivComponent className={bem.e("header")}>
          <Navbar light expand>
            <Nav navbar className="mr-2">
              <Button outline onClick={handleSidebarControlButton}>
                <MdClearAll size={25} />
              </Button>
            </Nav>
          </Navbar>
        </DivComponent>
        <DivComponent className={bem.e("header")}>
          {title && typeof title === "string" ? (
            <Typography type="h4" className={bem.e("title")}>
              {title}
            </Typography>
          ) : (
            title
          )}
        </DivComponent>
        {create ? (
          <DivComponent>
            <Button color="primary" value="Create" onClick={onClick}>
              Create
            </Button>
          </DivComponent>
        ) : (
          <div />
        )}
      </div>
      {children}
    </Tag>
  );
};

Page.propTypes = {
  tag: PropTypes.component,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  children: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      active: PropTypes.bool
    })
  )
};

Page.defaultProps = {
  tag: "div",
  title: ""
};

export default Page;
